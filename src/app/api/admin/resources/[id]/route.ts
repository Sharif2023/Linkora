import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { z } from "zod";

const ResourceUpdate = z.object({
  title: z.string().min(1).max(200).optional(),
  url: z.string().url().optional(),
  description: z.string().min(1).optional(),
  logo: z.string().url().nullable().optional(),
  categoryId: z.string().nullable().optional(),
  pricingModel: z.string().nullable().optional(),
  freeTier: z.boolean().optional(),
  payoutMethods: z.string().nullable().optional(),
  minPayout: z.number().nullable().optional(),
  supportedCountries: z.string().nullable().optional(),
  fees: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "BROKEN"]).optional(),
  score: z.number().min(0).max(5).optional(),
  affiliateDisclosure: z.string().nullable().optional(),
});

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await ctx.params;
  const resource = await prisma.resource.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!resource) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ resource });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await ctx.params;
  try {
    const data = ResourceUpdate.parse(await req.json());
    const resource = await prisma.resource.update({
      where: { id },
      data,
      include: { category: true },
    });
    revalidatePath("/explore");
    revalidatePath("/collections");
    revalidatePath(`/resource/${id}`);
    
    return NextResponse.json({ resource });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ message: e.issues[0]?.message || "Invalid input" }, { status: 400 });
    }
    if (e?.code === "P2025") {
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
    }
    if (e?.code === "P2002") {
      return NextResponse.json({ message: "A resource with this URL already exists" }, { status: 409 });
    }
    console.error("Admin update resource error:", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await ctx.params;
  try {
    await prisma.resource.delete({ where: { id } });
    return NextResponse.json({ message: "Resource deleted" });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return NextResponse.json({ message: "Resource not found" }, { status: 404 });
    }
    console.error("Admin delete resource error:", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}