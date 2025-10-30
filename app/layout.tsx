import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
      </body>
    </html>
  );
}
