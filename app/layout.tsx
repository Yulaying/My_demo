import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Diary Space',
  description: 'Mobile friendly personal diary website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <div className="shell nav-shell">
            <Link href="/" className="brand">
              Diary Space
            </Link>
            <nav className="main-nav" aria-label="主导航">
              <Link href="/diary" className="nav-link">
                日记
              </Link>
              <Link href="/diary/new" className="nav-link nav-link--cta">
                写一篇
              </Link>
            </nav>
          </div>
        </header>
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
