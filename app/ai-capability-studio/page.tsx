// app/ai-capability-studio/page.tsx
import Link from "next/link";
import Image from "next/image";

type DemoCard = {
  slug: string;
  title: string;
  blurb: string;
  status: "Demo" | "Coming soon";
  actionable?: boolean;
  thumbnail?: string;
  tags?: string[]; // New: technology tags
};

export default function StudioHub() {
  const demos: DemoCard[] = [
    {
      slug: "spectorr",
      title: "Inspectorr AI",
      blurb:
        "Measuring market confidence across portfolios through the transformation from raw reports to governed AI insight.",
      status: "Demo",
      actionable: true,
      thumbnail: "/hero-sentiment-analysis.png",
      tags: ["Claude AI", "FastAPI", "Next.js"],
    },
    {
      slug: "discovery",
      title: "Continuous Discovery AI",
      blurb:
        "AI-powered interview analysis for product discovery that bakes in company-ready methods, structure, and compliance while enforcing strong security, embedded guardrails, and full traceability.",
      status: "Demo",
      actionable: true,
      thumbnail: "/discovery-hero.png",
      tags: ["OpenAI", "Pydantic-AI", "Governance"],
    },
    {
      slug: "cost-optimizer",
      title: "AI Cost & Performance Optimizer",
      blurb:
        "A visual, interactive tool that shows AI cost optimization opportunities in real-time, with before/after comparisons and actionable recommendations.",
      status: "Demo",
      actionable: true,
      thumbnail: "/optimizer-hero.png",
      tags: ["Governance", "Data Viz", "Cost Analysis"],
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <h1 className="text-5xl font-bold tracking-tight">AI Capability Studio</h1>
        <p className="text-lg text-neutral-600 max-w-3xl">
          Interactive demos showcasing production-grade AI applications I&apos;ve built, 
          from concept to implementation. Each demo highlights both technical execution 
          and product thinking.
        </p>
        <p className="text-sm text-neutral-500">
          Demos use sample data with rate limits and input validation to manage API costs.
        </p>
      </div>

      {/* Demo Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((d) => (
          <article
            key={d.slug}
            className="group rounded-2xl border-2 border-neutral-200 hover:border-blue-400 overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white flex flex-col"
          >
            {/* Thumbnail */}
            {d.thumbnail ? (
              <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-50 to-neutral-100 overflow-hidden">
                <Image
                  src={d.thumbnail}
                  alt={d.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      d.status === "Demo"
                        ? "bg-blue-600/90 text-white"
                        : "bg-amber-500/90 text-white"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            ) : (
              // Fallback if no thumbnail
              <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-50 to-neutral-100 flex items-center justify-center">
                <div className="text-6xl opacity-30">🚀</div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      d.status === "Demo"
                        ? "bg-blue-600/90 text-white"
                        : "bg-amber-500/90 text-white"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                {d.title}
              </h2>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed flex-1">
                {d.blurb}
              </p>

              {/* Tags */}
              {d.tags && d.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {d.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-md bg-neutral-100 text-neutral-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              {d.actionable ? (
                <div className="mt-6">
                  <Link
                    href={`/ai-capability-studio/${d.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-white font-medium hover:bg-neutral-800 transition-all group/btn"
                  >
                    <span>Open Demo</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="mt-6 text-sm text-neutral-400 italic">
                  Coming soon
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Footer Note */}
      <div className="mt-16 p-6 rounded-xl bg-neutral-50 border border-neutral-200">
        <h3 className="font-semibold text-neutral-900 mb-2">About These Demos</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Each project is aiming to demonstrate end-to-end thinking: from identifying user needs 
          and defining success metrics, to technical architecture and polished UX. 
          These aren&apos;t just code samples, they&apos;re products designed with real-world 
          constraints in mind, including cost optimization, security, and scalability.
        </p>
      </div>
    </main>
  );
}