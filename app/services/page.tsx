import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: '서비스 안내 | 도배에진심이반장',
  description: '전체 도배·부분 도배·입주 도배·친환경 도배·상업공간·하자 보수까지. 도배에진심이반장의 모든 서비스를 확인하세요.',
  alternates: { canonical: 'https://dobae-seriously.com/services' },
};

const process = [
  { step: '01', title: '문의 접수', desc: '전화 또는 온라인으로 시공 지역·평수·희망 날짜를 알려주세요.' },
  { step: '02', title: '무료 견적', desc: '현장 방문 또는 사진으로 정확한 견적을 무료로 제공합니다.' },
  { step: '03', title: '벽지 선택', desc: '실크·합지·친환경 등 다양한 샘플 중 원하는 벽지를 고릅니다.' },
  { step: '04', title: '당일 시공', desc: '이반장이 직접 현장에 방문해 꼼꼼하게 시공합니다.' },
  { step: '05', title: '완공 확인', desc: '시공 후 함께 결과물을 확인합니다. 마무리까지 책임집니다.' },
  { step: '06', title: 'AS 보장', desc: '하자 발생 시 무상 AS를 진행합니다. 끝까지 책임집니다.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">서비스 안내</h1>
          <p className="section-subtitle">아파트부터 상업공간까지, 모든 도배를 책임집니다</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="card p-6 hover:border-brand-200 border border-transparent hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{svc.title}</h2>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">{svc.description}</p>
                <ul className="space-y-2 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-brand-500 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-brand-700 font-bold text-sm">{svc.price}</p>
                  <Link href="/contact" className="text-xs text-brand-600 hover:underline font-medium">
                    견적 문의 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">시공 프로세스</h2>
            <p className="section-subtitle">문의부터 완공까지 투명하게 진행합니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price guide */}
      <section className="py-16 bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">가격 안내</h2>
            <p className="section-subtitle">투명한 가격, 숨겨진 추가 비용 없습니다</p>
          </div>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">서비스</th>
                  <th className="py-3 px-4 text-left font-medium">기준</th>
                  <th className="py-3 px-4 text-left font-medium">참고 가격</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { service: '전체 도배 (합지)', unit: '전용 25평 기준', price: '100만원~' },
                  { service: '전체 도배 (실크)', unit: '전용 25평 기준', price: '120만원~' },
                  { service: '입주 도배', unit: '전용 25평 기준', price: '88만원~' },
                  { service: '친환경 도배', unit: '평당', price: '별도 문의' },
                  { service: '부분 도배 (거실)', unit: '공간별', price: '별도 문의' },
                  { service: '상업공간', unit: '현장 방문 후', price: '별도 견적' },
                ].map((row) => (
                  <tr key={row.service} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.service}</td>
                    <td className="py-3 px-4 text-gray-500">{row.unit}</td>
                    <td className="py-3 px-4 text-brand-700 font-semibold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 p-4 bg-gray-50 border-t border-gray-100">
              * 벽지 종류, 평수, 기존 벽지 상태에 따라 가격이 달라질 수 있습니다. 정확한 금액은 무료 견적 후 안내드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-700 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">지금 무료 견적 받으세요</h2>
          <p className="text-brand-100 mb-6 text-sm">전화 한 통으로 빠르게 견적을 알려드립니다.</p>
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
