"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";
import SkylineBackground from "./SkylineBackground";
import { skylineShader } from "./skylineShader";

interface Props {
  mouseX: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  prefersReduced: boolean;
}

/**
 * Animated version of SkylineBackground, drawn on the GPU with vgpu.
 *
 * The SVG background stays mounted underneath and shows through whenever the
 * shader is unavailable: no WebGPU, reduced motion, or a failed init. That way
 * the section never renders empty and nothing about the buildings changes.
 */
export default function SkylineShaderBackground({
  mouseX,
  scrollYProgress,
  prefersReduced,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas || typeof navigator === "undefined" || !navigator.gpu) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { init, effect, surface, clock, frameLoop } = await import("vgpu");
        if (disposed) return;

        const gpu = await init();
        if (disposed) {
          gpu.dispose();
          return;
        }

        const view = surface(gpu, canvas, { dpr: [1, 1.5] });
        const time = clock(gpu);
        const uniforms = (t: number) => ({
          params: {
            time: t,
            width: view.size[0],
            height: view.size[1],
            mouseX: mouseX.get(),
            scroll: scrollYProgress.get(),
            pad0: 0,
            pad1: 0,
            pad2: 0,
          },
        });
        const sky = effect(gpu, skylineShader, { set: uniforms(0) });

        // Only render while the section is on screen, so the GPU stays idle
        // (and phone batteries stay alive) when nobody is looking at it.
        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { rootMargin: "120px" }
        );
        io.observe(canvas);

        const loop = frameLoop(gpu, (frame) => {
          if (!visible) return;
          sky.set(uniforms(time.time));
          frame.pass(view, sky);
        });

        setLive(true);
        cleanup = () => {
          io.disconnect();
          loop.stop();
          gpu.dispose();
        };
      } catch (err) {
        // Any failure just leaves the SVG background visible.
        console.warn("[skyline] falling back to the SVG background", err);
        setLive(false);
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [mouseX, scrollYProgress, prefersReduced]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <SkylineBackground
        mouseX={mouseX}
        scrollYProgress={scrollYProgress}
        prefersReduced={prefersReduced}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{ opacity: live ? 1 : 0 }}
      />
    </div>
  );
}
