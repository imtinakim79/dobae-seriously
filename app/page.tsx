import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PortfolioCard from '@/components/PortfolioCard';
import { getPortfolios } from '@/lib/portfolio-store';
import { services } from '@/data/services';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '도배에진심이반장 | 서울·인천·경기 도배 전문',
  description:
    '서울·인천·경기 지역 아파트·빌라·원룸 도배 전문. 도배에 진심 직접 시공. 합리적인 가격, 깔끔한 마무리, 빠른 일정 보장. 무료 견적 문의.',
  alternates: { canonical: 'https://dobae-seriously.com' },
};


const reviews = [
  {
    name: '김○○ 고객',
    location: '마포구',
    rating: 5,
    text: '친절하고 깔끔하게 마무리해 주셨어요. 이사 날짜에 맞게 일정 조율도 잘 해주셔서 너무 감사했습니다. 주변에 적극 추천합니다!',
  },
  {
    name: '이○○ 고객',
    location: '송파구',
    rating: 5,
    text: '가격도 합리적이고 시공 퀄리티가 정말 좋았어요. 기존 벽지 제거부터 새 벽지까지 꼼꼼하게 해주셨습니다.',
  },
  {
    name: '박○○ 고객',
    location: '노원구',
    rating: 5,
    text: '블로그 보고 연락했는데 사진이랑 실제 결과물이 같아서 신뢰가 갔어요. 다음 이사 때도 이반장님께 맡길게요.',
  },
];

