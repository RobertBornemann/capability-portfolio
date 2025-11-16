// components/ParkingMap.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type GeoJsonSegment = {
  type: "Feature";
  properties: {
    segment_id: string;
    street_name: string;
    from_cross?: string;
    to_cross?: string;
    side?: string;
    rule_type?: string;
    total_spots?: number;
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number][]; // [lon, lat]
  };
};

type GeoJsonCollection = {
  type: "FeatureCollection";
  features: GeoJsonSegment[];
};

type ParkingMapProps = {
  hour: number; // 0–23
};

type AvailabilityLevel = "low" | "medium" | "high";

// --- Map prob → discrete level ---

function getLevel(prob: number): AvailabilityLevel {
  if (prob <= 0.3) return "low";       // likely no parking
  if (prob >= 0.7) return "high";      // likely some parking
  return "medium";                     // in-between
}

// --- Colors for each level ---

const LEVEL_COLORS: Record<AvailabilityLevel, string> = {
  low: "#dc2626",    // red-600
  medium: "#2563eb", // blue-600
  high: "#16a34a",   // green-600
};

// --- Styling helper: level → color, prob → subtle thickness/opacity ---

function styleSegment(probFree: number) {
  const level = getLevel(probFree);
  const color = LEVEL_COLORS[level];

  const weight = 2.5 + probFree * 1.5;     // 2.5–4 px
  const opacity = 0.35 + probFree * 0.35;  // 0.35–0.7

  return {
    color,
    weight,
    opacity,
    lineCap: "round" as const,
    lineJoin: "round" as const,
  };
}

// --- Mock probabilities: segment_id × hour ---
// ⚠️ Update keys to match your segment_id values in segments.geojson
const MOCK_PROBS: Record<string, number[]> = {
  // examples – missing segments fall back to 0.5 (medium)
  walther_haeberl_tumblinger_n: Array(24).fill(0.75), // mostly green
  walther_tumblinger_maistra_n: Array(24).fill(0.5),  // blue
  // add more here as you like
};

function getProb(segmentId: string, hour: number): number {
  const arr = MOCK_PROBS[segmentId];
  if (!arr) return 0.5; // neutral default
  return arr[hour] ?? 0.5;
}

export default function ParkingMap({ hour }: ParkingMapProps) {
  const [segments, setSegments] = useState<GeoJsonSegment[]>([]);

  useEffect(() => {
    async function loadSegments() {
      try {
        const res = await fetch("/parking-lab/segments.geojson");
        if (!res.ok) {
          console.error("Failed to load segments.geojson", res.status);
          return;
        }
        const data: GeoJsonCollection = await res.json();
        setSegments(data.features || []);
      } catch (e) {
        console.error("Error loading segments.geojson", e);
      }
    }
    loadSegments();
  }, []);

  const center: LatLngExpression = [48.1285, 11.5620];
  const zoom = 15.6;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {segments.map((feature) => {
        const { segment_id } = feature.properties;
        const prob = getProb(segment_id, hour);
        const pathOptions = styleSegment(prob);

        // GeoJSON coords [lon, lat] → Leaflet wants [lat, lon]
        const latLngs: LatLngExpression[] =
          feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]);

        return (
          <Polyline
            key={segment_id}
            positions={latLngs}
            pathOptions={pathOptions}
          />
        );
      })}
    </MapContainer>
  );
}
