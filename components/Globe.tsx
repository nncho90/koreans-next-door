"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, InstagramLogo, MapPin, CaretUpDown } from "@phosphor-icons/react";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

const FORMSPREE_ID = "xojkrdbg";

// Cities with coordinates for pin placement
const CITIES: { name: string; country: string; lat: number; lng: number }[] = [
  // North America
  { name: "New York", country: "USA", lat: 40.71, lng: -74.01 },
  { name: "Los Angeles", country: "USA", lat: 34.05, lng: -118.24 },
  { name: "Chicago", country: "USA", lat: 41.88, lng: -87.63 },
  { name: "Houston", country: "USA", lat: 29.76, lng: -95.37 },
  { name: "San Francisco", country: "USA", lat: 37.77, lng: -122.42 },
  { name: "Seattle", country: "USA", lat: 47.61, lng: -122.33 },
  { name: "Boston", country: "USA", lat: 42.36, lng: -71.06 },
  { name: "Miami", country: "USA", lat: 25.77, lng: -80.19 },
  { name: "Washington D.C.", country: "USA", lat: 38.91, lng: -77.04 },
  { name: "Atlanta", country: "USA", lat: 33.75, lng: -84.39 },
  { name: "Dallas", country: "USA", lat: 32.78, lng: -96.80 },
  { name: "Denver", country: "USA", lat: 39.74, lng: -104.98 },
  { name: "Austin", country: "USA", lat: 30.27, lng: -97.74 },
  { name: "Portland", country: "USA", lat: 45.52, lng: -122.68 },
  { name: "Toronto", country: "Canada", lat: 43.65, lng: -79.38 },
  { name: "Vancouver", country: "Canada", lat: 49.28, lng: -123.12 },
  { name: "Montreal", country: "Canada", lat: 45.50, lng: -73.57 },
  { name: "Calgary", country: "Canada", lat: 51.05, lng: -114.07 },
  { name: "Mexico City", country: "Mexico", lat: 19.43, lng: -99.13 },
  { name: "Guadalajara", country: "Mexico", lat: 20.66, lng: -103.35 },
  // South America
  { name: "São Paulo", country: "Brazil", lat: -23.55, lng: -46.63 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.91, lng: -43.17 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.60, lng: -58.38 },
  { name: "Bogotá", country: "Colombia", lat: 4.71, lng: -74.07 },
  { name: "Lima", country: "Peru", lat: -12.05, lng: -77.04 },
  { name: "Santiago", country: "Chile", lat: -33.46, lng: -70.65 },
  { name: "Caracas", country: "Venezuela", lat: 10.48, lng: -66.88 },
  // Europe
  { name: "London", country: "UK", lat: 51.51, lng: -0.13 },
  { name: "Manchester", country: "UK", lat: 53.48, lng: -2.24 },
  { name: "Edinburgh", country: "UK", lat: 55.95, lng: -3.19 },
  { name: "Paris", country: "France", lat: 48.86, lng: 2.35 },
  { name: "Lyon", country: "France", lat: 45.75, lng: 4.85 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.41 },
  { name: "Munich", country: "Germany", lat: 48.14, lng: 11.58 },
  { name: "Hamburg", country: "Germany", lat: 53.55, lng: 9.99 },
  { name: "Madrid", country: "Spain", lat: 40.42, lng: -3.70 },
  { name: "Barcelona", country: "Spain", lat: 41.39, lng: 2.15 },
  { name: "Rome", country: "Italy", lat: 41.90, lng: 12.50 },
  { name: "Milan", country: "Italy", lat: 45.46, lng: 9.19 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.37, lng: 4.90 },
  { name: "Brussels", country: "Belgium", lat: 50.85, lng: 4.35 },
  { name: "Vienna", country: "Austria", lat: 48.21, lng: 16.37 },
  { name: "Zurich", country: "Switzerland", lat: 47.38, lng: 8.54 },
  { name: "Stockholm", country: "Sweden", lat: 59.33, lng: 18.07 },
  { name: "Oslo", country: "Norway", lat: 59.91, lng: 10.75 },
  { name: "Copenhagen", country: "Denmark", lat: 55.68, lng: 12.57 },
  { name: "Helsinki", country: "Finland", lat: 60.17, lng: 24.94 },
  { name: "Warsaw", country: "Poland", lat: 52.23, lng: 21.01 },
  { name: "Prague", country: "Czech Republic", lat: 50.08, lng: 14.44 },
  { name: "Budapest", country: "Hungary", lat: 47.50, lng: 19.04 },
  { name: "Bucharest", country: "Romania", lat: 44.43, lng: 26.10 },
  { name: "Kyiv", country: "Ukraine", lat: 50.45, lng: 30.52 },
  { name: "Lisbon", country: "Portugal", lat: 38.72, lng: -9.14 },
  { name: "Athens", country: "Greece", lat: 37.98, lng: 23.73 },
  { name: "Dublin", country: "Ireland", lat: 53.33, lng: -6.25 },
  { name: "Reykjavik", country: "Iceland", lat: 64.13, lng: -21.82 },
  // Middle East & Africa
  { name: "Dubai", country: "UAE", lat: 25.20, lng: 55.27 },
  { name: "Abu Dhabi", country: "UAE", lat: 24.47, lng: 54.37 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.69, lng: 46.72 },
  { name: "Doha", country: "Qatar", lat: 25.29, lng: 51.53 },
  { name: "Tel Aviv", country: "Israel", lat: 32.08, lng: 34.78 },
  { name: "Istanbul", country: "Turkey", lat: 41.01, lng: 28.96 },
  { name: "Cairo", country: "Egypt", lat: 30.04, lng: 31.24 },
  { name: "Nairobi", country: "Kenya", lat: -1.29, lng: 36.82 },
  { name: "Lagos", country: "Nigeria", lat: 6.52, lng: 3.38 },
  { name: "Accra", country: "Ghana", lat: 5.56, lng: -0.20 },
  { name: "Johannesburg", country: "South Africa", lat: -26.20, lng: 28.04 },
  { name: "Cape Town", country: "South Africa", lat: -33.93, lng: 18.42 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.03, lng: 38.74 },
  { name: "Casablanca", country: "Morocco", lat: 33.59, lng: -7.62 },
  // Asia & Pacific
  { name: "Seoul", country: "South Korea", lat: 37.57, lng: 126.98 },
  { name: "Busan", country: "South Korea", lat: 35.10, lng: 129.04 },
  { name: "Tokyo", country: "Japan", lat: 35.68, lng: 139.69 },
  { name: "Osaka", country: "Japan", lat: 34.69, lng: 135.50 },
  { name: "Beijing", country: "China", lat: 39.91, lng: 116.39 },
  { name: "Shanghai", country: "China", lat: 31.23, lng: 121.47 },
  { name: "Shenzhen", country: "China", lat: 22.54, lng: 114.06 },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Taipei", country: "Taiwan", lat: 25.05, lng: 121.56 },
  { name: "Singapore", country: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Bangkok", country: "Thailand", lat: 13.75, lng: 100.52 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.14, lng: 101.69 },
  { name: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85 },
  { name: "Manila", country: "Philippines", lat: 14.60, lng: 120.98 },
  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.82, lng: 106.63 },
  { name: "Hanoi", country: "Vietnam", lat: 21.03, lng: 105.85 },
  { name: "Mumbai", country: "India", lat: 19.08, lng: 72.88 },
  { name: "Delhi", country: "India", lat: 28.61, lng: 77.21 },
  { name: "Bangalore", country: "India", lat: 12.97, lng: 77.59 },
  { name: "Chennai", country: "India", lat: 13.08, lng: 80.27 },
  { name: "Karachi", country: "Pakistan", lat: 24.86, lng: 67.01 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.78, lng: 90.40 },
  { name: "Colombo", country: "Sri Lanka", lat: 6.93, lng: 79.85 },
  { name: "Kathmandu", country: "Nepal", lat: 27.71, lng: 85.31 },
  { name: "Sydney", country: "Australia", lat: -33.87, lng: 151.21 },
  { name: "Melbourne", country: "Australia", lat: -37.81, lng: 144.96 },
  { name: "Brisbane", country: "Australia", lat: -27.47, lng: 153.02 },
  { name: "Perth", country: "Australia", lat: -31.95, lng: 115.86 },
  { name: "Auckland", country: "New Zealand", lat: -36.87, lng: 174.77 },
  { name: "Wellington", country: "New Zealand", lat: -41.29, lng: 174.78 },
  { name: "Moscow", country: "Russia", lat: 55.75, lng: 37.62 },
  { name: "St. Petersburg", country: "Russia", lat: 59.95, lng: 30.32 },
];

