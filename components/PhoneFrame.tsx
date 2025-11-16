// components/PhoneFrame.tsx
"use client";

import { useEffect, useState } from "react";
import ParkingMap from "./ParkingMap";

export default function PhoneFrame() {
  const [hour, setHour] = useState(20);
  const [autoPlay, setAutoPlay] = useState(true);

  const formattedHour = `${hour.toString().padStart(2, "0")}:00`;

  // Auto-advance time until user interacts
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setHour((prev) => (prev + 1) % 24);
    }, 2000); // ~10× speed through the day

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleSliderChange = (value: number) => {
    setHour(value);
    setAutoPlay(false); // user took control
  };

  return (
    <div className="relative w-[360px] md:w-[400px] h-[720px] md:h-[800px] rounded-[48px] border-4 border-neutral-900 bg-neutral-900 shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center z-30 pointer-events-none">
        <div className="w-40 h-6 bg-neutral-900 rounded-full" />
      </div>

      {/* Thin, even bezel around inner screen */}
      <div className="relative h-full pt-0.5 pb-0.5 px-0.5">
        {/* Inner screen with subtle rounding */}
        <div className="relative h-full rounded-[43px] overflow-hidden bg-neutral-950">
          {/* Map layer */}
          <div className="absolute inset-0 z-0">
            <ParkingMap hour={hour} />
          </div>

          {/* Overlay UI layer */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 pointer-events-none">
            <div className="pointer-events-auto rounded-3xl bg-neutral-900/85 backdrop-blur-md px-4 py-4 text-xs text-neutral-200 shadow-xl space-y-3">
              {/* Time header + value */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] uppercase tracking-wide text-neutral-400">
                  Time of day
                </span>
                <span className="font-mono text-xs text-neutral-100">
                  {formattedHour}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-blue-500
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:w-4
                           [&::-moz-range-thumb]:h-4
                           [&::-moz-range-thumb]:border-0
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:bg-blue-500"
              />

              {/* Legend */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-6 rounded-full bg-red-500" />
                  <span className="text-[11px] text-neutral-300">
                    Likely no parking
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-6 rounded-full bg-blue-500" />
                  <span className="text-[11px] text-neutral-300">
                    Medium chance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-6 rounded-full bg-green-500" />
                  <span className="text-[11px] text-neutral-300">
                    Likely some parking
                  </span>
                </div>
              </div>

              {/* Footer note */}
              <div className="text-[10px] text-neutral-500 leading-tight">
                Watch the map cycle through the day. Move the slider to pause
                and inspect a specific time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
