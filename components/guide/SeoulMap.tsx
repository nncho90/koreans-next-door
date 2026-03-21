"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapNeighborhood {
  name: string;
  korean: string;
  emoji: string;
  guName: string;
  color: { fill: string; border: string; text: string };
  vibe: { en: string; ko: string };
  foreignerFriendly: 1 | 2 | 3;
  lat: number;
  lng: number;
}

function makeEmojiIcon(emoji: string, color: string, active: boolean) {
  return L.divIcon({
    html: `<div style="
      width: 36px; height: 36px;
      border-radius: 50%;
      background: ${active ? color : "white"};
      border: 2.5px solid ${color};
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      transition: all 0.15s;
    ">${emoji}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
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
  hoveredIndex: number | null;
  onSelect: (i: number) => void;
  onHover: (i: number | null) => void;
}

export default function SeoulMap({ neighborhoods, activeIndex, hoveredIndex, onSelect, onHover }: Props) {
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/seoul-districts.json")
      .then((r) => r.json())
      .then(setGeoData);
  }, []);

  const highlightIndex = hoveredIndex ?? activeIndex;

  const districtStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
    const guName = feature?.properties?.name;
    const matchIdx = neighborhoods.findIndex((n) => n.guName === guName);
    if (matchIdx === -1) {
      return { fillColor: "#f4f4f5", fillOpacity: 0.15, color: "#d4d4d8", weight: 0.8 };
    }
    const n = neighborhoods[matchIdx];
    const isHighlighted = matchIdx === highlightIndex;
    return {
      fillColor: n.color.fill,
      fillOpacity: isHighlighted ? 0.65 : 0.3,
      color: n.color.border,
      weight: isHighlighted ? 2.5 : 1.5,
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

      {geoData && (
        <GeoJSON
          key={`${highlightIndex}`}
          data={geoData}
          style={districtStyle}
          onEachFeature={(feature, layer) => {
            const match = neighborhoods.findIndex((n) => n.guName === feature.properties?.name);
            if (match === -1) return;
            layer.on("click", () => onSelect(match));
            layer.on("mouseover", () => onHover(match));
            layer.on("mouseout", () => onHover(null));
          }}
        />
      )}

      {neighborhoods.map((n, i) => (
        <Marker
          key={n.name}
          position={[n.lat, n.lng]}
          icon={makeEmojiIcon(n.emoji, n.color.border, activeIndex === i)}
          eventHandlers={{
            click: () => onSelect(i),
            mouseover: () => onHover(i),
            mouseout: () => onHover(null),
          }}
          zIndexOffset={activeIndex === i ? 1000 : 0}
        >
          <FlyTo lat={n.lat} lng={n.lng} active={activeIndex === i} />
        </Marker>
      ))}
    </MapContainer>
  );
}
