// app/ai-capability-studio/parkcast_lab/layout.tsx - mainly created to add metadata
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hyperlocal Predictive Parking Lab · ParkCast",
  description:
    "ML-powered, street-level parking availability in a Munich neighborhood, featuring a phone-style map, time slider, and color-coded segments.",
};

export default function ParkcastLabLayout({ children }: { children: ReactNode }) {
  // no "use client" here – this stays a server component
  return <>{children}</>;
}
