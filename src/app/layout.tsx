import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// TODO: Replace [TODO_LIVE_URL] with the actual deployment URL (e.g. "https://mystique.vercel.app")
const LIVE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

// TODO: Replace all [TODO] values below with the actual provided metadata
export const metadata: Metadata = {
  title: '[TODO: Insert Real Page Title]',
  description: '[TODO: Insert Real Meta Description]',
  keywords: ['[TODO: keyword-1]', '[TODO: keyword-2]'],
  authors: [{ name: '[TODO: Author/Brand Name]' }],
  // metadataBase is only set when a real URL is available — avoids
  // a build-time crash when the TODO placeholder is still in place.
  ...(LIVE_URL ? { metadataBase: new URL(LIVE_URL) } : {}),
  openGraph: {
    type: 'website',
    url: LIVE_URL || undefined,
    title: '[TODO: Insert OG Title]',
    description: '[TODO: Insert OG Description]',
    siteName: '[TODO: Insert Site Name]',
    images: LIVE_URL
      ? [
          {
            url: `${LIVE_URL}/og-image.png`,
            width: 1200,
            height: 630,
            alt: '[TODO: OG image alt text]',
          },
        ]
      : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[TODO: Insert Twitter Title]',
    description: '[TODO: Insert Twitter Description]',
    images: LIVE_URL ? [`${LIVE_URL}/og-image.png`] : [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* theme-color for mobile browser chrome */}
        <meta name="theme-color" content="#172836" />
      </head>
      <body>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
