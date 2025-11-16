// components/parking-lab/ParkingMap.tsx
"use client";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

type Persona = "resident" | "visitor";

type ParkingMapProps = {
  hour: number;
  persona: Persona;
};

// Later this will come from your GeoJSON.
// For now these are example coordinates for Lindwurmstr. – refine later.
const LINDWURM_EAST: LatLngExpression[] = [
  [48.1289, 11.5565],
  [48.1294, 11.5573],
  [48.1299, 11.5581],
  [48.1304, 11.5590],
];

function getColorForSegment(_segmentId: string, hour: number, _persona: Persona) {
  if (hour < 18) return "#fb7185"; // green
  if (hour < 21) return "#eab308"; // yellow
  return "#ef4444"; // red
}

export default function ParkingMap({ hour, persona }: ParkingMapProps) {
  const center: LatLngExpression = [48.1297, 11.5578]; // approx. Alter Südfriedhof
  const color = getColorForSegment("lindwurm_1_east", hour, persona);

  return (
    <MapContainer
      center={center}
      zoom={16}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}          // keeps the “frozen phone” feel
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline
        positions={LINDWURM_EAST}
        pathOptions={{
          color,
          weight: 8,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </MapContainer>
  );
}
