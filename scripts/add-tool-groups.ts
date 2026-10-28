import fs from 'fs';
import path from 'path';

// Define the tool groups for each idea
const TOOL_GROUPS_BY_SLUG: Record<string, any[]> = {
  "youtube-career-launchpad": [
    {
      name: "SEO & Keyword Research",
      tag: "SEO",
      icon: "Search",
      description: "Discover high-retention video topics, analyze search competitors, and optimize metadata.",
      tools: [
        {
          name: "vidIQ",
          websiteUrl: "https://vidiq.com/",
          purpose: "Research video keywords, competition scores, daily content ideas, and search rank tracking.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "SEO & Keyword Research"
        },
        {
          name: "TubeBuddy",
          websiteUrl: "https://www.tubebuddy.com/",
          purpose: "A/B thumbnail testing, tag explorer, search diagnostics, and bulk video metadata management.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "SEO & Keyword Research"
        },
        {
          name: "Google Trends",
          websiteUrl: "https://trends.google.com/",
          purpose: "Track real search interest, spot rising seasonal queries, and analyze geographic interest.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "SEO & Keyword Research"
        },
        {
          name: "AnswerThePublic",
          websiteUrl: "https://answerthepublic.com/",
          purpose: "Harvest raw consumer questions ('how to', 'why', 'what is') for high-retention video hooks.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "SEO & Keyword Research"
        }
      ]
    },
    {
      name: "Thumbnails & Visual Branding",
      tag: "Thumbnails",
      icon: "Paintbrush",
      description: "Design click-worthy 1280x720 thumbnails, remove background distractions, and brand your channel.",
      tools: [
        {
          name: "Canva",
          websiteUrl: "https://www.canva.com/",
          purpose: "Design YouTube banners, 1280x720 thumbnails, and graphic overlays with thousands of templates.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Thumbnails & Visual Branding"
        },
        {
          name: "Remove.bg",
          websiteUrl: "https://www.remove.bg/",
          purpose: "1-click AI background removal for YouTube face cutouts, expressive reactions, and product stickers.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Thumbnails & Visual Branding"
        },
        {
          name: "PicWish",
          websiteUrl: "https://picwish.com/",
          purpose: "AI photo enhancer, background eraser, and unblur tool to make thumbnail portraits razor sharp.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Thumbnails & Visual Branding"
        },
        {
          name: "Previewed",
          websiteUrl: "https://previewed.app/",
          purpose: "Create 3D device mockups (smartphones, laptops) to showcase apps and websites in thumbnails.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Thumbnails & Visual Branding"
        },
        {
          name: "AutoDraw",
          websiteUrl: "https://www.autodraw.com/",
          purpose: "Fast AI-assisted sketching to generate custom icons, arrows, and doodles for thumbnail graphics.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Thumbnails & Visual Branding"
        }
      ]
    },
    {
      name: "Video Editing & Production",
      tag: "Video Editing",
      icon: "Film",
      description: "Cut footage, apply smooth pacing, add cinematic color grades, and format short-form clips.",
      tools: [
        {
          name: "DaVinci Resolve",
          websiteUrl: "https://www.blackmagicdesign.com/products/davinciresolve",
          purpose: "Hollywood-grade video editing, color correction, visual effects, and Fairlight audio post-production.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Video Editing & Production"
        },
        {
          name: "CapCut",
          websiteUrl: "https://www.capcut.com/",
          purpose: "Rapid desktop & mobile video editing with automated animated captions, trending effects, and vertical templates.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Video Editing & Production"
        },
        {
          name: "Screenity",
          websiteUrl: "https://screenity.io/",
          purpose: "Open-source screen recorder & annotation tool with camera bubble for engaging software walkthroughs.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Video Editing & Production"
        },
        {
          name: "Runway",
          websiteUrl: "https://runwayml.com/",
          purpose: "Generative AI video editing, green screen background removal, inpainting, and motion tracking.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Video Editing & Production"
        }
      ]
    },
    {
      name: "AI Video, Avatars & Voices",
      tag: "AI Tools",
      icon: "Bot",
      description: "Generate human-like voiceovers, script outlines, and AI avatar presentations.",
      tools: [
        {
          name: "ElevenLabs",
          websiteUrl: "https://elevenlabs.io/",
          purpose: "Lifelike AI voice generation, voice cloning, and emotional speech synthesis for professional narration.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "AI Video, Avatars & Voices"
        },
        {
          name: "HeyGen",
          websiteUrl: "https://www.heygen.com/",
          purpose: "Create realistic AI avatar presenter videos without needing a camera or physical studio setup.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "AI Video, Avatars & Voices"
        },
        {
          name: "ChatGPT",
          websiteUrl: "https://chatgpt.com/",
          purpose: "Brainstorm high-CTR titles, counter-intuitive hooks, complete video script outlines, and sponsorship pitches.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "AI Video, Avatars & Voices"
        },
        {
          name: "Perplexity",
          websiteUrl: "https://www.perplexity.ai/",
          purpose: "AI research assistant with real-time web citations to fact-check your video content and statistics.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "AI Video, Avatars & Voices"
        }
      ]
    },
    {
      name: "Audio & Screen Capture",
      tag: "Audio & Recording",
      icon: "Mic",
      description: "Capture high-frame-rate screen recordings, calibrate microphones, and master clean audio.",
      tools: [
        {
          name: "OBS Studio",
          websiteUrl: "https://obsproject.com/",
          purpose: "Free, open-source multi-source screen recorder, camera capture, and live-streaming software.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Audio & Screen Capture"
        },
        {
          name: "Audacity",
          websiteUrl: "https://www.audacityteam.org/",
          purpose: "Multi-track audio editor for noise reduction, EQ balancing, compression, and master export.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Audio & Screen Capture"
        },
        {
          name: "Adobe Podcast AI",
          websiteUrl: "https://podcast.adobe.com/",
          purpose: "AI audio enhancer that eliminates room echo and background noise to make cheap mics sound broadcast-grade.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Audio & Screen Capture"
        },
        {
          name: "Loom",
          websiteUrl: "https://www.loom.com/",
          purpose: "Quick screen and webcam recordings for tutorials, B-roll clips, and video explainers.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Audio & Screen Capture"
        }
      ]
    },
    {
      name: "Distribution, Planning & Monetization",
      tag: "Distribution & Growth",
      icon: "Share2",
      description: "Manage upload workflows, schedule promotional social teasers, and monetize viewers.",
      tools: [
        {
          name: "YouTube Studio",
          websiteUrl: "https://studio.youtube.com/",
          purpose: "Official channel control center for video uploads, end screens, community posts, and analytics.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Distribution, Planning & Monetization"
        },
        {
          name: "Buffer",
          websiteUrl: "https://buffer.com/",
          purpose: "Schedule promotional video clips and shorts across X, LinkedIn, Instagram, and TikTok.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Distribution, Planning & Monetization"
        },
        {
          name: "Notion",
          websiteUrl: "https://www.notion.com/",
          purpose: "Manage video production pipelines, script drafts, sponsorship deals, and content calendars.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Distribution, Planning & Monetization"
        },
        {
          name: "Buy Me a Coffee",
          websiteUrl: "https://www.buymeacoffee.com/",
          purpose: "Simple way for fans and viewers to support your channel with donations and memberships.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Distribution, Planning & Monetization"
        },
        {
          name: "Patreon",
          websiteUrl: "https://www.patreon.com/",
          purpose: "Tiered fan subscription platform for behind-the-scenes content, private Discord access, and exclusive downloads.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Distribution, Planning & Monetization"
        }
      ]
    }
  ],
  "micro-saas-launchpad": [
    {
      name: "Market Validation & Research",
      tag: "Validation",
      icon: "Search",
      description: "Verify genuine customer willingness to pay and analyze existing market alternatives.",
      tools: [
        {
          name: "Product Hunt",
          websiteUrl: "https://www.producthunt.com/",
          purpose: "Explore daily software launches, competitor feedback, and community sentiment.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Market Validation & Research"
        },
        {
          name: "Google Trends",
          websiteUrl: "https://trends.google.com/",
          purpose: "Validate search demand permanence and evaluate SaaS category interest.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Market Validation & Research"
        },
        {
          name: "Tally",
          websiteUrl: "https://tally.so/",
          purpose: "Build slick, free waitlists and customer validation surveys in minutes.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Market Validation & Research"
        },
        {
          name: "Indie Hackers",
          websiteUrl: "https://www.indiehackers.com/",
          purpose: "Discover verified bootstrapped SaaS revenue numbers, growth strategies, and unbundled software ideas.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Market Validation & Research"
        }
      ]
    },
    {
      name: "UI/UX & Prototyping",
      tag: "Design & UI",
      icon: "Paintbrush",
      description: "Design clean user flows, responsive application layouts, and clickable prototypes.",
      tools: [
        {
          name: "Figma",
          websiteUrl: "https://www.figma.com/",
          purpose: "The industry standard for responsive web app design, component systems, and clickable prototypes.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "UI/UX & Prototyping"
        },
        {
          name: "v0 by Vercel",
          websiteUrl: "https://v0.app/",
          purpose: "Generative AI UI tool that turns natural language descriptions into clean React and Tailwind CSS components.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "UI/UX & Prototyping"
        },
        {
          name: "Whimsical",
          websiteUrl: "https://whimsical.com/",
          purpose: "Fast flowcharts, user journey mapping, and wireframing for MVP architecture.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "UI/UX & Prototyping"
        },
        {
          name: "UI Colors",
          websiteUrl: "https://uicolors.app/",
          purpose: "Tailwind CSS color palette generator with instant dark mode shades and contrast previews.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "UI/UX & Prototyping"
        }
      ]
    },
    {
      name: "Full-Stack Development & Backend",
      tag: "Development",
      icon: "Code",
      description: "Build robust authentication, type-safe database schemas, and modern frontend interfaces.",
      tools: [
        {
          name: "Next.js",
          websiteUrl: "https://nextjs.org/",
          purpose: "Production React framework with server-side rendering, App Router, and server actions.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Full-Stack Development & Backend"
        },
        {
          name: "Supabase",
          websiteUrl: "https://supabase.com/",
          purpose: "Open-source Firebase alternative providing Postgres, Auth, instant APIs, and edge storage.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Full-Stack Development & Backend"
        },
        {
          name: "Prisma",
          websiteUrl: "https://www.prisma.io/",
          purpose: "Next-generation type-safe ORM for database migrations and queries in TypeScript.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Full-Stack Development & Backend"
        },
        {
          name: "Bubble",
          websiteUrl: "https://bubble.io/",
          purpose: "Visual no-code app builder for creating full-stack web applications without writing code.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Full-Stack Development & Backend"
        }
      ]
    },
    {
      name: "Cloud Hosting & CI/CD",
      tag: "Cloud & Ops",
      icon: "Cloud",
      description: "Deploy to global edge servers, manage source code, and automate previews.",
      tools: [
        {
          name: "Vercel",
          websiteUrl: "https://vercel.com/",
          purpose: "Zero-config edge deployment platform with preview branches, automated Git CI/CD, and global CDN.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Cloud Hosting & CI/CD"
        },
        {
          name: "GitHub",
          websiteUrl: "https://github.com/",
          purpose: "Source code repository management, issue tracking, and automated GitHub Actions workflows.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Cloud Hosting & CI/CD"
        },
        {
          name: "Cloudflare",
          websiteUrl: "https://www.cloudflare.com/",
          purpose: "DDoS protection, DNS management, and edge caching for high availability.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Cloud Hosting & CI/CD"
        }
      ]
    },
    {
      name: "Payments, Taxes & Billing",
      tag: "Payments",
      icon: "CreditCard",
      description: "Collect global subscriptions, handle international sales taxes, and manage invoices.",
      tools: [
        {
          name: "Lemon Squeezy",
          websiteUrl: "https://www.lemonsqueezy.com/",
          purpose: "Merchant of record handling global SaaS payments, subscriptions, and international sales taxes.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Payments, Taxes & Billing"
        },
        {
          name: "Stripe",
          websiteUrl: "https://stripe.com/",
          purpose: "Custom developer-first payment infrastructure for cards, wallets, and recurring billing.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Payments, Taxes & Billing"
        }
      ]
    },
    {
      name: "Analytics & Customer Engagement",
      tag: "Analytics & Chat",
      icon: "BarChart3",
      description: "Understand user retention, identify churn friction, and answer pre-sale questions.",
      tools: [
        {
          name: "PostHog",
          websiteUrl: "https://posthog.com/",
          purpose: "All-in-one product analytics, session recordings, feature flags, and conversion funnels.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Analytics & Customer Engagement"
        },
        {
          name: "Crisp",
          websiteUrl: "https://crisp.chat/",
          purpose: "Live chat and shared inbox to convert landing page visitors and provide instant user support.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Analytics & Customer Engagement"
        },
        {
          name: "Resend",
          websiteUrl: "https://resend.com/",
          purpose: "Modern developer email API for transactional emails, password resets, and welcome flows.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Analytics & Customer Engagement"
        }
      ]
    }
  ],
  "remote-freelancing-agency": [
    {
      name: "Marketplaces & Portfolios",
      tag: "Portfolio",
      icon: "Briefcase",
      description: "Showcase proof of work, collect client testimonials, and bid on high-budget projects.",
      tools: [
        {
          name: "Contra",
          websiteUrl: "https://contra.com/",
          purpose: "Commission-free freelance marketplace with integrated contracts, invoices, and portfolio showcase.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Marketplaces & Portfolios"
        },
        {
          name: "Framer",
          websiteUrl: "https://www.framer.com/",
          purpose: "Design and publish high-converting agency landing pages with interactive animations.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Marketplaces & Portfolios"
        },
        {
          name: "Upwork",
          websiteUrl: "https://www.upwork.com/",
          purpose: "Global talent marketplace to secure initial client contracts and build verified reviews.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Marketplaces & Portfolios"
        },
        {
          name: "Behance",
          websiteUrl: "https://www.behance.net/",
          purpose: "Showcase in-depth visual case studies and process breakdowns to attract corporate clients.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Marketplaces & Portfolios"
        }
      ]
    },
    {
      name: "Lead Generation & Prospecting",
      tag: "Lead Gen",
      icon: "Target",
      description: "Identify verified decision-makers, extract contact data, and craft outbound messages.",
      tools: [
        {
          name: "LinkedIn",
          websiteUrl: "https://www.linkedin.com/",
          purpose: "Connect directly with CEOs, marketing directors, and business decision-makers.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Lead Generation & Prospecting"
        },
        {
          name: "Apollo.io",
          websiteUrl: "https://www.apollo.io/",
          purpose: "B2B database to find verified work emails, phone numbers, and company firmographics.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Lead Generation & Prospecting"
        },
        {
          name: "ChatGPT",
          websiteUrl: "https://chatgpt.com/",
          purpose: "Draft personalized cold outreach messages, value propositions, and roleplay objection handling.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Lead Generation & Prospecting"
        }
      ]
    },
    {
      name: "Sales Calls & CRM",
      tag: "Sales & CRM",
      icon: "Calendar",
      description: "Automate discovery call bookings, track deal stages, and send scope-protected contracts.",
      tools: [
        {
          name: "Calendly",
          websiteUrl: "https://calendly.com/",
          purpose: "Eliminate email scheduling back-and-forth with automated discovery call booking links.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Sales Calls & CRM"
        },
        {
          name: "HubSpot CRM",
          websiteUrl: "https://www.hubspot.com/products/crm",
          purpose: "Track client leads, deal stages, and email opens in a free visual pipeline.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Sales Calls & CRM"
        },
        {
          name: "Google Docs",
          websiteUrl: "https://docs.google.com/",
          purpose: "Draft scope-protected proposals, deliverables checklists, and Master Service Agreements.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Sales Calls & CRM"
        }
      ]
    },
    {
      name: "Operations & Communication",
      tag: "Operations",
      icon: "Layers",
      description: "Manage client deliverables, eliminate unnecessary meetings, and coordinate tasks.",
      tools: [
        {
          name: "ClickUp",
          websiteUrl: "https://clickup.com/",
          purpose: "Manage client sprint boards, deliverables, milestones, and shared client progress dashboards.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Operations & Communication"
        },
        {
          name: "Loom",
          websiteUrl: "https://www.loom.com/",
          purpose: "Replace lengthy meetings with asynchronous video walkthroughs and milestone updates.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Operations & Communication"
        },
        {
          name: "Slack",
          websiteUrl: "https://slack.com/",
          purpose: "Real-time communication channels with dedicated guest access for agency clients.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Operations & Communication"
        }
      ]
    },
    {
      name: "Invoicing & Global Finance",
      tag: "Invoicing",
      icon: "DollarSign",
      description: "Send professional invoices, accept credit cards, and convert foreign currency.",
      tools: [
        {
          name: "Stripe Invoicing",
          websiteUrl: "https://stripe.com/invoicing",
          purpose: "Send professional branded invoices and accept credit cards and bank transfers.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Invoicing & Global Finance"
        },
        {
          name: "Wise",
          websiteUrl: "https://wise.com/",
          purpose: "Receive international client payments with low fees and real mid-market exchange rates.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Invoicing & Global Finance"
        }
      ]
    }
  ],
  "podcast-launchpad": [
    {
      name: "Studio Recording & Audio AI",
      tag: "Recording & AI",
      icon: "Mic",
      description: "Capture high-resolution local audio/video and polish voice tracks to broadcast standards.",
      tools: [
        {
          name: "Riverside.fm",
          websiteUrl: "https://riverside.fm/",
          purpose: "Studio-quality remote audio/video recording with local uncompressed tracks.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Studio Recording & Audio AI"
        },
        {
          name: "Audacity",
          websiteUrl: "https://www.audacityteam.org/",
          purpose: "Free open-source audio editor for multitrack editing, noise reduction, and mastering.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Studio Recording & Audio AI"
        },
        {
          name: "Adobe Podcast AI",
          websiteUrl: "https://podcast.adobe.com/",
          purpose: "AI voice enhancement that turns cheap mic recordings into professional sound booth audio.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Studio Recording & Audio AI"
        },
        {
          name: "OBS Studio",
          websiteUrl: "https://obsproject.com/",
          purpose: "Record multi-source video podcasts and live stream episodes to YouTube and Twitch.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Studio Recording & Audio AI"
        }
      ]
    },
    {
      name: "Cover Art & Audiograms",
      tag: "Visuals",
      icon: "Paintbrush",
      description: "Design Apple Podcasts compliant 3000x3000px artwork and generate bite-sized video teasers.",
      tools: [
        {
          name: "Canva",
          websiteUrl: "https://www.canva.com/",
          purpose: "Design 3000x3000px podcast cover art, guest announcement cards, and episode banners.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Cover Art & Audiograms"
        },
        {
          name: "Figma",
          websiteUrl: "https://www.figma.com/",
          purpose: "Vector design tool for episode templates and branded social media cards.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Cover Art & Audiograms"
        },
        {
          name: "CapCut",
          websiteUrl: "https://www.capcut.com/",
          purpose: "Create 9:16 short clips with automated animated subtitles for TikTok, Reels, and Shorts.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Cover Art & Audiograms"
        }
      ]
    },
    {
      name: "Hosting, RSS Feeds & Syndication",
      tag: "Hosting & RSS",
      icon: "Radio",
      description: "Distribute your show across Spotify, Apple Podcasts, Amazon Music, and YouTube.",
      tools: [
        {
          name: "Spotify for Creators",
          websiteUrl: "https://creators.spotify.com/",
          purpose: "100% free podcast hosting with video podcast support and automatic distribution to Apple and Spotify.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Hosting, RSS Feeds & Syndication"
        },
        {
          name: "Buzzsprout",
          websiteUrl: "https://www.buzzsprout.com/",
          purpose: "Dedicated podcast hosting with automatic audio mastering, episode chapters, and analytics.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Hosting, RSS Feeds & Syndication"
        },
        {
          name: "YouTube Studio",
          websiteUrl: "https://studio.youtube.com/",
          purpose: "Upload video podcasts to tap into YouTube's dedicated Podcasts tab and algorithmic discovery.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Hosting, RSS Feeds & Syndication"
        }
      ]
    },
    {
      name: "Audience Growth & Monetization",
      tag: "Growth & Revenue",
      icon: "Users",
      description: "Collect listener emails, schedule social promotion, and offer premium subscriber perks.",
      tools: [
        {
          name: "Kit (formerly ConvertKit)",
          websiteUrl: "https://kit.com/",
          purpose: "Capture listener emails and send weekly episode recaps with sponsor shoutouts.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Audience Growth & Monetization"
        },
        {
          name: "Buffer",
          websiteUrl: "https://buffer.com/",
          purpose: "Automate social media teaser posts and quote graphics across multiple platforms.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Audience Growth & Monetization"
        },
        {
          name: "Patreon",
          websiteUrl: "https://www.patreon.com/",
          purpose: "Deliver ad-free private RSS feeds, bonus episodes, and Q&A sessions for paid members.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Audience Growth & Monetization"
        }
      ]
    }
  ],
  "digital-product-newsletter": [
    {
      name: "Product Creation & Packaging",
      tag: "Product Creation",
      icon: "FileText",
      description: "Create premium Notion templates, downloadable PDF playbooks, and educational guides.",
      tools: [
        {
          name: "Notion",
          websiteUrl: "https://www.notion.com/",
          purpose: "Build high-converting workspace templates, operational systems, and databases to sell.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Product Creation & Packaging"
        },
        {
          name: "Canva",
          websiteUrl: "https://www.canva.com/",
          purpose: "Design 3D digital product covers, PDF workbooks, cheatsheets, and promotional banners.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Product Creation & Packaging"
        },
        {
          name: "Google Docs",
          websiteUrl: "https://docs.google.com/",
          purpose: "Author comprehensive e-books, SOP guides, and customer onboarding documentation.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Product Creation & Packaging"
        }
      ]
    },
    {
      name: "Newsletter & Email Platforms",
      tag: "Newsletters",
      icon: "Mail",
      description: "Build an algorithm-proof direct audience with referral rewards and sponsorship opportunities.",
      tools: [
        {
          name: "beehiiv",
          websiteUrl: "https://www.beehiiv.com/",
          purpose: "Modern newsletter growth platform with built-in referral programs, SEO archives, and ad monetization.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Newsletter & Email Platforms"
        },
        {
          name: "Substack",
          websiteUrl: "https://substack.com/",
          purpose: "Simple publishing platform with strong built-in peer recommendations to jumpstart readership.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Newsletter & Email Platforms"
        },
        {
          name: "Kit (formerly ConvertKit)",
          websiteUrl: "https://kit.com/",
          purpose: "Deliver lead magnets automatically, segment buyers, and create email sales sequences.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Newsletter & Email Platforms"
        }
      ]
    },
    {
      name: "Storefronts & Checkouts",
      tag: "Storefronts",
      icon: "ShoppingBag",
      description: "Host checkout pages, process credit cards worldwide, and instantly deliver digital downloads.",
      tools: [
        {
          name: "Gumroad",
          websiteUrl: "https://gumroad.com/",
          purpose: "The simplest platform to sell digital templates, files, and licenses with zero coding.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Storefronts & Checkouts"
        },
        {
          name: "Lemon Squeezy",
          websiteUrl: "https://www.lemonsqueezy.com/",
          purpose: "Merchant of record handling international payment processing, EU VAT, and digital delivery.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Storefronts & Checkouts"
        },
        {
          name: "Carrd",
          websiteUrl: "https://carrd.co/",
          purpose: "Create ultra-responsive, beautiful one-page landing sales pages with fast load times.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Storefronts & Checkouts"
        }
      ]
    },
    {
      name: "Marketing, Social & Automations",
      tag: "Automations",
      icon: "Zap",
      description: "Automate sales delivery pipelines, schedule educational threads, and measure conversion.",
      tools: [
        {
          name: "Buffer",
          websiteUrl: "https://buffer.com/",
          purpose: "Repurpose newsletter insights into Twitter/X threads and LinkedIn carousels on schedule.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Marketing, Social & Automations"
        },
        {
          name: "Zapier",
          websiteUrl: "https://zapier.com/",
          purpose: "Automate actions between Gumroad, beehiiv, Notion, and email lists without code.",
          pricingModel: "Freemium",
          hasFreeTier: true,
          isEssential: true,
          groupName: "Marketing, Social & Automations"
        },
        {
          name: "Google Analytics",
          websiteUrl: "https://analytics.google.com/",
          purpose: "Track sales conversions, landing page traffic, and top referring marketing channels.",
          pricingModel: "Free",
          hasFreeTier: true,
          isEssential: false,
          groupName: "Marketing, Social & Automations"
        }
      ]
    }
  ]
};

// Update src/data/implement-ideas-data.ts
const targetFile = path.resolve('src/data/implement-ideas-data.ts');
let content = fs.readFileSync(targetFile, 'utf8');

for (const [slug, groups] of Object.entries(TOOL_GROUPS_BY_SLUG)) {
  const slugRegex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?phases:\\s*\\[`);
  const match = content.match(slugRegex);
  if (match) {
    const formattedGroups = `toolGroups: ${JSON.stringify(groups, null, 2)},\n    phases: [`;
    content = content.replace(match[0], match[0].replace('phases: [', formattedGroups));
    console.log(`Updated idea ${slug} with ${groups.length} tool groups.`);
  } else {
    console.error(`Could not match slug: ${slug}`);
  }
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated src/data/implement-ideas-data.ts');
