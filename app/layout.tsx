import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import "leaflet/dist/leaflet.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: 'Robert Bornemann — AI Productization Portfolio',
  description: 'Interactive demos + case studies in LLMOps, RAG, Governance, DX.',
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
