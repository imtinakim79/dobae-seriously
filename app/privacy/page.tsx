import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 도배의진심이반장',
  description: '도배의진심이반장 개인정보처리방침입니다.',
  alternates: { canonical: 'https://dobae-seriously.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">개인정보처리방침</h1>
          <p className="text-brand-100">최종 수정일: 2026년 4월 15일</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10 text-sm text-gray-700 leading-relaxed">

            <div className="bg-brand-50 rounded-xl p-4 text-brand-800 text-xs">
              도배의진심이반장(이하 "업체")은 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제1조 (수집하는 개인정보 항목)</h2>
              <p>업체는 견적 문의 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">수집 항목</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">수집 목적</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-2">이름, 연락처</td>
                      <td className="px-4 py-2">견적 안내 및 일정 조율</td>
                      <td className="px-4 py-2">목적 달성 후 즉시 파기</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">시공 주소</td>
                      <td className="px-4 py-2">현장 방문 견적</td>
                      <td className="px-4 py-2">목적 달성 후 즉시 파기</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제2조 (개인정보의 수집 방법)</h2>
              <p>업체는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                <li>웹사이트 견적 문의 폼을 통한 직접 입력</li>
                <li>전화 통화를 통한 구두 수집</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제3조 (개인정보의 이용 목적)</h2>
              <p>수집된 개인정보는 다음 목적으로만 사용됩니다.</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                <li>도배 시공 견적 안내</li>
                <li>시공 일정 조율 및 확정</li>
                <li>시공 완료 후 A/S 연락</li>
              </ul>
              <p className="mt-3 text-gray-500">수집 목적 외 다른 용도로는 사용하지 않습니다.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제4조 (개인정보의 제3자 제공)</h2>
              <p>
                업체는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 단, 이용자의 동의가 있거나 법령에 의한 경우에는 예외로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제5조 (개인정보의 파기)</h2>
              <p>
                개인정보는 수집 목적이 달성된 후 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제하며, 종이 문서는 분쇄 또는 소각합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제6조 (이용자의 권리)</h2>
              <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                <li>개인정보 열람 요청</li>
                <li>개인정보 정정·삭제 요청</li>
                <li>개인정보 처리 정지 요청</li>
              </ul>
              <p className="mt-3">
                권리 행사는 전화(<a href="tel:010-5388-4628" className="text-brand-600 hover:underline">010-5388-4628</a>) 또는 온라인 문의를 통해 요청하실 수 있으며, 지체 없이 조치하겠습니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제7조 (개인정보 보호책임자)</h2>
              <ul className="space-y-1 text-gray-600">
                <li>성명: 이승훈</li>
                <li>연락처: <a href="tel:010-5388-4628" className="text-brand-600 hover:underline">010-5388-4628</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제8조 (방침의 변경)</h2>
              <p>
                본 개인정보처리방침은 법령·정책 변경에 따라 수정될 수 있으며, 변경 시 사이트를 통해 공지합니다.
              </p>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link href="/terms" className="text-brand-600 hover:underline text-sm mr-6">이용약관 보기 →</Link>
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">홈으로 돌아가기</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
