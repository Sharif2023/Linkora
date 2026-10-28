import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import ExploreClient from '@/components/ExploreClient'

export const metadata = {
  title: 'Explore | Linkora',
  description: 'Discover outcome-based stacks and tools.',
}

import { linkCollections, CATEGORIES } from '@/data/links'

export default async function ExplorePage() {
  let categories: any[] = []
  let resources: any[] = []

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    resources = await prisma.resource.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.warn("DB query failed in ExplorePage, using static fallback:", error)
  }

  // Fallback if DB is unavailable or has fewer than 50 items
  if (!resources || resources.length < 50) {
    const catMap = new Map()
    CATEGORIES.filter((c) => c.id !== 'all').forEach((c, idx) => {
      catMap.set(c.id, {
        id: `static-cat-${idx}`,
        name: c.label,
        slug: c.id,
        description: null,
        icon: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })

    categories = Array.from(catMap.values())

    resources = linkCollections.map((link, idx) => {
      const cat = catMap.get(link.category) || null
      return {
        id: `static-res-${idx}`,
        title: link.title,
        url: link.url,
        description: link.description,
        banglaDescription: link.banglaDescription || null,
        pricingModel: 'Freemium',
        tags: link.tags || [],
        categoryId: cat ? cat.id : null,
        category: cat,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      <ExploreClient categories={categories} resources={resources} />
    </div>
  )
}
