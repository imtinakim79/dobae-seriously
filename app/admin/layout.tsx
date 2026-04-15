import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '어드민 | 이반장 도배',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
