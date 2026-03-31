"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Restaurant } from "@/lib/restaurantData";

function makePin(emoji: string) {
  return L.divIcon({
    html: `<div style="
      width:36px;height:36px;border-radius:50%;
      background:#ffd966;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      font-size:17px;line-height:1;
    ">${emoji}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

interface Props {
  restaurants: Restaurant[];
  onSelect: (r: Restaurant) => void;
}

export default function RestaurantMapInner({ restaurants, onSelect }: Props) {
  return (
    <MapContainer
      center={[37.558, 126.937]}
      zoom={15}
      style={{ height: "420px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {restaurants.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={makePin(r.emoji)}
          eventHandlers={{ click: () => onSelect(r) }}
        >
          <Popup>
            <strong>{r.name}</strong>
            <br />
            <span style={{ color: "#71717a", fontSize: "12px" }}>{r.category}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
