// app/ai-capability-studio/page.tsx
import Link from "next/link";

type DemoCard = {
  slug: string;
  title: string;
  blurb: string;
  status: "Demo" | "Coming soon";
  actionable?: boolean; // when false -> no button
};

export default function StudioHub() {
  const demos: DemoCard[] = [
    {
      slug: "discovery",
      title: "Continuous Discovery AI",
      blurb:
        "AI-powered interview analysis for product discovery that bakes in company-ready methods, structure, and compliance while enforcing strong security, embedded guardrails, and full traceability. Find out more and test it yourself!",
      status: "Demo",
      actionable: true,
    },
    {
      slug: "costs",
      title: "AI Cost & Performance Optimizer",
      blurb:
        "A visual, interactive tool that shows AI cost optimization opportunities in real-time, with before/after comparisons and actionable recommendations.",
      status: "Coming soon",
      actionable: false, // hide button
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-bold">AI Capability Studio</h1>
      <p className="mt-2 text-neutral-600">
        This page features interactive demos from my private work in AI, data, and beyond, showcasing
        both the products I build and the product thinking behind them, including value creation,
        success metrics, and design choices. Inputs are sandboxed to protect privacy and control costs.
      </p>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        {demos.map((d) => (
          <article key={d.slug} className="rounded-2xl border p-5">
            {/* Make the card a column and push the CTA to the bottom */}
            <div className="flex min-h-[200px] flex-col">
              <div className="text-xs uppercase tracking-wide text-neutral-500">{d.status}</div>
              <h2 className="mt-1 text-xl font-semibold">{d.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{d.blurb}</p>

              {/* CTA row anchored at the bottom */}
              {d.actionable ? (
                <div className="mt-auto pt-4">
                  <Link
                    href={`/ai-capability-studio/${d.slug}`}
                    className="inline-block rounded-2xl bg-black px-4 py-2 text-white"
                  >
                    Open
                  </Link>
                </div>
              ) : (
                // If not actionable, reserve space so card heights match but show nothing
                <div className="mt-auto pt-4" aria-hidden />
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
