import Link from "next/link";

export const metadata = { title: "Experience & CV — Robert Bornemann" };

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold">Experience & CV</h1>

      <div className="mt-4 space-y-4 text-neutral-600 max-w-2xl">
        <p>
          For over ten years, I’ve built and scaled digital products across industries: from 
          AI/ML platforms to data infrastructure to enterprise systems. I specialize in aligning fragmented stakeholders, unsticking products that have 
          stalled, and bridging strategy with execution.
        </p>

        <p>
          My work spans product management & strategy, platform architecture, and organizational design. 
          I’ve led initiatives for global enterprises and fast-moving startups, though I can’t 
          disclose all clients publicly. I’ve helped shape platforms serving 
          thousands of users, driven AI adoption at scale, and published research on product 
          leadership and organizational psychology.
        </p>
        <p>
          I thrive in ambitious, complex environments where clear thinking matters more than 
          perfect plans.
        </p>
      </div>

      {/* Anonymised clients / roles */}
      <section className="mt-10 space-y-6">
        <ExpItem
          title="Global chemicals manufacturer — ML Platform Product Strategy"
          period="Germany · 500+ researchers"
          bullets={[
            "Evolution of an internal AI/ML platform aimed at democratizing research and development efforts.",
            "Reduced model deployment lead time with self-service workflows.",
            "Bridged product, data, and engineering teams to enable scalable experimentation."
          ]}
        />
        <ExpItem
          title="Automotive OEM — AI-powered data discovery prototype"
          period="Germany · cross-system search"
          bullets={[
            "Design of an llm interface to query hundreds of internal data sources & systems.",
            "Aimned to enable company-wide data discovery to support simulation-based car design.",
            "Shipped prototype and ran structured user interviews to validate fit and gaps."
          ]}
        />

        <ExpItem
          title="Data Platforms — Data Mesh Enablement"
          period="Germany · Core system modernization"
          bullets={[
            "Discovery and business alignment for large-scale modernization of data systems.",
            "Designed secure, scalable data architecture patterns based on Data Mesh principles.",
            "Facilitated collaboration between domain teams to align ownership, data contracts, and platform capabilities across organizations.",
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
