import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '어드민 | 도배에진심이반장',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
