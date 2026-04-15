import type { Metadata } from 'next';
import Link from 'next/link';
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

const stats = [
  { label: '전문성', value: '도배자격증' },
  { label: '재거래율', value: '98%' },
  { label: 'A/S', value: '100%' },
  { label: '당일 견적', value: '무료' },
];

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
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="inline-block bg-brand-500/30 text-brand-100 text-sm font-medium px-3 py-1 rounded-full mb-4">
              서울·인천·경기 도배 전문
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              도배에진심 이반장<br />
              <span className="text-brand-300">믿을 수 있는 도배</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 leading-relaxed">
              도배의진심 이반장이 처음부터 끝까지 직접 시공합니다.<br />
              합리적인 가격, 깔끔한 마무리, 빠른 일정 — 세 가지 모두 약속드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary bg-white text-brand-800 hover:bg-brand-50 shadow-xl">
                📞 무료 견적 문의
              </Link>
              <Link href="/portfolio" className="btn-outline border-white text-white hover:bg-white hover:text-brand-800">
                시공 갤러리 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-brand-950/40 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-brand-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-16 bg-brand-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">지금 바로 무료 견적 받으세요</h2>
          <p className="text-brand-100 mb-8">
            전화 한 통으로 현장 방문 견적을 무료로 받아보실 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:010-5388-4628" className="btn-primary bg-white text-brand-800 hover:bg-brand-50 text-lg px-8 py-4">
              📞 010-5388-4628
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-800 text-lg px-8 py-4">
              온라인 문의
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
