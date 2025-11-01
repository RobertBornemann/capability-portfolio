'use client';
import Image from 'next/image';
import Link from "next/link";

export default function Home() {

  const cards = [
    {
      title: "Continuous Discovery AI",
      blurb:
        "AI-powered interview analysis for product discovery. Locked inputs, validated outputs, and cost controls.",
      href: "/ai-capability-studio/discovery", // live page
      code: "https://github.com/RobertBornemann/continuous_discovery_ai",
    },
    {
      title: "AI Cost & Performance Optimizer",
      blurb:
        "Guardrails for latency, cost, and output quality. Coming soon.",
      href: null,
      code: null,
    },
    {
      title: "PromptOps",
      blurb:
        "Service + SDK to manage prompts as versioned artifacts. Coming soon.",
      href: null,
      code: null,
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
                Lead Product Manager
                <br className="hidden md:block" />
                <span className="text-neutral-800"> & Consultant.</span>
              </h1>

              <p className="mt-5 max-w-xl text-neutral-600">
                  I help teams design and deliver data, AI, and platform products at scale that balance customer value, cost, and reliability.
                  Explore my working demos, case studies, and articles across this page.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-white">
                  Links →
                </a>
                <div className="hidden md:flex items-center gap-5 text-sm text-neutral-600">
                  <a href="https://github.com/RobertBornemann" target="_blank" className="hover:underline">GitHub</a>
                  <a href="https://www.linkedin.com/in/robert-bornemann-781713253/" target="_blank" className="hover:underline">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Right column: hero composition */}
            <div className="relative">
              {/* Big faint circle glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-b from-neutral-100 to-transparent blur-2xl" />
              {/* Black “X” accent */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] hidden md:block"
              >
                <div className="absolute inset-0 rotate-12">
                  <div className="absolute left-1/2 top-0 h-full w-[22px] -translate-x-1/2 bg-neutral-900/90" />
                  <div className="absolute top-1/2 left-0 h-[22px] w-full -translate-y-1/2 bg-neutral-900/90" />
                </div>
              </div>

              {/* Thumbnail (replace later) */}
              <div className="relative z-10 mx-auto aspect-square w-[82%] md:w-[75%] rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                <Image
                  src="/hero-thumb.jpg"
                  alt="Hero artwork"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 480px, 80vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK ANCHOR (you’ll plug your demo grid here later) */}
      <section id="work" className="mx-auto max-w-6xl px-5 md:px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured work</h2>
        <p className="mt-2 text-neutral-600">Interactive demos and case studies coming up.</p>

        {/* placeholder cards */}

        <div className="mt-8 grid gap-5 md:grid-cols-3 items-stretch">
  {cards.map((c) => (
    <div key={c.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-wide text-neutral-600">Demo</div>
        <div className="mt-1 text-lg font-semibold">{c.title}</div>
        <p className="mt-1 text-sm text-neutral-600">{c.blurb}</p>

        {/* CTA row pinned to the bottom */}
        <div className="mt-auto pt-3 flex gap-2 text-sm">
          {c.href ? (
            <Link href={c.href} className="rounded-xl border px-3 py-2 hover:bg-neutral-50">
              Open
            </Link>
          ) : (
            <span className="rounded-xl border px-3 py-2 text-neutral-400 select-none cursor-default">
              Not available
            </span>
          )}
          {c.code ? (
            <a
              href={c.code}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border px-3 py-2 hover:bg-neutral-50"
            >
              Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  ))}
</div>


      </section>
    </main>
  );
}


