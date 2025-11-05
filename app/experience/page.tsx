import Link from "next/link";

export const metadata = { title: "Experience & CV — Robert Bornemann" };

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold">About Me</h1>

      <div className="mt-4 space-y-4 text-neutral-600 max-w-2xl">
        <p>
For over ten years I have built and scaled digital products across industries, from AI and machine learning platforms to data infrastructure and enterprise systems. I specialize in aligning fragmented stakeholders, unsticking stalled products, and connecting strategy with execution.        </p>

        <p>
My work spans product management and strategy, platform architecture, and organizational design. I have led initiatives for global enterprises and fast-moving startups, though I cannot disclose all clients publicly. My consulting journey has spanned continents, with years spent in South and North America that shaped my approach to leadership, culture, and innovation.</p>
        <p>
        Experience across industries such as e-commerce, retail, fintech, automotive and mobility, aviation, energy, and manufacturing has shaped my work designing platforms for thousands of users, driving AI adoption at scale, and publishing on product leadership and organizational psychology. I thrive in ambitious and complex environments where clear thinking matters more than perfect plans.
       </p>
      </div>

      {/* Anonymised clients / roles */}
      <section className="mt-10 space-y-6">
        <ExpItem
          title="Global chemicals manufacturer — ML Platform Product"
          period="Germany · Self-service"
          bullets={[
            "Evolution of an internal AI/ML platform aimed at democratizing research and development efforts.",
            "Reduced model deployment lead time with self-service workflows.",
            "Bridged product, data, and engineering teams to enable scalable experimentation."
          ]}
        />
        <ExpItem
          title="Luxury car manufacturer — AI-powered data discovery prototype"
          period="Germany · Cross-system search"
          bullets={[
            "Design of an llm interface to query hundreds of internal data sources & systems.",
            "Aimned to enable company-wide data discovery to support simulation-based car design.",
            "Shipped prototype and ran structured user interviews to validate fit and gaps."
          ]}
        />

        <ExpItem
          title="Various Data Platforms — Data Mesh Enablement"
          period="Europe · Core system modernization"
          bullets={[
            "Discovery and business alignment for large-scale modernization of data systems.",
            "Designed secure, scalable data architecture patterns based on Data Mesh principles.",
            "Facilitated collaboration to align ownership, capabilities and governance across organizations.",
          ]}
        />
      </section>


    </main>
  );
}

function ExpItem({ title, period, bullets }: { title: string; period: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-neutral-600">{period}</div>
      <ul className="mt-3 list-disc list-inside text-sm text-neutral-700">
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </div>
  );
}
