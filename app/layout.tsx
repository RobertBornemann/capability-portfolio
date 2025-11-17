import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import "leaflet/dist/leaflet.css";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = 'https://robertbornemann.de';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'RobertBornemann.de – Data & AI, Technical & Platform Products',
    template: '%s | RobertBornemann.de',
  },
  description:
    'Portfolio of Data & AI, technical & platform products: LLM/ML demos, cost optimizers, asset insights pipelines, and governance-focused AI experiments.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'RobertBornemann.de',
    title: 'RobertBornemann.de – Data & AI, Technical & Platform Products',
    description:
      'Showcasing data & AI, technical & platform products inspired by real-world use cases.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--rb-bg)] text-neutral-900 antialiased">
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
