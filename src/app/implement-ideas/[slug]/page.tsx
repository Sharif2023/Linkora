import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import RoadmapDetailClient from "@/components/RoadmapDetailClient";
import { IMPLEMENTATION_IDEAS } from "@/data/implement-ideas-data";
import { ImplementationIdeaData, IdeaResource } from "@/types/implement-ideas";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const idea = IMPLEMENTATION_IDEAS.find((i) => i.slug === params.slug);
  if (!idea) return { title: "Roadmap Not Found | Linkora" };
  return {
    title: `${idea.title} | Linkora Implement Ideas`,
    description: idea.outcome,
  };
}

export default async function ImplementIdeaDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let idea: ImplementationIdeaData | null = null;

  try {
    const dbIdea = await prisma.implementationIdea.findUnique({
      where: { slug: params.slug },
      include: {
        phases: {
          orderBy: { position: "asc" },
          include: {
            tasks: { orderBy: { position: "asc" } },
            resources: { orderBy: { position: "asc" } },
          },
        },
        actionPlans: {
          orderBy: { stepNumber: "asc" },
        },
      },
    });

    if (dbIdea) {
      idea = {
        id: dbIdea.id,
        title: dbIdea.title,
        slug: dbIdea.slug,
        category: dbIdea.category as ImplementationIdeaData["category"],
        difficulty: dbIdea.difficulty as ImplementationIdeaData["difficulty"],
        estimatedTime: dbIdea.estimatedTime,
        estimatedCost: dbIdea.estimatedCost,
        featured: dbIdea.featured,
        outcome: dbIdea.outcome,
        description: dbIdea.description || "",
        targetAudience: dbIdea.targetAudience || "",
        keywords: dbIdea.keywords || [],
        actionPlan: dbIdea.actionPlans.map((ap) => ({
          stepNumber: ap.stepNumber,
          title: ap.title,
          description: ap.description || "",
        })),
        phases: dbIdea.phases.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description || "",
          outcome: p.outcome || "",
          position: p.position,
          estimatedDuration: p.estimatedDuration || undefined,
          tasks: p.tasks.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description || "",
            position: t.position,
            isOptional: t.isOptional,
          })),
          resources: p.resources.map((r) => ({
            name: r.name,
            websiteUrl: r.websiteUrl,
            purpose: r.purpose || "",
            pricingModel: r.pricingModel as IdeaResource["pricingModel"],
            hasFreeTier: r.hasFreeTier,
            isEssential: r.isEssential,
            position: r.position,
          })),
        })),
      };
    }
  } catch (error) {
    console.warn("DB query error for single idea, falling back to static:", error);
  }

  if (!idea) {
    idea = IMPLEMENTATION_IDEAS.find((i) => i.slug === params.slug) || null;
  }

  if (!idea) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      <RoadmapDetailClient idea={idea} />
    </div>
  );
}
