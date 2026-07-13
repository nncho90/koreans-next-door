"use client";
import { motion, MotionValue, useTransform } from "framer-motion";

// Star positions: [left %, top %, size px, opacity]
const STARS: [number, number, number, number][] = [
  [3.5, 14, 2, 0.7], [8, 26, 1.5, 0.5], [12, 10, 2.5, 0.8],
  [17, 22, 2, 0.45], [22, 9, 3, 0.9], [27, 29, 1.5, 0.5],
  [31, 16, 2, 0.7], [37, 23, 1.5, 0.4], [42, 9, 2.5, 0.75],
  [48, 26, 2, 0.6], [53, 14, 3, 0.7], [57, 24, 1.5, 0.5],
  [64, 11, 2, 0.8], [69, 23, 2, 0.55], [73, 17, 1.5, 0.5],
  [76, 6, 2.5, 0.9], [84, 27, 1.5, 0.5], [90, 8, 2, 0.8],
  [93, 20, 1.5, 0.55], [96, 12, 2, 0.5],
  [5, 32, 1.5, 0.4], [29, 31, 2, 0.5], [60, 32, 1.5, 0.4],
  [86, 31, 1.5, 0.45], [45, 30, 2, 0.55],
];

// Background (non-interactive) building silhouettes in the 980×200 layer: [x, width, height]
// y is derived as 200 - height so every silhouette sits on the layer's ground line.
const BG_BUILDINGS: [number, number, number][] = [
  [37, 22, 54],  [60, 16, 42],  [101, 28, 60],
  [131, 18, 48], [182, 24, 56], [216, 14, 40],
  [273, 32, 64], [305, 20, 50], [362, 26, 58],
  [400, 16, 44], [447, 34, 66], [480, 22, 52],
  [543, 20, 54], [571, 28, 58], [616, 14, 42],
  [662, 30, 62], [699, 18, 48], [753, 26, 56],
  [783, 14, 40], [835, 22, 58], [877, 18, 50],
  [922, 28, 64], [959, 20, 50],
];

// River shimmer dashes: [x, y, width, fill] (height 3, rx 2, blurred)
const RIVER_DASHES: [number, number, number, string][] = [
  [30, 42, 44, "rgba(255,214,102,0.16)"],
  [116, 54, 30, "rgba(255,255,255,0.08)"],
  [190, 46, 56, "rgba(255,214,102,0.16)"],
  [300, 58, 26, "rgba(255,214,102,0.16)"],
  [382, 48, 38, "rgba(255,255,255,0.08)"],
  [488, 44, 60, "rgba(255,214,102,0.16)"],
  [580, 56, 32, "rgba(255,214,102,0.16)"],
  [676, 48, 24, "rgba(255,255,255,0.08)"],
  [742, 44, 48, "rgba(255,214,102,0.16)"],
  [846, 54, 36, "rgba(255,214,102,0.16)"],
];

interface Props {
  mouseX: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  prefersReduced: boolean;
}

