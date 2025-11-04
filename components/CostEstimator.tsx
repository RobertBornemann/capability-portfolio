'use client';
import { useEffect, useMemo, useState } from 'react';

type Provider = 'openai' | 'anthropic' | 'meta' | 'mistral';

type PricingEntry = {
  provider: Provider;
  model: string;
  input_per_1k: number;   // € per 1k input tokens
  output_per_1k: number;  // € per 1k output tokens
  latency_ms: number;
  currency?: string;
};

type EstimateBody = {
  provider: Provider;
  model: string;
  requests_per_day: number;
  avg_input_tokens: number;
  avg_output_tokens: number;
  cache_hit_rate: number; // 0..1
  streaming: boolean;
};

type EstimateResp = {
  cost_per_request: number;
  daily_cost: number;
  monthly_cost: number;
  yearly_cost: number;
  tokens_in_per_req: number;
  tokens_out_per_req: number;
};

type Preset = {
  id: string;
  label: string;
  rpd: number;   // requests per day
  inp: number;   // avg input tokens
  out: number;   // avg output tokens
  cache: number; // 0..1
  note?: string;
};

const PRESETS: Preset[] = [
  { id: 'helpdesk',    label: 'Helpdesk summaries',        rpd: 2000, inp: 1500, out: 120, cache: 0.10, note: 'Ticket thread + metadata → concise summary' },
  { id: 'product-desc',label: 'Product descriptions',      rpd:  800, inp:  200, out: 120, cache: 0.15, note: 'Attributes + brief → 2–3 sentences' },
  { id: 'rag-qa',      label: 'RAG Q&A (internal)',        rpd: 1200, inp:  2000, out: 400, cache: 0.20, note: 'Query + retrieved snippets → short answer' },
];

type FieldHints = { rpd?: string; inp?: string; out?: string };
const PRESET_HINTS: Record<string, FieldHints> = {
  helpdesk: { rpd: '≈ average helpdesk volume for a medium-sized company', inp: '≈ 1,100–1,300 words (~4–6 paragraphs) across thread + metadata', out: '≈ 2 short paragraphs (concise summary)' },
  'product-desc': { rpd: '≈ daily catalog enrichment throughput', inp: 'Structured attributes + short brief', out: '2–3 sentences product copy' },
  'rag-qa': { rpd: 'Common internal Q&A usage across teams', inp: 'Query + 2–3 retrieved snippets', out: 'Short direct answer' },
  'meeting-notes': { rpd: 'Daily meetings across a small org', inp: 'Transcript chunk for 30–45 min meeting', out: 'Bullets + action items' },
  'code-review': { rpd: 'Active team with daily PRs', inp: 'Diff + rules; varies by PR size', out: 'Targeted review comments' },
  emails: { rpd: 'Daily outbound variants across segments', inp: 'Brief + audience profile', out: 'Customized email body' },
  translation: { rpd: 'Short docs or UI strings at scale', inp: 'Source text', out: 'Translated text (similar length)' },
  'doc-extract': { rpd: 'Forms/invoices pipeline throughput', inp: 'Page text + extraction schema', out: 'Structured JSON fields' },
};

const BASE = '/cost-api'; // Next.js rewrite → FastAPI

