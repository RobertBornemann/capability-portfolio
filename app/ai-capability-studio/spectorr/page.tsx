import type { Metadata } from 'next';
import { InsightsDemo } from './InsightsDemo';

export const metadata: Metadata = {
  title: 'Inspectorr Insights — LLM-Powered Sentiment Demo for Portfolios',
  description:
    'Working end-to-end demo that turns analyst notes and market commentary into daily, per-asset insights. Generate sample data, run the pipeline, watch logs, and read bank-style summaries (drivers, risks, tone, confidence).',
};

export default function Page() {
  // Server component – allowed to export `metadata`
  return <InsightsDemo />;
}
