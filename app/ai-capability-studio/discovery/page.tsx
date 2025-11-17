// app/ai-capability-studio/discovery/page.tsx
import type { Metadata } from "next";
import DiscoveryDemoClient from "./DiscoveryDemo";

export const metadata: Metadata = {
  title: "Discovery AI — Interview Insights Demo",
  description:
    "AI workflow tool for automated analysis of user interviews. Identifies pain points, jobs-to-be-done, workarounds, desired outcomes, and mental models using predefined research configurations with strong guardrails and sanitization.",
};

export default function DiscoveryPage() {
  return <DiscoveryDemoClient />;
}
