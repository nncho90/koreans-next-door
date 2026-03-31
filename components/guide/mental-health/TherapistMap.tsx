"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { THERAPISTS } from "@/lib/mentalHealthData";

type Therapist = (typeof THERAPISTS)[number];

function makePin() {
  return L.divIcon({
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:#ffd966;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      font-size:14px;
    ">🧠</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface Props {
  therapists: Therapist[];
  onSelect: (t: Therapist) => void;
}

export default function TherapistMap({ therapists, onSelect }: Props) {
  const icon = makePin();
  return (
    <MapContainer
      center={[37.555, 126.965]}
      zoom={11}
      style={{ height: "380px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {therapists.map((t) => (
        <Marker
          key={t.name}
          position={[t.lat, t.lng]}
          icon={icon}
          eventHandlers={{ click: () => onSelect(t) }}
        >
          <Popup>
            <strong>{t.name}</strong>
            <br />
            {t.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
