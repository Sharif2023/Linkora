import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Layers, Sparkles, Wrench } from "lucide-react";
import { CURATED_COLLECTIONS, IMPLEMENTATION_IDEAS } from "@/data/implement-ideas-data";
import IdeaCard from "@/components/IdeaCard";
import { CuratedCollectionData, ImplementationIdeaData } from "@/types/implement-ideas";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const col = CURATED_COLLECTIONS.find((c) => c.slug === params.slug);
  if (!col) return { title: "Collection Not Found | Linkora" };
  return {
    title: `${col.title} | Linkora Collections`,
    description: col.description,
  };
}

export default async function CollectionDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let collection: CuratedCollectionData | null = null;
  let associatedIdeas = IMPLEMENTATION_IDEAS.filter((idea) =>
    CURATED_COLLECTIONS.find((c) => c.slug === params.slug)?.items.some((item) => item.ideaSlug === idea.slug)
  );
  const toolItems = CURATED_COLLECTIONS.find((c) => c.slug === params.slug)?.items.filter((item) => item.resourceName) || [];

  try {
    const dbCol = await prisma.curatedCollection.findUnique({
      where: { slug: params.slug },
      include: {
        items: {
          include: {
            idea: {
              include: {
                phases: {
                  include: {
                    tasks: true,
                    resources: true,
                  },
                },
                actionPlans: true,
              },
            },
            resource: true,
          },
          orderBy: { position: "asc" },
        },
      },
    });

    if (dbCol) {
      collection = {
        id: dbCol.id,
        title: dbCol.title,
        slug: dbCol.slug,
        description: dbCol.description,
        category: dbCol.category || "Curated",
        featured: dbCol.featured,
        items: dbCol.items.map((it) => ({
          ideaSlug: it.idea?.slug,
          resourceName: it.resource?.title,
          position: it.position,
        })),
      };

      const dbIdeas = dbCol.items
        .map((it) => it.idea)
        .filter((item): item is NonNullable<typeof item> => Boolean(item));

      if (dbIdeas.length > 0) {
        associatedIdeas = dbIdeas.map((dbIdea) => ({
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
          actionPlan: (dbIdea.actionPlans || []).map((ap) => ({
            stepNumber: ap.stepNumber,
            title: ap.title,
            description: ap.description || "",
          })),
          phases: dbIdea.phases as unknown as ImplementationIdeaData["phases"],
        }));
      }
    }
  } catch {
    // Fall back to static dataset
  }

  if (!collection) {
    collection = CURATED_COLLECTIONS.find((c) => c.slug === params.slug) || null;
  }

  if (!collection) {
    notFound();
  }

  // Find other collections for related exploration
  const otherCollections = CURATED_COLLECTIONS.filter((c) => c.slug !== collection!.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 pb-24">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-black">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/collections"
            className="text-sm text-zinc-500 hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-medium mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to All Collections</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Sparkles size={12} />
            <span>{collection.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            {collection.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pt-14 space-y-16">
        {/* Associated Implementation Ideas */}
        {associatedIdeas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Layers size={22} className="text-emerald-400" />
              <span>Recommended Implementation Blueprints ({associatedIdeas.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {associatedIdeas.map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </div>
        )}

        {/* Grouped Curated Resources */}
        {toolItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Wrench size={22} className="text-teal-400" />
              <span>Core Tools in this Collection ({toolItems.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolItems.map((tool) => (
                <div
                  key={tool.resourceName}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between group hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {tool.resourceName}
                    </h3>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      {tool.resourceCategory || "Utility"}
                    </span>
                  </div>
                  <Link
                    href={`/explore?q=${encodeURIComponent(tool.resourceName || "")}`}
                    className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700 transition-colors"
                    title="Find in Explore directory"
                  >
                    <ExternalLink size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explore Related Collections */}
        <div className="pt-8 border-t border-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-6">Related Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCollections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group block"
              >
                <div className="text-xs font-bold text-emerald-400 mb-2">{col.category}</div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {col.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <span>View collection</span>
                  <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
