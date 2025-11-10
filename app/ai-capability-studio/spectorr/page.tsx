// app/insights-demo/page.tsx (Improved Version)
'use client';
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Database, Brain, CheckCircle2, Loader2 } from 'lucide-react';

type PipelineStage = 'idle' | 'initializing' | 'ingesting' | 'analyzing' | 'complete';

export default function InsightsDemo() {
  const [runId, setRunId] = useState<string | null>(null);
  const [rawPreview, setRawPreview] = useState<string[] | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [insights, setInsights] = useState<any[] | null>(null);
  const [stage, setStage] = useState<PipelineStage>('idle');
  const [showLogs, setShowLogs] = useState(false);
  const [metrics, setMetrics] = useState({ notes: 0, assets: 0, duration: 0 });
  const esRef = useRef<EventSource | null>(null);
  const startTimeRef = useRef<number>(0);

  const runAnalysis = async () => {
    setStage('initializing');
    setRawPreview(null);
    setLogs([]);
    setInsights(null);
    startTimeRef.current = Date.now();

    // Step 1: Start new run
    const res = await fetch('/api/demo/start', { method: 'POST' });
    const json = await res.json();
    setRunId(json.run_id);

    // Step 2: Generate mock data automatically
    setStage('ingesting');
    await fetch(`/api/demo/mockgen?run_id=${json.run_id}`, { method: 'POST' });
    const raw = await fetch(`/api/demo/raw?run_id=${json.run_id}`).then(r => r.json());
    setRawPreview(raw.rows);
    setMetrics(prev => ({ ...prev, notes: raw.rows?.length || 0 }));

    // Step 3: Stream pipeline execution
    setStage('analyzing');
    esRef.current?.close();
    const es = new EventSource(`/api/demo/stream?run_id=${json.run_id}`);
    esRef.current = es;
    
    es.onmessage = (evt) => setLogs(prev => [...prev, evt.data]);
    
    es.addEventListener('status', async (evt) => {
      setLogs(prev => [...prev, `STATUS: ${evt.data}`]);
      if (evt.data === 'done') {
        const out = await fetch(`/api/demo/insights?run_id=${json.run_id}`).then(r => r.json());
        setInsights(out.items);
        setMetrics(prev => ({ 
          ...prev, 
          assets: out.items?.length || 0,
          duration: (Date.now() - startTimeRef.current) / 1000
        }));
        setStage('complete');
      }
      es.close();
    });
  };

  useEffect(() => () => esRef.current?.close(), []);

  const getSentimentColor = (tone: string) => {
    if (tone === 'positive') return 'text-green-600 bg-green-50 border-green-200';
    if (tone === 'negative') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getSentimentIcon = (tone: string) => {
    return tone === 'positive' ? TrendingUp : TrendingDown;
  };

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">INSPECTORR</h1>
        <p className="text-lg text-neutral-600">
          Production-grade sentiment analysis for finance
        </p>
        <p className="text-sm text-neutral-500">
          Real-time processing of analyst notes and market commentary built with Next.js, FastAPI, Python and Claude AI (Anthropic)
        </p>
      </div>

      {/* Main CTA */}
      <div className="flex justify-center">
        <button
          onClick={runAnalysis}
          disabled={stage !== 'idle' && stage !== 'complete'}
          className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
        >
          {stage === 'idle' && '▶ Analyze Sample Portfolio'}
          {stage === 'complete' && '↻ Run New Analysis'}
          {(stage === 'initializing' || stage === 'ingesting' || stage === 'analyzing') && (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </span>
          )}
        </button>
      </div>

      {/* Pipeline Progress */}
      {stage !== 'idle' && (
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-lg">Pipeline Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stage 1 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
              stage === 'initializing' ? 'border-blue-500 bg-blue-50' :
              ['ingesting', 'analyzing', 'complete'].includes(stage) ? 'border-green-500 bg-green-50' :
              'border-neutral-200 bg-white'
            }`}>
              {['ingesting', 'analyzing', 'complete'].includes(stage) ? 
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" /> :
                <Database className={`w-6 h-6 flex-shrink-0 ${stage === 'initializing' ? 'text-blue-600' : 'text-neutral-400'}`} />
              }
              <div>
                <div className="font-medium">Data Ingestion</div>
                <div className="text-sm text-neutral-600">
                  {metrics.notes > 0 ? `${metrics.notes} notes loaded` : 'Loading market data...'}
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
              stage === 'analyzing' ? 'border-blue-500 bg-blue-50' :
              stage === 'complete' ? 'border-green-500 bg-green-50' :
              'border-neutral-200 bg-white'
            }`}>
              {stage === 'complete' ? 
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" /> :
                <Brain className={`w-6 h-6 flex-shrink-0 ${stage === 'analyzing' ? 'text-blue-600 animate-pulse' : 'text-neutral-400'}`} />
              }
              <div>
                <div className="font-medium">AI Analysis</div>
                <div className="text-sm text-neutral-600">
                  {stage === 'analyzing' ? 'Claude processing...' : 
                   stage === 'complete' ? 'Analysis complete' : 'Pending...'}
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
              stage === 'complete' ? 'border-green-500 bg-green-50' : 'border-neutral-200 bg-white'
            }`}>
              {stage === 'complete' ? 
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" /> :
                <Zap className="w-6 h-6 text-neutral-400 flex-shrink-0" />
              }
              <div>
                <div className="font-medium">Insights Generated</div>
                <div className="text-sm text-neutral-600">
                  {stage === 'complete' ? 
                    `${metrics.assets} assets • ${metrics.duration.toFixed(1)}s` : 
                    'Pending...'}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {stage === 'complete' && (
            <div className="flex items-center justify-center gap-6 pt-2 text-sm text-neutral-600 border-t">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                Processed {metrics.notes} notes in {metrics.duration.toFixed(2)}s
              </span>
              <span className="flex items-center gap-1">
                <Brain className="w-4 h-4 text-blue-500" />
                Claude AI sentiment analysis
              </span>
            </div>
          )}
        </div>
      )}

      {/* Technical Logs (Collapsible) */}
      {logs.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="w-full px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between font-medium text-sm"
          >
            <span>🔧 Technical Logs ({logs.length} events)</span>
            <span className="text-xs text-neutral-500">{showLogs ? '▼ Hide' : '▶ Show'}</span>
          </button>
          {showLogs && (
            <div className="bg-neutral-900 text-green-400 p-4 font-mono text-xs overflow-auto max-h-96">
              {logs.map((log, i) => (
                <div key={i} className="hover:bg-neutral-800 px-2 py-0.5">
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Insights Dashboard */}
      {insights && insights.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Sentiment Insights</h2>
            <div className="text-sm text-neutral-500">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="grid gap-6">
            {insights.map((it, i) => {
              const SentimentIcon = getSentimentIcon(it.insight.tone);
              const sentimentColor = getSentimentColor(it.insight.tone);
              
              return (
                <div key={i} className="bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-neutral-50 to-white border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">{it.asset_id}</h3>
                        <p className="text-sm text-neutral-500 mt-1">{it.date}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${sentimentColor}`}>
                        <SentimentIcon className="w-5 h-5" />
                        <span className="font-semibold capitalize">{it.insight.tone}</span>
                        <span className="text-sm">· {Math.round(it.insight.confidence*100)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="px-6 py-5 border-b bg-white">
                    <p className="text-neutral-700 leading-relaxed">{it.insight.summary}</p>
                  </div>

                  {/* Drivers & Risks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                    <div className="px-6 py-5 bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <h4 className="font-semibold text-neutral-900">Key Drivers</h4>
                      </div>
                      <ul className="space-y-2">
                        {it.insight.drivers?.map((d: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="text-green-500 mt-0.5">▲</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 py-5 bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <h4 className="font-semibold text-neutral-900">Risk Factors</h4>
                      </div>
                      <ul className="space-y-2">
                        {it.insight.risks?.map((r: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="text-red-500 mt-0.5">▼</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 bg-neutral-50 text-xs text-neutral-500 flex items-center justify-between">
                    <span>Analysis method: <code className="px-1.5 py-0.5 bg-neutral-200 rounded">{it.insight.method}</code></span>
                    <span>Based on {metrics.notes} analyst notes</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Hero Image / Empty State */}
      {stage === 'idle' && (
        <div className="space-y-8">
          {/* Hero Image */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-neutral-50">
            <img 
              src="/hero-sentiment-analysis.png" 
              alt="AI Sentiment Analysis Visualization"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '400px' }}
              onError={(e) => {
                // Fallback if image doesn't exist yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="flex items-center justify-center h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-neutral-100">
                    <div class="text-center space-y-3 p-8">
                      <div class="text-6xl">🤖✨</div>
                      <p class="text-lg text-neutral-600 font-medium">AI-Powered Sentiment Analysis</p>
                      <p class="text-sm text-neutral-500">Add your hero image at /public/hero-sentiment-analysis.png</p>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
          
          {/* Description */}
          <div className="text-center space-y-4 text-neutral-600">
            <p className="text-lg">Click above to see the AI sentiment analysis pipeline in action</p>
          </div>

          {/* Architecture & Roadmap Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Architecture */}
            <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg text-neutral-900">What this does</h3>
              <ul className="space-y-3 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Daily per-asset insights:</strong> summary, key drivers, risk cues, tone, confidence.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Portfolio view:</strong> quick read of where sentiment is rising, turning, or diverging from price.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Auditability:</strong> each insight ties back to dated sources and an explicit prompt version.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Professional clarity:</strong> clean language that reads like an internal note.</span>
                </li>
              </ul>
            </div>

            {/* What the Demo Does Today */}
            <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg text-neutral-900">How it works</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Generates sample data:</strong> analyst notes, investor feedback, market commentary.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Ingest & clean:</strong> normalizes data into asset_id, text, source_date, sentiment_score with basic hygiene.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Model & summarize:</strong> Claude reads per asset/day and returns summary, drivers, risks, tone, confidence (versioned prompt).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Serve & visualize:</strong> A FastAPI backend exposes insights and sentiment aggregates for the next.js UI.</span>
                </li>
              </ul>
            </div>

            {/* Scale Path */}
            <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg text-neutral-900">Scale Path</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-green-600">▸</span>
                  <span><strong>More sources:</strong> broker research, transcripts, earnings snippets, social finance</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">▸</span>
                  <span><strong>Model flexibility:</strong> additional providers; route by cost, latency, or sensitivity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">▸</span>
                  <span><strong>Chunking & routing:</strong> smart grouping per asset/day with retries, backoff, budget guards</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">▸</span>
                  <span><strong>Caching & history:</strong> snapshot insights by day for trend lines and "what changed" diffs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">▸</span>
                  <span><strong>Role-aware views:</strong> PM overview, analyst deep-dives, compliance-ready exports</span>
                </li>
              </ul>
            </div>

            {/* Product Principles */}
            <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg text-neutral-900">Key Product Principles</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-amber-600">✓</span>
                  <span><strong>Signal over noise:</strong> concise, explainable outputs that can be scanned in seconds</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">✓</span>
                  <span><strong>Governable by default:</strong> versioning, clear provenance (method, confidence, source dates)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">✓</span>
                  <span><strong>Cost-aware:</strong> batching, token caps; easy to swap models or set demo limits</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">✓</span>
                  <span><strong>Separation of concerns:</strong> pipeline, backend, frontend clearly separated</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-600">✓</span>
                  <span><strong>Enterprise-ready:</strong> SSO and workspace governance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}