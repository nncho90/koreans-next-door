"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type VeganPlace } from "@/lib/veganData";

function makePin(emoji: string) {
  return L.divIcon({
    html: `<div style="
      width:34px;height:34px;border-radius:50%;
      background:#4ade80;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      font-size:16px;line-height:1;
    ">${emoji}</div>`,
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

interface Props {
  places: VeganPlace[];
  onSelect: (p: VeganPlace) => void;
}

export default function VeganMapInner({ places, onSelect }: Props) {
  return (
    <MapContainer
      center={[37.535, 127.0]}
      zoom={11}
      style={{ height: "460px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {places.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={makePin(p.emoji)}
          eventHandlers={{ click: () => onSelect(p) }}
        >
          <Popup>
            <strong>{p.name}</strong>
            <br />
            <span style={{ color: "#71717a", fontSize: "12px" }}>{p.category}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
