import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

// ─── Input schema (same shape as POST) ─────────────────────────────────────
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
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
    title: z.string().min(1).optional(),
    outcome: z.string().min(1).optional(),
    description: z.string().optional(),
    targetAudience: z.string().optional(),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
    estimatedTime: z.string().min(1).optional(),
    estimatedCost: z.string().min(1).optional(),
    category: z.enum([
        "Creator Economy",
        "SaaS & Startups",
        "Freelancing & Business",
        "Content & Media",
        "Digital Products",
    ]).optional(),
    featured: z.boolean().optional(),
    status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).optional(),
    keywords: z.array(z.string()).optional(),
    actionPlans: z.array(ActionPlanInput).optional(),
    phases: z.array(PhaseInput).optional(),
});
type IdeaUpdate = z.infer<typeof IdeaInput>;

// ─── Nested reconciliation helpers ────────────────────────────────────────
async function syncActionPlans(
    tx: Prisma.TransactionClient,
    ideaId: string,
    incoming: NonNullable<IdeaUpdate["actionPlans"]>
) {
    const existing = await tx.ideaActionPlan.findMany({ where: { ideaId } });
    const incomingIds = new Set(incoming.map((a) => a.id).filter(Boolean));

    const toDelete = existing.filter((e) => !incomingIds.has(e.id));
    if (toDelete.length) {
        await tx.ideaActionPlan.deleteMany({ where: { id: { in: toDelete.map((d) => d.id) } } });
    }

    for (let i = 0; i < incoming.length; i++) {
        const ap = incoming[i];
        const data = { stepNumber: i + 1, title: ap.title, description: ap.description };
        if (ap.id && existing.find((e) => e.id === ap.id)) {
            await tx.ideaActionPlan.update({ where: { id: ap.id }, data });
        } else {
            await tx.ideaActionPlan.create({ data: { ...data, ideaId } });
        }
    }
}

async function syncTasks(
    tx: Prisma.TransactionClient,
    phaseId: string,
    incoming: NonNullable<IdeaUpdate["phases"]>[number]["tasks"]
) {
    const existing = await tx.implementationTask.findMany({ where: { phaseId } });
    const incomingIds = new Set(incoming.map((t) => t.id).filter(Boolean));

    const toDelete = existing.filter((e) => !incomingIds.has(e.id));
    if (toDelete.length) {
        await tx.implementationTask.deleteMany({ where: { id: { in: toDelete.map((d) => d.id) } } });
    }

    for (let i = 0; i < incoming.length; i++) {
        const t = incoming[i];
        const data = {
            title: t.title,
            description: t.description,
            isOptional: t.isOptional,
            position: i + 1,
        };
        if (t.id && existing.find((e) => e.id === t.id)) {
            await tx.implementationTask.update({ where: { id: t.id }, data });
        } else {
            await tx.implementationTask.create({ data: { ...data, phaseId } });
        }
    }
}

async function syncPhaseResources(
    tx: Prisma.TransactionClient,
    phaseId: string,
    incoming: NonNullable<IdeaUpdate["phases"]>[number]["resources"]
) {
    const existing = await tx.phaseResource.findMany({ where: { phaseId } });
    const incomingIds = new Set(incoming.map((r) => r.id).filter(Boolean));

    const toDelete = existing.filter((e) => !incomingIds.has(e.id));
    if (toDelete.length) {
        await tx.phaseResource.deleteMany({ where: { id: { in: toDelete.map((d) => d.id) } } });
    }

    for (let i = 0; i < incoming.length; i++) {
        const r = incoming[i];
        const data = {
            name: r.name,
            websiteUrl: r.websiteUrl,
            purpose: r.purpose,
            pricingModel: r.pricingModel,
            hasFreeTier: r.hasFreeTier,
            isEssential: r.isEssential,
            position: i + 1,
        };
        if (r.id && existing.find((e) => e.id === r.id)) {
            await tx.phaseResource.update({ where: { id: r.id }, data });
        } else {
            await tx.phaseResource.create({ data: { ...data, phaseId } });
        }
    }
}

