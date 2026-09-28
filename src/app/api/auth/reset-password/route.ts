import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(10),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, token, password } = resetPasswordSchema.parse(body);
    const normalizedEmail = email.toLowerCase().trim();

    // Check verification token in database
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: {
        identifier: normalizedEmail,
        token,
      },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Invalid or expired password reset token. Please request a new link." },
        { status: 400 }
      );
    }

    if (new Date() > tokenRecord.expires) {
      // Clean up expired token
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: normalizedEmail,
          token,
        },
      });

      return NextResponse.json(
        { message: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { message: "No account found matching this email." },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { password: hashedPassword },
    });

    // Delete used verification token
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: normalizedEmail,
        token,
      },
    });

    return NextResponse.json(
      { success: true, message: "Password updated successfully! You can now log in." },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred while resetting your password." },
      { status: 500 }
    );
  }
}
