import type { Metadata, Viewport } from 'next';
import { Fraunces, Nunito } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'PensaFarms — Premium Livestock & Farm Produce',
  description:
    'From chickens and eggs to beef cattle and dairy — PensaFarms raises premium livestock with care, delivering the finest farm produce from our pastures to your table.',
  keywords: ['farm', 'livestock', 'beef', 'chicken', 'eggs', 'dairy', 'Nigeria', 'Abuja', 'PensaFarms'],
  openGraph: {
    title: 'PensaFarms — Where the Land Feeds the World',
    description: 'Premium livestock and farm produce, raised with heart.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#071a0d',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
