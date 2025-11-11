'use client';
import Image from 'next/image';
import Link from "next/link";

export default function Home() {

  const cards = [
    {
      title: "Inspectorr AI",
      blurb:
        "Measuring market confidence across portfolios through the transformation from raw reports to governed AI insight.",
      href: "/ai-capability-studio/spectorr",
      code: "https://github.com/RobertBornemann/spectorr_pipeline",
      thumbnail: "/hero-sentiment-analysis.png",
    },
    {
      title: "Continuous Discovery AI",
      blurb:
        "AI workflow tool that automates the analysis of user interviews with built-in defaults, guardrails, research guidelines, and input sanitization.",
      href: "/ai-capability-studio/discovery",
      code: "https://github.com/RobertBornemann/continuous_discovery_ai",
      thumbnail: "/discovery-hero.png",
    },
    {
      title: "AI Cost & Performance Optimizer",
      blurb:
        "AI Costs and performance trade-offs: in-progress tool exploring how different use cases and company types map to simulated spend.",
      href: "/ai-capability-studio/cost-optimizer",
      code: "https://github.com/RobertBornemann/AI-Cost-Performance-Optimiser",
      thumbnail: "/optimizer-hero.png",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24">
            {/* Left column: headline + copy + CTA */}
            <div>
              <h1 className="text-4xl md:text-6xl leading-[1.05] font-extrabold tracking-tight">
                Product Leader
                <br className="hidden md:block" />
                <span className="text-neutral-800"> & Consultant.</span>
              </h1>

              <p className="mt-5 max-w-xl text-neutral-600">
              I work across product strategy and delivery, building deep expertise in data, platform, and AI products.
              Explore my demos, case studies, and articles. Currently at Thoughtworks.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
                  View Work →
                </a>
                <div className="hidden md:flex items-center gap-5 text-sm text-neutral-600">
                  <a href="https://github.com/RobertBornemann" target="_blank" className="hover:text-black transition-colors">GitHub</a>
                  <a href="https://www.linkedin.com/in/robert-bornemann-781713253/" target="_blank" className="hover:text-black transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Right column: Featured blog posts */}
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-b from-blue-100 to-transparent blur-3xl opacity-60" />
              
              {/* Featured blog posts grid */}
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {/* Blog post 1 */}
                <Link 
                  href="/blog/discovery"
                  className="relative aspect-square rounded-2xl border-2 border-neutral-200 bg-white shadow-lg overflow-hidden group hover:border-blue-400 transition-all duration-300"
                >
                  <Image
                    src="/hidden.png"
                    alt="The Hidden Edge"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-xs font-semibold">Latest Post</p>
                    <p className="text-sm font-bold mt-1 line-clamp-2">The Hidden Edge</p>
                  </div>
                </Link>

                {/* Blog post 2 */}
                <Link 
                  href="/blog/courage"
                  className="relative aspect-square rounded-2xl border-2 border-neutral-200 bg-white shadow-lg overflow-hidden group hover:border-blue-400 transition-all duration-300"
                >
                  <Image
                    src="/courage.png"
                    alt="The Courage to Be Yourself"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-xs font-semibold">Essay</p>
                    <p className="text-sm font-bold mt-1 line-clamp-2">The Courage to Be Yourself</p>
                  </div>
                </Link>
                
                {/* Blog post 3 */}
                <Link 
                  href="/blog/adoption"
                  className="relative aspect-square rounded-2xl border-2 border-neutral-200 bg-white shadow-lg overflow-hidden group hover:border-blue-400 transition-all duration-300"
                >
                  <Image
                    src="/discovery.png"
                    alt="Designing for Adoption"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-xs font-semibold">Framework</p>
                    <p className="text-sm font-bold mt-1 line-clamp-2">Designing for Adoption</p>
                  </div>
                </Link>

                {/* View all blog link */}
                <Link 
                  href="/blog"
                  className="relative aspect-square rounded-2xl border-2 border-neutral-200 bg-gradient-to-br from-blue-50 to-neutral-100 shadow-lg flex items-center justify-center group hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform"></div>
                    <p className="text-sm font-bold text-neutral-700 group-hover:text-blue-600 transition-colors">View All Posts</p>
                    <p className="text-xs text-neutral-500 mt-1">Essays & case studies</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK ANCHOR */}
      <section id="work" className="mx-auto max-w-6xl px-5 md:px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured work</h2>
        <p className="mt-2 text-neutral-600">Interactive demos and case studies.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group rounded-2xl border-2 border-neutral-200 hover:border-blue-400 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-50 to-neutral-100">
                {c.thumbnail && (
                  <Image
                    src={c.thumbnail}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white backdrop-blur-sm">
                    {c.href ? 'Demo' : 'Coming Soon'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs uppercase tracking-wide text-neutral-600">Demo</div>
                <h3 className="mt-1 text-lg font-semibold group-hover:text-blue-600 transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {c.blurb}
                </p>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-1 min-h-[20px]" />

                {/* CTA buttons */}
                <div className="flex gap-2 text-sm">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="flex-1 text-center rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                    >
                      Open
                    </Link>
                  ) : (
                    <span className="flex-1 text-center rounded-xl border border-neutral-200 px-4 py-2 text-neutral-400 cursor-not-allowed">
                      Not available
                    </span>
                  )}
                  
                  {c.code && (
                    <a
                      href={c.code}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border-2 border-neutral-200 px-4 py-2 hover:border-blue-600 hover:text-blue-600 transition-colors font-medium flex items-center justify-center"
                      title="View source code on GitHub"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}