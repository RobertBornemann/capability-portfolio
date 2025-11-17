"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// --- helpers ---
function getOrCreateSessionId() {
  const k = "discovery_demo_session";
  try {
    let sid = localStorage.getItem(k);
    if (!sid) {
      sid = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));
      localStorage.setItem(k, sid);
    }
    return sid;
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

type Variant = "sanitized" | "sensitive";
type DemoResponse = {
  run_id: string;
  steps: string[];
  insights: any;
  variant: Variant;
  cached?: boolean;
};

export default function DiscoveryDemoClient() {
  const API = process.env.NEXT_PUBLIC_DISCOVERY_API!;
  const [variant, setVariant] = useState<Variant>("sanitized");
  const [samples, setSamples] = useState<{ sensitive: string; sanitized: string }>({
    sensitive: "",
    sanitized: "",
  });

  const [activeTab, setActiveTab] = useState<"results" | "json" | "logs" | "about">("results");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // load text previews (from /public)
  useEffect(() => {
    (async () => {
      const [sens, sani] = await Promise.all([
        fetch("/samples/sensitive.txt").then(r => r.text()).catch(() => ""),
        fetch("/samples/sanitized.txt").then(r => r.text()).catch(() => ""),
      ]);
      setSamples({ sensitive: sens, sanitized: sani });
    })();
  }, []);

  // fake nerdy logs during execution
  function pushLog(line: string) {
    setLogs(prev => [...prev, `${new Date().toISOString()}  ${line}`].slice(-200));
  }

  async function runDemo() {
    setActiveTab("results");
    setLoading(true);
    setError(null);
    setSteps([]);
    setData(null);
    setLogs([]);

    pushLog(`POST /demo/run?variant=${variant}`);
    pushLog("auth: x-demo-session present");
    pushLog("load: selecting server-side transcript");

    const res = await fetch(`${API}/demo/run?mode=auto&variant=${variant}`, {
      method: "POST",
      headers: { "x-demo-session": getOrCreateSessionId() },
    });

    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setError(j?.detail || "Server error");
      pushLog(`error: ${j?.detail || res.statusText}`);
      setLoading(false);
      return;
    }

    const json: DemoResponse = await res.json();
    // animate steps
    for (const s of json.steps) {
      setSteps(p => [...p, s]);
      pushLog(`step: ${s}`);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 220));
    }
    if (json.cached) pushLog("cache: hit (served from /tmp)");
    pushLog("done: insights ready");
    setData(json.insights);
    setLoading(false);
  }

  const currentText = useMemo(() => samples[variant], [samples, variant]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discovery AI — Read-only Demo</h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Continuous discovery is now a common best practice in modern product teams. Many teams conduct interviews to
            uncover insights, pain points, and opportunities that shape their product direction. Generative AI makes it
            possible to identify these patterns in qualitative data within minutes instead of weeks, yet many
            organizations still lack direct access, clear data guidelines, or the expertise to prompt and scale such
            tools safely and consistently.
            <br />
            <br />
            Discovery AI closes this gap. It analyzes interview data using proven research frameworks while ensuring
            structure, compliance, and security. Built for real product teams, it applies predefined research
            configurations to surface pain points, jobs to be done, workarounds, desired outcomes, and mental models.
            The outputs are ready for use, with all sensitive data removed, allowing teams to focus entirely on
            discovery rather than operations and governance.
            <br />
            <br />
            To run the demo, select a transcript below and start the analysis. You can learn more about the tech in the{" "}
            <b>About</b> section below.
          </p>
        </div>
        <button
          onClick={runDemo}
          disabled={loading}
          className="rounded-2xl bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Running…" : "Run demo"}
        </button>
      </div>

      {/* selector + preview */}
      <div className="mt-4 flex items-center gap-3">
        <Radio checked={variant === "sanitized"} onChange={() => setVariant("sanitized")}>
          Sanitized transcript
        </Radio>
        <Radio checked={variant === "sensitive"} onChange={() => setVariant("sensitive")}>
          Sensitive transcript (demo)
        </Radio>
      </div>

      <section className="mt-3">
        <div className="text-xs text-neutral-600">Preview of selected transcript</div>
        <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap rounded-2xl border bg-neutral-50 p-4 text-xs">
          {currentText || "Loading…"}
        </pre>
      </section>

      {/* step chips */}
      {steps.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <span key={i} className="rounded-full border px-3 py-1 text-xs">
              {s}
            </span>
          ))}
          {!loading && (
            <span className="rounded-full border px-3 py-1 text-xs">
              Done
            </span>
          )}
        </div>
      )}

      {/* tabs */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: "results", label: "Results" },
          { id: "json", label: "JSON" },
          { id: "logs", label: "Logs" },
          { id: "about", label: "About" },
        ]}
        className="mt-8"
      />

      {/* content */}
      {error && (
        <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {activeTab === "results" && data && <InsightsGrid insights={data} />}
      {activeTab === "json" && data && <JsonPanel data={data} />}
      {activeTab === "logs" && <LogPanel lines={logs} />}
      {activeTab === "about" && <AboutPanel />}

      {!data && !error && activeTab !== "about" && (
        <div className="mt-6 text-sm text-neutral-500">Run the demo to see results here.</div>
      )}
    </main>
  );
}

// --- UI components: Radio, Tabs, Panels, Cards ---

