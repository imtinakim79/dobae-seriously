import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generatePortfolioTitle, generatePortfolioDescription } from '@/data/portfolio';
import { getPortfolios } from '@/lib/portfolio-store';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const portfolio = getPortfolios().find((p) => p.id === params.id);
  if (!portfolio) return {};

  const title = `${generatePortfolioTitle(portfolio)} | 도배에진심이반장`;
  const description = generatePortfolioDescription(portfolio);
  const mainImage = portfolio.images.find((img) => !img.before) ?? portfolio.images[0];

  return {
    title,
    description,
    alternates: { canonical: `https://dobae-seriously.com/portfolio/${portfolio.id}` },
    openGraph: {
      title,
      description,
      images: [{ url: mainImage.src, width: 1200, height: 900, alt: mainImage.alt }],
    },
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const portfolio = getPortfolios().find((p) => p.id === params.id);
  if (!portfolio) notFound();

  const afterImages = portfolio.images.filter((img) => !img.before);
  const beforeImages = portfolio.images.filter((img) => img.before);
  const mainImage = afterImages[0] ?? portfolio.images[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: generatePortfolioTitle(portfolio),
    description: generatePortfolioDescription(portfolio),
    image: mainImage.src,
    datePublished: portfolio.date,
    author: { '@type': 'Person', name: '이반장' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">홈</Link>
            <span>›</span>
            <Link href="/portfolio" className="hover:text-brand-600 transition-colors">시공 갤러리</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium truncate">{generatePortfolioTitle(portfolio)}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Title */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {portfolio.tags.map((tag) => (
                <span key={tag} className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {generatePortfolioTitle(portfolio)}
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {portfolio.roomType} · {portfolio.wallpaperType} · {portfolio.date}
            </p>
          </div>

          {/* Main image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              priority
              unoptimized
              quality={85}
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* After images grid */}
          {afterImages.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {afterImages.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    quality={85}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Before/After comparison */}
          {beforeImages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">시공 전 사진</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {beforeImages.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      unoptimized
                      quality={80}
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      시공 전
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details card */}
          <div className="card p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">시공 정보</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <dt className="text-gray-400 mb-1">시공 지역</dt>
                <dd className="font-medium text-gray-900">{portfolio.region}</dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">아파트/건물</dt>
                <dd className="font-medium text-gray-900">{portfolio.apartment}</dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">공간 유형</dt>
                <dd className="font-medium text-gray-900">{portfolio.roomType}</dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">벽지 종류</dt>
                <dd className="font-medium text-gray-900">{portfolio.wallpaperType}</dd>
              </div>
            </dl>
            <p className="text-gray-600 text-sm mt-5 leading-relaxed">{portfolio.description}</p>
          </div>

          {/* 블로그 링크 */}
          {portfolio.blogUrl && (
            <div className="mb-6">
              <a
                href={portfolio.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-700 bg-green-50 rounded-xl py-3 text-sm font-medium hover:bg-green-100 transition-colors"
              >
                네이버 블로그에서 자세히 보기 →
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="bg-brand-50 rounded-xl p-6 text-center border border-brand-100">
            <h3 className="font-bold text-gray-900 mb-2">이 시공이 마음에 드셨나요?</h3>
            <p className="text-sm text-gray-500 mb-4">무료 견적 문의 후 내 집에 맞는 견적을 받아보세요.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:010-5388-4628" className="btn-primary">📞 전화 문의</a>
              <Link href="/contact" className="btn-outline">온라인 견적 신청</Link>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="bg-gray-50 py-12 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-bold text-gray-900 mb-6">다른 시공 사례도 보기</h2>
            <div className="flex gap-3 justify-center">
              <Link href="/portfolio" className="btn-outline">갤러리 전체 보기</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
