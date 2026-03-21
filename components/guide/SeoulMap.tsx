"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapNeighborhood {
  name: string;
  korean: string;
  emoji: string;
  guName: string; // Korean gu name matching GeoJSON properties.name
  vibe: { en: string; ko: string };
  foreignerFriendly: 1 | 2 | 3;
  lat: number;
  lng: number;
}

function makeEmojiIcon(emoji: string, active: boolean) {
  return L.divIcon({
    html: `<div style="
      width: 36px; height: 36px;
      border-radius: 50%;
      background: ${active ? "#ffd966" : "white"};
      border: 2px solid ${active ? "#c9a800" : "#d4d4d8"};
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    ">${emoji}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
  });
}

function FlyTo({ lat, lng, active }: { lat: number; lng: number; active: boolean }) {
  const map = useMap();
  const prev = useRef<string | null>(null);
  useEffect(() => {
    const key = `${lat},${lng}`;
    if (active && prev.current !== key) {
      map.flyTo([lat, lng], 14, { duration: 0.7 });
      prev.current = key;
    } else if (!active) {
      prev.current = null;
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
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/seoul-districts.json")
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  const activeGuName = activeIndex !== null ? neighborhoods[activeIndex].guName : null;

  const districtStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
    const name = feature?.properties?.name;
    const isActive = name === activeGuName;
    const isFeatured = neighborhoods.some((n) => n.guName === name);
    return {
      fillColor: isActive ? "#ffd966" : isFeatured ? "#fffbeb" : "#f4f4f5",
      fillOpacity: isActive ? 0.55 : isFeatured ? 0.4 : 0.2,
      color: isActive ? "#c9a800" : isFeatured ? "#fde68a" : "#d4d4d8",
      weight: isActive ? 2.5 : isFeatured ? 1.5 : 0.8,
    };
  };

  return (
    <MapContainer
      center={[37.5326, 126.9908]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        maxZoom={19}
      />

      {/* District polygons */}
      {geoData && (
        <GeoJSON
          key={activeGuName ?? "none"}
          data={geoData}
          style={districtStyle}
          onEachFeature={(feature, layer) => {
            const match = neighborhoods.findIndex(
              (n) => n.guName === feature.properties?.name
            );
            if (match !== -1) {
              layer.on("click", () => onSelect(match));
              (layer as L.Path).on("mouseover", () => {
                if (match !== activeIndex) {
                  (layer as L.Path).setStyle({ fillOpacity: 0.55, fillColor: "#fef9c3" });
                }
              });
              (layer as L.Path).on("mouseout", () => {
                (layer as L.Path).setStyle(districtStyle(feature));
              });
            }
          }}
        />
      )}

      {/* Emoji pins */}
      {neighborhoods.map((n, i) => (
        <Marker
          key={n.name}
          position={[n.lat, n.lng]}
          icon={makeEmojiIcon(n.emoji, activeIndex === i)}
          eventHandlers={{ click: () => onSelect(i) }}
          zIndexOffset={activeIndex === i ? 1000 : 0}
        >
          <FlyTo lat={n.lat} lng={n.lng} active={activeIndex === i} />
          <Popup>
            <div style={{ minWidth: 160 }}>
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                {n.korean}{" "}
                <span style={{ fontWeight: 400, color: "#71717a" }}>{n.name}</span>
              </p>
              <p style={{ fontSize: 12, color: "#a16207", marginBottom: 6 }}>
                {locale === "ko" ? n.vibe.ko : n.vibe.en}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
