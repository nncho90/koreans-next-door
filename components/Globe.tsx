"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, InstagramLogo, MapPin, CaretUpDown } from "@phosphor-icons/react";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });



interface MemberPin {
  lat: number;
  lng: number;
  name: string;
  city: string;
  country: string;
  note: string;
  instagram?: string;
}

const members: MemberPin[] = [];

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    municipality?: string;
    village?: string;
    county?: string;
    country?: string;
  };
}

// Combobox for city selection — powered by OpenStreetMap Nominatim
function CityCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (city: string, country: string, lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<{ name: string; country: string; lat: number; lng: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();
        const parsed = data
          .map(r => ({
            name: r.address.city || r.address.town || r.address.municipality || r.address.village || r.address.county || "",
            country: r.address.country || "",
            lat: parseFloat(r.lat),
            lng: parseFloat(r.lon),
          }))
          .filter(r => r.name && r.country)
          .filter((r, i, arr) => arr.findIndex(x => x.name === r.name && x.country === r.country) === i)
          .slice(0, 8);
        setResults(parsed);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (c: { name: string; country: string; lat: number; lng: number }) => {
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
          placeholder="Search any city in the world..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
        />
        {loading
          ? <div className="mr-3 h-3 w-3 animate-spin rounded-full border border-white/20 border-t-white/60" />
          : <CaretUpDown size={14} className="mr-3 text-white/30" />
        }
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#111] shadow-xl">
          {results.map(c => (
            <button
              key={`${c.name}-${c.country}-${c.lat}`}
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
      {open && query.length >= 2 && !loading && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-3 text-sm text-white/40 shadow-xl">
          No cities found — try another name
        </div>
      )}
    </div>
  );
}

function AddPinModal({ onClose, onPinAdded }: { onClose: () => void; onPinAdded: (pin: MemberPin) => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", city: "", country: "", lat: 0, lng: 0, note: "", instagram: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          country: form.country,
          lat: form.lat,
          lng: form.lng,
          note: form.note,
          instagram: form.instagram || undefined,
        }),
      });
      if (res.ok) {
        const newPin = await res.json();
        onPinAdded(newPin);
        setStatus("success");
      } else {
        setStatus("error");
      }
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
            <p className="mt-1 text-sm text-white/40">You&apos;ll appear on the globe right away.</p>
          </div>
          <button onClick={onClose} className="text-white/40 transition-colors hover:text-white">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <p className="mb-2 text-2xl">🗺️</p>
            <p className="font-semibold text-white">You&apos;re on the map!</p>
            <p className="mt-1 text-sm text-white/40">You&apos;re on the globe. Welcome, neighbor.</p>
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
  const [dynamicPins, setDynamicPins] = useState<MemberPin[]>([]);
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

  useEffect(() => {
    fetch("/api/pins")
      .then(r => r.json())
      .then((pins: MemberPin[]) => setDynamicPins(pins))
      .catch(() => {});
  }, []);

  const allMembers = [...members, ...dynamicPins];

  // Auto-cycle through members
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % allMembers.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMembers.length]);

  // Spin globe to active member's location
  useEffect(() => {
    if (!globeRef.current) return;
    const m = allMembers[activeIndex];
    if (!m) return;
    globeRef.current.pointOfView({ lat: m.lat, lng: m.lng, altitude: 2.2 }, 1200);
  }, [activeIndex, allMembers]);

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

  const activeMember = allMembers[activeIndex] ?? members[0];

  const getPointRadius = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? 0.5 : 0.3;
  }, [activeMember]);

  const getPointColor = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? "#ffd966" : "rgba(255,217,102,0.4)";
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
            {allMembers.map(m => (
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
                pointsData={allMembers}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={0}
                pointRadius={getPointRadius}
                pointColor={getPointColor}
                ringsData={activeMember ? [activeMember] : []}
                ringLat="lat"
                ringLng="lng"
                ringColor={() => (t: number) => `rgba(255,217,102,${1 - t})`}
                ringMaxRadius={4}
                ringPropagationSpeed={1.5}
                ringRepeatPeriod={1200}
                enablePointerInteraction={false}
                onGlobeReady={handleGlobeReady}
              />
            </div>

            {/* Auto-cycling profile card */}
            <div className="flex flex-col gap-6">
              <div className="relative min-h-[180px]">
                {allMembers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center">
                    <p className="text-sm text-zinc-400">Be the first to add your pin!</p>
                  </div>
                ) : (
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
                )}
              </div>

              {/* Dot indicators */}
              {allMembers.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {allMembers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(
                        () => setActiveIndex(n => (n + 1) % allMembers.length),
                        3000
                      );
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-5 bg-[#ffd966]" : "w-1.5 bg-zinc-300"
                    }`}
                  />
                ))}
              </div>
              )}

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
        {showModal && (
          <AddPinModal
            onClose={() => setShowModal(false)}
            onPinAdded={(pin) => {
              setDynamicPins(prev => [...prev, pin]);
              setActiveIndex(allMembers.length); // highlight the new pin
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
