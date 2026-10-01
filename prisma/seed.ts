import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { IMPLEMENTATION_IDEAS, CURATED_COLLECTIONS } from '../src/data/implement-ideas-data'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database with high-intent collections & implementation ideas...')

  // 1. Clear existing data (optional but good for clean seed)
  await prisma.curatedCollectionItem.deleteMany()
  await prisma.curatedCollection.deleteMany()
  await prisma.phaseResource.deleteMany()
  await prisma.userTaskProgress.deleteMany()
  await prisma.userIdeaProgress.deleteMany()
  await prisma.implementationTask.deleteMany()
  await prisma.implementationPhase.deleteMany()
  await prisma.ideaActionPlan.deleteMany()
  await prisma.implementationIdea.deleteMany()
  await prisma.collectionStep.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.resourceMetadata.deleteMany()
  await prisma.resource.deleteMany()
  await prisma.category.deleteMany()
  await prisma.tag.deleteMany()

  // 2. Create Categories
  const categoryWork = await prisma.category.create({
    data: { name: 'Remote Work', slug: 'remote-work', description: 'Tools and sites for remote working and earning.' }
  })
  
  const categoryBusiness = await prisma.category.create({
    data: { name: 'Small Business', slug: 'small-business', description: 'Resources to start and run a business.' }
  })
  
  const categoryDev = await prisma.category.create({
    data: { name: 'Development', slug: 'development', description: 'Tools for developers and indie hackers.' }
  })

  const categoryAI = await prisma.category.create({
    data: { name: 'Artificial Intelligence', slug: 'ai', description: 'AI tools and models.' }
  })

  const categoryCreator = await prisma.category.create({
    data: { name: 'Creator & Media', slug: 'creator-media', description: 'Tools for YouTubers, video editors, and audio creators.' }
  })

  // 3. Create Resources
  const weworkremotely = await prisma.resource.create({
    data: {
      title: 'We Work Remotely',
      url: 'https://weworkremotely.com',
      description: 'The largest remote work community in the world.',
      category: { connect: { id: categoryWork.id } },
      pricingModel: 'Free for seekers',
      freeTier: true,
      payoutMethods: 'Bank Transfer, PayPal (depends on company)',
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.8
    }
  })

  const remoteok = await prisma.resource.create({
    data: {
      title: 'Remote OK',
      url: 'https://remoteok.com',
      description: 'Find a remote job and work from anywhere.',
      category: { connect: { id: categoryWork.id } },
      pricingModel: 'Free for seekers',
      freeTier: true,
      payoutMethods: 'Varies',
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.7
    }
  })

  const stripeAtlas = await prisma.resource.create({
    data: {
      title: 'Stripe Atlas',
      url: 'https://stripe.com/atlas',
      description: 'A powerful, safe, and easy-to-use platform for forming a company.',
      category: { connect: { id: categoryBusiness.id } },
      pricingModel: 'Paid',
      freeTier: false,
      supportedCountries: 'Global (US Company)',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.9
    }
  })

  const supabase = await prisma.resource.create({
    data: {
      title: 'Supabase',
      url: 'https://supabase.com',
      description: 'The open source Firebase alternative.',
      category: { connect: { id: categoryDev.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.8
    }
  })

  const vercel = await prisma.resource.create({
    data: {
      title: 'Vercel',
      url: 'https://vercel.com',
      description: 'Develop. Preview. Ship. For the best frontend teams.',
      category: { connect: { id: categoryDev.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.9
    }
  })

  const chatgpt = await prisma.resource.create({
    data: {
      title: 'ChatGPT',
      url: 'https://chat.openai.com',
      description: 'State-of-the-art AI assistant by OpenAI.',
      category: { connect: { id: categoryAI.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Most countries',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.9
    }
  })

  const claude = await prisma.resource.create({
    data: {
      title: 'Claude',
      url: 'https://claude.ai',
      description: 'Next-generation AI assistant based on research into training honest and harmless AI systems.',
      category: { connect: { id: categoryAI.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Most countries',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.8
    }
  })

  const plausible = await prisma.resource.create({
    data: {
      title: 'Plausible Analytics',
      url: 'https://plausible.io',
      description: 'Simple and privacy-friendly Google Analytics alternative.',
      category: { connect: { id: categoryBusiness.id } },
      pricingModel: 'Paid',
      freeTier: false,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.7
    }
  })

  const canva = await prisma.resource.create({
    data: {
      title: 'Canva',
      url: 'https://canva.com',
      description: 'Design high-converting YouTube thumbnails, channel banners, and visual assets with ready-to-use templates.',
      category: { connect: { id: categoryCreator.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.9
    }
  })

  const davinci = await prisma.resource.create({
    data: {
      title: 'DaVinci Resolve',
      url: 'https://www.blackmagicdesign.com/products/davinciresolve',
      description: 'Hollywood-grade, professional free video editing, color grading, audio post-production, and visual effects.',
      category: { connect: { id: categoryCreator.id } },
      pricingModel: 'Free (Pro Studio available)',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 5.0
    }
  })

  const obs = await prisma.resource.create({
    data: {
      title: 'OBS Studio',
      url: 'https://obsproject.com',
      description: 'Free and open source software for video recording and live streaming on Windows, Mac, and Linux.',
      category: { connect: { id: categoryCreator.id } },
      pricingModel: 'Free',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.9
    }
  })

  const vidiq = await prisma.resource.create({
    data: {
      title: 'VidIQ',
      url: 'https://vidiq.com',
      description: 'AI-driven YouTube SEO, keyword research, tag suggestions, competitor tracking, and daily viral video ideas.',
      category: { connect: { id: categoryCreator.id } },
      pricingModel: 'Freemium',
      freeTier: true,
      supportedCountries: 'Global',
      verificationDate: new Date(),
      status: 'ACTIVE',
      score: 4.8
    }
  })


  // 4. Create Collections
  // Collection 1: USD remote jobs
  await prisma.collection.create({
    data: {
      title: 'Sites That Pay in USD for Remote Jobs',
      slug: 'usd-remote-jobs',
      outcome: 'Find remote jobs paying in USD from anywhere in the world.',
      audience: 'Global Job Seekers, Developers, Designers',
      constraints: 'Requires internet connection, English proficiency',
      difficulty: 'Intermediate',
      timeToResult: '2-4 weeks',
      cost: '$0',
      actionPlan: '1. Update your resume. 2. Apply to 5 jobs a day on these platforms. 3. Prepare for async interviews.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: 'Browse We Work Remotely', description: 'Check daily for new listings in your category.', resourceId: weworkremotely.id },
          { order: 2, title: 'Check Remote OK', description: 'Filter by non-US if you live outside the US.', resourceId: remoteok.id }
        ]
      }
    }
  })

  // Collection 2: Small business starter stack
  await prisma.collection.create({
    data: {
      title: 'Small Business Starter Stack',
      slug: 'small-business-starter-stack',
      outcome: 'Legally incorporate and set up basic infrastructure for a small business.',
      audience: 'Entrepreneurs, Small Business Owners',
      constraints: 'Requires some initial capital',
      difficulty: 'Beginner',
      timeToResult: '1-2 weeks',
      cost: '~$550',
      actionPlan: '1. Incorporate using Stripe Atlas. 2. Setup domain and email. 3. Setup privacy-focused analytics.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: 'Incorporate', description: 'Use Stripe Atlas to form a US LLC or C-Corp.', resourceId: stripeAtlas.id },
          { order: 2, title: 'Analytics', description: 'Set up Plausible to track visitors without cookies.', resourceId: plausible.id }
        ]
      }
    }
  })

  // Collection 3: Free alternatives to expensive SaaS
  await prisma.collection.create({
    data: {
      title: 'Free Alternatives to Expensive SaaS',
      slug: 'free-saas-alternatives',
      outcome: 'Run your operations without paying high monthly SaaS fees.',
      audience: 'Bootstrapped founders, Non-profits',
      constraints: 'May require self-hosting or dealing with lower limits',
      difficulty: 'Intermediate',
      timeToResult: 'Immediate',
      cost: '$0',
      actionPlan: 'Review each tool and migrate your data gradually.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: 'Database & Auth', description: 'Use Supabase instead of Firebase or paid DB hosts.', resourceId: supabase.id }
        ]
      }
    }
  })

  // Collection 4: Indie hacker launch stack
  await prisma.collection.create({
    data: {
      title: 'Indie Hacker Launch Stack',
      slug: 'indie-hacker-launch-stack',
      outcome: 'Build and launch a product in a weekend.',
      audience: 'Indie Hackers, Solo Developers',
      constraints: 'Requires coding knowledge',
      difficulty: 'Intermediate',
      timeToResult: '2 days',
      cost: '$0 to start',
      actionPlan: '1. Spin up Next.js app on Vercel. 2. Connect Supabase for DB. 3. Launch.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: 'Frontend Hosting', description: 'Deploy your Next.js app on Vercel.', resourceId: vercel.id },
          { order: 2, title: 'Backend & DB', description: 'Use Supabase for your Postgres database.', resourceId: supabase.id }
        ]
      }
    }
  })

  // Collection 5: AI tools with real free tiers
  await prisma.collection.create({
    data: {
      title: 'AI Tools With Real Free Tiers',
      slug: 'ai-tools-real-free-tiers',
      outcome: 'Leverage powerful AI without paying a monthly subscription.',
      audience: 'Students, Creators, Developers',
      constraints: 'Usage limits apply on free tiers',
      difficulty: 'Beginner',
      timeToResult: 'Immediate',
      cost: '$0',
      actionPlan: 'Sign up for these tools and bookmark them for daily use.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: 'ChatGPT', description: 'Use GPT-3.5 or limited GPT-4 for free.', resourceId: chatgpt.id },
          { order: 2, title: 'Claude', description: 'Use Claude 3 Sonnet for free.', resourceId: claude.id }
        ]
      }
    }
  })

  // Collection 6: YouTube Career Launchpad
  await prisma.collection.create({
    data: {
      title: 'YouTube Career: From Zero to Monetization',
      slug: 'youtube-career-launchpad',
      outcome: 'Launch and scale a high-quality YouTube channel with zero upfront budget using the best free and freemium creator tools.',
      audience: 'Aspiring YouTubers, Content Creators, Solo Educators',
      constraints: 'Requires computer, microphone, and consistent posting schedule',
      difficulty: 'Beginner to Intermediate',
      timeToResult: '1-3 months',
      cost: '$0 (100% Free Tools)',
      actionPlan: '1. Brainstorm viral topics and write video outlines using ChatGPT. 2. Record crisp 1080p/4K screen and camera footage with OBS Studio. 3. Cut, color-grade, and polish audio with DaVinci Resolve. 4. Create high-CTR click-worthy thumbnails with Canva. 5. Optimize video titles, tags, and SEO ranking using VidIQ.',
      lastVerified: new Date(),
      steps: {
        create: [
          { order: 1, title: '1. Scripting & Idea Generation', description: 'Use ChatGPT to outline engaging video hooks, full scripts, and content calendars.', resourceId: chatgpt.id },
          { order: 2, title: '2. Screen & Video Recording', description: 'Use OBS Studio for high-definition desktop capture, facecam recording, and multi-source streaming.', resourceId: obs.id },
          { order: 3, title: '3. Professional Video Editing', description: 'Cut footage, add B-roll, sync voiceovers, and color grade using DaVinci Resolve.', resourceId: davinci.id },
          { order: 4, title: '4. Thumbnail & Visual Packaging', description: 'Design click-worthy YouTube thumbnails (1280x720) and channel banners with Canva.', resourceId: canva.id },
          { order: 5, title: '5. YouTube SEO & Tag Optimization', description: 'Analyze high-volume search keywords, track competitor views, and optimize tags with VidIQ.', resourceId: vidiq.id }
        ]
      }
    }
  })

  console.log('Seeding 5 Implementation Packs...')
  for (const ideaData of IMPLEMENTATION_IDEAS) {
    const createdIdea = await prisma.implementationIdea.create({
      data: {
        title: ideaData.title,
        slug: ideaData.slug,
        category: ideaData.category,
        difficulty: ideaData.difficulty,
        estimatedTime: ideaData.estimatedTime,
        estimatedCost: ideaData.estimatedCost,
        featured: ideaData.featured ?? false,
        outcome: ideaData.outcome,
        description: ideaData.description,
        targetAudience: ideaData.targetAudience,
        keywords: ideaData.keywords,
        actionPlans: {
          create: ideaData.actionPlan.map(step => ({
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description
          }))
        }
      }
    })

    for (const phaseData of ideaData.phases) {
      await prisma.implementationPhase.create({
        data: {
          ideaId: createdIdea.id,
          title: phaseData.title,
          description: phaseData.description,
          outcome: phaseData.outcome,
          position: phaseData.position,
          estimatedDuration: phaseData.estimatedDuration,
          tasks: {
            create: phaseData.tasks.map(t => ({
              title: t.title,
              description: t.description,
              position: t.position,
              isOptional: t.isOptional ?? false
            }))
          },
          resources: {
            create: phaseData.resources.map(r => ({
              name: r.name,
              websiteUrl: r.websiteUrl,
              purpose: r.purpose,
              pricingModel: r.pricingModel,
              hasFreeTier: r.hasFreeTier,
              isEssential: r.isEssential ?? true,
              position: r.position
            }))
          }
        }
      })
    }
  }

  console.log('Seeding 10 Curated Collections...')
  for (const colData of CURATED_COLLECTIONS) {
    const createdCol = await prisma.curatedCollection.create({
      data: {
        title: colData.title,
        slug: colData.slug,
        category: colData.category,
        description: colData.description,
        featured: colData.featured ?? false
      }
    })

    for (const item of colData.items) {
      let matchedIdeaId: string | undefined = undefined
      if (item.ideaSlug) {
        const idea = await prisma.implementationIdea.findUnique({ where: { slug: item.ideaSlug } })
        if (idea) matchedIdeaId = idea.id
      }

      await prisma.curatedCollectionItem.create({
        data: {
          collectionId: createdCol.id,
          ideaId: matchedIdeaId,
          position: item.position
        }
      })
    }
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
