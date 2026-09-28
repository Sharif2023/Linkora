import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const item = await prisma.savedItem.findUnique({
      where: { id }
    });

    if (!item) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (item.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.savedItem.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Bookmark deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
