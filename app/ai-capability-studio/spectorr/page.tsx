// app/insights-demo/page.tsx (Client Component)
'use client';
import { useEffect, useRef, useState } from 'react';

export default function InsightsDemo() {
  const [runId, setRunId] = useState<string | null>(null);
  const [rawPreview, setRawPreview] = useState<string[] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [insights, setInsights] = useState<any[] | null>(null);
  const esRef = useRef<EventSource | null>(null);

  const start = async () => {
    const res = await fetch('/api/demo/start', { method: 'POST' });
    const json = await res.json();
    setRunId(json.run_id);
    setRawPreview(null);
    setLogs([]);
    setInsights(null);
  };

  const mockgen = async () => {
    if (!runId) return;
    await fetch(`/api/demo/mockgen?run_id=${runId}`, { method: 'POST' });
    const raw = await fetch(`/api/demo/raw?run_id=${runId}`).then(r => r.json());
    setRawPreview(raw.rows);
  };

  const stream = async () => {
    if (!runId) return;
    // close old stream
    esRef.current?.close();
    const es = new EventSource(`/api/demo/stream?run_id=${runId}`);
    esRef.current = es;
    es.onmessage = (evt) => setLogs(prev => [...prev, evt.data]);
    es.addEventListener('status', async (evt) => {
      setLogs(prev => [...prev, `STATUS: ${evt.data}`]);
      if (evt.data === 'done') {
        const out = await fetch(`/api/demo/insights?run_id=${runId}`).then(r => r.json());
        setInsights(out.items);
      }
      es.close();
    });
  };

  useEffect(() => () => esRef.current?.close(), []);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Spectorr Insights — Interactive Demo</h1>

      <section className="space-x-2">
        <button onClick={start} className="px-4 py-2 rounded bg-black text-white">1) New Run</button>
        <button onClick={mockgen} disabled={!runId} className="px-4 py-2 rounded bg-gray-900 text-white disabled:opacity-50">2) Generate Mock Data</button>
        <button onClick={stream} disabled={!runId} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">3) Run Pipeline (watch logs)</button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Before: cleaned.csv (preview)</h2>
          <pre className="text-xs overflow-auto h-64 bg-neutral-50 p-2">{rawPreview?.join('\n') ?? '—'}</pre>
        </div>
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Pipeline Logs</h2>
          <pre className="text-xs overflow-auto h-64 bg-neutral-50 p-2">{logs.join('\n') || '—'}</pre>
        </div>
      </section>

      <section className="p-4 border rounded">
        <h2 className="font-semibold mb-4">After: Insights</h2>
        {!insights && <div>—</div>}
        {insights && (
          <div className="grid gap-4">
            {insights.map((it, i) => (
              <div key={i} className="p-4 rounded border">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{it.asset_id} — {it.date}</div>
                  <div className="text-xs px-2 py-1 rounded bg-neutral-200">{it.insight.tone} · {Math.round(it.insight.confidence*100)}%</div>
                </div>
                <p className="mt-2">{it.insight.summary}</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Drivers</div>
                    <ul className="list-disc ml-5 text-sm">
                      {it.insight.drivers?.map((d: string, idx: number) => <li key={idx}>{d}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Risks</div>
                    <ul className="list-disc ml-5 text-sm">
                      {it.insight.risks?.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 text-xs text-neutral-500">method: {it.insight.method}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
