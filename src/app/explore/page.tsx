import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import ExploreClient from '@/components/ExploreClient'

export const metadata = {
  title: 'Explore | Linkora',
  description: 'Discover outcome-based stacks and tools.',
}

export default async function ExplorePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })

  const resources = await prisma.resource.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      <ExploreClient categories={categories} resources={resources} />
    </div>
  )
}