export default function CostEstimator() {
  const [pricing, setPricing] = useState<PricingEntry[]>([]);
  const [form, setForm] = useState<EstimateBody>({
    provider: 'openai',
    model: 'gpt-4o-mini',
    requests_per_day: 1000,
    avg_input_tokens: 200,
    avg_output_tokens: 300,
    cache_hit_rate: 0,
    streaming: false,
  });
  const [res, setRes] = useState<EstimateResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [presetNote, setPresetNote] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const providerModels = useMemo(
    () => pricing.filter(p => p.provider === form.provider).map(p => p.model),
    [pricing, form.provider]
  );

  const selectedPrice = useMemo(() => {
    return pricing.find(p => p.provider === form.provider && p.model === form.model) ?? null;
  }, [pricing, form.provider, form.model]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(`${BASE}/pricing`, { cache: 'no-store' });
        if (!r.ok) throw new Error(`/pricing ${r.status}`);
        const data: PricingEntry[] = await r.json();
        if (cancelled) return;
        setPricing(data);
        if (!data.some(d => d.provider === form.provider && d.model === form.model)) {
          const first = data.find(d => d.provider === form.provider);
          if (first) setForm(f => ({ ...f, model: first.model }));
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message ?? 'Failed to load pricing');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.provider]);

  function onChange<K extends keyof EstimateBody>(key: K, v: EstimateBody[K]) {
    setRes(null);
    setForm(prev => ({ ...prev, [key]: v }));
  }

  function applyPreset(p: Preset) {
    setPresetNote(p.note ?? null);
    setActivePresetId(p.id);
    setRes(null);
    setForm(f => ({
      ...f,
      requests_per_day: p.rpd,
      avg_input_tokens: p.inp,
      avg_output_tokens: p.out,
      cache_hit_rate: p.cache,
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null); setRes(null);
    try {
      const r = await fetch(`${BASE}/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(`estimate ${r.status}`);
      const data: EstimateResp = await r.json();
      setRes(data);
    } catch (e: any) {
      setErr(e.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  const euro = (n: number, d = 2) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: d }).format(n);

  return (
    <div className="mx-auto max-w-5xl p-6 bg-white rounded-2xl border shadow-sm">
      <h1 className="text-3xl font-bold mb-2">AI Cost Estimator</h1>
      <p className="text-neutral-600 mb-5">
        Enter rough usage and get instant cost estimates. Runs against latest pricing data from OpenAI, Anthropic, Meta, and Mistral.
      </p>

      {/* Template chips ONLY (dropdown removed) */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-600">Templates:</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className={`h-9 rounded-full border px-3 text-sm hover:bg-neutral-50 transition ${
                activePresetId===p.id ? 'bg-black text-white' : ''
              }`}
              title={p.note}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      {presetNote && (
        <div className="mb-4 text-xs text-neutral-500">
          ({presetNote})
        </div>
      )}

      {/* FORM */}
      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
      <form onSubmit={onSubmit} className="grid gap-5">
        {/* row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <label className="md:col-span-4 grid gap-1">
            <span className="text-sm text-neutral-600">Provider</span>
            <select
              value={form.provider}
              onChange={e => onChange('provider', e.target.value as Provider)}
              className="h-11 w-full rounded-md border px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              {['openai','anthropic','meta','mistral'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <span className="block min-h-[18px]" />
          </label>

          <label className="md:col-span-5 grid gap-1">
            <span className="text-sm text-neutral-600">Model</span>
            <input
              list="models"
              value={form.model}
              onChange={e => onChange('model', e.target.value)}
              className="h-11 w-full rounded-md border px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="e.g., gpt-4o-mini"
            />
            <datalist id="models">
              {providerModels.map(m => <option key={m} value={m} />)}
            </datalist>
            {/* Unit price peek */}
            {selectedPrice ? (
              <span className="mt-1 text-xs text-neutral-500 block min-h-[18px]">
                {(selectedPrice.currency ?? '€')}{selectedPrice.input_per_1k.toFixed(2)} in / {(selectedPrice.currency ?? '€')}{selectedPrice.output_per_1k.toFixed(2)} out per 1k tokens
              </span>
            ) : (
              <span className="block min-h-[18px]" />
            )}
          </label>

          <label className="md:col-span-3 grid gap-1">
            <span className="text-sm text-neutral-600">Cache hit rate (0–1)</span>
            <input
              type="number" min={0} max={1} step={0.05}
              value={form.cache_hit_rate}
              onChange={e => onChange('cache_hit_rate', Number((e.target as HTMLInputElement).value))}
              className="h-11 w-full rounded-md border px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="0.25"
            />
            <span className="text-xs text-neutral-500 block min-h-[18px]">Share of repeated requests served from cache</span>
          </label>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <label className="md:col-span-4 grid gap-1">
            <span className="text-sm text-neutral-600">Requests / day</span>
            <input
              type="number" min={1}
              value={form.requests_per_day}
              onChange={e => onChange('requests_per_day', Number((e.target as HTMLInputElement).value))}
              className="h-11 w-full rounded-md border px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
              placeholder="1000"
            />
            <span className="text-xs text-neutral-500 block min-h-[18px]">
              {activePresetId && PRESET_HINTS[activePresetId]?.rpd
                ? `${form.requests_per_day.toLocaleString('de-DE')} — ${PRESET_HINTS[activePresetId]!.rpd}`
                : ''}
            </span>
          </label>

          <label className="md:col-span-4 grid gap-1">
            <span className="text-sm text-neutral-600">Avg input tokens</span>
            <div className="relative">
              <input
                type="number" min={0}
                value={form.avg_input_tokens}
                onChange={e => onChange('avg_input_tokens', Number((e.target as HTMLInputElement).value))}
                className="h-11 w-full rounded-md border pl-3 pr-14 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="200"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-xs text-neutral-500">tokens</span>
            </div>
            <span className="text-xs text-neutral-500 block min-h-[18px]">
              {activePresetId && PRESET_HINTS[activePresetId]?.inp
                ? `${form.avg_input_tokens} tokens — ${PRESET_HINTS[activePresetId]!.inp}`
                : ''}
            </span>
          </label>

          <label className="md:col-span-4 grid gap-1">
            <span className="text-sm text-neutral-600">Avg output tokens</span>
            <div className="relative">
              <input
                type="number" min={0}
                value={form.avg_output_tokens}
                onChange={e => onChange('avg_output_tokens', Number((e.target as HTMLInputElement).value))}
                className="h-11 w-full rounded-md border pl-3 pr-14 text-[15px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="300"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-xs text-neutral-500">tokens</span>
            </div>
            <span className="text-xs text-neutral-500 block min-h-[18px]">
              {activePresetId && PRESET_HINTS[activePresetId]?.out
                ? `${form.avg_output_tokens} tokens — ${PRESET_HINTS[activePresetId]!.out}`
                : ''}
            </span>
          </label>
        </div>

        {/* actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-md border px-4 font-medium hover:bg-neutral-50 disabled:opacity-50"
          >
            {loading ? 'Calculating…' : 'Estimate'}
          </button>

          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, requests_per_day: 5000, avg_input_tokens: 300, avg_output_tokens: 500, cache_hit_rate: 0.2 }))}
            className="text-sm underline text-neutral-600 hover:text-neutral-800"
          >
            Use sample numbers
          </button>

          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-neutral-500">Cache:</span>
            {[0, 0.2, 0.5].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => onChange('cache_hit_rate', v)}
                className={`h-8 rounded-full px-3 border ${form.cache_hit_rate === v ? 'bg-black text-white' : 'hover:bg-neutral-50'}`}
              >
                {Math.round(v * 100)}%
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* RESULTS */}
      {res && (
        <div className="mt-6">
          <div className="text-sm text-neutral-600 mb-3">
            Effective tokens per request: <b>{res.tokens_in_per_req}</b> in, <b>{res.tokens_out_per_req}</b> out
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border p-4">
              <div className="text-xs text-neutral-600">€ / request</div>
              <div className="mt-1 text-xl font-semibold">{euro(res.cost_per_request, 3)}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-xs text-neutral-600">€ / day</div>
              <div className="mt-1 text-xl font-semibold">{euro(res.daily_cost)}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-xs text-neutral-600">€ / month</div>
              <div className="mt-1 text-xl font-semibold">{euro(res.monthly_cost)}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-xs text-neutral-600">€ / year</div>
              <div className="mt-1 text-xl font-semibold">{euro(res.yearly_cost)}</div>
            </div>
          </div>

          {selectedPrice && (
            <p className="mt-3 text-xs text-neutral-500">
              Prices per 1,000 tokens — Input: {(res.tokens_in_per_req/1000*selectedPrice.input_per_1k).toFixed(2)} €,
              Output: {(res.tokens_out_per_req/1000*selectedPrice.output_per_1k).toFixed(2)} €.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