interface MemberPin {
  lat: number;
  lng: number;
  name: string;
  city: string;
  country: string;
  note: string;
  instagram?: string;
}

const members: MemberPin[] = [
  { lat: 41.88, lng: -87.63, name: "Jake", city: "Chicago", country: "USA", note: "Loves Korean BBQ more than anyone should", instagram: "jakeinseoul" },
  { lat: 43.65, lng: -79.38, name: "Emily", city: "Toronto", country: "Canada", note: "Found her people on the first KND night", instagram: "em_seoul" },
  { lat: -41.29, lng: 174.78, name: "Liam", city: "Wellington", country: "New Zealand", note: "Traded sheep for subway rides" },
  { lat: 51.51, lng: -0.13, name: "Sophie", city: "London", country: "UK", note: "English teacher who stayed for the food", instagram: "sophieinkorea" },
  { lat: -33.87, lng: 151.21, name: "Max", city: "Sydney", country: "Australia", note: "Sydney surfer turned Seoul local" },
  { lat: 52.52, lng: 13.41, name: "Lukas", city: "Berlin", country: "Germany", note: "Came for work, staying for the culture" },
  { lat: 48.86, lng: 2.35, name: "Camille", city: "Paris", country: "France", note: "Swapped croissants for 붕어빵" },
  { lat: -23.55, lng: -46.63, name: "Rafael", city: "São Paulo", country: "Brazil", note: "Brings São Paulo energy everywhere he goes" },
  { lat: 14.6, lng: 120.98, name: "Maria", city: "Manila", country: "Philippines", note: "Making KND feel like home every time", instagram: "maria.mnl" },
  { lat: 19.08, lng: 72.88, name: "Priya", city: "Mumbai", country: "India", note: "Found her Seoul tribe through KND" },
  { lat: 35.68, lng: 139.69, name: "Yuki", city: "Tokyo", country: "Japan", note: "Just across the water, whole world different" },
  { lat: 1.35, lng: 103.82, name: "Wei Lin", city: "Singapore", country: "Singapore", note: "Swapped tropical heat for Korean winters" },
  { lat: 6.52, lng: 3.38, name: "Ade", city: "Lagos", country: "Nigeria", note: "Lagos energy meets Seoul hustle" },
  { lat: 19.43, lng: -99.13, name: "Carlos", city: "Mexico City", country: "Mexico", note: "Mexican spice, Korean fire — perfect match" },
  { lat: 37.57, lng: 126.98, name: "Minjun", city: "Seoul", country: "South Korea", note: "Local neighbor making everyone feel at home" },
  { lat: -33.93, lng: 18.42, name: "Thandi", city: "Cape Town", country: "South Africa", note: "Ubuntu spirit all the way in Seoul" },
  { lat: 59.33, lng: 18.07, name: "Erik", city: "Stockholm", country: "Sweden", note: "Stockholm calm meets Seoul energy" },
  { lat: 25.2, lng: 55.27, name: "Omar", city: "Dubai", country: "UAE", note: "Cosmopolitan in every city he lands in" },
];

