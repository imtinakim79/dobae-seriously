import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="도배에 진심 이반장"
                width={140}
                height={52}
                className="h-12 w-auto object-contain invert brightness-200"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              서울·경기 지역 도배 전문.<br />
              도배의진심 이반장이 직접 시공합니다.<br />
              합리적인 가격, 깔끔한 마무리 보장.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/portfolio', label: '시공 갤러리' },
                { href: '/services', label: '서비스 안내' },
                { href: '/about', label: '이반장 소개' },
                { href: '/contact', label: '견적 문의' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://blog.naver.com/dobae_seriously"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  네이버 블로그 ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:010-5388-4628" className="hover:text-white transition-colors">
                  010-5388-4628
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>평일·토요일 08:00 ~ 19:00</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>서울·경기 전 지역 출장 가능</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a href="https://open.kakao.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  카카오톡 문의
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Info */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-xs text-gray-500 space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>상호: 도배의진심이반장</span>
            <span>대표자: 이승훈</span>
          </div>
          <div>
            <span>주소: 인천시 서구 서로3로 255 (우) 22860</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2">
            <p>© {new Date().getFullYear()} 도배의진심이반장. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-gray-300 transition-colors">이용약관</Link>
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">개인정보처리방침</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
