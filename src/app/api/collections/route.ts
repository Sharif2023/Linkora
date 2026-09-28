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

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Collection title is required" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const collection = await prisma.collection.create({
      data: {
        title,
        slug,
        outcome: "Personal Collection",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Collection created", collection }, { status: 201 });
  } catch (error) {
    console.error("Create collection error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
