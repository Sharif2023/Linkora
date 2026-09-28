import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Curated Stacks | Linkora',
  description: 'Discover outcome-based stacks and tools.',
}

export default async function StacksPage() {
  const collections = await prisma.collection.findMany({
    include: {
      _count: {
        select: { steps: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Curated <span className="text-emerald-500">Stacks</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
            Discover verified tools and workflows grouped by outcome, audience, and constraint. Not just another link dump.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(collection => (
            <Link key={collection.id} href={`/stack/${collection.slug}`} className="group block">
              <div className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-8 h-full transition-all duration-300 relative overflow-hidden group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]">
                {/* Subtle highlight effect */}
                <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-block px-3 py-1.5 rounded-md bg-white/5 text-zinc-400 text-xs font-bold tracking-widest uppercase border border-white/5">
                    {collection.difficulty || 'All Levels'}
                  </div>
                  <div className="text-sm text-zinc-500 font-mono">
                    {collection._count.steps} steps
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                  {collection.title}
                </h3>
                
                <p className="text-zinc-400 text-base mb-8 line-clamp-3 leading-relaxed">
                  {collection.outcome}
                </p>

                <div className="mt-auto border-t border-zinc-800 pt-6 flex justify-between items-center text-sm text-zinc-500">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Verified
                  </span>
                  <span>{collection.timeToResult || 'Immediate'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
