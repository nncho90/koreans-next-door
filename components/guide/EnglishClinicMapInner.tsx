"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type ClinicPin } from "@/lib/healthData";

function makePin(level: "Full" | "Partial") {
  const color = level === "Full" ? "#10b981" : "#f59e0b";
  return L.divIcon({
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
      font-size:14px;
    ">🏥</div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface Props {
  clinics: ClinicPin[];
  selected: ClinicPin | null;
  onSelect: (c: ClinicPin) => void;
}

export default function EnglishClinicMapInner({ clinics, onSelect }: Props) {
  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={11}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {clinics.map((clinic) => (
        <Marker
          key={clinic.name}
          position={[clinic.lat, clinic.lng]}
          icon={makePin(clinic.englishLevel)}
          eventHandlers={{ click: () => onSelect(clinic) }}
        >
          <Popup>
            <strong>{clinic.name}</strong>
            <br />
            {clinic.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
