import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ bookmarkedIdeaIds: [] });
    }

    const bookmarks = await prisma.savedItem.findMany({
      where: {
        userId: session.user.id,
        ideaId: { not: null }
      },
      include: {
        idea: {
          select: { id: true, slug: true }
        }
      }
    });

    const bookmarkedIdeaIds = Array.from(
      new Set(
        bookmarks.flatMap(b => [b.ideaId, b.idea?.slug].filter(Boolean) as string[])
      )
    );

    return NextResponse.json({
      bookmarkedIdeaIds
    });
  } catch (error) {
    console.error("Get idea bookmarks error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized. Bookmarks saved locally." }, { status: 401 });
    }

    const { ideaId } = await req.json();
    if (!ideaId) {
      return NextResponse.json({ message: "Idea ID is required" }, { status: 400 });
    }

    // Resolve idea by ID or Slug
    const idea = await prisma.implementationIdea.findFirst({
      where: {
        OR: [
          { id: ideaId },
          { slug: ideaId }
        ]
      },
      select: { id: true }
    });

    if (!idea) {
      return NextResponse.json({ message: "Implementation idea not found" }, { status: 404 });
    }

    const resolvedIdeaId = idea.id;

    const existing = await prisma.savedItem.findFirst({
      where: {
        userId: session.user.id,
        ideaId: resolvedIdeaId
      }
    });

    if (existing) {
      await prisma.savedItem.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ bookmarked: false, message: "Bookmark removed" });
    } else {
      await prisma.savedItem.create({
        data: {
          userId: session.user.id,
          ideaId: resolvedIdeaId
        }
      });
      return NextResponse.json({ bookmarked: true, message: "Idea bookmarked!" });
    }
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
