"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapNeighborhood {
  name: string;
  korean: string;
  emoji: string;
  vibe: { en: string; ko: string };
  foreignerFriendly: 1 | 2 | 3;
  lat: number;
  lng: number;
}

function makeEmojiIcon(emoji: string, active: boolean) {
  return L.divIcon({
    html: `<div style="
      width: 40px; height: 40px;
      border-radius: 50%;
      background: ${active ? "#ffd966" : "white"};
      border: 2px solid ${active ? "#c9a800" : "#d4d4d8"};
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.2s;
    ">${emoji}</div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
}

function FlyTo({ lat, lng, active }: { lat: number; lng: number; active: boolean }) {
  const map = useMap();
  const prev = useRef<string | null>(null);
  useEffect(() => {
    const key = `${lat},${lng}`;
    if (active && prev.current !== key) {
      map.flyTo([lat, lng], 14, { duration: 0.8 });
      prev.current = key;
    }
  }, [active, lat, lng, map]);
  return null;
}

interface Props {
  neighborhoods: MapNeighborhood[];
  activeIndex: number | null;
  onSelect: (i: number) => void;
  locale: "en" | "ko";
}

export default function SeoulMap({ neighborhoods, activeIndex, onSelect, locale }: Props) {
  return (
    <MapContainer
      center={[37.5326, 126.9908]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      className="rounded-2xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        maxZoom={19}
      />
      {neighborhoods.map((n, i) => (
        <Marker
          key={n.name}
          position={[n.lat, n.lng]}
          icon={makeEmojiIcon(n.emoji, activeIndex === i)}
          eventHandlers={{ click: () => onSelect(i) }}
        >
          <FlyTo lat={n.lat} lng={n.lng} active={activeIndex === i} />
          <Popup>
            <div style={{ minWidth: 160 }}>
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                {n.korean} <span style={{ fontWeight: 400, color: "#71717a" }}>{n.name}</span>
              </p>
              <p style={{ fontSize: 12, color: "#a16207", marginBottom: 6 }}>
                {locale === "ko" ? n.vibe.ko : n.vibe.en}
              </p>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: d <= n.foreignerFriendly ? "#ffd966" : "#e4e4e7",
                      display: "inline-block",
                    }}
                  />
                ))}
                <span style={{ fontSize: 11, color: "#a1a1aa", marginLeft: 4 }}>
                  {locale === "ko" ? "외국인 친화도" : "Foreigner-friendly"}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
