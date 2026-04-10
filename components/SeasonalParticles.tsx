"use client";

import { useEffect, useRef, useState } from "react";
import {
  isCherryBlossomSeason,
  determineEffect,
  type ParticleEffect,
} from "@/lib/particles/seasonDetection";
import { useParticleCanvas } from "@/lib/particles/useParticleCanvas";

export default function SeasonalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [effect, setEffect] = useState<ParticleEffect>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const applyEffect = (weatherCode: number | null) => {
      const cherry = isCherryBlossomSeason();
      setEffect(determineEffect(cherry, weatherCode));
    };

    // Fetch Seoul weather, then determine effect
    fetch("/api/weather")
      .then((r) => r.json())
      .then((data) => applyEffect(data.weatherCode ?? null))
      .catch(() => applyEffect(null));

    // If user toggles reduced motion mid-session, stop particles
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setEffect(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useParticleCanvas(canvasRef, effect);

  if (!effect) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ zIndex: 35 }}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
