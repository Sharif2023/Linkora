import { prisma } from "@/lib/prisma";
import { Link2, Lightbulb, Layers, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const [resourceCount, ideaCount, phaseCount, userCount, categoryCount] = await Promise.all([
    prisma.resource.count(),
    prisma.implementationIdea.count(),
    prisma.implementationPhase.count(),
    prisma.user.count(),
    prisma.category.count(),
  ]);

  const cards = [
    { label: "Resources (Links)", value: resourceCount, href: "/admin/resources", icon: Link2 },
    { label: "Implementation Ideas", value: ideaCount, href: "/admin/ideas", icon: Lightbulb },
    { label: "Phases", value: phaseCount, href: "/admin/ideas", icon: Layers },
    { label: "Categories", value: categoryCount, href: "/admin/resources", icon: Layers },
    { label: "Users", value: userCount, href: "#", icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map(({ label, value, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl hover:border-emerald-500/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-4">
            <Icon size={18} />
          </div>
          <div className="text-4xl font-extrabold">{value}</div>
          <div className="text-sm text-zinc-400 mt-1">{label}</div>
        </Link>
      ))}
    </div>
  );
}