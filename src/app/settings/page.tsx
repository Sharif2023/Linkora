import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Bookmark, Folder, Settings, User, Lock } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import PasswordForm from "@/components/PasswordForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Settings & Profile
          </h1>
          <p className="text-zinc-400 text-lg">
            Manage your account details and preferences.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
              <Bookmark size={18} />
              All Bookmarks
            </Link>
            <Link href="/collections" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900/50 text-zinc-400 hover:text-white rounded-xl font-medium transition-colors">
              <Folder size={18} />
              Collections
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 text-emerald-400 rounded-xl font-semibold border border-zinc-800 transition-colors">
              <Settings size={18} />
              Settings
            </Link>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
                <User size={20} className="text-emerald-500" /> Personal Information
              </h2>
              
              <div className="max-w-md">
                <ProfileForm initialName={user.name || ""} initialEmail={user.email || ""} />
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
                <Lock size={20} className="text-emerald-500" /> Security
              </h2>
              
              <div className="max-w-md">
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
