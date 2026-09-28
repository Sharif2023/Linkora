"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  ExternalLink, Search, Menu, Hash, LayoutGrid, List,
  Bot, Code, Paintbrush, Wand2, Image, Video, Music, MonitorPlay, 
  BookOpen, Briefcase, Shield, Coffee, Gamepad2, TestTube, Heart, Wrench, Folder
} from 'lucide-react';
import { Category, Resource } from '@prisma/client';

type ResourceWithCategory = Resource & { category: Category | null };

const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'ai-assistants-research': return <Bot size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'ai-coding-builders': return <Code size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'ui-design-frontend': return <Paintbrush size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'animation-motion': return <Wand2 size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'ai-image-generation': return <Image size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'ai-video-avatar': return <Video size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'music-audio': return <Music size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'video-screen-recording': return <MonitorPlay size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'learning-dev-resources': return <BookOpen size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'productivity-marketing-business': return <Briefcase size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'website-security-utilities': return <Shield size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'food-everyday-utilities': return <Coffee size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'games-entertainment': return <Gamepad2 size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'testing-developer-utilities': return <TestTube size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'ai-companions-personal-assistance': return <Heart size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    case 'miscellaneous-useful-tools': return <Wrench size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
    default: return <Folder size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />;
  }
};

const getCategoryIconSmall = (slug: string | undefined) => {
  switch (slug) {
    case 'ai-assistants-research': return <Bot size={14} className="shrink-0" />;
    case 'ai-coding-builders': return <Code size={14} className="shrink-0" />;
    case 'ui-design-frontend': return <Paintbrush size={14} className="shrink-0" />;
    case 'animation-motion': return <Wand2 size={14} className="shrink-0" />;
    case 'ai-image-generation': return <Image size={14} className="shrink-0" />;
    case 'ai-video-avatar': return <Video size={14} className="shrink-0" />;
    case 'music-audio': return <Music size={14} className="shrink-0" />;
    case 'video-screen-recording': return <MonitorPlay size={14} className="shrink-0" />;
    case 'learning-dev-resources': return <BookOpen size={14} className="shrink-0" />;
    case 'productivity-marketing-business': return <Briefcase size={14} className="shrink-0" />;
    case 'website-security-utilities': return <Shield size={14} className="shrink-0" />;
    case 'food-everyday-utilities': return <Coffee size={14} className="shrink-0" />;
    case 'games-entertainment': return <Gamepad2 size={14} className="shrink-0" />;
    case 'testing-developer-utilities': return <TestTube size={14} className="shrink-0" />;
    case 'ai-companions-personal-assistance': return <Heart size={14} className="shrink-0" />;
    case 'miscellaneous-useful-tools': return <Wrench size={14} className="shrink-0" />;
    default: return <Folder size={14} className="shrink-0" />;
  }
};

const cleanCategoryName = (name: string) => name.replace(/^[^a-zA-Z0-9]+/, '').trim();

