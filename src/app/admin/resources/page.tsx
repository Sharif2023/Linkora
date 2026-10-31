import { prisma } from "@/lib/prisma";
import ResourcesTable from "./ResourcesTable";

export default async function AdminResourcesPage() {
  const [resources, categories] = await Promise.all([
    prisma.resource.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return <ResourcesTable initialResources={resources} categories={categories} />;
}