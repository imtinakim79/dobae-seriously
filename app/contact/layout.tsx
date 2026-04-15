import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '견적 문의 | 도배에진심이반장',
  description: '서울·인천·경기 도배 무료 견적 문의. 시공 지역, 평수, 희망 날짜를 알려주시면 빠르게 견적을 드립니다.',
  alternates: { canonical: 'https://dobae-seriously.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
