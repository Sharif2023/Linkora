export interface LinkItem {
  title: string;
  url: string;
  category: string;
  description: string;
  banglaDescription?: string;
  tags: string[];
}

export const CATEGORIES = [
  {
    "id": "all",
    "label": "All Links"
  },
  {
    "id": "ai-assistants-research",
    "label": "🤖 AI Assistants, Research & General AI"
  },
  {
    "id": "ai-coding-builders",
    "label": "💻 AI Coding & Website Builders"
  },
  {
    "id": "ui-design-frontend",
    "label": "🎨 UI, Design & Frontend Resources"
  },
  {
    "id": "animation-motion",
    "label": "✨ Animation & Motion"
  },
  {
    "id": "ai-image-generation",
    "label": "🖼️ AI Image Generation & Editing"
  },
  {
    "id": "ai-video-avatar",
    "label": "🎬 AI Video & Avatar Tools"
  },
  {
    "id": "music-audio",
    "label": "🎵 Music & Audio"
  },
  {
    "id": "video-screen-recording",
    "label": "📹 Video, Screen Recording & Content"
  },
  {
    "id": "learning-dev-resources",
    "label": "📚 Learning & Developer Resources"
  },
  {
    "id": "productivity-marketing-business",
    "label": "📊 Productivity, Marketing & Business"
  },
  {
    "id": "website-security-utilities",
    "label": "🧪 Website & Security Utilities"
  },
  {
    "id": "food-everyday-utilities",
    "label": "🍳 Food & Everyday Utilities"
  },
  {
    "id": "games-entertainment",
    "label": "🎮 Games & Entertainment"
  },
  {
    "id": "testing-dev-utilities",
    "label": "🏦 Testing & Developer Utilities"
  },
  {
    "id": "ai-companions",
    "label": "🤝 AI Companions & Personal Assistance"
  },
  {
    "id": "miscellaneous-tools",
    "label": "🧰 Miscellaneous Useful Tools"
  }
];

