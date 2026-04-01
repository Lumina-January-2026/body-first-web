import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ProfileProvider } from '@/components/community/ProfileContext';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Body First - Your GLP-1 Planning Companion',
    template: '%s | Body First',
  },
  description:
    'Your trusted resource hub for GLP-1 medication planning. Compare medications, find savings, and get personalized support on your wellness journey.',
  openGraph: {
    type: 'website',
    siteName: 'Body First',
    title: 'Body First - Your GLP-1 Planning Companion',
    description:
      'Your trusted resource hub for GLP-1 medication planning. Compare medications, find savings, and get personalized support.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        <meta name="facebook-domain-verification" content="iharyripeb4kd32i5lhq5art1i3n22" />
      </head>
      <body className="min-h-screen bg-brand-bg">
        <ProfileProvider>
          <Header />
          <main className="min-w-0">
            {children}
          </main>
          <Footer />
        </ProfileProvider>
      </body>
    </html>
  );
}
