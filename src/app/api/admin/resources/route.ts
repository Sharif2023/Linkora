import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { z } from "zod";

const ResourceInput = z.object({
  title: z.string().min(1).max(200),
  url: z.string().url(),
  description: z.string().min(1),
  logo: z.string().url().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  pricingModel: z.string().optional().nullable(),
  freeTier: z.boolean().optional(),
  payoutMethods: z.string().optional().nullable(),
  minPayout: z.number().optional().nullable(),
  supportedCountries: z.string().optional().nullable(),
  fees: z.string().optional().nullable(),
  currency: z.string().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "BROKEN"]).optional(),
  score: z.number().min(0).max(5).optional(),
  affiliateDisclosure: z.string().optional().nullable(),
});

export async function GET(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const categoryId = searchParams.get("categoryId");
  const status = searchParams.get("status");

  const resources = await prisma.resource.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { url: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(status ? { status } : {}),
    },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ resources });
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const data = ResourceInput.parse(await req.json());
    const resource = await prisma.resource.create({
      data: {
        ...data,
        freeTier: data.freeTier ?? false,
        score: data.score ?? 0,
      },
      include: { category: true },
    });
    return NextResponse.json({ resource }, { status: 201 });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { message: e.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    if (e?.code === "P2002") {
      return NextResponse.json(
        { message: "A resource with this URL already exists" },
        { status: 409 }
      );
    }
    console.error("Admin create resource error:", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}