export default function ExploreClient({
  categories,
  resources
}: {
  categories: Category[];
  resources: ResourceWithCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResources = resources.filter(r => {
    const matchesCategory = activeCategory ? r.categoryId === activeCategory : true;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-[calc(100vh-64px)] pt-16 mt-16 overflow-hidden max-w-[1400px] mx-auto w-full relative">
      {/* Spacer to reserve width for the sidebar without layout shift */}
      <div className="w-16 lg:w-20 shrink-0 hidden md:block"></div>

      {/* Auto-expandable Left Nav */}
      <aside 
        className={`absolute left-0 top-16 bottom-0 z-40 bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ease-in-out flex flex-col shadow-2xl overflow-hidden ${
          isSidebarHovered ? 'w-64' : 'w-16 lg:w-20'
        }`}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div className="p-4 flex items-center border-b border-zinc-800/50 h-[73px] shrink-0">
          <Menu className="text-zinc-500 shrink-0 mx-auto lg:mx-0 lg:ml-2" size={24} />
          <span className={`font-bold ml-4 whitespace-nowrap transition-opacity duration-300 ${isSidebarHovered ? 'opacity-100' : 'opacity-0'}`}>
            Categories
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4 space-y-1 px-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`w-full flex items-center rounded-lg p-3 transition-colors group ${
              activeCategory === null ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Hash size={20} className="shrink-0 mx-auto lg:mx-0 lg:ml-1" />
            <div className={`ml-4 overflow-hidden transition-all duration-300 ${isSidebarHovered ? 'w-[150px] opacity-100' : 'w-0 opacity-0'}`}>
              <span className="inline-block whitespace-nowrap text-left text-sm font-semibold">
                All Links
              </span>
            </div>
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center rounded-lg p-3 transition-colors group ${
                activeCategory === cat.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
              title={cat.name}
            >
              {getCategoryIcon(cat.slug)}
              <div className={`ml-4 overflow-hidden transition-all duration-300 ${isSidebarHovered ? 'w-[150px] opacity-100' : 'w-0 opacity-0'}`}>
                <span className="inline-block whitespace-nowrap text-left text-sm animate-marquee-on-hover">
                  {cat.name.replace(/^[^\s]+\s+/, "")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-black relative ml-16 md:ml-0">
        {/* Sticky Header with Search */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-zinc-800/50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between shrink-0 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">
              Directory
            </h1>
            <p className="text-zinc-500 text-sm">
              {filteredResources.length} resources found
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search links..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto' : 'space-y-3 max-w-5xl mx-auto'}>
            {filteredResources.map((resource, i) => {
              if (viewMode === 'grid') {
                return (
                  <Link key={resource.id} href={`/resource/${resource.id}`} className="block h-full">
                    <div className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all h-full flex flex-col group shadow-sm hover:shadow-md">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-xl group-hover:text-emerald-400 transition-colors">
                          {resource.title}
                        </h4>
                        <ExternalLink size={20} className="text-zinc-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-zinc-400 text-base mb-6 line-clamp-2 leading-relaxed flex-grow">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest mt-auto">
                        <span className="px-3 py-1.5 bg-zinc-800 rounded-md text-zinc-300 flex items-center gap-1.5">
                          {getCategoryIconSmall(resource.category?.slug)}
                          {cleanCategoryName(resource.category?.name || 'Tool')}
                        </span>
                        {resource.pricingModel && resource.pricingModel !== 'Unknown' && (
                          <span className="px-3 py-1.5 bg-zinc-800 rounded-md text-zinc-300">
                            {resource.pricingModel}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              }

              return (
                <Link key={resource.id} href={`/resource/${resource.id}`} className="block">
                  <div
                    className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 cursor-pointer transition-all hover:bg-zinc-900 hover:border-emerald-500/50 group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 overflow-hidden pr-4 mb-3 md:mb-0">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-zinc-700 group-hover:bg-emerald-500 transition-colors" />
                      <div className="min-w-0">
                        <div className="font-bold text-lg truncate group-hover:text-emerald-400 transition-colors">
                          {resource.title}
                        </div>
                        <div className="text-sm text-zinc-500 font-mono truncate hidden md:block">
                          {resource.url.replace(/^https?:\/\//, '')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-sm shrink-0 ml-6 md:ml-0">
                      <span className="text-zinc-400 text-[11px] bg-zinc-800/80 px-2.5 py-1 rounded max-w-[200px] truncate font-bold uppercase tracking-wider flex items-center gap-1.5">
                        {getCategoryIconSmall(resource.category?.slug)}
                        {cleanCategoryName(resource.category?.name || 'Tool')}
                      </span>
                      {resource.pricingModel && resource.pricingModel !== 'Unknown' && (
                        <span className="text-zinc-500 text-[11px] border border-zinc-800/80 px-2.5 py-1 rounded font-mono uppercase">
                          {resource.pricingModel}
                        </span>
                      )}
                      <ExternalLink size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors hidden md:block ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {filteredResources.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                <Search className="mx-auto mb-4 opacity-50" size={48} />
                <p className="text-lg">No resources found for your query.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
