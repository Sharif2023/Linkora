# Linkora – Intelligence Workspace

## Project Overview
Linkora is a conceptual high-fidelity interactive product experience designed to demonstrate the transformation of raw data into structured intelligence and actionable insight. The UI is built to feel calm but powerful, technically confident, and designed specifically for decision-makers—mirroring the premium aesthetic of top-tier SaaS products like Stripe, Linear, and Vercel. 

The core narrative walks the user through three key stages:
1. **Ingest Data**: High-throughput ingestion of raw streams.
2. **Analyze with AI**: Processing data through adaptive transformer models.
3. **Generate Insight & Automate**: Extracting human-readable intelligence and triggering workflows.

## Project Links
- **Figma Design**: [Linkora Intelligence Workspace (Figma)](https://www.figma.com/design/WZPVsScGtrJF4cSCyJa4LD/Xai-Intelligent-Workshop?node-id=0-1&t=VHHnZAxcEdId1NEt-1)
- **Explanation Video**: [Watch on Google Drive](https://drive.google.com/file/d/1mckMK4fnpM8QT14zm3tWBETQJEjnduYq/view?usp=sharing)
- **Live Deployment**: [https://linkora-intelligence.vercel.app](https://linkora-intelligence.vercel.app)

## Technical Approach & Stack
This project was engineered with a strict focus on UI/UX clarity, modular component structure, and advanced 3D motion.
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 (for strict, consistent design token management and rapid utility-class layout)
- **3D Rendering**: Three.js & React Three Fiber (R3F)
- **Animation Architecture**: Framer Motion & GSAP
- **Icons**: Lucide React

## Animation & Interaction Decisions
- **The "WOW" Moment (Three.js)**: The Hero section features a custom 3D particle swarm representing "raw data". It utilizes mathematical spherical distribution and rotates infinitely. More importantly, it features an interactive camera/rotation offset bound to the user's pointer (mouse movement) via R3F's `useFrame`, creating an immediate, fluid sense of depth and technical sophistication.
- **Scroll Storytelling (Framer Motion)**: Each stage in the Insight Flow animates into view using Framer Motion's `whileInView` directive. This ensures elements only render their entry animations when the user actually scrolls to them, preserving performance and maintaining focus.
- **Layout Rails (GSAP)**: The vertical tracking rail that connects the three stages utilizes GSAP's `ScrollTrigger`. This creates a hardware-accelerated scrub animation that draws the connecting gradient line exactly as the user scrolls down the page, tying the 3 stages together cohesively.

## Running the Project Locally

1. **Install Dependencies**
   Ensure you have Node.js installed. Run the following command in the root directory:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the interactive experience.