function Radio({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="radio" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}

function Tabs({
  value,
  onChange,
  tabs,
  className,
}: {
  value: string;
  onChange: (v: any) => void;
  tabs: { id: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="inline-flex rounded-full border p-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`rounded-full px-4 py-1 text-sm ${
              value === t.id ? "bg-black text-white" : ""
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function JsonPanel({ data }: { data: unknown }) {
  const pretty = useMemo(() => JSON.stringify(data, null, 2), [data]);
  function copy() {
    navigator.clipboard?.writeText(pretty);
  }
  function download() {
    const blob = new Blob([pretty], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "insights.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="mt-4">
      <div className="mb-2 flex gap-2">
        <button onClick={copy} className="rounded border px-3 py-1 text-xs">
          Copy
        </button>
        <button onClick={download} className="rounded border px-3 py-1 text-xs">
          Download
        </button>
      </div>
      <pre className="max-h-[28rem] overflow-auto rounded-2xl border bg-neutral-50 p-4 text-xs">
        {pretty}
      </pre>
    </div>
  );
}

function LogPanel({ lines }: { lines: string[] }) {
  return (
    <pre className="mt-4 max-h-[24rem] overflow-auto rounded-2xl border bg-black p-4 text-xs text-green-300">
      {lines.length ? lines.join("\n") : "…waiting for next run"}
    </pre>
  );
}

function InsightsGrid({ insights }: { insights: any }) {
  return (
    <section className="mt-4 space-y-8">
      <InsightSection
        title="Pain Points"
        items={insights.pain_points}
        render={(pp: any) => (
          <InsightCard
            title={pp.description}
            lines={[`Impact: ${pp.impact}`, pp.quote ? `“${pp.quote}”` : undefined]}
          />
        )}
      />
      <InsightSection
        title="Jobs-to-be-Done"
        items={insights.jobs_to_be_done}
        render={(j: any) => (
          <InsightCard
            title={j.functional_job}
            lines={[`Emotional: ${j.emotional_job}`, `Context: ${j.context}`]}
          />
        )}
      />
      <InsightSection
        title="Workarounds"
        items={insights.workarounds}
        render={(w: any) => (
          <InsightCard
            title={w.what_they_do}
            lines={[`Why: ${w.why_needed}`, `Cost: ${w.cost}`]}
          />
        )}
      />
      <InsightSection
        title="Desired Outcomes"
        items={insights.desired_outcomes}
        render={(o: any) => (
          <InsightCard title={o.outcome} lines={[`Gap: ${o.current_gap}`]} />
        )}
      />
      <InsightSection
        title="Behavioral Signals"
        items={insights.behavioral_signals}
        render={(b: any) => (
          <InsightCard
            title={b.observation}
            lines={[`Reveals: ${b.what_it_reveals}`]}
          />
        )}
      />
      <InsightSection
        title="Mental Models"
        items={insights.mental_models}
        render={(m: any) => (
          <InsightCard
            title={m.description}
            lines={[
              m.metaphor_or_analogy ? `Metaphor: ${m.metaphor_or_analogy}` : undefined,
              m.mismatch_with_reality ? `Mismatch: ${m.mismatch_with_reality}` : undefined,
            ].filter(Boolean)}
          />
        )}
      />
    </section>
  );
}

function InsightSection({
  title,
  items,
  render,
}: {
  title: string;
  items?: any[];
  render: (item: any) => JSX.Element;
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h2 className="text-lg font-semibold">
        {title}{" "}
        <span className="text-neutral-500 text-sm">({items.length})</span>
      </h2>
      <div className="mt-3 grid gap-3">
        {items.map((it, i) => (
          <div key={i}>{render(it)}</div>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ title, lines }: { title: string; lines?: (string | undefined)[] }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="font-medium">{title}</div>
      {lines?.map(
        (l, i) =>
          l && (
            <div key={i} className="text-sm text-neutral-600">
              {l}
            </div>
          )
      )}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <InfoBox title="What this is">
        AI workflow tool for automated analysis of user interviews. It identifies pain points, jobs to be done,
        workarounds, desired outcomes, and mental models by applying predefined research configurations. The system
        produces outputs ready for Miro or Mural and is built with sensible defaults, embedded guardrails, and strong
        security to ensure inputs are sanitized and sensitive data safely removed.
      </InfoBox>

      <InfoBox title="Architecture">
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>Next.js (Vercel) demo UI, no manual uploads.</li>
          <li>FastAPI (Railway) loads whitelisted transcripts by variant.</li>
          <li>Pydantic-AI + OpenAI — typed agent, schema-validated outputs.</li>
          <li>
            Session limits and variant-scoped caching<code>/tmp</code>.
          </li>
        </ul>
      </InfoBox>

      <InfoBox title="Model">
        <CodeBlock>{`// Typed agent (pydantic-ai)
agent = Agent(
  model="openai:gpt-4o-mini",
  output_type=InterviewInsights,
  system_prompt=build_system_prompt(guidelines),
  model_settings={"temperature": 0.3},
)`}</CodeBlock>
      </InfoBox>

      <InfoBox title="Who uses this">
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>
            <b>PMs & UX:</b> faster synthesis, consistent artifacts.
          </li>
          <li>
            <b>Platform teams:</b> analyse & compare interviews without support.
          </li>
          <li>
            <b>Leads:</b> privacy, governance, and cost control by design.
          </li>
        </ul>
      </InfoBox>
    </div>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  const ref = useRef<HTMLPreElement | null>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [children]);
  function copy() {
    navigator.clipboard?.writeText(children);
  }
  return (
    <div>
      <div className="mb-2">
        <button onClick={copy} className="rounded border px-3 py-1 text-xs">
          Copy
        </button>
      </div>
      <pre
        ref={ref}
        className="max-h-48 overflow-auto rounded-2xl border bg-neutral-50 p-4 text-xs"
      >
        {children}
      </pre>
    </div>
  );
}
