import { useEffect, RefObject } from "react";
import type { ParticleEffect } from "./seasonDetection";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
  colorIndex: number;
}

const CHERRY_COLORS = [
  [255, 245, 247],  // near-white with pink blush
  [255, 250, 252],  // almost pure white
  [255, 240, 244],  // soft white-pink
  [252, 235, 240],  // cream-pink
] as const;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

function createParticle(
  w: number,
  h: number,
  effect: ParticleEffect,
  startAnywhere = false
): Particle {
  const isCherry = effect === "cherry-blossom";
  return {
    x: rand(0, w),
    y: startAnywhere ? rand(-50, h) : rand(-80, -10),
    size: isCherry ? rand(3, 6) : rand(2, 6),
    speedY: isCherry ? rand(0.2, 0.6) : rand(0.5, 1.5),
    speedX: isCherry ? rand(-0.2, 0.2) : rand(-0.15, 0.15),
    rotation: rand(0, Math.PI * 2),
    rotationSpeed: isCherry ? rand(-0.02, 0.02) : 0,
    opacity: isCherry ? rand(0.4, 0.75) : rand(0.4, 0.9),
    wobblePhase: rand(0, Math.PI * 2),
    wobbleSpeed: isCherry ? rand(0.02, 0.04) : rand(0.01, 0.025),
    wobbleAmplitude: isCherry ? rand(0.3, 0.8) : rand(0.1, 0.4),
    colorIndex: randInt(0, CHERRY_COLORS.length - 1),
  };
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  p: Particle
) {
  const [r, g, b] = CHERRY_COLORS[p.colorIndex];
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;

  // Two overlapping ellipses for a simple petal shape
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(p.size * 0.2, -p.size * 0.1, p.size * 0.7, p.size * 0.4, Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},0.6)`;
  ctx.fill();

  ctx.restore();
}

function drawSnowflake(
  ctx: CanvasRenderingContext2D,
  p: Particle
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.globalAlpha = p.opacity;

  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
  gradient.addColorStop(0, `rgba(255,255,255,${p.opacity})`);
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.restore();
}

export function useParticleCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  effect: ParticleEffect
) {
  useEffect(() => {
    if (!effect) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const getCount = () => (window.innerWidth < 768 ? 8 : 15);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      resize();
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles = Array.from({ length: getCount() }, () =>
        createParticle(w, h, effect, true)
      );
    };

    const onResize = () => {
      resize();
    };

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Update wobble
        p.wobblePhase += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobblePhase) * p.wobbleAmplitude;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Recycle when off screen
        if (p.y > h + 20) {
          const fresh = createParticle(w, h, effect, false);
          Object.assign(p, fresh);
        }

        if (effect === "cherry-blossom") {
          drawPetal(ctx, p);
        } else {
          drawSnowflake(ctx, p);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animationId = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [effect, canvasRef]);
}
