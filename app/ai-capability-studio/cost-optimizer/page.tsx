import dynamic from 'next/dynamic';
import Image from 'next/image';
const CostEstimator = dynamic(() => import('@/components/CostEstimator'), { ssr: false });

export const metadata = { title: 'AI Cost & Performance Optimizer' };

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fafafa] p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* NEW: intro paragraph */}
        <section className="mx-auto max-w-5xl px-4">
          <h1 className="text-3xl font-bold mb-2">AI Cost & Performance Optimizer</h1>
          <p className="text-neutral-700">
          Generative AI is hitting a hard cost wall: the latest foundational models people want do not get much cheaper per token, 
          while tokens per task explode with reasoning, long contexts, and agents, so bills rise faster than value at the moment (Oct, 2025). Generative AI is running on thin margins and investor subsidy: 
          many apps undercharge today to win market share, while most profit pools sit with model and cloud providers.
          Flat rate plans quietly subsidize power users, 
          and usage based pricing still hurts when real outcomes need lots of compute. 
          With compute spend surging, AI will not scale without strong cost awareness: estimation of per run costs, enforcing budgets and caps, 
          routing most work to smaller models, escalating to foundational models only when success criteria truly require it.
          </p>
          <br />
          <p className="text-neutral-700">
          This page offers an interactive way to simulate AI spend for mid-sized companies, estimate savings, optimize prompts, and explore costs with visual plots.
          </p>
        </section>
        {/* Existing calculator box */}
        <CostEstimator />

        {/* Summary */}
        <section className="mx-auto max-w-5xl px-4">
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-2">Key Takeaways:</h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700">
            <li>
                API costs are token based, not per message, which makes budgeting confusing; you pay for both input and output tokens, and any chat history you resend counts too.
            </li>
            <li>
                Official prices differ by model and by input versus output, and context limits cap how much text a single exchange can handle.
            </li>
            <li>
                Reasoning models produce extra internal tokens during planning, so even as per token prices drop, total tokens per useful task often rise, pushing real costs up.
            </li>
            <li>
                Example costs: short posts or product descriptions are very cheap on small or mini model variants, while long contexts and agent style workflows can become expensive quickly.
            </li>
            <li>
                Track tokens, cap context, avoid resending full histories, and estimate cost per run to keep spend predictable.
            </li>
            </ul>

            <div className="mt-4 rounded-lg border bg-neutral-50 p-4 text-neutral-800 text-sm">
            <strong className="font-semibold">Practical takeaway:</strong>{' '}
            use small or mini models for routine work, and escalate to reasoning or frontier models only when the task truly needs it.
            </div>
        </div>
        </section>
      </div>
    </main>
  );
}





