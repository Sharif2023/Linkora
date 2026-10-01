import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import CollectionCard from "@/components/CollectionCard";
import { CURATED_COLLECTIONS } from "@/data/implement-ideas-data";
import { Sparkles, Layers, FolderHeart } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Creative Collections | Linkora",
  description: "Themed groups of curated resources and implementation blueprints organized by outcome.",
};

export default async function CollectionsDirectoryPage() {
  const session = await getServerSession(authOptions);
  let collections = CURATED_COLLECTIONS;

  try {
    const dbCollections = await prisma.curatedCollection.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (dbCollections && dbCollections.length > 0) {
      collections = dbCollections.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        category: c.category || "Curated",
        featured: c.featured,
        items: c.items.map((item) => ({
          ideaSlug: undefined,
          position: item.position,
        })),
      }));
    }
  } catch {
    collections = CURATED_COLLECTIONS;
  }

  // Also query count of user personal collections if logged in
  let userPersonalCollectionCount = 0;
  if (session?.user) {
    try {
      userPersonalCollectionCount = await prisma.collection.count({
        where: { userId: session.user.id },
      });
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 pb-24">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-black text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles size={14} />
            <span>OUTCOME-BASED DISCOVERY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Curated <span className="text-emerald-500">Collections</span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Explore themed toolkits and execution roadmaps grouped by real-world goals—find the exact combination of tools you need without guessing.
          </p>

          {session?.user && userPersonalCollectionCount > 0 && (
            <div className="inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
              <FolderHeart size={14} className="text-emerald-400" />
              <span>You have {userPersonalCollectionCount} personal collection(s).</span>
              <Link href="/dashboard" className="text-emerald-400 hover:underline font-semibold ml-1">
                View in Dashboard →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers size={22} className="text-emerald-400" />
            <span>High-Intent Collections ({collections.length})</span>
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            Vetted for real utility
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <CollectionCard key={col.slug} collection={col} />
          ))}
        </div>
      </main>
    </div>
  );
}
