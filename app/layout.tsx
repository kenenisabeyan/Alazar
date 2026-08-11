import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/index.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/common/CustomCursor';
import SmoothScroll from '@/components/common/SmoothScroll';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Alazar Asdesach | Visual Storyteller & Lead Editor',
    template: '%s | Alazar Asdesach',
  },
  description: 'Crafting compelling narratives through high-end cinematic video editing, color grading, and striking graphic design for visionary brands.',
  keywords: ['Video Editor', 'Colorist', 'Graphic Designer', 'Cinematic Reel', 'Brand Identity', 'Post Production'],
  authors: [{ name: 'Alazar Asdesach' }],
  creator: 'Alazar Asdesach',
  metadataBase: new URL('https://alazar.design'),
  openGraph: {
    title: 'Alazar Asdesach | Cinematic Vision & Premium Design',
    description: 'Crafting compelling narratives through high-end video editing and striking graphic design.',
    url: 'https://alazar.design',
    siteName: 'Alazar Asdesach Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Alazar Asdesach Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alazar Asdesach | Cinematic Vision & Design',
    description: 'High-end video editing and graphic design portfolio.',
    images: ['https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-canvas text-charcoal antialiased selection:bg-burgundy selection:text-white">
        <SmoothScroll>
          <div className="font-sans bg-canvas text-charcoal min-h-screen flex flex-col relative overflow-x-hidden">
            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* Ambient Soft Glow — subtle burgundy warmth */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-burgundy-soft/10 blur-[180px] rounded-full pointer-events-none z-0"></div>

            <Navigation />

            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

