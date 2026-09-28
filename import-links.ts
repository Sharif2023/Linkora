import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { linkCollections, CATEGORIES } from './src/data/links'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function importLinks() {
  console.log(`Starting import of ${CATEGORIES.length} categories and ${linkCollections.length} links...`)

  // 1. Import Categories
  const categoryMap = new Map<string, string>() // Maps category id (from links.ts) to database Category ID

  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue // Skip the "All" category

    const createdCat = await prisma.category.upsert({
      where: { slug: cat.id },
      update: { name: cat.label },
      create: {
        name: cat.label,
        slug: cat.id,
        description: cat.label
      }
    })
    categoryMap.set(cat.id, createdCat.id)
    console.log(`Upserted category: ${cat.label}`)
  }

  // 2. Import Links
  let count = 0
  for (const link of linkCollections) {
    try {
      const dbCategoryId = categoryMap.get(link.category)
      
      const resource = await prisma.resource.upsert({
        where: { url: link.url },
        update: {
          title: link.title,
          description: link.description,
          categoryId: dbCategoryId,
          status: 'ACTIVE'
        },
        create: {
          title: link.title,
          url: link.url,
          description: link.description,
          categoryId: dbCategoryId,
          pricingModel: 'Unknown',
          freeTier: false,
          status: 'ACTIVE'
        }
      })
      
      // Handle tags
      if (link.tags && link.tags.length > 0) {
        for (const tagName of link.tags) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-')
          const dbTag = await prisma.tag.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { name: tagName, slug: tagSlug }
          })
          
          // Connect tag to resource
          await prisma.resource.update({
            where: { id: resource.id },
            data: {
              tags: {
                connect: { id: dbTag.id }
              }
            }
          })
        }
      }
      
      count++
      if (count % 25 === 0) console.log(`Imported ${count}/${linkCollections.length} links...`)
    } catch (err) {
      console.error(`Failed to import link: ${link.url}`, err)
    }
  }

  console.log(`Successfully imported ${count} links into the Neon database!`)
}

importLinks()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
