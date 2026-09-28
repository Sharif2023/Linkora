import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database with high-intent collections...')

  // 1. Clear existing data (optional but good for clean seed)
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
