import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Bookmark, Folder, Settings, ExternalLink } from "lucide-react";
import CreateCollectionButton from "@/components/CreateCollectionButton";
import { prisma } from "@/lib/prisma";

export default async function CollectionsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const collections = await prisma.collection.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Your Collections
          </h1>
          <p className="text-zinc-400 text-lg">
            Organize your saved resources into custom collections.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
              <Bookmark size={18} />
              All Bookmarks
            </Link>
            <Link href="/collections" className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 text-emerald-400 rounded-xl font-semibold border border-zinc-800 transition-colors">
              <Folder size={18} />
              Collections
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
              <Settings size={18} />
              Settings
            </Link>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8 min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Collections</h2>
                
                <CreateCollectionButton variant="primary" />
              </div>

              {collections.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center h-64 bg-zinc-950/50 rounded-xl border border-zinc-800/50 border-dashed">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-500">
                    <Folder size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No collections yet</h3>
                  <p className="text-zinc-500 text-sm max-w-sm mb-6">
                    Collections help you group your bookmarks by project, topic, or whatever makes sense to you.
                  </p>
                  <CreateCollectionButton variant="secondary" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collections.map(col => (
                    <div key={col.id} className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Folder className="text-emerald-500" size={20} />
                        <h3 className="font-bold text-white text-lg">{col.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-500 mb-4">{col.outcome}</p>
                      <button className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                        View Items →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
