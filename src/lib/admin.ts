import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export type AdminGuardResult =
  | { session: Awaited<ReturnType<typeof getServerSession>>; error: null }
  | { session: null; error: NextResponse };

export async function requireAdmin(): Promise<AdminGuardResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }
  if ((session.user as any).role !== "ADMIN") {
    return {
      session: null,
      error: NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      ),
    };
  }
  return { session, error: null };
}