import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Bookmark, Folder, Rocket, Settings, ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Active Roadmaps | Linkora Dashboard",
  description: "Track and resume your in-progress implementation roadmaps.",
};

export default async function DashboardRoadmapsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user's active idea progress
  const startedIdeas = await prisma.userIdeaProgress.findMany({
    where: { userId: session.user.id },
    include: {
      idea: {
        include: {
          phases: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const completedTasks = await prisma.userTaskProgress.findMany({
    where: {
      userId: session.user.id,
      completed: true,
    },
    select: { taskId: true },
  });

  const completedTaskIds = new Set(completedTasks.map((t) => t.taskId));

  const roadmapsWithProgress = startedIdeas.map((prog) => {
    const allTasks = prog.idea.phases.flatMap((p) => p.tasks);
    const completedCount = allTasks.filter((t) => completedTaskIds.has(t.id)).length;
    const percent = allTasks.length > 0 ? (completedCount / allTasks.length) * 100 : 0;
    return {
      idea: prog.idea,
      completedCount,
      totalCount: allTasks.length,
      percent: Math.round(percent),
      updatedAt: prog.updatedAt,
    };
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Active Implementation Plans
          </h1>
          <p className="text-zinc-400 text-lg">
            Track your milestones and resume your execution blueprints.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors"
            >
              <Bookmark size={18} />
              All Bookmarks
            </Link>
            <Link
              href="/dashboard/roadmaps"
              className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 text-emerald-400 rounded-xl font-semibold border border-zinc-800 transition-colors"
            >
              <Rocket size={18} />
              Active Roadmaps
            </Link>
            <Link
              href="/implement-ideas"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors"
            >
              <Folder size={18} />
              Explore Ideas
            </Link>
            <Link
              href="/settings"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors"
            >
              <Settings size={18} />
              Settings
            </Link>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8 min-h-[500px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Rocket size={20} className="text-emerald-400" />
                  <span>Your In-Progress Blueprints ({roadmapsWithProgress.length})</span>
                </h2>
                <Link
                  href="/implement-ideas"
                  className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore All Blueprints</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {roadmapsWithProgress.length > 0 ? (
                <div className="space-y-6">
                  {roadmapsWithProgress.map((item) => (
                    <div
                      key={item.idea.id}
                      className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {item.idea.category}
                          </span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Clock size={12} /> {item.idea.estimatedTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.idea.title}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {item.idea.outcome}
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 max-w-xs bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-emerald-400">
                            {item.percent}% ({item.completedCount}/{item.totalCount} tasks)
                          </span>
                        </div>
                      </div>

                      <div>
                        <Link href={`/implement-ideas/${item.idea.slug}`}>
                          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-emerald-500/10 whitespace-nowrap">
                            <span>Resume</span>
                            <ArrowRight size={15} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                    <Rocket size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No active roadmaps yet</h3>
                  <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                    Choose a blueprint from Implement Ideas to begin your step-by-step roadmap.
                  </p>
                  <Link href="/implement-ideas">
                    <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all">
                      Browse Implement Ideas
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
