'use client';

import { useState } from 'react';
import PortfolioCard from '@/components/PortfolioCard';
import { Portfolio } from '@/data/portfolio';

interface Props {
  portfolios: Portfolio[];
  allTags: string[];
}

export default function PortfolioFilter({ portfolios, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? portfolios.filter((p) => p.tags.includes(activeTag))
    : portfolios;

  return (
    <>
      {/* Tag chips */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`inline-block text-xs px-3 py-1 rounded-full font-medium transition-colors ${
              activeTag === null
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-brand-100 hover:text-brand-700'
            }`}
          >
            전체 ({portfolios.length})
          </button>
          {allTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`inline-block text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-brand-100 hover:text-brand-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PortfolioCard key={p.id} portfolio={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📷</p>
            <p>해당 태그의 시공 사례가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
