import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '도배에진심이반장 소개 | 도배에진심이반장',
  description: '20년 경력 도배 장인 이반장. 서울·경기 아파트·빌라 도배를 처음부터 끝까지 직접 시공합니다.',
  alternates: { canonical: 'https://dobae-seriously.com/about' },
};

const career = [
  { year: '2004', event: '도배 업계 입문, 현장 경험 시작' },
  { year: '2008', event: '독립 시공 시작, 서울 마포·강서 지역 중심' },
  { year: '2012', event: '연간 300건+ 시공 달성, 아파트 전문화' },
  { year: '2018', event: '친환경 벽지 시공 전문 과정 이수' },
  { year: '2020', event: '네이버 블로그 개설, 시공 사례 공유 시작' },
  { year: '2024', event: '누적 시공 3,000건 달성' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-brand-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
            👷
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">이반장 소개</h1>
          <p className="text-brand-100 text-lg leading-relaxed max-w-xl mx-auto">
            도배에 진심 이반장입니다.<br />
            처음 연락부터 시공 완료까지, 직접 책임집니다.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-title">도배 장인, 이반장</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  2004년 도배 업계에 입문한 이후 지금까지 20년간 오직 도배 시공만 해왔습니다.
                  처음엔 선배 밑에서 기술을 배우기 시작했고, 수천 번의 현장 경험으로 지금의 실력을 쌓았습니다.
                </p>
                <p>
                  이반장 도배의 가장 큰 특징은 <strong className="text-gray-900">대표가 직접 시공한다</strong>는 점입니다.
                  중간 업체에 외주를 맡기거나 아르바이트를 쓰지 않습니다.
                  전화 상담부터 현장 견적, 시공, 마무리 확인까지 모두 이반장 본인이 책임집니다.
                </p>
                <p>
                  3,000건이 넘는 시공 경험 중에서 가장 많은 것은 아파트 전체 도배입니다.
                  이사 날짜에 맞게 일정을 조율하고, 당일 완공을 목표로 꼼꼼하게 마무리합니다.
                </p>
                <p>
                  합리적인 가격과 투명한 견적으로 고객과 신뢰를 쌓아왔습니다.
                  숨겨진 추가 비용 없이 처음 안내한 금액 그대로 시공합니다.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              {[
                { icon: '🏆', label: '도배사자격증', value: '전문자격증', desc: '2004년부터 현재까지' },
                { icon: '🏠', label: '누적 시공', value: '3,000건+', desc: '아파트·빌라·상업공간' },
                { icon: '⭐', label: '고객 만족도', value: '98%', desc: '재의뢰·추천 비율 포함' },
                { icon: '📍', label: '시공 지역', value: '서울·경기', desc: '전 지역 출장 가능' },
              ].map((item) => (
                <div key={item.label} className="card p-5 flex items-center gap-4">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-xl font-bold text-brand-700">{item.value}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">주요 이력</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-brand-100 hidden sm:block" />
            <div className="space-y-6">
              {career.map((item) => (
                <div key={item.year} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-brand-600 font-bold text-sm">{item.year}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    <div className="hidden sm:block absolute -left-[1.65rem] top-1.5 w-3 h-3 bg-brand-600 rounded-full border-2 border-white ring-2 ring-brand-200" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">시공 철학</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🤝',
                title: '약속을 지킵니다',
                desc: '견적 금액, 시공 날짜, 마무리 품질 — 처음 약속한 것을 반드시 지킵니다.',
              },
              {
                icon: '🔍',
                title: '꼼꼼하게 합니다',
                desc: '눈에 보이지 않는 모서리, 창틀 주변까지 세심하게 마무리합니다.',
              },
              {
                icon: '💬',
                title: '솔직하게 소통합니다',
                desc: '추가 비용이 생길 것 같으면 미리 말씀드립니다. 불필요한 시공은 권하지 않습니다.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-brand-50 rounded-xl">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-700 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">직접 연락해보세요</h2>
          <p className="text-brand-100 mb-6 text-sm">부담 없이 문의주시면 성심껏 답변드립니다.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:010-5388-4628" className="btn-primary bg-white text-brand-800 hover:bg-brand-50 px-8 py-3">
              📞 010-5388-4628
            </a>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-800 px-8 py-3">
              온라인 문의
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
