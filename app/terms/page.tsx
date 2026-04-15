import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관 | 도배의진심이반장',
  description: '도배의진심이반장 이용약관입니다.',
  alternates: { canonical: 'https://dobae-seriously.com/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">이용약관</h1>
          <p className="text-brand-100">최종 수정일: 2026년 4월 15일</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10 text-sm text-gray-700 leading-relaxed">

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제1조 (목적)</h2>
              <p>
                본 약관은 도배의진심이반장(이하 "업체")이 운영하는 웹사이트(https://dobae-seriously.com, 이하 "사이트")를 통해 제공하는 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제2조 (서비스의 내용)</h2>
              <p>업체가 제공하는 서비스는 다음과 같습니다.</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                <li>도배 시공 견적 문의 접수</li>
                <li>시공 사례 및 포트폴리오 열람</li>
                <li>서비스 안내 및 가격 정보 제공</li>
                <li>업체 연락처 및 위치 정보 제공</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제3조 (개인정보 수집 및 이용)</h2>
              <p>
                견적 문의 시 이름, 연락처, 시공 주소 등 필요한 최소한의 개인정보를 수집합니다. 수집된 정보는 견적 안내 및 시공 일정 조율 목적으로만 사용되며, 동의 없이 제3자에게 제공되지 않습니다. 자세한 내용은{' '}
                <Link href="/privacy" className="text-brand-600 hover:underline">개인정보처리방침</Link>을 참고하시기 바랍니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제4조 (사이트 이용 제한)</h2>
              <p>다음 행위는 금지됩니다.</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                <li>허위 견적 문의 또는 스팸성 문의 반복 접수</li>
                <li>사이트 내 콘텐츠(사진, 텍스트 등) 무단 복제 및 배포</li>
                <li>사이트 운영을 방해하는 모든 행위</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제5조 (면책사항)</h2>
              <p>
                업체는 사이트에 게시된 정보의 정확성을 위해 노력하나, 시공 가격은 현장 상황에 따라 변동될 수 있습니다. 최종 견적은 현장 확인 후 확정됩니다. 사이트 내 정보를 기반으로 한 판단에 대해 업체는 책임을 지지 않습니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제6조 (약관의 변경)</h2>
              <p>
                업체는 필요 시 본 약관을 변경할 수 있으며, 변경 시 사이트를 통해 공지합니다. 변경된 약관은 공지 후 7일이 경과한 날로부터 효력이 발생합니다.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">제7조 (문의)</h2>
              <p>
                약관에 관한 문의는 아래 연락처로 해주시기 바랍니다.
              </p>
              <ul className="mt-3 space-y-1 text-gray-600">
                <li>상호: 도배의진심이반장</li>
                <li>대표자: 이승훈</li>
                <li>전화: <a href="tel:010-5388-4628" className="text-brand-600 hover:underline">010-5388-4628</a></li>
                <li>주소: 인천시 서구 서로3로 255</li>
              </ul>
            </div>

          </div>

          <div className="mt-8 text-center">
            <Link href="/privacy" className="text-brand-600 hover:underline text-sm mr-6">개인정보처리방침 보기 →</Link>
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">홈으로 돌아가기</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
