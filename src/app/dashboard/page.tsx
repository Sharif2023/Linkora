import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import BookmarkList from "@/components/BookmarkList";
import { Bookmark, Folder, Rocket, Settings } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user's saved items (bookmarks) from DB
  const rawSavedItems = await prisma.savedItem.findMany({
    where: { userId: session.user.id },
    include: {
      resource: {
        include: {
          category: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const savedItems = rawSavedItems.map(item => ({
    id: item.id,
    title: item.resource?.title || "Unknown",
    url: item.resource?.url || "#",
    description: item.resource?.description || null,
    category: item.resource?.category?.name || null,
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Welcome back, {session.user.name || "User"}
          </h1>
          <p className="text-zinc-400 text-lg">
            Manage your personal intelligence workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 text-emerald-400 rounded-xl font-semibold border border-zinc-800 transition-colors">
              <Bookmark size={18} />
              All Bookmarks
            </Link>
            <Link href="/dashboard/roadmaps" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
              <Rocket size={18} />
              Active Roadmaps
            </Link>
            <Link href="/collections" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
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
              <BookmarkList initialItems={savedItems} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
