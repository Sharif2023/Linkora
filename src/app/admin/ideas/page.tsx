import { prisma } from "@/lib/prisma";
import IdeasTable from "./IdeasTable";

export default async function AdminIdeasPage() {
  const ideas = await prisma.implementationIdea.findMany({
    include: { _count: { select: { phases: true, savedItems: true, progress: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return <IdeasTable initialIdeas={ideas} />;
}