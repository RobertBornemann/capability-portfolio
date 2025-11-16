// app/labs/hyperlocal-parking/page.tsx
"use client";

import PhoneFrame from "@/components/PhoneFrame";

export default function HyperlocalParkingPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      {/* Hero Section with Title */}
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Hyperlocal Predictive Parking · Munich
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Parkcast Lab
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
          A prototype that predicts parking availability on a tiny, highly regulated patch of Munich using manually curated data, 
          lightweight ML models, and a phone-style map interface.
          </p>
        </div>

        {/* Large Phone Display - Centered */}
        <div className="flex justify-center mb-16">
          <PhoneFrame />
        </div>

        {/* Details Below Phone */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="rounded-2xl border-2 border-neutral-200 bg-white p-6">
            <h2 className="text-xl font-bold mb-4">About This Prototype</h2>
            <div className="space-y-3 text-neutral-700 leading-relaxed">
              <p>
              This is the in-progress Parkcast prototype for hyperlocal parking predictions in my neighborhood in Munich. 
              Parking here is notoriously difficult, so I finally asked the real question: where do I have any chance of finding a spot at a given time?
              The interface uses a Leaflet map with a time slider and color-coded street segments, each representing the 
              predicted parking availability for that segment.
              </p>
              <p>
                The current version uses dummy logic for visualization purposes. In the next version, 
                it will connect to the actual ML model and API that processes manually collected parking data.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-neutral-200 bg-white p-6">
              <h3 className="font-bold mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>Street-Level Parking Predictions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>Hyperlocal, Rule-Aware Map Overlay</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>Phone-Style Interactive UI</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>End-to-End ML Pipeline</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-neutral-200 bg-white p-6">
              <h3 className="font-bold mb-3">Tech Stack</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>Next.js</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>Scikit-learn</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>React</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">▸</span>
                  <span>FastAPI</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}