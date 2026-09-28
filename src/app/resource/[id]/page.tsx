import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ExternalLink, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import SaveBookmarkButton from '@/components/SaveBookmarkButton'

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const resource = await prisma.resource.findUnique({ where: { id: params.id } })
  if (!resource) return { title: 'Not Found' }
  return { title: `${resource.title} | Linkora` }
}

export default async function ResourceDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const resource = await prisma.resource.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      alternatives: true
    }
  })

  if (!resource) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 pb-24">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32">
        <Link href="/explore" className="text-zinc-400 hover:text-white text-base mb-10 inline-flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Explore
        </Link>
        
        <div className="flex flex-col md:flex-row gap-10 items-start mb-20">
          {/* Logo placeholder */}
          <div className="w-28 h-28 rounded-3xl bg-zinc-900 border border-zinc-800 flex-shrink-0 flex items-center justify-center text-4xl font-bold text-zinc-500">
            {resource.title.substring(0, 1)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                {resource.title}
              </h1>
              {resource.status === 'ACTIVE' && (
                <span title="Verified & Active" className="text-emerald-500">
                  <CheckCircle2 size={32} />
                </span>
              )}
            </div>
            
            <p className="text-2xl text-zinc-400 mb-8 leading-relaxed">
              {resource.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Visit Website <ExternalLink size={16} />
              </a>
              <SaveBookmarkButton resourceId={resource.id} />
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-6 font-mono font-bold">Pricing & Cost</h3>
            <dl className="space-y-6">
              <div>
                <dt className="text-zinc-400 text-base mb-1">Model</dt>
                <dd className="font-semibold text-lg">{resource.pricingModel}</dd>
              </div>
              <div>
                <dt className="text-zinc-400 text-base mb-1">Real Free Tier?</dt>
                <dd className="font-semibold text-lg flex items-center gap-2">
                  {resource.freeTier ? (
                    <><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Yes</>
                  ) : (
                    <><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> No</>
                  )}
                </dd>
              </div>
              {resource.fees && (
                <div>
                  <dt className="text-zinc-400 text-base mb-1">Fees</dt>
                  <dd className="font-semibold text-lg">{resource.fees}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-6 font-mono font-bold">Details</h3>
            <dl className="space-y-6">
              <div>
                <dt className="text-zinc-400 text-base mb-1">Category</dt>
                <dd className="font-semibold text-lg">{resource.category?.name}</dd>
              </div>
              {resource.supportedCountries && (
                <div>
                  <dt className="text-zinc-400 text-base mb-1">Availability</dt>
                  <dd className="font-semibold text-lg">{resource.supportedCountries}</dd>
                </div>
              )}
              {resource.payoutMethods && (
                <div>
                  <dt className="text-zinc-400 text-base mb-1">Payout Methods</dt>
                  <dd className="font-semibold text-lg">{resource.payoutMethods}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Alternatives Section (if any) */}
        {resource.alternatives.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Alternatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resource.alternatives.map(alt => (
                <Link key={alt.id} href={`/resource/${alt.id}`} className="block">
                  <div className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-colors shadow-sm hover:shadow-md">
                    <h4 className="font-bold text-xl mb-2">{alt.title}</h4>
                    <p className="text-zinc-400 text-base line-clamp-2">{alt.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
