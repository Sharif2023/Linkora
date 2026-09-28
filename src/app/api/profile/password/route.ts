import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Both current and new passwords are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: "New password must be at least 6 characters long" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user || !user.password) {
      return NextResponse.json({ message: "User not found or logged in with a third-party provider" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
