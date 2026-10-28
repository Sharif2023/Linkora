import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import { CATEGORIES, linkCollections } from '../src/data/links';

async function seedLinks() {
  console.log('--- Starting Linkora Full Links Sync ---');
  console.log(`Total categories in links.ts: ${CATEGORIES.length - 1}`);
  console.log(`Total links in links.ts: ${linkCollections.length}`);

  // 1. Upsert all categories
  const categoryMap = new Map<string, string>(); // slug -> id

  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue;

    const upserted = await prisma.category.upsert({
      where: { slug: cat.id },
      update: { name: cat.label },
      create: {
        slug: cat.id,
        name: cat.label,
        description: cat.label,
      },
    });
    categoryMap.set(cat.id, upserted.id);
  }

  // Also ensure alias slugs like testing-developer-utilities or ai-companions-personal-assistance work
  const aliases: Record<string, string> = {
    'testing-developer-utilities': 'testing-dev-utilities',
    'ai-companions-personal-assistance': 'ai-companions',
    'miscellaneous-useful-tools': 'miscellaneous-tools',
  };

  for (const [aliasSlug, targetSlug] of Object.entries(aliases)) {
    const targetId = categoryMap.get(targetSlug);
    if (targetId) {
      const aliasCat = await prisma.category.upsert({
        where: { slug: aliasSlug },
        update: {},
        create: {
          slug: aliasSlug,
          name: CATEGORIES.find(c => c.id === targetSlug)?.label || aliasSlug,
          description: aliasSlug,
        },
      });
      categoryMap.set(aliasSlug, aliasCat.id);
    }
  }

  console.log(`Upserted ${categoryMap.size} categories.`);

  // 2. Upsert all links
  let createdCount = 0;
  let updatedCount = 0;
  const seenUrls = new Set<string>();

  for (const link of linkCollections) {
    if (!link.url || seenUrls.has(link.url)) continue;
    seenUrls.add(link.url);

    const catId = categoryMap.get(link.category) || undefined;

    try {
      const existing = await prisma.resource.findUnique({
        where: { url: link.url },
      });

      if (existing) {
        await prisma.resource.update({
          where: { url: link.url },
          data: {
            title: link.title,
            description: link.description,
            categoryId: catId || existing.categoryId,
            status: 'ACTIVE',
          },
        });
        updatedCount++;
      } else {
        await prisma.resource.create({
          data: {
            title: link.title,
            url: link.url,
            description: link.description,
            categoryId: catId,
            pricingModel: 'Freemium',
            freeTier: true,
            status: 'ACTIVE',
            score: 4.8,
            metadata: link.banglaDescription
              ? {
                  create: {
                    banglaDescription: link.banglaDescription,
                  },
                }
              : undefined,
          },
        });
        createdCount++;
      }
    } catch (err: any) {
      console.warn(`Error seeding link "${link.title}" (${link.url}):`, err.message);
    }
  }

  const finalCount = await prisma.resource.count();
  console.log(`--- Sync Finished ---`);
  console.log(`Created: ${createdCount}, Updated: ${updatedCount}`);
  console.log(`Total Resources in DB now: ${finalCount}`);
}

seedLinks()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
