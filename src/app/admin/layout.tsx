import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { LayoutDashboard, Link2, Lightbulb, Shield } from "lucide-react";

export const metadata = { title: "Admin | Linkora" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if ((session.user as any).role !== "ADMIN") redirect("/dashboard");

  const nav = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/resources", label: "Links", icon: Link2 },
    { href: "/admin/ideas", label: "Ideas", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <header className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Console</h1>
            <p className="text-sm text-zinc-400">Signed in as {session.user.email}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-1 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </aside>
          <main className="lg:col-span-4">{children}</main>
        </div>
      </div>
    </div>
  );
}