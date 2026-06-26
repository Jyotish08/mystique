import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

// TODO: Populate with actual provided SEO/OG metadata
export const metadata: Metadata = {
  title: 'TODO_SEO_TITLE',
  description: 'TODO_SEO_DESCRIPTION',
  openGraph: {
    title: 'TODO_OG_TITLE',
    description: 'TODO_OG_DESCRIPTION',
    images: ['TODO_OG_IMAGE_URL'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