async function syncPhases(
    tx: Prisma.TransactionClient,
    ideaId: string,
    incoming: NonNullable<IdeaUpdate["phases"]>
) {
    const existing = await tx.implementationPhase.findMany({ where: { ideaId } });
    const incomingIds = new Set(incoming.map((p) => p.id).filter(Boolean));

    const toDelete = existing.filter((e) => !incomingIds.has(e.id));
    if (toDelete.length) {
        await tx.implementationPhase.deleteMany({ where: { id: { in: toDelete.map((d) => d.id) } } });
    }

    for (let i = 0; i < incoming.length; i++) {
        const p = incoming[i];
        const data = {
            title: p.title,
            description: p.description,
            outcome: p.outcome,
            estimatedDuration: p.estimatedDuration,
            position: i + 1,
        };
        let phaseId: string;
        if (p.id && existing.find((e) => e.id === p.id)) {
            await tx.implementationPhase.update({ where: { id: p.id }, data });
            phaseId = p.id;
        } else {
            const created = await tx.implementationPhase.create({ data: { ...data, ideaId } });
            phaseId = created.id;
        }
        await syncTasks(tx, phaseId, p.tasks);
        await syncPhaseResources(tx, phaseId, p.resources);
    }
}

// ─── Routes ───────────────────────────────────────────────────────────────
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
    const { error } = await requireAdmin();
    if (error) return error;
    const { id } = await ctx.params;

    const idea = await prisma.implementationIdea.findUnique({
        where: { id },
        include: {
            phases: {
                orderBy: { position: "asc" },
                include: {
                    tasks: { orderBy: { position: "asc" } },
                    resources: { orderBy: { position: "asc" } },
                },
            },
            actionPlans: { orderBy: { stepNumber: "asc" } },
        },
    });

    if (!idea) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ idea });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
    const { error } = await requireAdmin();
    if (error) return error;
    const { id } = await ctx.params;

    try {
        const data = IdeaInput.parse(await req.json());

        const updated = await prisma.$transaction(async (tx) => {
            const { actionPlans, phases, ...scalarFields } = data;

            if (Object.keys(scalarFields).length) {
                await tx.implementationIdea.update({ where: { id }, data: scalarFields });
            }
            if (actionPlans) await syncActionPlans(tx, id, actionPlans);
            if (phases) await syncPhases(tx, id, phases);

            return tx.implementationIdea.findUnique({
                where: { id },
                include: {
                    phases: {
                        orderBy: { position: "asc" },
                        include: {
                            tasks: { orderBy: { position: "asc" } },
                            resources: { orderBy: { position: "asc" } },
                        },
                    },
                    actionPlans: { orderBy: { stepNumber: "asc" } },
                },
            });
        }, {
            maxWait: 15000, // Wait up to 15 seconds for a connection to Neon
            timeout: 30000  // Allow the update to run for up to 30 seconds
        });
        revalidatePath("/implement-ideas");
        revalidatePath(`/implement-ideas/${updated?.slug}`);
        revalidatePath("/dashboard/roadmaps");
        revalidatePath("/collections");

        return NextResponse.json({ idea: updated });
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            return NextResponse.json(
                { message: e.issues[0]?.message || "Invalid input", issues: e.issues },
                { status: 400 }
            );
        }
        if (e?.code === "P2025") return NextResponse.json({ message: "Idea not found" }, { status: 404 });
        if (e?.code === "P2002") return NextResponse.json({ message: "Slug already exists" }, { status: 409 });

        console.error("Admin update idea error:", e);

        // We now return the exact Prisma error to the frontend!
        return NextResponse.json({
            message: e.message || "Internal server error",
            code: e.code
        }, { status: 500 });
    }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
    const { error } = await requireAdmin();
    if (error) return error;
    const { id } = await ctx.params;

    try {
        await prisma.implementationIdea.delete({ where: { id } });
        return NextResponse.json({ message: "Idea deleted" });
    } catch (e: any) {
        if (e?.code === "P2025") return NextResponse.json({ message: "Idea not found" }, { status: 404 });
        console.error("Admin delete idea error:", e);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}