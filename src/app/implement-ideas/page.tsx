import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ImplementIdeasClient from "@/components/ImplementIdeasClient";
import { IMPLEMENTATION_IDEAS, CURATED_COLLECTIONS } from "@/data/implement-ideas-data";
import { ImplementationIdeaData, IdeaResource } from "@/types/implement-ideas";

export const metadata = {
  title: "Implement Ideas | Linkora",
  description: "Curated roadmaps, proven workflows, and step-by-step blueprints to turn your career and software ideas into reality.",
};

export default async function ImplementIdeasPage() {
  let ideas: ImplementationIdeaData[] = [];
  let totalCollections = CURATED_COLLECTIONS.length;

  try {
    const dbIdeas = await prisma.implementationIdea.findMany({
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
      orderBy: { createdAt: "asc" },
    });

    if (dbIdeas && dbIdeas.length > 0) {
      ideas = dbIdeas.map((dbIdea) => ({
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
      }));
    } else {
      ideas = IMPLEMENTATION_IDEAS;
    }

    const count = await prisma.curatedCollection.count();
    if (count > 0) totalCollections = count;
  } catch (error) {
    console.warn("Could not query DB for ideas, falling back to static dataset:", error);
    ideas = IMPLEMENTATION_IDEAS;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      <ImplementIdeasClient ideas={ideas} totalCollections={totalCollections} />
    </div>
  );
}