export default function HomePage() {
  const featuredPortfolios = getPortfolios().slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="flex flex-col md:flex-row min-h-[520px]">

        {/* 왼쪽: 배경 이미지 패널 */}
        <div className="md:w-[58%] relative overflow-hidden min-h-[360px] md:min-h-0">
          <Image
            src="/hero.png"
            alt="도배에진심 이반장 시공 사례"
            fill
            className="object-cover object-center"
            priority
          />
          {/* 하단 페이드 — 통계바와 자연스럽게 연결 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#155E58]/60 via-transparent to-transparent" />
        </div>

        {/* 오른쪽: 정보 패널 */}
        <div className="flex-1 bg-[#F1F2ED] flex flex-col justify-center px-10 md:px-12 py-14">
          {/* 지역 해시태그 */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['#서울도배', '#인천도배', '#경기도배', '#검단도배', '#김포도배'].map((tag) => (
              <span key={tag} className="text-xs text-[#8a9a9b]">{tag}</span>
            ))}
          </div>

          {/* 전화번호 */}
          <a
            href="tel:010-5388-4628"
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wide leading-none mb-1 hover:text-brand-700 transition-colors"
          >
            010-5388-4628
          </a>
          <p className="text-xs text-gray-400 tracking-widest mb-6">무료 견적 · 당일 상담 가능</p>

          {/* 구분선 */}
          <div className="h-px bg-gray-200 mb-5" />

          {/* SNS */}
          <div className="flex flex-col gap-3 mb-7">
            <a
              href="https://blog.naver.com/dobae_seriously"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="w-7 h-7 rounded-md bg-[#03c75a] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">N</span>
              <span className="text-sm text-gray-500 group-hover:text-[#03c75a] transition-colors underline-offset-2 group-hover:underline">
                blog.naver.com/dobae_seriously
              </span>
            </a>
            <a
              href="https://www.instagram.com/dobae_seriously"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="w-7 h-7 rounded-md bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-xs flex-shrink-0">✦</span>
              <span className="text-sm text-gray-500 group-hover:text-pink-500 transition-colors underline-offset-2 group-hover:underline">
                @dobae_seriously
              </span>
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <a href="tel:010-5388-4628" className="btn-primary inline-flex items-center justify-center gap-2 shadow-lg py-3.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              지금 바로 전화하기
            </a>
            <Link href="/portfolio" className="border border-gray-300 text-gray-600 hover:border-brand-600 hover:text-brand-700 font-semibold px-6 py-3.5 rounded-lg text-sm transition-colors inline-flex items-center justify-center">
              시공 갤러리 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#155E58]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">

            {/* 국가공인 도배자격증 */}
            <div className="flex items-center justify-center gap-3 px-4 py-2">
              <svg className="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="4" y="3" width="16" height="18" rx="2" strokeLinecap="round"/>
                <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round"/>
                <circle cx="17" cy="17" r="3" fill="currentColor" stroke="none" opacity="0.3"/>
                <path d="M15.5 17l1 1 1.5-1.5" strokeLinecap="round" strokeLinejoin="round" stroke="white" strokeWidth="1.2"/>
              </svg>
              <span className="text-white text-sm font-semibold leading-tight">국가공인<br/>도배자격증</span>
            </div>

            {/* 98% 재의뢰율 */}
            <div className="flex items-center justify-center gap-3 px-4 py-2">
              <svg className="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 12a8 8 0 018-8" strokeLinecap="round"/>
                <path d="M20 12a8 8 0 01-8 8" strokeLinecap="round"/>
                <path d="M3 9l1 3 3-1M21 15l-1-3-3 1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm font-semibold leading-tight">98%<br/>재의뢰율</span>
            </div>

            {/* 100% 책임 A/S */}
            <div className="flex items-center justify-center gap-3 px-4 py-2">
              <svg className="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 3l8 3.5v5c0 4.5-3.5 8-8 9.5C7.5 19.5 4 16 4 11.5v-5L12 3z" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm font-semibold leading-tight">100%<br/>책임 A/S</span>
            </div>

            {/* 당일 현장 견적 */}
            <div className="flex items-center justify-center gap-3 px-4 py-2">
              <svg className="w-8 h-8 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 7l1.5 2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-white text-sm font-semibold leading-tight">당일<br/>현장 견적</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">서비스 안내</h2>
            <p className="section-subtitle">아파트부터 상업공간까지, 모든 도배를 책임집니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="card p-6 hover:border-brand-200 border border-transparent">
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{svc.description}</p>
                <ul className="space-y-1 mb-4">
                  {svc.features.map((f) => (
                    <li key={f} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-brand-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-brand-700 font-semibold text-sm">{svc.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              서비스 전체 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">최근 시공 갤러리</h2>
            <p className="section-subtitle">실제 시공 사례를 직접 확인해보세요</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPortfolios.map((p) => (
              <PortfolioCard key={p.id} portfolio={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-primary">
              시공 갤러리 전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">왜 이반장 도배인가요?</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: '👷',
                    title: '직접 시공',
                    desc: '중간 업체 없이 이반장이 직접 현장에 나갑니다. 책임 시공을 보장합니다.',
                  },
                  {
                    icon: '💰',
                    title: '투명한 가격',
                    desc: '견적서를 명확하게 제공합니다. 숨겨진 추가 비용이 없습니다.',
                  },
                  {
                    icon: '⚡',
                    title: '빠른 일정',
                    desc: '이사 날짜에 맞게 일정을 조율해드립니다. 당일 완공도 가능합니다.',
                  },
                  {
                    icon: '🛡️',
                    title: 'AS 보장',
                    desc: '시공 후 하자 발생 시 무상 AS를 진행합니다. 끝까지 책임집니다.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">📋 무료 견적 받기</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>아래 정보를 준비해주시면 빠르게 견적을 드립니다.</p>
                <ul className="space-y-2">
                  <li className="flex gap-2"><span className="text-brand-500">①</span> 시공 지역 및 아파트명</li>
                  <li className="flex gap-2"><span className="text-brand-500">②</span> 평수 (전용면적)</li>
                  <li className="flex gap-2"><span className="text-brand-500">③</span> 시공 범위 (전체/부분)</li>
                  <li className="flex gap-2"><span className="text-brand-500">④</span> 희망 시공 날짜</li>
                </ul>
              </div>
              <div className="mt-6 space-y-3">
                <a
                  href="tel:010-5388-4628"
                  className="btn-primary w-full justify-center text-sm"
                >
                  📞 전화로 문의하기
                </a>
                <Link
                  href="/contact"
                  className="btn-outline w-full justify-center text-sm"
                >
                  💬 온라인 견적 신청
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">고객 후기</h2>
            <p className="section-subtitle">직접 시공받으신 분들의 솔직한 이야기</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#F1F2ED] text-gray-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 무료 견적 받으세요</h2>
          <p className="text-gray-500 mb-8">
            전화 한 통으로 현장 방문 견적을 무료로 받아보실 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-5388-4628" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              010-5388-4628
            </a>
            <Link href="/contact" className="border border-gray-300 text-gray-600 hover:border-brand-600 hover:text-brand-700 font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center">
              온라인 문의
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
