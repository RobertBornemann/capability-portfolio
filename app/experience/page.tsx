import Image from 'next/image';

export const metadata = { title: "About Me — Robert Bornemann" };

export default function AboutMePage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section with Photo */}
      <section className="mx-auto max-w-6xl px-5 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-10 md:gap-16">
          {/* Photo */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-b from-neutral-100 to-transparent blur-2xl" />
            <div className="relative z-10 mx-auto w-full max-w-md h-[500px] rounded-2xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
              <Image
                src="/hero-thumb.jpg"
                alt="Robert Bornemann"
                fill
                className="object-cover object-center"
                sizes="(min-width: 768px) 450px, 90vw"
                priority
              />
            </div>
          </div>

          {/* Intro */}
          <div className="order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              About Me
            </h1>
            <div className="space-y-5 text-neutral-600 leading-relaxed text-base">
              <p>
                For over ten years I have built and scaled digital products across industries, from AI and machine learning platforms to data infrastructure and enterprise systems. I specialize in aligning fragmented stakeholders, unsticking stalled products, and connecting strategy with execution.
              </p>
              <p>
                My work spans product management and strategy, platform architecture, and organizational design. I have led initiatives for global enterprises and fast-moving startups, though I cannot disclose all clients publicly. My consulting journey has spanned continents, with years spent in South and North America that shaped my approach to leadership, culture, and innovation.
              </p>
              <p>
                Experience across industries such as e-commerce, retail, fintech, automotive and mobility, aviation, energy, and manufacturing has shaped my work designing platforms for thousands of users, driving AI adoption at scale, and publishing on product leadership and organizational psychology. I thrive in ambitious and complex environments where clear thinking matters more than perfect plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mx-auto max-w-6xl px-5 md:px-6 py-16 border-t border-neutral-200">
        <h2 className="text-3xl font-bold mb-10">Selected Work</h2>
        
        <div className="space-y-6">
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
              "Aimed to enable company-wide data discovery to support simulation-based car design.",
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
        </div>
      </section>
    </main>
  );
}

function ExpItem({ title, period, bullets }: { title: string; period: string; bullets: string[] }) {
  return (
    <article className="group rounded-2xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-bold text-neutral-900 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-sm text-neutral-500 mb-4">{period}</p>
      <ul className="space-y-2">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed">
            <span className="text-blue-600 mt-1 flex-shrink-0">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}