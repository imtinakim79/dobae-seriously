import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 문의',
  description:
    '이반장 도배 무료 견적 문의. 전화 또는 온라인으로 연락주시면 빠르게 답변드립니다. 서울·경기 전 지역 출장 가능.',
  alternates: { canonical: 'https://dobae-seriously.com/contact' },
};

const faqs = [
  {
    q: '현장 방문 견적은 유료인가요?',
    a: '아닙니다. 현장 방문 견적은 완전 무료입니다. 부담 없이 연락주세요.',
  },
  {
    q: '벽지는 직접 준비해야 하나요?',
    a: '저희가 다양한 벽지 샘플을 가져가서 현장에서 직접 선택하실 수 있습니다. 별도 구매 필요 없습니다.',
  },
  {
    q: '이사 당일 시공도 가능한가요?',
    a: '가능합니다. 미리 일정을 잡아주시면 이사 날짜에 맞춰 완공해드립니다.',
  },
  {
    q: '시공 후 하자가 생기면 어떻게 하나요?',
    a: '시공 후 벽지 들뜸, 이음매 문제 등 하자 발생 시 무상 AS를 진행합니다.',
  },
  {
    q: '경기도도 시공 가능한가요?',
    a: '서울·경기 전 지역 출장 가능합니다. 단, 거리에 따라 출장비가 발생할 수 있습니다.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">견적 문의</h1>
          <p className="text-brand-100 text-lg">
            부담 없이 연락주세요. 무료 견적부터 시작합니다.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* 연락처 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">연락 방법</h2>
            <div className="space-y-4">
              <a
                href="tel:010-5388-4628"
                className="flex items-center gap-4 p-5 bg-brand-50 rounded-xl border border-brand-100 hover:bg-brand-100 transition-colors group"
              >
                <span className="text-3xl">📞</span>
                <div>
                  <p className="text-xs text-brand-600 font-medium mb-0.5">전화 문의 (가장 빠릅니다)</p>
                  <p className="text-xl font-bold text-gray-900 group-hover:text-brand-700">010-5388-4628</p>
                  <p className="text-xs text-gray-400 mt-0.5">평일·토요일 08:00 ~ 19:00</p>
                </div>
              </a>

              <a
                href="https://open.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-yellow-50 rounded-xl border border-yellow-100 hover:bg-yellow-100 transition-colors group"
              >
                <span className="text-3xl">💬</span>
                <div>
                  <p className="text-xs text-yellow-600 font-medium mb-0.5">카카오톡 문의</p>
                  <p className="text-lg font-bold text-gray-900">카카오 오픈채팅</p>
                  <p className="text-xs text-gray-400 mt-0.5">링크를 눌러 채팅 시작</p>
                </div>
              </a>

              <a
                href="https://blog.naver.com/dobae_seriously"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors group"
              >
                <span className="text-3xl">📝</span>
                <div>
                  <p className="text-xs text-green-600 font-medium mb-0.5">네이버 블로그</p>
                  <p className="text-lg font-bold text-gray-900">blog.naver.com/dobae_seriously</p>
                  <p className="text-xs text-gray-400 mt-0.5">블로그 댓글로도 문의 가능</p>
                </div>
              </a>
            </div>

            {/* 견적 시 준비사항 */}
            <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">📋 견적 시 알려주시면 좋은 정보</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-brand-500">①</span>시공 지역 및 아파트명</li>
                <li className="flex gap-2"><span className="text-brand-500">②</span>전용 면적 (평수)</li>
                <li className="flex gap-2"><span className="text-brand-500">③</span>시공 범위 (전체 / 부분 / 특정 공간)</li>
                <li className="flex gap-2"><span className="text-brand-500">④</span>희망 시공 날짜</li>
                <li className="flex gap-2"><span className="text-brand-500">⑤</span>현재 벽지 상태 사진 (있으면 더 정확합니다)</li>
              </ul>
            </div>
          </div>

          {/* 운영시간 + 지역 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">운영 안내</h2>

            <div className="card p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">🕐 운영 시간</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    { day: '월요일 ~ 금요일', time: '08:00 ~ 19:00' },
                    { day: '토요일', time: '08:00 ~ 17:00' },
                    { day: '일요일 · 공휴일', time: '휴무 (긴급 시 문의)' },
                  ].map((row) => (
                    <tr key={row.day}>
                      <td className="py-2.5 text-gray-500">{row.day}</td>
                      <td className="py-2.5 font-medium text-gray-900 text-right">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">📍 시공 가능 지역</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  '마포구', '서대문구', '은평구', '강북구',
                  '노원구', '도봉구', '성북구', '중랑구',
                  '송파구', '강남구', '서초구', '강동구',
                  '경기 전역',
                ].map((area) => (
                  <span key={area} className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">* 위 지역 외도 상담 가능합니다.</p>
            </div>

            <div className="bg-brand-50 rounded-xl p-5 border border-brand-100 text-sm text-brand-800">
              <p className="font-semibold mb-1">💡 이런 분들께 추천드려요</p>
              <ul className="space-y-1 text-brand-700">
                <li>• 이사 전 도배를 깔끔하게 마치고 싶은 분</li>
                <li>• 노후된 벽지를 교체하고 싶은 분</li>
                <li>• 아이가 있어 친환경 자재를 원하는 분</li>
                <li>• 빠른 일정 내에 시공이 필요한 분</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-6">
                <p className="font-bold text-gray-900 mb-2 flex gap-2">
                  <span className="text-brand-600">Q.</span>
                  {faq.q}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex gap-2">
                  <span className="text-gray-400 font-medium">A.</span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
