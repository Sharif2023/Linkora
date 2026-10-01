import { ImplementationIdeaData, CuratedCollectionData } from '@/types/implement-ideas';

export const IMPLEMENTATION_IDEAS: ImplementationIdeaData[] = [
  {
    title: "YouTube Career: From Zero to Monetization",
    slug: "youtube-career-launchpad",
    category: "Creator Economy",
    difficulty: "Beginner",
    estimatedTime: "2–6 months",
    estimatedCost: "$0 using free tools (equipment optional)",
    featured: true,
    outcome: "Develop a sustainable, high-growth YouTube channel from niche selection and scripting to packaging, organic distribution, and unlocking monetization streams.",
    description: "A complete tactical playbook designed to guide solo creators through setting up a professional video studio, producing high-retention content, dominating search algorithms, and turning video views into a dependable digital career.",
    targetAudience: "Aspiring YouTubers, solo educators, personal brands, and side-hustlers looking to build an audience without an expensive studio.",
    keywords: ["youtube", "video editing", "thumbnails", "creator", "obs", "davinci resolve", "vidiq", "monetization"],
    actionPlan: [
      { stepNumber: 1, title: "Identify Niche & Audience", description: "Validate market interest with search trends and lock in your unique content positioning." },
      { stepNumber: 2, title: "Standardize Scripting & Setup", description: "Build a friction-free outline template and calibrate your microphone and OBS camera capture." },
      { stepNumber: 3, title: "Produce & Polish Videos", description: "Edit multi-track audio, jump cuts, visual hooks, and cinematic grading in DaVinci Resolve or CapCut." },
      { stepNumber: 4, title: "Design High-CTR Packaging", description: "Craft bold 1280x720 thumbnails in Canva and optimize titles and tags using VidIQ and TubeBuddy." },
      { stepNumber: 5, title: "Distribute & Unlock Revenue", description: "Repurpose shorts with Buffer, track viewer analytics in YouTube Studio, and set up fan memberships." }
    ],
    phases: [
      {
        title: "Ideation & Niche Validation",
        description: "Uncover underserved topics, validate search volume, and map out your first 20 video concepts.",
        outcome: "A validated niche with 20 vetted video titles mapped to clear audience pain points.",
        position: 1,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Define your core target viewer persona and 3 primary content pillars", description: "Determine age, interests, specific struggles, and why they should choose your channel.", position: 1 },
          { title: "Run 10 topic queries through Google Trends", description: "Confirm evergreen demand vs fading spikes over the last 12-month period.", position: 2 },
          { title: "Analyze 5 competitor channels using VidIQ", description: "Note their highest-viewed videos, upload frequency, and top comment complaints.", position: 3 },
          { title: "Harvest 30 audience questions on AnswerThePublic", description: "Identify specific 'how to' and 'what is' phrasing people actively query.", position: 4 }
        ],
        resources: [
          { name: "Google Trends", websiteUrl: "https://trends.google.com/", purpose: "Analyze real search interest and identify rising seasonal trends.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "vidIQ", websiteUrl: "https://vidiq.com/", purpose: "Research video keywords, competition scores, and discover daily content ideas.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "AnswerThePublic", websiteUrl: "https://answerthepublic.com/", purpose: "Discover raw consumer search questions to fuel high-retention video hooks.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Content Planning & Scripting",
        description: "Transform raw ideas into engaging, structured scripts with strong hooks and structured calls-to-action.",
        outcome: "A Notion production pipeline and 3 complete video scripts ready for recording.",
        position: 2,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Set up a YouTube content calendar in Notion", description: "Track columns: Idea, Scripting, Filming, Editing, Thumbnail, Published.", position: 1 },
          { title: "Draft 3 different opening hooks for each video", description: "Hook viewers in the first 10 seconds before they click away.", position: 2 },
          { title: "Brainstorm video outlines with ChatGPT", description: "Generate structural breakdowns, counter-intuitive angles, and compelling examples.", position: 3 },
          { title: "Finalize word-for-word or bulleted scripts in Google Docs", description: "Review pacing, add B-roll cues, and verify retention markers.", position: 4 }
        ],
        resources: [
          { name: "Notion", websiteUrl: "https://www.notion.com/", purpose: "Organize script drafts, production schedules, and track channel milestones.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "ChatGPT", websiteUrl: "https://chatgpt.com/", purpose: "Brainstorm high-converting hooks, video script outlines, and alternative titles.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Google Docs", websiteUrl: "https://docs.google.com/", purpose: "Collaborative and distraction-free script writing with cloud sync.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Video Creation & Editing",
        description: "Record crisp visual and audio footage, then assemble dynamic edits with smooth pacing and effects.",
        outcome: "One polished 1080p or 4K YouTube video with clean audio and zero filler words.",
        position: 3,
        estimatedDuration: "2–3 weeks",
        tasks: [
          { title: "Configure OBS Studio video and audio settings", description: "Set canvas to 1080p 60fps, enable noise suppression, and configure webcam/screen sources.", position: 1 },
          { title: "Record test footage and check audio clipping", description: "Ensure audio levels peak between -12dB and -6dB with minimal room echo.", position: 2 },
          { title: "Cut rough edit and eliminate silence in DaVinci Resolve", description: "Trim dead air, repeat takes, and stuttered sentences.", position: 3 },
          { title: "Add B-roll clips, zoom transitions, and sound effects", description: "Inject visual changes every 4-7 seconds to maintain high viewer attention.", position: 4 },
          { title: "Generate short vertical teasers using CapCut", description: "Create 9:16 Shorts with animated captions for cross-platform promotion.", position: 5 }
        ],
        resources: [
          { name: "OBS Studio", websiteUrl: "https://obsproject.com/", purpose: "Free open-source screen recording, facecam capture, and stream management.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "DaVinci Resolve", websiteUrl: "https://www.blackmagicdesign.com/products/davinciresolve", purpose: "Hollywood-grade video editing, color correction, and Fairlight audio post-production.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "CapCut", websiteUrl: "https://www.capcut.com/", purpose: "Rapid short-form video editing with auto-generated viral captions.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Branding, Packaging & SEO",
        description: "Design click-worthy thumbnails, write curiosity-inducing titles, and configure metadata for organic discovery.",
        outcome: "A professional channel header, high-contrast thumbnail, and fully optimized metadata.",
        position: 4,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Design 2-3 thumbnail variants in Canva", description: "Use high contrast, maximum 3-4 words of readable text, and expressive faces.", position: 1 },
          { title: "Test thumbnail readability on mobile scale", description: "Shrink canvas to 10% zoom to verify instant clarity on smartphones.", position: 2 },
          { title: "Optimize video title and tags using TubeBuddy", description: "Incorporate primary search keywords without turning it into spammy clickbait.", position: 3 },
          { title: "Write an SEO-rich description with timestamps in YouTube Studio", description: "Include chapter breakdowns, resource links, and your main channel playlist link.", position: 4 }
        ],
        resources: [
          { name: "Canva", websiteUrl: "https://www.canva.com/", purpose: "Design YouTube banners, 1280x720 thumbnails, and graphic overlays.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "TubeBuddy", websiteUrl: "https://www.tubebuddy.com/", purpose: "Keyword explorer, search ranking diagnostics, and A/B thumbnail testing.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "YouTube Studio", websiteUrl: "https://studio.youtube.com/", purpose: "Official YouTube dashboard for video uploads, end screens, and cards.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Distribution, Growth & Monetization",
        description: "Scale audience engagement, track algorithmic retention metrics, and diversify revenue streams.",
        outcome: "An automated social distribution flow and setup of your first creator revenue channel.",
        position: 5,
        estimatedDuration: "Ongoing",
        tasks: [
          { title: "Analyze viewer retention curves in YouTube Studio", description: "Identify dips where viewers leave and optimize future pacing accordingly.", position: 1 },
          { title: "Schedule promotional clips across X and LinkedIn via Buffer", description: "Promote key insights to bring external viewers into your video ecosystem.", position: 2 },
          { title: "Set up community memberships on Patreon or Buy Me A Coffee", description: "Offer bonus behind-the-scenes assets or community access to early supporters.", position: 3 },
          { title: "Apply for YouTube Partner Program upon meeting eligibility thresholds", description: "Enable AdSense, Super Thanks, and Channel Memberships.", position: 4 }
        ],
        resources: [
          { name: "YouTube Studio Analytics", websiteUrl: "https://studio.youtube.com/", purpose: "Deep retention, impression click-through rate, and traffic source intelligence.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Buffer", websiteUrl: "https://buffer.com/", purpose: "Schedule multi-platform social media posts to drive consistent video traffic.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "Patreon", websiteUrl: "https://www.patreon.com/", purpose: "Build predictable recurring income with tiered fan memberships and perks.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      }
    ]
  },
  {
    title: "Micro-SaaS: From Idea to Paying Customers",
    slug: "micro-saas-launchpad",
    category: "SaaS & Startups",
    difficulty: "Intermediate",
    estimatedTime: "4–12 weeks",
    estimatedCost: "$0 on free tiers (domain/hosting optional)",
    featured: true,
    outcome: "Take a focused software idea through validation, functional MVP development, global deployment, and your first 10 paying customers.",
    description: "The complete roadmap for solo developers and builders to validate an urgent B2B/B2C pain point, ship an MVP with Next.js or No-Code, implement automated billing, and launch on product hubs without burning capital.",
    targetAudience: "Developers, indie hackers, solo founders, freelancers, and builders wanting to build recurring software income.",
    keywords: ["micro-saas", "nextjs", "supabase", "indie hacker", "vercel", "lemon squeezy", "posthog", "startup"],
    actionPlan: [
      { stepNumber: 1, title: "Validate Pain Point & Demand", description: "Find underserved software niches and collect early waitlist signups with Tally." },
      { stepNumber: 2, title: "Wireframe Minimal UI", description: "Design a clean, 2-screen user journey in Figma or prototype rapidly with v0." },
      { stepNumber: 3, title: "Build Scalable Core MVP", description: "Implement Auth, Database, and UI using Next.js & Supabase, or visually with Bubble." },
      { stepNumber: 4, title: "Hook Up Subscriptions & Analytics", description: "Integrate Lemon Squeezy merchant of record and configure PostHog event tracking." },
      { stepNumber: 5, title: "Public Launch & Feedback", description: "Debut on Product Hunt and Indie Hackers, installing Crisp for real-time customer chat." }
    ],
    phases: [
      {
        title: "Ideation & Market Validation",
        description: "Identify problems people are actively paying to solve, research existing competitors, and validate real willingness to pay.",
        outcome: "A validated product hypothesis and an early waitlist of 50+ interested users.",
        position: 1,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Audit trending complaints on Product Hunt and subreddits", description: "Look for 1-star reviews of bloated legacy software you can unbundle.", position: 1 },
          { title: "Verify keyword volume with Google Trends", description: "Ensure search intent is growing rather than declining.", position: 2 },
          { title: "Publish a minimal waitlist landing page using Tally", description: "Ask for email and willingness-to-pay range before writing a line of code.", position: 3 }
        ],
        resources: [
          { name: "Product Hunt", websiteUrl: "https://www.producthunt.com/", purpose: "Discover product launches, inspect competitive offerings, and analyze community sentiment.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Google Trends", websiteUrl: "https://trends.google.com/", purpose: "Verify search interest permanence for your targeted software category.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Tally", websiteUrl: "https://tally.so/", purpose: "Build clean, free waitlists and customer discovery forms in minutes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Product Design & Prototyping",
        description: "Specify the minimal functional scope required to solve the core customer problem.",
        outcome: "A functional Figma wireframe or v0 component tree ready for engineering.",
        position: 2,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Map the primary user journey in Whimsical", description: "Keep it under 3 steps: Signup -> Perform Core Action -> Get Result.", position: 1 },
          { title: "Design responsive desktop and mobile screens in Figma", description: "Establish typographic hierarchy, buttons, inputs, and dark-mode tokens.", position: 2 },
          { title: "Generate React UI components using v0", description: "Rapidly draft production-ready Tailwind/React blocks from prompt descriptions.", position: 3 }
        ],
        resources: [
          { name: "Figma", websiteUrl: "https://www.figma.com/", purpose: "Industry-standard UI design, wireframing, and interactive user prototypes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "v0 by Vercel", websiteUrl: "https://v0.app/", purpose: "Generative AI interface prototyping that outputs clean React & Tailwind code.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "Whimsical", websiteUrl: "https://whimsical.com/", purpose: "Fast visual flowcharts, architecture diagrams, and wireframes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Development & Backend",
        description: "Build the database, authentication, and core business logic using modern frameworks.",
        outcome: "A functioning web application deployed on a staging environment.",
        position: 3,
        estimatedDuration: "3–6 weeks",
        tasks: [
          { title: "Bootstrap Next.js application with TypeScript and Tailwind", description: "Establish route handlers, server actions, and layout structure.", position: 1 },
          { title: "Provision Supabase Postgres database and authentication", description: "Configure user tables, Row-Level Security (RLS), and JWT auth.", position: 2 },
          { title: "Alternative: Build with Bubble for visual no-code deployment", description: "For non-technical builders: assemble logic workflows without code.", position: 3 },
          { title: "Implement the single core feature", description: "Ruthlessly cut secondary features; build only what solves the primary pain.", position: 4 }
        ],
        resources: [
          { name: "Next.js", websiteUrl: "https://nextjs.org/", purpose: "Production React framework with SSR, App Router, and serverless API endpoints.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Supabase", websiteUrl: "https://supabase.com/", purpose: "Open-source Firebase alternative: Postgres, instant Auth, and storage.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Bubble", websiteUrl: "https://bubble.io/", purpose: "Visual full-stack web app builder (Alternative to code stack).", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Deployment, Payments & Analytics",
        description: "Deploy to a global edge network, configure automated tax/payments, and instrument event tracking.",
        outcome: "A live URL with active checkout flow and analytics instrumentation.",
        position: 4,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Deploy codebase to Vercel with automated Git CI/CD", description: "Connect GitHub repository, configure environment variables, and verify domain.", position: 1 },
          { title: "Set up Lemon Squeezy merchant of record", description: "Create subscription plans and webhook endpoints to grant user access.", position: 2 },
          { title: "Install PostHog for product analytics and session replays", description: "Track key conversion funnels and uncover where users get stuck.", position: 3 }
        ],
        resources: [
          { name: "Vercel", websiteUrl: "https://vercel.com/", purpose: "Zero-config deployment platform with automated preview branches and edge CDN.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Lemon Squeezy", websiteUrl: "https://www.lemonsqueezy.com/", purpose: "Merchant of record handling global SaaS payments, sales taxes, and subscriptions.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "PostHog", websiteUrl: "https://posthog.com/", purpose: "All-in-one product analytics, feature flags, and user session replay.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Launch & Customer Acquisition",
        description: "Distribute your product across startup communities, engage early users, and resolve questions in real time.",
        outcome: "First 10 paying customers and an active feedback loop.",
        position: 5,
        estimatedDuration: "Ongoing",
        tasks: [
          { title: "Embed Crisp live chat for instantaneous customer support", description: "Answer pre-purchase questions and catch bug reports directly from users.", position: 1 },
          { title: "Prepare Product Hunt launch kit", description: "Write maker comment, format 1270x760 gallery visuals, and draft launch teaser.", position: 2 },
          { title: "Document build journey on Indie Hackers and X", description: "Share transparent metrics, technical challenges, and learnings to build trust.", position: 3 }
        ],
        resources: [
          { name: "Indie Hackers", websiteUrl: "https://www.indiehackers.com/", purpose: "Community of bootstrapped founders sharing revenue numbers and growth tactics.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Product Hunt", websiteUrl: "https://www.producthunt.com/", purpose: "Premier daily discovery platform for launching new digital products.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Crisp", websiteUrl: "https://crisp.chat/", purpose: "Modern customer messaging and live chat software to close early buyers.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      }
    ]
  },
  {
    title: "Remote Freelancing: From First Client to High-Value Agency",
    slug: "remote-freelancing-agency",
    category: "Freelancing & Business",
    difficulty: "Intermediate",
    estimatedTime: "4–12 weeks",
    estimatedCost: "$0 to start (outreach tools optional)",
    featured: true,
    outcome: "Package high-demand digital skills into an irresistible service offer, build an outreach pipeline, and scale into a structured agency.",
    description: "An end-to-end framework for designers, developers, and marketers to escape hourly freelance grind, secure retainer clients worldwide, and automate client delivery using streamlined agency operations.",
    targetAudience: "Freelancers, developers, designers, copywriters, consultants, and solo agency founders.",
    keywords: ["freelance", "agency", "contra", "framer", "apollo", "hubspot", "clients", "upwork"],
    actionPlan: [
      { stepNumber: 1, title: "Position High-Value Service Offer", description: "Select a focused problem for an affluent niche and draft a clear outcome-based offer." },
      { stepNumber: 2, title: "Construct Premium Portfolio", description: "Publish 2-3 case studies showcasing business impact on Contra or Framer." },
      { stepNumber: 3, title: "Build Outbound Lead Pipeline", description: "Identify verified decision-makers on LinkedIn and Apollo with ethical outreach." },
      { stepNumber: 4, title: "Close Discovery Calls & Proposals", description: "Automate booking with Calendly, track deals in HubSpot, and draft clean proposals." },
      { stepNumber: 5, title: "Automate Agency Delivery", description: "Standardize client onboarding and progress communication with ClickUp, Loom, and Slack." }
    ],
    phases: [
      {
        title: "Niche Selection & Positioning",
        description: "Move from generalist freelancer to specialized partner solving expensive business problems.",
        outcome: "A finalized one-sentence value proposition and specialized service package.",
        position: 1,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Research recurring commercial pain points on Reddit and industry forums", description: "Find what founders complain about spending excessive time or money on.", position: 1 },
          { title: "Verify demand trends using Google Trends", description: "Confirm growing search demand for your specialized discipline.", position: 2 },
          { title: "Refine client-facing offer with ChatGPT", description: "Formulate: 'I help [specific niche] achieve [measurable outcome] in [timeframe] without [pain point].'", position: 3 }
        ],
        resources: [
          { name: "Google Trends", websiteUrl: "https://trends.google.com/", purpose: "Analyze macro demand for marketing, design, and development service categories.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Reddit", websiteUrl: "https://www.reddit.com/", purpose: "Uncover candid customer complaints and business challenges in niche subreddits.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "ChatGPT", websiteUrl: "https://chatgpt.com/", purpose: "Roleplay sales objections and polish your agency value proposition.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Portfolio & Professional Presence",
        description: "Create proof of capability that establishes immediate authority and removes client risk.",
        outcome: "A high-converting portfolio website featuring 2-3 in-depth case studies.",
        position: 2,
        estimatedDuration: "2–3 weeks",
        tasks: [
          { title: "Create a verified profile on Contra", description: "List specialized services, client ratings, and commission-free contracts.", position: 1 },
          { title: "Build a responsive agency landing page in Framer", description: "Feature clear social proof, outcome metrics, and a direct booking CTA.", position: 2 },
          { title: "Publish visual case study breakdowns on Behance", description: "Document the before-and-after transformation rather than just pretty screenshots.", position: 3 }
        ],
        resources: [
          { name: "Contra", websiteUrl: "https://contra.com/", purpose: "Modern freelance portfolio platform with 0% commission and integrated contracts.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Framer", websiteUrl: "https://www.framer.com/", purpose: "Build lightning-fast, high-end agency websites with visual design and animations.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Behance", websiteUrl: "https://www.behance.net/", purpose: "Showcase comprehensive design case studies to attract global corporate clients.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Lead Generation & Client Acquisition",
        description: "Build a reliable, multi-channel system to identify and contact qualified business decision-makers.",
        outcome: "A curated list of 100 verified target leads with confirmed contact details.",
        position: 3,
        estimatedDuration: "2–4 weeks",
        tasks: [
          { title: "Build a targeted lead list on Apollo.io", description: "Filter by company size, tech stack, funding status, and decision-maker job title.", position: 1 },
          { title: "Engage meaningfully with prospects on LinkedIn", description: "Comment with actionable insights on prospects' posts before sending connection requests.", position: 2 },
          { title: "Target select specialized projects on Upwork", description: "Submit personalized video audit proposals to clients with verified payment history.", position: 3 }
        ],
        resources: [
          { name: "LinkedIn", websiteUrl: "https://www.linkedin.com/", purpose: "Premier B2B network for connecting directly with founders, CEOs, and VP-level buyers.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Apollo.io", websiteUrl: "https://www.apollo.io/", purpose: "B2B database to discover verified work emails, phone numbers, and company insights.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Upwork", websiteUrl: "https://www.upwork.com/", purpose: "Global talent marketplace to bid on high-budget fixed-price and hourly contracts.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Outreach, Proposals & Sales",
        description: "Guide prospects from initial response through discovery calls to signed service agreements.",
        outcome: "Your first signed high-ticket client contract.",
        position: 4,
        estimatedDuration: "2–4 weeks",
        tasks: [
          { title: "Setup free CRM pipeline in HubSpot", description: "Track stages: Contacted, Discovery Booked, Proposal Sent, Closed Won.", position: 1 },
          { title: "Automate call scheduling using Calendly", description: "Add qualifying pre-call questions to filter out unqualified tire-kickers.", position: 2 },
          { title: "Draft a clean, scope-protected contract in Google Docs", description: "Include exact deliverables, milestones, revision limits, and 50% deposit clause.", position: 3 }
        ],
        resources: [
          { name: "HubSpot CRM", websiteUrl: "https://www.hubspot.com/products/crm", purpose: "Free pipeline tracking, lead contact history, and email open tracking.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Calendly", websiteUrl: "https://calendly.com/", purpose: "Eliminate email scheduling friction with personalized booking calendar links.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Google Docs", websiteUrl: "https://docs.google.com/", purpose: "Standardized proposal templates and formal client master service agreements.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Client Delivery & Agency Operations",
        description: "Deliver exceptional client satisfaction while standardizing SOPs to enable team delegation.",
        outcome: "A repeatable project delivery operating system and glowing client testimonial.",
        position: 5,
        estimatedDuration: "Ongoing",
        tasks: [
          { title: "Manage client sprint boards in ClickUp", description: "Maintain visual Kanban columns and share read-only progress views with clients.", position: 1 },
          { title: "Send asynchronous video updates via Loom", description: "Eliminate unnecessary synchronous check-in meetings with 2-minute video walkthroughs.", position: 2 },
          { title: "Create dedicated client communication channels in Slack", description: "Keep project discussions organized and out of cluttered email inboxes.", position: 3 }
        ],
        resources: [
          { name: "ClickUp", websiteUrl: "https://clickup.com/", purpose: "All-in-one project management for managing client deliverables, tasks, and SOPs.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Loom", websiteUrl: "https://www.loom.com/", purpose: "Asynchronous screen and webcam recording for instant client demos and milestone reviews.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Slack", websiteUrl: "https://slack.com/", purpose: "Private workspace channels for professional, real-time client communication.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      }
    ]
  },
  {
    title: "Podcast Launchpad: From First Episode to Loyal Audience",
    slug: "podcast-launchpad",
    category: "Content & Media",
    difficulty: "Beginner",
    estimatedTime: "2–6 weeks",
    estimatedCost: "$0 using free software (microphone optional)",
    featured: false,
    outcome: "Conceptualize, record, edit, and publish a high-quality audio & video podcast across Spotify, Apple, and YouTube with a proven audience growth engine.",
    description: "A complete step-by-step roadmap for interviewers, educators, and creators to record studio-grade episodes, publish through free RSS distribution, and grow a loyal audience without expensive sound booths.",
    targetAudience: "Educators, entrepreneurs, interviewers, independent media publishers, and creators wanting to launch an audio show.",
    keywords: ["podcast", "audacity", "riverside", "spotify", "buzzsprout", "audio editing", "rss"],
    actionPlan: [
      { stepNumber: 1, title: "Choose Format & Episode Strategy", description: "Validate show concept, name, and draft 10 interview questions with Reddit and Notion." },
      { stepNumber: 2, title: "Create Show Visual Identity", description: "Design compliant 3000x3000 cover art and intro graphics in Canva and Figma." },
      { stepNumber: 3, title: "Record & Clean Audio", description: "Capture dual-ended interviews in Riverside.fm and enhance voice clarity with Adobe Podcast." },
      { stepNumber: 4, title: "Publish to Global Platforms", description: "Distribute via Spotify for Creators or Buzzsprout RSS across Spotify and Apple Podcasts." },
      { stepNumber: 5, title: "Scale Listeners & Monetize", description: "Repurpose episode clips with Buffer, capture emails with Kit, and offer Patreon perks." }
    ],
    phases: [
      {
        title: "Topic Research & Format",
        description: "Define the core premise of your podcast, the ideal listener, and the episode cadence.",
        outcome: "A validated podcast concept, name, and editorial calendar of the first 8 episodes.",
        position: 1,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Research emerging audio themes with Google Trends", description: "Examine trending conversation topics to spot content voids in existing audio charts.", position: 1 },
          { title: "Identify common community queries on Reddit", description: "Mine subreddits related to your field to discover what problems listeners want solved.", position: 2 },
          { title: "Build an episode outline database in Notion", description: "Organize guest pipeline, talking points, pre-interview notes, and sponsorship cues.", position: 3 }
        ],
        resources: [
          { name: "Google Trends", websiteUrl: "https://trends.google.com/", purpose: "Analyze audio and topic search interest across regions.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Reddit", websiteUrl: "https://www.reddit.com/", purpose: "Discover specific community questions to structure your show episodes around.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "Notion", websiteUrl: "https://www.notion.com/", purpose: "Organize episode outlines, guest communication, and show notes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Branding & Preparation",
        description: "Design cover art that catches attention in crowded podcast apps and draft episode assets.",
        outcome: "Apple/Spotify-compliant 3000x3000 square cover art and standard show script templates.",
        position: 2,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Design 3000x3000px podcast cover art in Canva", description: "Ensure typography is instantly legible at thumbnail size on Apple Podcasts.", position: 1 },
          { title: "Draft standard intro/outro scripts and interview questions with ChatGPT", description: "Create compelling guest bios and questions that unlock unique stories.", position: 2 },
          { title: "Build branded social clip templates in Figma", description: "Create reusable quote card templates and YouTube video thumbnail assets.", position: 3 }
        ],
        resources: [
          { name: "Canva", websiteUrl: "https://www.canva.com/", purpose: "Quickly create podcast cover artwork, guest quote graphics, and banners.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "ChatGPT", websiteUrl: "https://chatgpt.com/", purpose: "Draft thought-provoking interview questions and compelling episode show notes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Figma", websiteUrl: "https://www.figma.com/", purpose: "Professional vector layout tool for branding assets and visual podcast design.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Recording & Audio Editing",
        description: "Record pristine voice tracks, remove background noise, and assemble broadcast-ready audio files.",
        outcome: "A master audio file mastered to -16 LUFS ready for public distribution.",
        position: 3,
        estimatedDuration: "2–3 weeks",
        tasks: [
          { title: "Record remote guests with Riverside.fm", description: "Capture local high-res uncompressed WAV audio and 4K video from both host and guest.", position: 1 },
          { title: "Clean room echo and background noise with Adobe Podcast AI", description: "Transform budget USB mic audio into studio-sounding voice clarity with one click.", position: 2 },
          { title: "Assemble multi-track intro, interview, and music in Audacity", description: "Balance volume levels, apply compressor/limiter, and export MP3 with ID3 tags.", position: 3 }
        ],
        resources: [
          { name: "Audacity", websiteUrl: "https://www.audacityteam.org/", purpose: "Free open-source audio editor for cutting, noise reduction, and audio mastering.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Riverside.fm", websiteUrl: "https://riverside.fm/", purpose: "Studio-quality remote audio/video recording with local uncompressed tracks.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Adobe Podcast", websiteUrl: "https://podcast.adobe.com/", purpose: "AI audio enhancement tool to remove background hum and improve voice presence.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Publishing & Distribution",
        description: "Submit your podcast RSS feed to every major directory and automate ongoing episode delivery.",
        outcome: "A live podcast feed indexed on Spotify, Apple Podcasts, Amazon Music, and YouTube.",
        position: 4,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Host and syndicate episodes with Spotify for Creators", description: "Get a free podcast RSS feed and automated distribution to Apple, Spotify, and Overcast.", position: 1 },
          { title: "Alternative: Set up advanced analytics on Buzzsprout", description: "Use dedicated audio chapters, transcripts, and dynamic ad insertion.", position: 2 },
          { title: "Publish video versions to YouTube Studio", description: "Upload full video episodes or audiograms to reach YouTube's podcast audience.", position: 3 }
        ],
        resources: [
          { name: "Spotify for Creators", websiteUrl: "https://creators.spotify.com/", purpose: "100% free podcast hosting with video podcast support and built-in distribution.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Buzzsprout", websiteUrl: "https://www.buzzsprout.com/", purpose: "Premier podcast hosting platform with automatic audio mastering and directories.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "YouTube Studio", websiteUrl: "https://studio.youtube.com/", purpose: "Tap into YouTube's booming podcast tab and video recommendation engine.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Audience Growth & Monetization",
        description: "Convert casual listeners into a dedicated subscriber community and explore sponsorship opportunities.",
        outcome: "A thriving listener email newsletter and tiered membership program.",
        position: 5,
        estimatedDuration: "Ongoing",
        tasks: [
          { title: "Distribute bite-sized audio quotes via Buffer", description: "Post 30-second teaser clips across TikTok, Reels, and X.", position: 1 },
          { title: "Capture listener emails with Kit newsletter", description: "Offer exclusive episode cheat sheets, transcripts, and book recommendations.", position: 2 },
          { title: "Launch bonus episode tiers on Patreon", description: "Offer ad-free listening, monthly Q&A sessions, and discord access to paid subscribers.", position: 3 }
        ],
        resources: [
          { name: "Buffer", websiteUrl: "https://buffer.com/", purpose: "Schedule short-form audiogram video teasers across social channels.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Kit (formerly ConvertKit)", websiteUrl: "https://kit.com/", purpose: "Grow and monetize your podcast email subscriber list with automated sequences.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Patreon", websiteUrl: "https://www.patreon.com/", purpose: "Offer private RSS feeds and premium subscriber content for monthly members.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      }
    ]
  },
  {
    title: "Digital Products & Newsletters: Build an Audience and Monetize Your Knowledge",
    slug: "digital-product-newsletter",
    category: "Digital Products",
    difficulty: "Intermediate",
    estimatedTime: "4–12 weeks",
    estimatedCost: "$0 to begin (domain/payment fees apply)",
    featured: false,
    outcome: "Package your expertise into high-margin digital products, build a loyal newsletter readership, and automate sales with frictionless landing funnels.",
    description: "The complete playbook for writers, educators, and creators to turn domain knowledge into evergreen digital assets (templates, guides, micro-courses) and build a self-sustaining media business.",
    targetAudience: "Writers, educators, niche experts, creators, consultants, and digital entrepreneurs.",
    keywords: ["newsletter", "digital products", "gumroad", "beehiiv", "substack", "notion", "kit"],
    actionPlan: [
      { stepNumber: 1, title: "Validate Knowledge Niche", description: "Find what people are eager to learn and test concept waitlists with Tally." },
      { stepNumber: 2, title: "Create High-Value Digital Asset", description: "Build templates in Notion or write comprehensive guides with Canva and Google Docs." },
      { stepNumber: 3, title: "Launch Newsletter Infrastructure", description: "Set up publication on beehiiv or Substack with automated welcome onboarding." },
      { stepNumber: 4, title: "Deploy Frictionless Storefront", description: "Publish product checkout via Gumroad or Lemon Squeezy on a Carrd landing page." },
      { stepNumber: 5, title: "Automate Funnels & Conversion", description: "Connect workflows with Zapier, schedule posts via Buffer, and track Analytics." }
    ],
    phases: [
      {
        title: "Niche & Audience Validation",
        description: "Identify high-value knowledge gaps where people will gladly pay for speed, clarity, and templates.",
        outcome: "A validated digital product concept and 100+ pre-launch newsletter signups.",
        position: 1,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Identify recurring questions and complaints on Reddit", description: "Find questions that professionals ask repeatedly without finding clear answers.", position: 1 },
          { title: "Verify commercial demand on Google Trends", description: "Confirm sustained keyword search intent for your chosen field.", position: 2 },
          { title: "Run a concept validation survey using Tally", description: "Discover exactly what format (Notion template, PDF guide, spreadsheet) buyers prefer.", position: 3 }
        ],
        resources: [
          { name: "Reddit", websiteUrl: "https://www.reddit.com/", purpose: "Spot unfiltered pain points and workflow frustrations in specialized communities.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Google Trends", websiteUrl: "https://trends.google.com/", purpose: "Evaluate macro interest in skills, digital products, and industry trends.", pricingModel: "Free", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Tally", websiteUrl: "https://tally.so/", purpose: "Create elegant, high-conversion pre-launch waitlists and feedback forms.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 3 }
        ]
      },
      {
        title: "Product Creation & Packaging",
        description: "Design an actionable, comprehensive digital asset that delivers instant transformation for buyers.",
        outcome: "A finished digital product package (Notion workspace, PDF guide, or toolkit).",
        position: 2,
        estimatedDuration: "2–4 weeks",
        tasks: [
          { title: "Build an interactive template or database in Notion", description: "Create pre-formatted formulas, dashboards, and checklists that save buyers hours.", position: 1 },
          { title: "Design product mockups and visual guides in Canva", description: "Create 3D book covers, preview screenshots, and PDF worksheets.", position: 2 },
          { title: "Write comprehensive documentation in Google Docs", description: "Include clear onboarding instructions and quick-start implementation guides.", position: 3 }
        ],
        resources: [
          { name: "Notion", websiteUrl: "https://www.notion.com/", purpose: "Build robust, duplicable operational systems and digital workspace templates.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Canva", websiteUrl: "https://www.canva.com/", purpose: "Design high-converting 3D digital product mockups and PDF workbooks.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Google Docs", websiteUrl: "https://docs.google.com/", purpose: "Write clear instructions, standard operating procedures, and guides.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Newsletter & Audience Infrastructure",
        description: "Establish a direct email communication channel that you own, independent of social media algorithms.",
        outcome: "A live newsletter publication with an automated 3-email welcome sequence.",
        position: 3,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Launch publication on beehiiv with custom branding", description: "Take advantage of built-in referral programs, 3D analytics, and SEO web archives.", position: 1 },
          { title: "Alternative: Start on Substack for instant community discovery", description: "Leverage network recommendations to gain initial free subscribers.", position: 2 },
          { title: "Configure an automated lead-magnet delivery sequence in Kit", description: "Automatically email your free template when new readers enter their email.", position: 3 }
        ],
        resources: [
          { name: "beehiiv", websiteUrl: "https://www.beehiiv.com/", purpose: "The newsletter platform built for growth, referral programs, and ad network monetization.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Substack", websiteUrl: "https://substack.com/", purpose: "Simple publishing platform with powerful built-in creator recommendation networks.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 2 },
          { name: "Kit (formerly ConvertKit)", websiteUrl: "https://kit.com/", purpose: "Advanced marketing automation, tag segmentation, and email product sales.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Sales & Product Delivery",
        description: "Set up a high-converting sales page with instant digital asset delivery and global payment processing.",
        outcome: "A live checkout link capable of accepting credit cards and Apple Pay globally.",
        position: 4,
        estimatedDuration: "1–2 weeks",
        tasks: [
          { title: "Set up product listing on Gumroad", description: "Configure tiered pricing, discount codes, license keys, and automated PDF delivery.", position: 1 },
          { title: "Alternative: Use Lemon Squeezy for zero merchant-of-record tax liability", description: "Automate global EU VAT and international sales tax compliance.", position: 2 },
          { title: "Build a single-page sales landing page in Carrd", description: "Showcase customer pain points, product preview gifs, reviews, and buy button.", position: 3 }
        ],
        resources: [
          { name: "Gumroad", websiteUrl: "https://gumroad.com/", purpose: "The simplest platform to sell digital templates, courses, and e-books.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Lemon Squeezy", websiteUrl: "https://www.lemonsqueezy.com/", purpose: "Merchant of record handling international payment processing and global taxes.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Carrd", websiteUrl: "https://carrd.co/", purpose: "Build ultra-responsive, beautiful one-page sales landing pages for cheap.", pricingModel: "Freemium", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      },
      {
        title: "Growth, Automation & Analytics",
        description: "Automate delivery workflows, repurpose content into social snippets, and track traffic conversion.",
        outcome: "A self-sustaining growth flywheel driving daily email subscribers and sales.",
        position: 5,
        estimatedDuration: "Ongoing",
        tasks: [
          { title: "Schedule social media promotion with Buffer", description: "Break down newsletter editions into educational Twitter/LinkedIn threads.", position: 1 },
          { title: "Automate backend tasks using Zapier", description: "Sync new Gumroad buyers directly into private Kit customer email tags.", position: 2 },
          { title: "Monitor visitor conversion rates in Google Analytics", description: "Identify which referral sources yield the highest paying customer percentage.", position: 3 }
        ],
        resources: [
          { name: "Buffer", websiteUrl: "https://buffer.com/", purpose: "Repurpose and schedule educational content across social media channels.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 1 },
          { name: "Zapier", websiteUrl: "https://zapier.com/", purpose: "Connect your store, email list, and Notion databases with no-code automations.", pricingModel: "Freemium", hasFreeTier: true, isEssential: true, position: 2 },
          { name: "Google Analytics", websiteUrl: "https://analytics.google.com/", purpose: "Comprehensive analytics to track visitor acquisition channels and sales funnels.", pricingModel: "Free", hasFreeTier: true, isEssential: false, position: 3 }
        ]
      }
    ]
  }
];

export const CURATED_COLLECTIONS: CuratedCollectionData[] = [
  {
    title: "The Creator Economy",
    slug: "creator-economy",
    category: "Creator Economy",
    featured: true,
    description: "Everything needed to build an independent media presence, produce professional multimedia, and monetize your creative talent.",
    items: [
      { ideaSlug: "youtube-career-launchpad", position: 1 },
      { ideaSlug: "podcast-launchpad", position: 2 },
      { ideaSlug: "digital-product-newsletter", position: 3 },
      { resourceName: "DaVinci Resolve", resourceCategory: "Video", position: 4 },
      { resourceName: "Canva", resourceCategory: "Design", position: 5 },
      { resourceName: "OBS Studio", resourceCategory: "Recording", position: 6 },
      { resourceName: "Buffer", resourceCategory: "Social", position: 7 }
    ]
  },
  {
    title: "Build Your First Startup",
    slug: "build-your-first-startup",
    category: "SaaS & Startups",
    featured: true,
    description: "From initial customer problem validation to a functional MVP, early beta customers, and scalable revenue.",
    items: [
      { ideaSlug: "micro-saas-launchpad", position: 1 },
      { resourceName: "Next.js", resourceCategory: "Development", position: 2 },
      { resourceName: "Supabase", resourceCategory: "Database", position: 3 },
      { resourceName: "Vercel", resourceCategory: "Hosting", position: 4 },
      { resourceName: "Lemon Squeezy", resourceCategory: "Payments", position: 5 },
      { resourceName: "Product Hunt", resourceCategory: "Launch", position: 6 }
    ]
  },
  {
    title: "The Solopreneur OS",
    slug: "solopreneur-os",
    category: "Productivity & Ops",
    featured: true,
    description: "A practical operating system for running a lean, independent business with minimal overhead and maximum automation.",
    items: [
      { ideaSlug: "micro-saas-launchpad", position: 1 },
      { ideaSlug: "remote-freelancing-agency", position: 2 },
      { ideaSlug: "digital-product-newsletter", position: 3 },
      { resourceName: "Notion", resourceCategory: "Productivity", position: 4 },
      { resourceName: "Zapier", resourceCategory: "Automation", position: 5 },
      { resourceName: "HubSpot CRM", resourceCategory: "Sales", position: 6 }
    ]
  },
  {
    title: "Get Your First Paying Client",
    slug: "first-paying-client",
    category: "Freelancing & Business",
    featured: true,
    description: "A laser-focused toolkit for developing a marketable skill, establishing credibility, and closing consistent client contracts.",
    items: [
      { ideaSlug: "remote-freelancing-agency", position: 1 },
      { resourceName: "Contra", resourceCategory: "Portfolio", position: 2 },
      { resourceName: "Apollo.io", resourceCategory: "Outreach", position: 3 },
      { resourceName: "Calendly", resourceCategory: "Scheduling", position: 4 },
      { resourceName: "LinkedIn", resourceCategory: "Networking", position: 5 }
    ]
  },
  {
    title: "The AI-Powered Creator",
    slug: "ai-powered-creator",
    category: "Artificial Intelligence",
    featured: true,
    description: "Harness modern artificial intelligence to accelerate research, scriptwriting, audio cleanup, and creative workflows.",
    items: [
      { ideaSlug: "youtube-career-launchpad", position: 1 },
      { ideaSlug: "podcast-launchpad", position: 2 },
      { resourceName: "ChatGPT", resourceCategory: "AI", position: 3 },
      { resourceName: "Adobe Podcast", resourceCategory: "Audio AI", position: 4 },
      { resourceName: "v0 by Vercel", resourceCategory: "Design AI", position: 5 }
    ]
  },
  {
    title: "Build in Public",
    slug: "build-in-public",
    category: "Community & Growth",
    featured: false,
    description: "Share transparent progress, validate features in the open, and build an authentic audience while shipping products.",
    items: [
      { ideaSlug: "micro-saas-launchpad", position: 1 },
      { resourceName: "Indie Hackers", resourceCategory: "Community", position: 2 },
      { resourceName: "Product Hunt", resourceCategory: "Launch", position: 3 },
      { resourceName: "beehiiv", resourceCategory: "Newsletter", position: 4 },
      { resourceName: "PostHog", resourceCategory: "Analytics", position: 5 }
    ]
  },
  {
    title: "Zero-Budget Launchpad",
    slug: "zero-budget-launchpad",
    category: "Bootstrapping",
    featured: true,
    description: "Start creating, building, and selling using only genuinely free software tools with zero upfront financial risk.",
    items: [
      { ideaSlug: "youtube-career-launchpad", position: 1 },
      { ideaSlug: "remote-freelancing-agency", position: 2 },
      { resourceName: "OBS Studio", resourceCategory: "Recording", position: 3 },
      { resourceName: "DaVinci Resolve", resourceCategory: "Video", position: 4 },
      { resourceName: "Audacity", resourceCategory: "Audio", position: 5 },
      { resourceName: "Google Docs", resourceCategory: "Docs", position: 6 }
    ]
  },
  {
    title: "Remote Work & Digital Careers",
    slug: "remote-work-digital-careers",
    category: "Career & Work",
    featured: false,
    description: "Build a location-independent professional presence and master the modern tooling required for remote work excellence.",
    items: [
      { ideaSlug: "remote-freelancing-agency", position: 1 },
      { resourceName: "Slack", resourceCategory: "Communication", position: 2 },
      { resourceName: "Loom", resourceCategory: "Async Video", position: 3 },
      { resourceName: "ClickUp", resourceCategory: "Task Management", position: 4 },
      { resourceName: "Contra", resourceCategory: "Freelance", position: 5 }
    ]
  },
  {
    title: "Audience to Income",
    slug: "audience-to-income",
    category: "Monetization",
    featured: false,
    description: "Turn engaging content, specialized domain knowledge, and loyal viewers into diversified digital revenue streams.",
    items: [
      { ideaSlug: "digital-product-newsletter", position: 1 },
      { ideaSlug: "youtube-career-launchpad", position: 2 },
      { ideaSlug: "podcast-launchpad", position: 3 },
      { resourceName: "Gumroad", resourceCategory: "Digital Store", position: 4 },
      { resourceName: "Lemon Squeezy", resourceCategory: "Checkout", position: 5 },
      { resourceName: "Patreon", resourceCategory: "Memberships", position: 6 }
    ]
  },
  {
    title: "The One-Person Agency",
    slug: "one-person-agency",
    category: "Agencies & Consulting",
    featured: false,
    description: "Operate a high-margin digital service agency with automated client pipelines, async onboarding, and seamless delivery.",
    items: [
      { ideaSlug: "remote-freelancing-agency", position: 1 },
      { resourceName: "HubSpot CRM", resourceCategory: "CRM", position: 2 },
      { resourceName: "Calendly", resourceCategory: "Booking", position: 3 },
      { resourceName: "ClickUp", resourceCategory: "Project Management", position: 4 },
      { resourceName: "Loom", resourceCategory: "Client Demos", position: 5 }
    ]
  }
];
