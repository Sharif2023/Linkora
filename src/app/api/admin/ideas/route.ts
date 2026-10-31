import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { z } from "zod";

const TaskInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  isOptional: z.boolean().optional().default(false),
});

const ResourceInput = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  websiteUrl: z.string().url(),
  purpose: z.string().optional().default(""),
  pricingModel: z.enum(["Free", "Freemium", "Paid"]),
  hasFreeTier: z.boolean().optional().default(false),
  isEssential: z.boolean().optional().default(true),
});

const PhaseInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional().default(""),
  outcome: z.string().optional().default(""),
  estimatedDuration: z.string().optional().default(""),
  tasks: z.array(TaskInput).default([]),
  resources: z.array(ResourceInput).default([]),
});

const ActionPlanInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional().default(""),
});

const IdeaInput = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  outcome: z.string().min(1),
  description: z.string().optional().default(""),
  targetAudience: z.string().optional().default(""),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedTime: z.string().min(1),
  estimatedCost: z.string().min(1),
  category: z.enum([
    "Creator Economy",
    "SaaS & Startups",
    "Freelancing & Business",
    "Content & Media",
    "Digital Products",
  ]),
  featured: z.boolean().optional().default(false),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).optional().default("PUBLISHED"),
  keywords: z.array(z.string()).default([]),
  actionPlans: z.array(ActionPlanInput).default([]),
  phases: z.array(PhaseInput).default([]),
});

export async function GET(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  const ideas = await prisma.implementationIdea.findMany({
    where: q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { slug: { contains: q, mode: "insensitive" } },
            { outcome: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      _count: { select: { phases: true, savedItems: true, progress: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ ideas });
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const data = IdeaInput.parse(await req.json());

    const idea = await prisma.implementationIdea.create({
      data: {
        slug: data.slug,
        title: data.title,
        outcome: data.outcome,
        description: data.description,
        targetAudience: data.targetAudience,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        estimatedCost: data.estimatedCost,
        category: data.category,
        featured: data.featured,
        status: data.status,
        keywords: data.keywords,
        actionPlans: {
          create: data.actionPlans.map((ap, i) => ({
            stepNumber: i + 1,
            title: ap.title,
            description: ap.description,
          })),
        },
        phases: {
          create: data.phases.map((p, pi) => ({
            title: p.title,
            description: p.description,
            outcome: p.outcome,
            estimatedDuration: p.estimatedDuration,
            position: pi + 1,
            tasks: {
              create: p.tasks.map((t, ti) => ({
                title: t.title,
                description: t.description,
                isOptional: t.isOptional,
                position: ti + 1,
              })),
            },
            resources: {
              create: p.resources.map((r, ri) => ({
                name: r.name,
                websiteUrl: r.websiteUrl,
                purpose: r.purpose,
                pricingModel: r.pricingModel,
                hasFreeTier: r.hasFreeTier,
                isEssential: r.isEssential,
                position: ri + 1,
              })),
            },
          })),
        },
      },
      include: {
        phases: { include: { tasks: true, resources: true }, orderBy: { position: "asc" } },
        actionPlans: { orderBy: { stepNumber: "asc" } },
      },
    });

    revalidatePath("/implement-ideas");
    revalidatePath("/collections");

    return NextResponse.json({ idea }, { status: 201 });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { message: e.issues[0]?.message || "Invalid input", issues: e.issues },
        { status: 400 }
      );
    }
    if (e?.code === "P2002") {
      return NextResponse.json({ message: "An idea with this slug already exists" }, { status: 409 });
    }
    console.error("Admin create idea error:", e);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}