// Combobox for city selection
function CityCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (city: string, country: string, lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.length < 2
    ? []
    : CITIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (c: typeof CITIES[0]) => {
    setQuery(`${c.name}, ${c.country}`);
    onChange(c.name, c.country, c.lat, c.lng);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center rounded-lg border border-white/10 bg-white/5 focus-within:border-[#ffd966]/60 transition-colors">
        <input
          required
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search city..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
        />
        <CaretUpDown size={14} className="mr-3 text-white/30" />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#111] shadow-xl">
          {filtered.map(c => (
            <button
              key={`${c.name}-${c.country}`}
              type="button"
              onClick={() => select(c)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10 transition-colors"
            >
              <span>{c.name}</span>
              <span className="text-white/40">{c.country}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.length >= 2 && filtered.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-3 text-sm text-white/40 shadow-xl">
          No cities found — try another name
        </div>
      )}
    </div>
  );
}

function AddPinModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", city: "", country: "", lat: 0, lng: 0, note: "", instagram: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) return;
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          country: form.country,
          coordinates: `${form.lat}, ${form.lng}`,
          note: form.note,
          instagram: form.instagram || "—",
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a1a] p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Add your pin</h3>
            <p className="mt-1 text-sm text-white/40">We&apos;ll add you to the globe manually after review.</p>
          </div>
          <button onClick={onClose} className="text-white/40 transition-colors hover:text-white">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <p className="mb-2 text-2xl">🗺️</p>
            <p className="font-semibold text-white">You&apos;re on the map!</p>
            <p className="mt-1 text-sm text-white/40">We&apos;ll add your pin soon. Welcome, neighbor.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your first name"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#ffd966]/60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">City</label>
              <CityCombobox
                value={form.city}
                onChange={(city, country, lat, lng) => setForm(f => ({ ...f, city, country, lat, lng }))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">One-liner about you</label>
              <input
                required
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                placeholder="e.g. Came for work, staying for the food"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#ffd966]/60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Instagram <span className="normal-case font-normal text-white/25">(optional)</span>
              </label>
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 transition-colors focus-within:border-[#ffd966]/60">
                <span className="pl-4 text-sm text-white/30">@</span>
                <input
                  value={form.instagram}
                  onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                  placeholder="yourhandle"
                  className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-white/20 outline-none"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Try again!</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !form.city}
              className="mt-2 rounded-full bg-[#ffd966] px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {status === "loading" ? "Sending..." : "Add my pin"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Globe() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-cycle through members
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % members.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Spin globe to active member's location
  useEffect(() => {
    if (!globeRef.current) return;
    const m = members[activeIndex];
    globeRef.current.pointOfView({ lat: m.lat, lng: m.lng, altitude: 2.2 }, 1200);
  }, [activeIndex]);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
    }
    // Point to first member on load
    const m = members[0];
    globeRef.current.pointOfView({ lat: m.lat, lng: m.lng, altitude: 2.2 }, 0);
  }, []);

  const activeMember = members[activeIndex];

  const getPointRadius = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? 0.45 : 0.25;
  }, [activeMember]);

  const getPointColor = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? "#ffd966" : "rgba(255,217,102,0.35)";
  }, [activeMember]);

  if (!mounted) return null;

  return (
    <section id="globe" className="overflow-hidden bg-[#fafaf8] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            Our community
          </p>
          <h2 className="text-4xl font-bold text-zinc-950 md:text-5xl">
            From all over the world
          </h2>
          <p className="mt-3 max-w-xl text-zinc-500">
            Our neighbors come from every corner of the globe.
          </p>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-3">
            {members.map(m => (
              <div key={m.name} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#c9a800]" weight="fill" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {m.name} <span className="font-normal text-zinc-400">· {m.city}, {m.country}</span>
                  </p>
                  <p className="text-xs text-zinc-400">{m.note}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              + Add your pin
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr]">
            {/* Globe */}
            <div className="flex justify-center">
              <GlobeGL
                ref={globeRef}
                width={460}
                height={460}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                atmosphereColor="#a8d8ea"
                atmosphereAltitude={0.15}
                pointsData={members}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={0.12}
                pointRadius={getPointRadius}
                pointColor={getPointColor}
                enablePointerInteraction={false}
                onGlobeReady={handleGlobeReady}
              />
            </div>

            {/* Auto-cycling profile card */}
            <div className="flex flex-col gap-6">
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#ffd966]" />
                      <span className="text-xs uppercase tracking-widest text-zinc-400">
                        {activeMember.city}, {activeMember.country}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-zinc-950">{activeMember.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{activeMember.note}</p>
                    {activeMember.instagram && (
                      <a
                        href={`https://instagram.com/${activeMember.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-700"
                      >
                        <InstagramLogo size={14} />
                        {activeMember.instagram}
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot indicators */}
              <div className="flex flex-wrap gap-1.5">
                {members.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(
                        () => setActiveIndex(n => (n + 1) % members.length),
                        3000
                      );
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-5 bg-[#ffd966]" : "w-1.5 bg-zinc-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                + Add your pin
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && <AddPinModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
