import type { Metadata } from 'next';
import Link from 'next/link';
import PortfolioFilter from '@/components/PortfolioFilter';
import { getPortfolios } from '@/lib/portfolio-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '시공 갤러리 | 이반장 도배',
  description: '서울·경기 아파트·빌라 도배 시공 사례 모음. 마포구, 송파구, 노원구 등 실제 시공 전후 사진을 확인해보세요.',
  alternates: { canonical: 'https://dobae-seriously.com/portfolio' },
};

export default function PortfolioPage() {
  const portfolios = getPortfolios();
  const allTags = Array.from(new Set(portfolios.flatMap((p) => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">시공 갤러리</h1>
          <p className="section-subtitle">
            직접 시공한 아파트·빌라 도배 사례를 확인해보세요.<br />
            실제 현장 사진과 함께 시공 정보를 제공합니다.
          </p>
        </div>
      </section>

      <PortfolioFilter portfolios={portfolios} allTags={allTags} />

      {/* CTA */}
      <section className="bg-brand-700 text-white text-center py-14">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">내 집도 이렇게 바꾸고 싶다면?</h2>
          <p className="text-brand-100 mb-6 text-sm">무료 견적 문의 후 일정을 잡아드립니다.</p>
          <a
            href="tel:010-5388-4628"
            className="btn-primary bg-white text-brand-800 hover:bg-brand-50 px-8 py-3"
          >
            📞 무료 견적 문의
          </a>
        </div>
      </section>
    </div>
  );
}
