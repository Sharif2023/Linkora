import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { linkCollections, CATEGORIES } from './src/data/links'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function importLinks() {
  console.log(`Starting FAST import of 228 links...`)

  // 1. Get all categories
  const dbCategories = await prisma.category.findMany()
  const categoryMap = new Map<string, string>()
  
  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue
    const dbCat = dbCategories.find(c => c.slug === cat.id)
    if (dbCat) {
      categoryMap.set(cat.id, dbCat.id)
    }
  }

  // 2. Prepare Resources payload
  const existingResources = await prisma.resource.findMany({ select: { url: true } })
  const existingUrls = new Set(existingResources.map(r => r.url))

  const newResources = []
  
  for (const link of linkCollections) {
    if (existingUrls.has(link.url)) continue // skip duplicates
    
    const dbCategoryId = categoryMap.get(link.category)
    newResources.push({
      title: link.title,
      url: link.url,
      description: link.description,
      categoryId: dbCategoryId,
      pricingModel: 'Unknown',
      freeTier: false,
      status: 'ACTIVE'
    })
  }

  console.log(`Found ${newResources.length} new resources to insert.`)

  if (newResources.length > 0) {
    const res = await prisma.resource.createMany({
      data: newResources as any,
      skipDuplicates: true
    })
    console.log(`Successfully inserted ${res.count} resources!`)
  }
}

importLinks()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