export default function SkylineBackground({
  mouseX,
  scrollYProgress,
  prefersReduced,
}: Props) {
  // Scroll parallax: callback form only (range-mapping arrays are broken with useScroll here)
  const mountainsY = useTransform(scrollYProgress, (v) => (v - 0.5) * -30);
  const silhouettesY = useTransform(scrollYProgress, (v) => (v - 0.5) * -16);
  const starsY = useTransform(scrollYProgress, (v) => (v - 0.5) * 24);
  // Mouse parallax: far layers drift slightly with the cursor
  const mountainsX = useTransform(mouseX, (x) => x * 4);
  const silhouettesX = useTransform(mouseX, (x) => x * 8);

  // Each background layer is overdrawn 40px horizontally (and 20px past the
  // ground line vertically) so parallax shifts never expose gaps.
  const overdraw = { left: -20, width: "calc(100% + 40px)" } as const;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ── Layer A: sky ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #020811 0%, #060f1e 35%, #0b1830 65%, #112040 100%)",
        }}
      />

      {/* Stars */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: starsY }}
      >
        {STARS.map(([l, t, s, o]) => (
          <div
            key={`${l}-${t}`}
            className="absolute rounded-full bg-white"
            style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, opacity: o }}
          />
        ))}
      </motion.div>

      {/* Moon: anchored to the sky so it never crops at any width */}
      <svg
        className="absolute"
        style={{ left: "78%", top: 40 }}
        width={116}
        height={116}
        viewBox="0 0 116 116"
      >
        <defs>
          <radialGradient id="knd-moon-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffeebe" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#ffd966" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffd966" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={58} cy={58} r={54} fill="url(#knd-moon-halo)" />
        <circle cx={58} cy={58} r={16} fill="#f4e8c8" opacity={0.92} />
        <circle cx={52} cy={53} r={3} fill="rgba(140,122,80,0.45)" />
        <circle cx={63} cy={63} r={2} fill="rgba(140,122,80,0.4)" />
      </svg>

      {/* ── Layer B1: mountains (bottom-anchored to the building base) ── */}
      <motion.div
        className="absolute bottom-[94px] h-[200px]"
        style={{
          ...overdraw,
          ...(prefersReduced ? {} : { y: mountainsY, x: mountainsX }),
        }}
      >
        <svg
          viewBox="0 0 980 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="knd-horizon-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd966" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffd966" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* Far mountain range: Bukhansan */}
          <path
            d="M0,118 C54,74 110,92 166,80 C216,70 266,44 322,58 C372,46 420,24 478,38
               C532,28 582,10 642,24 C694,16 744,34 806,26 C864,18 922,44 980,36
               L980,220 L0,220 Z"
            fill="#091422"
          />

          {/* Near mountain range */}
          <path
            d="M0,148 C40,132 86,142 134,136 C182,128 224,140 278,132 C332,124 378,136 434,128
               C486,120 534,134 588,126 C642,118 690,132 746,124 C800,116 856,130 910,124
               L980,128 L980,220 L0,220 Z"
            fill="#0b1826"
          />

          {/* Warm horizon glow: golden hour settling behind the city */}
          <rect x={0} y={110} width={980} height={110} fill="url(#knd-horizon-glow)" />
        </svg>
      </motion.div>

      {/* ── Layer B2: background building silhouettes ─────────────── */}
      <motion.div
        className="absolute bottom-[94px] h-[200px]"
        style={{
          ...overdraw,
          ...(prefersReduced ? {} : { y: silhouettesY, x: silhouettesX }),
        }}
      >
        <svg
          viewBox="0 0 980 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          {BG_BUILDINGS.map(([x, w, h]) => (
            <rect
              key={`bg-${x}`}
              x={x}
              y={200 - h}
              width={w}
              height={h + 20}
              fill="#0d1c2e"
              opacity={0.75}
            />
          ))}
        </svg>
      </motion.div>

      {/* ── Layer C: ground + Han River (static, bottom-anchored) ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[94px]">
        <svg
          viewBox="0 0 980 94"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="knd-river" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1524" />
              <stop offset="100%" stopColor="#060c18" />
            </linearGradient>
            <filter
              id="knd-river-blur"
              x="-5%"
              y="-100%"
              width="110%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          {/* Ground strip */}
          <rect x={0} y={0} width={980} height={28} fill="#080e1c" />

          {/* Han River */}
          <rect x={0} y={28} width={980} height={66} fill="url(#knd-river)" />

          {/* River shimmer: soft city-light reflections */}
          <g filter="url(#knd-river-blur)">
            {/* Wide soft band under the whole city */}
            <rect x={0} y={33} width={980} height={6} fill="rgba(255,217,102,0.05)" />
            {RIVER_DASHES.map(([x, y, w, fill]) => (
              <rect key={`sh-${x}`} x={x} y={y} width={w} height={3} rx={2} fill={fill} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
