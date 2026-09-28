import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ExternalLink, CheckCircle2, Clock, Zap, Target } from 'lucide-react'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = await prisma.collection.findUnique({ where: { slug: params.slug } })
  if (!collection) return { title: 'Not Found' }
  return { title: `${collection.title} | Linkora` }
}

export default async function StackDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
    include: {
      steps: {
        orderBy: { order: 'asc' },
        include: {
          resource: {
            include: {
              category: true
            }
          }
        }
      }
    }
  })

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 pb-24">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-16 border-b border-zinc-800 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/explore" className="text-zinc-400 hover:text-white text-base mb-8 inline-flex items-center transition-colors">
            ← Back to Explore
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            {collection.title}
          </h1>
          
          <p className="text-2xl text-zinc-400 mb-10 leading-relaxed">
            {collection.outcome}
          </p>

          {/* Meta specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-zinc-800 text-base">
            <div>
              <div className="text-zinc-500 mb-2 flex items-center gap-2"><Target size={16}/> Audience</div>
              <div className="font-semibold text-lg">{collection.audience}</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 flex items-center gap-2"><Zap size={16}/> Difficulty</div>
              <div className="font-semibold text-lg">{collection.difficulty}</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 flex items-center gap-2"><Clock size={16}/> Time</div>
              <div className="font-semibold text-lg">{collection.timeToResult}</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 flex items-center gap-2">💸 Est. Cost</div>
              <div className="font-semibold text-lg">{collection.cost}</div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-16">
        {/* Action Plan */}
        <div className="mb-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
          <h2 className="text-3xl font-bold mb-6">Action Plan</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            {collection.actionPlan}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-10">The Stack ({collection.steps.length} Steps)</h2>
          
          {collection.steps.map((step, index) => (
            <div key={step.id} className="flex gap-8 group">
              <div className="flex flex-col items-center mt-1">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-base font-bold text-zinc-400 group-hover:border-emerald-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                  {index + 1}
                </div>
                {index !== collection.steps.length - 1 && (
                  <div className="w-0.5 h-full bg-zinc-800 my-4 group-hover:bg-emerald-500/30 transition-colors"></div>
                )}
              </div>
              
              <div className="flex-1 pb-12">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">{step.description}</p>
                
                {/* Resource Card */}
                {step.resource && (
                  <Link href={`/resource/${step.resource.id}`} className="block">
                    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-all group/card shadow-sm hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-xl group-hover/card:text-emerald-400 transition-colors">
                          {step.resource.title}
                        </h4>
                        <ExternalLink size={20} className="text-zinc-500 group-hover/card:text-emerald-400 transition-colors" />
                      </div>
                      <p className="text-zinc-400 text-base mb-6 line-clamp-2 leading-relaxed">
                        {step.resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest">
                        <span className="px-3 py-1.5 bg-zinc-800 rounded-md text-zinc-300">
                          {step.resource.category?.name || 'Tool'}
                        </span>
                        <span className="px-3 py-1.5 bg-zinc-800 rounded-md text-zinc-300">
                          {step.resource.pricingModel}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
