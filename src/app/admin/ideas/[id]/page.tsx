import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import IdeaForm from "@/app/admin/ideas/IdeaForm"; 

export default async function EditIdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = await prisma.implementationIdea.findUnique({
    where: { id },
    include: {
      phases: {
        orderBy: { position: "asc" },
        include: {
          tasks: { orderBy: { position: "asc" } },
          resources: { orderBy: { position: "asc" } },
        },
      },
      actionPlans: { orderBy: { stepNumber: "asc" } },
    },
  });
  if (!idea) notFound();
  return <IdeaForm mode="edit" initialIdea={idea} />;
}