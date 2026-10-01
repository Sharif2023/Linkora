import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { resourceId } = body;

    if (!resourceId) {
      return NextResponse.json({ message: "Resource ID is required" }, { status: 400 });
    }

    const existing = await prisma.savedItem.findFirst({
      where: {
        userId: session.user.id,
        resourceId,
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Bookmark already saved", savedItem: existing }, { status: 200 });
    }

    const savedItem = await prisma.savedItem.create({
      data: {
        userId: session.user.id,
        resourceId,
      },
    });

    return NextResponse.json({ message: "Bookmark saved!", savedItem }, { status: 201 });
  } catch (error) {
    console.error("Save bookmark error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
