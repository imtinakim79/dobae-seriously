import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dobae-seriously.com'),
  title: {
    default: '도배에 진심 이반장 | 서울·인천·경기 도배 전문',
    template: '%s | 도배에 진심 이반장',
  },
  description:
    '서울·인천·경기 지역 아파트·빌라 도배 전문. 20년 경력의 이반장이 직접 시공합니다. 합리적인 가격, 깔끔한 마무리, 빠른 일정 보장.',
  keywords: ['도배', '도배 전문', '아파트 도배', '서울 도배', '경기 도배', '도배에 진심 이반장', '실크벽지', '합지도배'],
  authors: [{ name: '도배에 진심 이반장' }],
  creator: '도배에 진심 이반장',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dobae-seriously.com',
    siteName: '도배에 진심 이반장',
    title: '도배에 진심 이반장 | 서울·인천·경기 도배 전문',
    description: '서울·인천·경기 지역 아파트·빌라 도배 전문. 20년 경력의 이반장이 직접 시공합니다.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '도배에 진심 이반장 — 서울·인천·경기 도배 전문업체' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '도배에 진심 이반장 | 서울·인천·경기 도배 전문',
    description: '서울·인천·경기 지역 아파트·빌라 도배 전문. 20년 경력의 이반장이 직접 시공합니다.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',  // https://search.google.com/search-console 에서 발급
    other: {
      'naver-site-verification': 'YOUR_NAVER_TOKEN',  // https://searchadvisor.naver.com 에서 발급
    },
  },
};

/* ──────────────────────────────────────────
   LocalBusiness JSON-LD Schema
   구글 검색 결과에 업체 전화번호·주소 노출
   ────────────────────────────────────────── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '도배에 진심 이반장',
  description: '서울·인천·경기 지역 아파트, 빌라, 상업공간 도배 시공 전문. 합리적인 가격과 깔끔한 마무리.',
  url: 'https://dobae-seriously.com',
  telephone: '010-5388-4628',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '',           // ← 실제 주소로 교체
    addressLocality: '서울특별시',
    addressRegion: '서울',
    postalCode: '00000',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.5665,   // ← 실제 좌표로 교체
    longitude: 126.9780,
  },
  areaServed: [
    { '@type': 'City', name: '서울특별시' },
    { '@type': 'AdministrativeArea', name: '경기도' },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  sameAs: ['https://blog.naver.com/dobae_seriously'],
  image: 'https://dobae-seriously.com/og-image.jpg',
  hasMap: 'https://maps.google.com/?q=서울특별시',
  currenciesAccepted: 'KRW',
  paymentAccepted: '현금, 계좌이체, 카드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
