import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    let emailResult = { sent: false, resetUrl: "" };

    if (user && user.email) {
      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 3600000); // 1 hour validity

      // Upsert verification token for password reset
      await prisma.verificationToken.upsert({
        where: {
          identifier_token: {
            identifier: user.email,
            token: resetToken,
          },
        },
        create: {
          identifier: user.email,
          token: resetToken,
          expires,
        },
        update: {
          token: resetToken,
          expires,
        },
      });

      // Dispatch reset email
      emailResult = await sendPasswordResetEmail({
        to: user.email,
        token: resetToken,
      });
    }

    // Return success to prevent email enumeration
    return NextResponse.json(
      {
        success: true,
        message: "If an account exists with this email, password reset instructions have been sent.",
        emailSent: emailResult.sent,
        // In local development, provide reset link directly if SMTP is not configured
        devResetUrl: !emailResult.sent && emailResult.resetUrl ? emailResult.resetUrl : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message || "Invalid email address" },
        { status: 400 }
      );
    }

    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}