export const linkCollections: LinkItem[] = [
  {
    "title": "Eraser",
    "url": "https://www.eraser.io/",
    "category": "productivity-marketing-business",
    "description": "Whiteboard and diagramming tool for engineering teams",
    "tags": [
      "Whiteboard",
      "Diagrams"
    ]
  },
  {
    "title": "Miro",
    "url": "https://miro.com/",
    "category": "productivity-marketing-business",
    "description": "Visual workspace for innovation and team collaboration",
    "tags": [
      "Whiteboard",
      "Collaboration"
    ]
  },
  {
    "title": "Lucidchart",
    "url": "https://lucid.co/lucidchart",
    "category": "productivity-marketing-business",
    "description": "Intelligent diagramming application for complex workflows",
    "tags": [
      "Diagrams",
      "Flowcharts"
    ]
  },
  {
    "title": "ChatGPT",
    "url": "https://chatgpt.com/",
    "category": "ai-assistants-research",
    "description": "Solve problems and general AI assistance",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Claude",
    "url": "https://claude.ai/",
    "category": "ai-assistants-research",
    "description": "Solve problems and advanced AI assistance",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Perplexity",
    "url": "https://perplexity.ai/",
    "category": "ai-assistants-research",
    "description": "Research anything",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Poe",
    "url": "https://poe.com/",
    "category": "ai-assistants-research",
    "description": "Access multiple AI models for free",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Arena AI",
    "url": "https://arena.ai/",
    "category": "ai-assistants-research",
    "description": "All AI Tool at free (build agentic website, upload img/pdf, image/video maker)",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "NotebookLM",
    "url": "https://notebooklm.google.com/",
    "category": "ai-assistants-research",
    "description": "Perfect note of Research, summarize and create podcasts from sources",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Manus",
    "url": "https://manus.im/",
    "category": "ai-assistants-research",
    "description": "AI agent for coding and tasks for any app",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Magai",
    "url": "https://magai.ai/",
    "category": "ai-assistants-research",
    "description": "Use multiple AI models in one place",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Fastpedia",
    "url": "https://fastpedia.io/",
    "category": "ai-assistants-research",
    "description": "Discover Best list of AI tools",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "AIxploria",
    "url": "https://aixploria.com/en/",
    "category": "ai-assistants-research",
    "description": "Directory of 5,000+ AI tools",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Outlier School AI Toolkit",
    "url": "https://outlierschool.com/resources/b2f4b5dc",
    "category": "ai-assistants-research",
    "description": "0946 — 49e9 — a7e4 — 0b8e6d1d995c — 190+ free AI tools",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Bytez",
    "url": "https://bytez.com/",
    "category": "ai-assistants-research",
    "description": "AI models and APIs",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "SharedChat",
    "url": "https://sharedchat.cn/",
    "category": "ai-assistants-research",
    "description": "Free Pro AI tools and models",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Unsecured API Keys",
    "url": "https://unsecuredapikeys.com/",
    "category": "ai-assistants-research",
    "description": "Public API key discovery",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Oxaam",
    "url": "https://www.oxaam.com/",
    "category": "ai-assistants-research",
    "description": "Pro subscribed free ai tools",
    "tags": [
      "AI Chat",
      "Research"
    ]
  },
  {
    "title": "Lovable",
    "url": "https://lovable.dev/",
    "category": "ai-coding-builders",
    "description": "Build websites and applications with AI (•\tCode: NEXTPLAY-LOV-25)",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Stitch",
    "url": "https://stitch.withgoogle.com/",
    "category": "ai-coding-builders",
    "description": "Generate UIs for mobile and web applications with AI",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "v0",
    "url": "https://v0.dev/",
    "category": "ai-coding-builders",
    "description": "Generate frontend UI and website mockups",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Blink",
    "url": "https://blink.new/",
    "category": "ai-coding-builders",
    "description": "Custom AI Build high — quality websites and apps",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Emergent",
    "url": "https://app.emergent.sh/",
    "category": "ai-coding-builders",
    "description": "Build interactive applications and 3D websites",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Flames",
    "url": "https://www.flames.blue/",
    "category": "ai-coding-builders",
    "description": "Turn simple prompts into fully polished functional websites",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "DeepSite",
    "url": "https://enzostvs-deepsite.hf.space/",
    "category": "ai-coding-builders",
    "description": "AI website builder",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "CreateAnything",
    "url": "https://createanything.com/",
    "category": "ai-coding-builders",
    "description": "Create apps and websites with AI",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Locofy",
    "url": "https://www.locofy.ai/",
    "category": "ai-coding-builders",
    "description": "Convert designs into React, Next.js, HTML and Tailwind code",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Uizard",
    "url": "https://uizard.io/",
    "category": "ai-coding-builders",
    "description": "Convert hand written sketches into UI mockups",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Anima",
    "url": "https://animaapp.com/",
    "category": "ai-coding-builders",
    "description": "Convert designs into code",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Galileo AI",
    "url": "https://galileo.ai/",
    "category": "ai-coding-builders",
    "description": "AI — powered UI and design generation",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Codeium",
    "url": "https://codeium.com/",
    "category": "ai-coding-builders",
    "description": "AI coding assistant and coding agent (VS code extension)",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "TypingMind",
    "url": "https://www.typingmind.com/",
    "category": "ai-coding-builders",
    "description": "AI interface and AI productivity tool",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Vercel AI SDK",
    "url": "AI SDK for building AI",
    "category": "ai-coding-builders",
    "description": "powered applications",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Penpot",
    "url": "https://penpot.app/",
    "category": "ai-coding-builders",
    "description": "Open — source design tool with AI plugins",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "gstack",
    "url": "https://github.com/garrytan/gstack",
    "category": "ai-coding-builders",
    "description": "Tell Claude to install then coding like Pro",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "OriginKit",
    "url": "https://originkit.dev/",
    "category": "ai-coding-builders",
    "description": "Free premium — looking customizable React components",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "PostgREST",
    "url": "https://github.com/PostgREST/postgrest",
    "category": "ai-coding-builders",
    "description": "Automatically create REST APIs from PostgreSQL",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "n8n",
    "url": "https://n8n.io/",
    "category": "ai-coding-builders",
    "description": "Workflow and AI — agent automation",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "Coolify",
    "url": "https://coolify.io/",
    "category": "ai-coding-builders",
    "description": "Self — host and deploy applications",
    "tags": [
      "Coding",
      "AI Web Builder"
    ]
  },
  {
    "title": "shadcn/ui",
    "url": "https://ui.shadcn.com/",
    "category": "ui-design-frontend",
    "description": "Ready — to — use UI components",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Uiverse",
    "url": "https://uiverse.io/",
    "category": "ui-design-frontend",
    "description": "Largest Open — source UI component library",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "React Bits",
    "url": "https://reactbits.dev/",
    "category": "ui-design-frontend",
    "description": "Animated React components",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "UI Colors",
    "url": "https://uicolors.app/",
    "category": "ui-design-frontend",
    "description": "Generate color palettes and shades",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "ReIcon",
    "url": "https://reicon.dev/",
    "category": "ui-design-frontend",
    "description": "Icon library",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Logos",
    "url": "https://logos.lndev.me/",
    "category": "ui-design-frontend",
    "description": "Free SVG logos",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Lordicon",
    "url": "https://lordicon.com/",
    "category": "ui-design-frontend",
    "description": "Animated icons",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Originkit",
    "url": "https://originkit.dev/",
    "category": "ui-design-frontend",
    "description": "Premium React components",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "AnimMasterLib",
    "url": "https://animmasterlib.dev/",
    "category": "ui-design-frontend",
    "description": "Premium animated website components",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Previewed",
    "url": "https://previewed.app/",
    "category": "ui-design-frontend",
    "description": "Create device mockups and animations",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "DesignMD",
    "url": "https://designmd.me/",
    "category": "ui-design-frontend",
    "description": "Describe and explore website design styles",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Storyset",
    "url": "https://storyset.com/",
    "category": "ui-design-frontend",
    "description": "Free illustrations",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Canva",
    "url": "https://canva.com/",
    "category": "ui-design-frontend",
    "description": "Graphic design and content creation",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "PicWish",
    "url": "https://picwish.com/",
    "category": "ui-design-frontend",
    "description": "AI photo editing",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "Remove.bg",
    "url": "https://remove.bg/",
    "category": "ui-design-frontend",
    "description": "Remove image backgrounds",
    "tags": [
      "UI components",
      "Design"
    ]
  },
  {
    "title": "UI Ball",
    "url": "https://uiball.com/",
    "category": "animation-motion",
    "description": "Animation/loading components",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "Anime.js",
    "url": "https://animejs.com/",
    "category": "animation-motion",
    "description": "Animation engine",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "Video Effects",
    "url": "https://videoeffects.com/",
    "category": "animation-motion",
    "description": "Video effects",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "MotionVid",
    "url": "https://motionvid.ai/",
    "category": "animation-motion",
    "description": "Create professional motion graphics",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "EyeCandy",
    "url": "https://eyecannndy.com/",
    "category": "animation-motion",
    "description": "Video effects",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "Atomanimation",
    "url": "https://atomanimation.com/",
    "category": "animation-motion",
    "description": "Atom Animation resources",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "Paper Animator",
    "url": "https://paperanimator.com/",
    "category": "animation-motion",
    "description": "Create text — cut videos",
    "tags": [
      "Animation",
      "CSS"
    ]
  },
  {
    "title": "Midjourney",
    "url": "https://midjourney.com/",
    "category": "ai-image-generation",
    "description": "Generate professional AI artwork",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Runable",
    "url": "https://runable.com/",
    "category": "ai-image-generation",
    "description": "Generate images and videos",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Lovart",
    "url": "https://lovart.ai/",
    "category": "ai-image-generation",
    "description": "AI graphic design",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "ApoB",
    "url": "https://apob.ai/",
    "category": "ai-image-generation",
    "description": "Image conversion/generation",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "FastPhoto",
    "url": "https://fastphoto.io/",
    "category": "ai-image-generation",
    "description": "Generate professional AI headshots",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "HairStyle AI Changer",
    "url": "https://hairstyleaichanger.com/",
    "category": "ai-image-generation",
    "description": "Change hairstyles with AI",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "AutoDraw",
    "url": "https://autodraw.com/",
    "category": "ai-image-generation",
    "description": "Turn rough sketches into drawings",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Backflip",
    "url": "https://backflip.ai/",
    "category": "ai-image-generation",
    "description": "Create 3D objects from text",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Napkin AI",
    "url": "https://napkin.ai/",
    "category": "ai-image-generation",
    "description": "Turn ideas/text into visual diagrams",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Infography",
    "url": "https://infography.in/",
    "category": "ai-image-generation",
    "description": "Convert articles into infographics",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "AdCreative.ai",
    "url": "https://adcreative.ai/",
    "category": "ai-image-generation",
    "description": "Generate advertising creatives",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Predis AI",
    "url": "https://predis.ai/",
    "category": "ai-image-generation",
    "description": "Generate social media advertisements",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Fastread",
    "url": "https://fastread.io/",
    "category": "ai-image-generation",
    "description": "AI ebook creation",
    "tags": [
      "AI Art",
      "Editor"
    ]
  },
  {
    "title": "Runway",
    "url": "https://runway.ml/",
    "category": "ai-video-avatar",
    "description": "AI video generation and editing",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "HeyGen",
    "url": "https://heygen.com/",
    "category": "ai-video-avatar",
    "description": "AI avatar videos",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Suno",
    "url": "https://suno.com/",
    "category": "ai-video-avatar",
    "description": "AI music and songs",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Soundraw",
    "url": "https://soundraw.io/",
    "category": "ai-video-avatar",
    "description": "Generate music",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "MusicGPT",
    "url": "https://musicgpt.com/",
    "category": "ai-video-avatar",
    "description": "Generate music with AI",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "AIVA",
    "url": "https://aiva.ai/",
    "category": "ai-video-avatar",
    "description": "AI music composition",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Submagic",
    "url": "https://submagic.co/",
    "category": "ai-video-avatar",
    "description": "Turn long videos into engaging shorts",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Clueso",
    "url": "https://clueso.io/",
    "category": "ai-video-avatar",
    "description": "Create product videos",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Syllaby",
    "url": "https://syllaby.io/",
    "category": "ai-video-avatar",
    "description": "Create faceless videos",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Voicebox",
    "url": "https://voicebox.sh/",
    "category": "ai-video-avatar",
    "description": "AI voice cloning",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "ElevenLabs",
    "url": "https://elevenlabs.io/",
    "category": "ai-video-avatar",
    "description": "AI voice generation and cloning",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Cartesia",
    "url": "https://play.cartesia.ai/",
    "category": "ai-video-avatar",
    "description": "AI voice generation and cloning (if credit limit end then delete and create new organization)",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Luma AI",
    "url": "https://luma.ai/",
    "category": "ai-video-avatar",
    "description": "Generate 3D content and videos",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "Baidu",
    "url": "https://www.baidu.com/",
    "category": "ai-video-avatar",
    "description": "each day free 10 ai videos",
    "tags": [
      "AI Video",
      "Voice Clone"
    ]
  },
  {
    "title": "MyInstants",
    "url": "https://www.myinstants.com/",
    "category": "music-audio",
    "description": "Meme sounds and music",
    "tags": [
      "AI Music",
      "Sound"
    ]
  },
  {
    "title": "Vocal Remover",
    "url": "https://vocalremover.org/",
    "category": "music-audio",
    "description": "Remove vocals from music",
    "tags": [
      "AI Music",
      "Sound"
    ]
  },
  {
    "title": "Screenity",
    "url": "https://screenity.io/",
    "category": "video-screen-recording",
    "description": "Record videos with drawing/annotation",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "RecCloud",
    "url": "https://reccloud.com/",
    "category": "video-screen-recording",
    "description": "Summarize YouTube videos",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "Youmind",
    "url": "http://Youmind.com",
    "category": "video-screen-recording",
    "description": "Summarize YouTube videos",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "Descript",
    "url": "https://descript.com/",
    "category": "video-screen-recording",
    "description": "Edit podcasts and videos",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "Skysnail",
    "url": "https://skysnail.io/",
    "category": "video-screen-recording",
    "description": "Create viral thumbnails",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "Window Swap",
    "url": "http://window-swap.com/",
    "category": "video-screen-recording",
    "description": "View cc camera scenes from cameras around the world",
    "tags": [
      "Recorder",
      "Video"
    ]
  },
  {
    "title": "wikiHow",
    "url": "https://wikihow.com/",
    "category": "learning-dev-resources",
    "description": "Learn how to do things through tutorials",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "Class Central",
    "url": "https://classcentral.com/",
    "category": "learning-dev-resources",
    "description": "Find online courses and certificates",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "Loecsen",
    "url": "https://loecsen.com/",
    "category": "learning-dev-resources",
    "description": "Learn languages",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "Learn Anything",
    "url": "https://learn-anything.xyz/",
    "category": "learning-dev-resources",
    "description": "Learn topics step by step",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "DevDocs",
    "url": "https://devdocs.io/",
    "category": "learning-dev-resources",
    "description": "Documentation for programming languages and frameworks",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "iFixit",
    "url": "https://ifixit.com/",
    "category": "learning-dev-resources",
    "description": "Hardware repair guides",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "FreeCodeCamp",
    "url": "https://freecodecamp.org/",
    "category": "learning-dev-resources",
    "description": "Learn programming and development",
    "tags": [
      "Education",
      "Guides"
    ]
  },
  {
    "title": "Grammarly",
    "url": "https://grammarly.com/",
    "category": "productivity-marketing-business",
    "description": "Improve writing",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "SlidesAI",
    "url": "https://slidesai.io/",
    "category": "productivity-marketing-business",
    "description": "Generate presentation slides",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Beautiful.ai",
    "url": "https://beautiful.ai/",
    "category": "productivity-marketing-business",
    "description": "Create presentations",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "ResumeEnhance",
    "url": "https://resumeenhance.com/",
    "category": "productivity-marketing-business",
    "description": "Improve resumes with AI",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "CopyOwl",
    "url": "https://copyowl.ai/",
    "category": "productivity-marketing-business",
    "description": "AI research and content creation",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "KeywordSearch",
    "url": "https://keywordsearch.com/",
    "category": "productivity-marketing-business",
    "description": "Improve advertising conversion",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "BrandButler",
    "url": "https://brandbutler.ai/",
    "category": "productivity-marketing-business",
    "description": "Personalized branding",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Ranked AI",
    "url": "https://ranked.ai/",
    "category": "productivity-marketing-business",
    "description": "SEO and website ranking",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Lemlist",
    "url": "https://lemlist.com/",
    "category": "productivity-marketing-business",
    "description": "Lead generation and outreach",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Beehiiv",
    "url": "https://beehiiv.com/",
    "category": "productivity-marketing-business",
    "description": "Newsletter platform",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "GoHighLevel",
    "url": "https://gohighlevel.com/",
    "category": "productivity-marketing-business",
    "description": "Marketing and automation",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Sociable",
    "url": "https://sociable.how/",
    "category": "productivity-marketing-business",
    "description": "Generate social media content",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "ThreadMaster",
    "url": "https://threadmaster.ai/",
    "category": "productivity-marketing-business",
    "description": "Generate social media threads",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Yoinkit",
    "url": "https://yoinkit.ai/",
    "category": "productivity-marketing-business",
    "description": "Transform content into viral content",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "WebinarKit",
    "url": "https://webinarkit.com/",
    "category": "productivity-marketing-business",
    "description": "AI — powered webinar creation",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "CreatorUnlock",
    "url": "https://creatorunlock.com/",
    "category": "productivity-marketing-business",
    "description": "AI tools for YouTubers",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Sintra AI",
    "url": "https://sintra.ai/",
    "category": "productivity-marketing-business",
    "description": "Build teams of AI agents",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "LiveX AI",
    "url": "https://livex.ai/",
    "category": "productivity-marketing-business",
    "description": "AI customer — retention agents",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Revatto",
    "url": "https://revatto.com/",
    "category": "productivity-marketing-business",
    "description": "Reduce customer churn",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Skala",
    "url": "https://skala.io/",
    "category": "productivity-marketing-business",
    "description": "Legal platform for startups",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Web Check",
    "url": "https://web-check.xyz/",
    "category": "website-security-utilities",
    "description": "Deep scan websites",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "Neapay",
    "url": "https://neapay.com/",
    "category": "website-security-utilities",
    "description": "Fake/test bank card number generator",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "Prankshit",
    "url": "https://prankshit.com/",
    "category": "website-security-utilities",
    "description": "Create fake app screenshots",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "WiFi Map",
    "url": "https://wifimap.io/",
    "category": "website-security-utilities",
    "description": "Find public Wi — Fi hotspots",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "Globfone",
    "url": "https://globfone.com/send",
    "category": "website-security-utilities",
    "description": "text/ — Send free online messages",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "Snowglobe",
    "url": "https://snowglobe.so/",
    "category": "website-security-utilities",
    "description": "Simulate user testing",
    "tags": [
      "Security",
      "Network"
    ]
  },
  {
    "title": "MyFridgeFood",
    "url": "https://myfridgefood.com/",
    "category": "food-everyday-utilities",
    "description": "Find recipes based on ingredients",
    "tags": [
      "Lifestyle",
      "Food"
    ]
  },
  {
    "title": "Abeto Messenger Game",
    "url": "https://messenger.abeto.co/",
    "category": "games-entertainment",
    "description": "Browser game",
    "tags": [
      "Game",
      "Media"
    ]
  },
  {
    "title": "Vudu",
    "url": "https://www.vudu.com/",
    "category": "games-entertainment",
    "description": "Alternative to Netflix",
    "tags": [
      "Game",
      "Media"
    ]
  },
  {
    "title": "Replika",
    "url": "https://replika.ai/",
    "category": "ai-companions",
    "description": "AI virtual companion",
    "tags": [
      "AI Chat",
      "Advice"
    ]
  },
  {
    "title": "Ask Coach Ken",
    "url": "https://askcoachken.com/",
    "category": "ai-companions",
    "description": "Relationship advice and coaching",
    "tags": [
      "AI Chat",
      "Advice"
    ]
  },
  {
    "title": "Bibley",
    "url": "https://bibley.io/",
    "category": "ai-companions",
    "description": "AI assistant for Bible study",
    "tags": [
      "AI Chat",
      "Advice"
    ]
  },
  {
    "title": "Ora",
    "url": "https://ora.sh/",
    "category": "ai-companions",
    "description": "Alternative AI chat platform",
    "tags": [
      "AI Chat",
      "Advice"
    ]
  },
  {
    "title": "Tookfk",
    "url": "https://toolfk.com/",
    "category": "miscellaneous-tools",
    "description": "Multiple online tools",
    "tags": [
      "Utilities",
      "General"
    ]
  },
  {
    "title": "Hellowarrant.com",
    "url": "https://Hellowarrant.com",
    "category": "productivity-marketing-business",
    "description": "Maintain market compliance (•\thttps://kuse.ai — use chatgpt as whiteboard)",
    "tags": [
      "Marketing",
      "SEO"
    ]
  },
  {
    "title": "Blur It",
    "url": "https://blur-it.app",
    "category": "unlisted",
    "description": "Blur sensitive or personal information",
    "tags": [
      "Utilities",
      "General"
    ]
  },
  {
    "title": "jollymod.com",
    "url": "https://www.jollymod.com/",
    "category": "miscellaneous-tools",
    "description": "Mod apk files (•\t(example).gitreverse.(example) (made prompt for any website [not work for all] copies and make with lovable))",
    "tags": [
      "Utilities",
      "General"
    ]
  },
  {
    "title": "Google Gemini",
    "url": "https://gemini.google.com/",
    "category": "ai-assistants-research",
    "description": "Google's multimodal AI ecosystem.",
    "tags": []
  },
  {
    "title": "Monica.im",
    "url": "https://monica.im/",
    "category": "ai-assistants-research",
    "description": "Access pro AI models for free.",
    "tags": []
  },
  {
    "title": "Yupp.ai",
    "url": "https://yupp.ai/",
    "category": "ai-assistants-research",
    "description": "Directory providing access to free AI models.",
    "tags": []
  },
  {
    "title": "GenSpark",
    "url": "https://genspark.ai/",
    "category": "ai-assistants-research",
    "description": "Access pro-level AI research and tools for free.",
    "tags": []
  },
  {
    "title": "Chatbase",
    "url": "https://chatbase.co/",
    "category": "ai-assistants-research",
    "description": "Build custom AI chatbots trained on your own data.",
    "tags": []
  },
  {
    "title": "Sifuchat",
    "url": "https://sifuchat.com/",
    "category": "ai-assistants-research",
    "description": "Create and deploy your own AI chatbot.",
    "tags": []
  },
  {
    "title": "ChatPDF",
    "url": "https://chatpdf.com/",
    "category": "ai-assistants-research",
    "description": "Chat directly with any PDF document to extract information.",
    "tags": []
  },
  {
    "title": "Get Viktor",
    "url": "https://getviktor.com/",
    "category": "ai-assistants-research",
    "description": "AI employee integrated for your Slack community.",
    "tags": []
  },
  {
    "title": "Meigen.ai",
    "url": "https://meigen.ai/",
    "category": "ai-assistants-research",
    "description": "Library of ready-to-use AI prompts.",
    "tags": []
  },
  {
    "title": "ModelsLab",
    "url": "https://modelslab.com/",
    "category": "ai-assistants-research",
    "description": "Access over 1000 AI models for development and testing.",
    "tags": []
  },
  {
    "title": "Vengeance UI",
    "url": "https://www.vengeanceui.com/",
    "category": "ui-design-frontend",
    "description": "Next-gen UI interactions, hover effects, and animated tooltips.",
    "tags": []
  },
  {
    "title": "Ripplix",
    "url": "https://www.ripplix.com/",
    "category": "ui-design-frontend",
    "description": "UI animation and micro-interaction library.",
    "tags": []
  },
  {
    "title": "Flexbox Labs",
    "url": "https://flexboxlabs.netlify.app/",
    "category": "learning-dev-resources",
    "description": "Learn Flexbox and CSS Grid interactively with code.",
    "tags": []
  },
  {
    "title": "Staying.fun",
    "url": "https://staying.fun/",
    "category": "learning-dev-resources",
    "description": "Learn code snippets visually.",
    "tags": []
  },
  {
    "title": "Replit",
    "url": "https://replit.com/",
    "category": "ai-coding-builders",
    "description": "Online IDE with AI features (Vibe Coding) to write, run, and host code.",
    "tags": []
  },
  {
    "title": "10Web",
    "url": "https://10web.io/",
    "category": "ai-coding-builders",
    "description": "AI-powered rapid website builder.",
    "tags": []
  },
  {
    "title": "Get Maker AI",
    "url": "https://getmakerai.com/",
    "category": "ai-coding-builders",
    "description": "Build software (SaaS) without coding.",
    "tags": []
  },
  {
    "title": "OpenClaw",
    "url": "https://openclawengine.xyz/",
    "category": "ai-coding-builders",
    "description": "OpenClaw deployment engine.",
    "tags": []
  },
  {
    "title": "UptimeRobot",
    "url": "https://uptimerobot.com/",
    "category": "website-security-utilities",
    "description": "Monitor website uptime and keep serverless backends active.",
    "tags": []
  },
  {
    "title": "Studio Polotno",
    "url": "https://studio-polotno.com/",
    "category": "ui-design-frontend",
    "description": "A robust, free alternative to Canva.",
    "tags": []
  },
  {
    "title": "Adobe Firefly",
    "url": "https://firefly.adobe.com/",
    "category": "ai-image-generation",
    "description": "Enterprise-grade generative AI by Adobe.",
    "tags": []
  },
  {
    "title": "Ideogram",
    "url": "https://ideogram.ai/",
    "category": "ai-image-generation",
    "description": "Generate AI images with highly accurate text (ideal for thumbnails).",
    "tags": []
  },
  {
    "title": "Ni3.app",
    "url": "https://ni3.app/",
    "category": "ai-image-generation",
    "description": "Generate HD thumbnails directly from video titles.",
    "tags": []
  },
  {
    "title": "Recraft",
    "url": "https://recraft.ai/",
    "category": "ai-image-generation",
    "description": "Create scalable vector graphics, 3D elements, and AI posters.",
    "tags": []
  },
  {
    "title": "Flair",
    "url": "https://flair.ai/",
    "category": "ai-image-generation",
    "description": "AI design tool for branded product photography.",
    "tags": []
  },
  {
    "title": "Stockimg.ai",
    "url": "https://stockimg.ai/",
    "category": "ai-image-generation",
    "description": "Generate professional stock images and designs.",
    "tags": []
  },
  {
    "title": "Perchance",
    "url": "https://perchance.org/",
    "category": "ai-image-generation",
    "description": "Free, flexible AI image generator.",
    "tags": []
  },
  {
    "title": "Lovart",
    "url": "https://lovart.com/",
    "category": "ai-image-generation",
    "description": "Design graphics with AI assistance.",
    "tags": []
  },
  {
    "title": "Virtual Threads",
    "url": "https://virtualthreads.io/",
    "category": "ui-design-frontend",
    "description": "Create realistic 3D mockups of products.",
    "tags": []
  },
  {
    "title": "3DSVG Design",
    "url": "https://3dsvg.design/",
    "category": "animation-motion",
    "description": "Upload your 2D logo to make it 3D and animated.",
    "tags": []
  },
  {
    "title": "3D Logo Lab",
    "url": "https://3dlogolab.io/",
    "category": "animation-motion",
    "description": "Convert standard logos into 3D animations.",
    "tags": []
  },
  {
    "title": "Looka",
    "url": "https://looka.com/",
    "category": "productivity-marketing-business",
    "description": "AI-powered logo and brand design generator.",
    "tags": []
  },
  {
    "title": "Synthesia",
    "url": "https://synthesia.ai/",
    "category": "ai-video-avatar",
    "description": "Create professional AI videos from text.",
    "tags": []
  },
  {
    "title": "Vidnoz",
    "url": "https://vidnoz.com/",
    "category": "ai-video-avatar",
    "description": "Free AI talking avatars and video creation tools.",
    "tags": []
  },
  {
    "title": "ProfilePro",
    "url": "https://www.profilepro.ai/",
    "category": "ai-video-avatar",
    "description": "Create personalized AI avatars for profiles.",
    "tags": []
  },
  {
    "title": "Starry.ai",
    "url": "https://starryai.com/",
    "category": "ai-image-generation",
    "description": "Generate artistic AI avatars.",
    "tags": []
  },
  {
    "title": "Captions AI",
    "url": "https://www.captions.ai/",
    "category": "ai-video-avatar",
    "description": "Add auto-captions and edit talking-head videos seamlessly.",
    "tags": []
  },
  {
    "title": "Opus Pro",
    "url": "https://opus.pro/agent",
    "category": "ai-video-avatar",
    "description": "Generate engaging AI storytelling videos.",
    "tags": []
  },
  {
    "title": "Jogg.ai",
    "url": "https://jogg.ai/",
    "category": "ai-video-avatar",
    "description": "Turn product links into fast-forwarded video ads.",
    "tags": []
  },
  {
    "title": "Fliki",
    "url": "https://fliki.ai/",
    "category": "ai-video-avatar",
    "description": "Turn text scripts into videos and TikToks.",
    "tags": []
  },
  {
    "title": "Kling AI",
    "url": "https://klingai.com/",
    "category": "ai-video-avatar",
    "description": "High-quality Image-to-animation AI video generator.",
    "tags": []
  },
  {
    "title": "Hunyuan Video",
    "url": "https://hunyuanvideo.org/",
    "category": "ai-video-avatar",
    "description": "Tencent's AI image and video generator.",
    "tags": []
  },
  {
    "title": "Jitter",
    "url": "https://jitter.video/",
    "category": "animation-motion",
    "description": "Design and ship polished motion graphics and animations.",
    "tags": []
  },
  {
    "title": "Swishy",
    "url": "https://www.swishy.ai/",
    "category": "animation-motion",
    "description": "AI motion designer for stunning animations and typefaces.",
    "tags": []
  },
  {
    "title": "SpiritApp",
    "url": "https://spiritapp.io/",
    "category": "productivity-marketing-business",
    "description": "Marketing animation software for small businesses.",
    "tags": []
  },
  {
    "title": "Powtoon",
    "url": "https://powtoon.com/",
    "category": "animation-motion",
    "description": "Create animated explainer videos and presentations.",
    "tags": []
  },
  {
    "title": "Vmake",
    "url": "https://vmake.ai/",
    "category": "ai-video-avatar",
    "description": "Remove video backgrounds and watermarks using AI.",
    "tags": []
  },
  {
    "title": "Zlabz",
    "url": "https://zlabz.io/en",
    "category": "ai-video-avatar",
    "description": "Convert news/text into video formats.",
    "tags": []
  },
  {
    "title": "Higgsfield",
    "url": "https://higgsfield.ai/",
    "category": "ai-video-avatar",
    "description": "Specialized AI video visuals and generation.",
    "tags": []
  },
  {
    "title": "DupDub",
    "url": "https://dupdub.com/",
    "category": "music-audio",
    "description": "Instant voice clone offering multiple voices and emotional tones.",
    "tags": []
  },
  {
    "title": "Fish Audio",
    "url": "https://fish.audio/",
    "category": "music-audio",
    "description": "Accessible audio cloning and generation.",
    "tags": []
  },
  {
    "title": "Adobe Podcast Enhance",
    "url": "https://podcast.adobe.com/enhance",
    "category": "music-audio",
    "description": "Enhance low-quality voice recordings to studio quality.",
    "tags": []
  },
  {
    "title": "Wispr Flow",
    "url": "https://wisprflow.com/",
    "category": "music-audio",
    "description": "Super-fast, highly accurate speech-to-text dictation tool.",
    "tags": []
  },
  {
    "title": "Background Noise Remover",
    "url": "https://bit.ly/bgnoiseremover",
    "category": "music-audio",
    "description": "Free audio noise reduction tool.",
    "tags": []
  },
  {
    "title": "SeoBot AI",
    "url": "https://seobotai.com/",
    "category": "productivity-marketing-business",
    "description": "Autonomous AI SEO optimization to rank your website.",
    "tags": []
  },
  {
    "title": "BigSpy",
    "url": "https://bigged.com/spy",
    "category": "productivity-marketing-business",
    "description": "Spy on high-performing ads in any niche.",
    "tags": []
  },
  {
    "title": "ViralSky",
    "url": "https://viralsky.com/",
    "category": "productivity-marketing-business",
    "description": "Social media tool for creating viral posts.",
    "tags": []
  },
  {
    "title": "H-Supertools",
    "url": "https://h-supertools.com/",
    "category": "productivity-marketing-business",
    "description": "Endless collection of free digital marketing and SEO tools.",
    "tags": []
  },
  {
    "title": "Anderro",
    "url": "https://anderro.com/",
    "category": "productivity-marketing-business",
    "description": "Platform designed for generating passive income via affiliate marketing.",
    "tags": []
  },
  {
    "title": "Faces.app",
    "url": "https://faces.app/",
    "category": "productivity-marketing-business",
    "description": "Create presentation slides from a simple prompt.",
    "tags": []
  },
  {
    "title": "EdrawMind",
    "url": "https://edrawmind.com/",
    "category": "productivity-marketing-business",
    "description": "AI-assisted mind mapping and brainstorming tool.",
    "tags": []
  },
  {
    "title": "Open.maic.chat",
    "url": "https://open.maic.chat/",
    "category": "learning-dev-resources",
    "description": "Generates a simulated lesson for anything you want to learn.",
    "tags": []
  },
  {
    "title": "Instructables",
    "url": "https://instructables.com/",
    "category": "learning-dev-resources",
    "description": "Step-by-step guides on how to build almost anything.",
    "tags": []
  },
  {
    "title": "Supermeme",
    "url": "https://supermeme.ai/",
    "category": "miscellaneous-tools",
    "description": "Generate engaging memes instantly using AI.",
    "tags": []
  },
  {
    "title": "Pic2Map",
    "url": "https://pic2map.com/",
    "category": "miscellaneous-tools",
    "description": "Find the geographic location of captured images (EXIF data viewer).",
    "tags": []
  },
  {
    "title": "NoMoreCopyright",
    "url": "https://nomorecopyright.com/",
    "category": "miscellaneous-tools",
    "description": "Bypass copyright by generating slightly altered AI images.",
    "tags": []
  },
  {
    "title": "PlayPhrase",
    "url": "https://playphrase.me/",
    "category": "miscellaneous-tools",
    "description": "Find any spoken phrase across movies or TV shows.",
    "tags": []
  },
  {
    "title": "Watch-v2 Autoembed",
    "url": "https://watch-v2.autoembed.cc/",
    "category": "games-entertainment",
    "description": "Search and watch movie/series streams.",
    "tags": []
  },
  {
    "title": "Rezi",
    "url": "https://rezi.one/",
    "category": "games-entertainment",
    "description": "Free gaming resource.",
    "tags": []
  },
  {
    "title": "Sifuyik",
    "url": "https://sifuyik.com/",
    "category": "learning-dev-resources",
    "description": "Collection of free AI tips and resources.",
    "tags": []
  },
  {
    "title": "QuickRef",
    "url": "https://quickref.me/",
    "category": "learning-dev-resources",
    "description": "Quick reference cheat sheets for developers and modern tools.",
    "tags": []
  },
  {
    "title": "Toptal",
    "url": "https://toptal.com/",
    "category": "productivity-marketing-business",
    "description": "Freelance network for remote developers and designers.",
    "tags": []
  },
  {
    "title": "Wellfound (AngelList)",
    "url": "https://wellfound.com/",
    "category": "productivity-marketing-business",
    "description": "Startup job board for remote roles.",
    "tags": []
  },
  {
    "title": "NoDesk",
    "url": "https://nodesk.co/",
    "category": "productivity-marketing-business",
    "description": "Directory of remote jobs and companies.",
    "tags": []
  },
  {
    "title": "Upwork",
    "url": "https://upwork.com/",
    "category": "productivity-marketing-business",
    "description": "Global freelancing platform.",
    "tags": []
  },
  {
    "title": "LinkedIn Jobs",
    "url": "https://linkedin.com/jobs",
    "category": "productivity-marketing-business",
    "description": "Professional network job board.",
    "tags": []
  },
  {
    "title": "Remote.co",
    "url": "https://remote.co/",
    "category": "productivity-marketing-business",
    "description": "Remote job board for various industries.",
    "tags": []
  },
  {
    "title": "FlexJobs",
    "url": "https://flexjobs.com/",
    "category": "productivity-marketing-business",
    "description": "Curated remote and flexible job opportunities.",
    "tags": []
  },
  {
    "title": "Pangian",
    "url": "https://pangian.com/",
    "category": "productivity-marketing-business",
    "description": "Global community for remote workers.",
    "tags": []
  },
  {
    "title": "Remotive",
    "url": "https://remotive.com/",
    "category": "productivity-marketing-business",
    "description": "Remote job board and community.",
    "tags": []
  },
  {
    "title": "Remotees",
    "url": "https://remotees.com/",
    "category": "productivity-marketing-business",
    "description": "Track companies hiring remotely.",
    "tags": []
  },
  {
    "title": "Freelancer",
    "url": "https://freelancer.com/",
    "category": "productivity-marketing-business",
    "description": "Freelance marketplace.",
    "tags": []
  },
  {
    "title": "Jobspresso",
    "url": "https://jobspresso.co/",
    "category": "productivity-marketing-business",
    "description": "High-quality remote jobs in tech and more.",
    "tags": []
  },
  {
    "title": "Remote OK",
    "url": "https://remoteok.com/",
    "category": "productivity-marketing-business",
    "description": "One of the largest remote job boards.",
    "tags": []
  },
  {
    "title": "Remote4Me",
    "url": "https://remote4me.com/",
    "category": "productivity-marketing-business",
    "description": "Remote jobs aggregator for tech and non-tech.",
    "tags": []
  },
  {
    "title": "SimplyHired",
    "url": "https://simplyhired.com/",
    "category": "productivity-marketing-business",
    "description": "Job search engine including remote roles.",
    "tags": []
  },
  {
    "title": "Outsourcely",
    "url": "https://outsourcely.com/",
    "category": "productivity-marketing-business",
    "description": "Find reliable remote workers and jobs.",
    "tags": []
  },
  {
    "title": "Skip The Drive",
    "url": "https://skipthedrive.com/",
    "category": "productivity-marketing-business",
    "description": "Free remote job board.",
    "tags": []
  },
  {
    "title": "Remote OK Asia",
    "url": "https://remoteok.io/asia",
    "category": "productivity-marketing-business",
    "description": "Remote jobs focused on Asia timezone.",
    "tags": []
  },
  {
    "title": "RemoteHabits",
    "url": "https://remotehabits.com/",
    "category": "productivity-marketing-business",
    "description": "Interviews and tools for remote workers.",
    "tags": []
  },
  {
    "title": "Europe Remotely",
    "url": "https://europeremotely.com/",
    "category": "productivity-marketing-business",
    "description": "Remote jobs for European timezones.",
    "tags": []
  }
];
