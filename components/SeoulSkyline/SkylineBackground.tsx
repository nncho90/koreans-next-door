"use client";

// Star positions: [x, y, radius, opacity]
const STARS: [number, number, number, number][] = [
  [50, 28, 1.2, 0.7], [118, 52, 0.9, 0.5], [176, 20, 1.4, 0.8],
  [248, 44, 1.0, 0.45], [312, 18, 1.5, 0.9], [388, 58, 0.8, 0.5],
  [452, 32, 1.2, 0.7], [528, 46, 0.9, 0.4], [612, 18, 1.3, 0.75],
  [694, 52, 1.0, 0.6], [758, 28, 1.5, 0.7], [826, 48, 0.9, 0.5],
  [916, 22, 1.2, 0.8], [988, 46, 1.0, 0.55], [1056, 34, 0.8, 0.5],
  [1136, 20, 1.4, 0.9], [1212, 55, 1.0, 0.5], [1292, 38, 1.2, 0.65],
  [1368, 26, 1.0, 0.7], [1424, 58, 0.9, 0.45],
  [74, 78, 0.8, 0.4], [284, 68, 1.0, 0.5], [676, 78, 0.9, 0.4],
  [1004, 72, 0.8, 0.45], [1180, 65, 1.1, 0.55],
];

// Background (non-interactive) building silhouettes: [x, y, width, height]
const BG_BUILDINGS: [number, number, number, number][] = [
  [55, 338, 22, 54],  [88, 350, 16, 42],  [148, 332, 28, 60],
  [192, 344, 18, 48], [268, 336, 24, 56], [318, 352, 14, 40],
  [402, 328, 32, 64], [448, 342, 20, 50], [532, 334, 26, 58],
  [588, 348, 16, 44], [658, 326, 34, 66], [706, 340, 22, 52],
  [798, 338, 20, 54], [840, 334, 28, 58], [906, 350, 14, 42],
  [974, 330, 30, 62], [1028, 344, 18, 48],[1108, 336, 26, 56],
  [1152, 352, 14, 40],[1228, 334, 22, 58],[1290, 342, 18, 50],
  [1356, 328, 28, 64],[1410, 342, 20, 50],
];

export default function SkylineBackground() {
  return (
    <svg
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="knd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020811" />
          <stop offset="35%" stopColor="#060f1e" />
          <stop offset="65%" stopColor="#0b1830" />
          <stop offset="100%" stopColor="#112040" />
        </linearGradient>

        <linearGradient id="knd-horizon-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd966" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffd966" stopOpacity="0.22" />
        </linearGradient>

        <linearGradient id="knd-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1524" />
          <stop offset="100%" stopColor="#060c18" />
        </linearGradient>

        <radialGradient id="knd-moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeea0" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#ffd966" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffd966" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect x={0} y={0} width={1440} height={480} fill="url(#knd-sky)" />

      {/* Warm horizon glow — golden hour effect */}
      <rect x={0} y={280} width={1440} height={200} fill="url(#knd-horizon-glow)" />

      {/* Moon glow halo */}
      <ellipse cx={232} cy={88} rx={68} ry={68} fill="url(#knd-moon-glow)" />
      {/* Moon disc */}
      <circle cx={232} cy={88} r={22} fill="rgba(255,238,160,0.16)" />
      <circle cx={232} cy={88} r={15} fill="rgba(255,230,140,0.20)" />

      {/* Stars */}
      {STARS.map(([x, y, r, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.95)" opacity={o} />
      ))}

      {/* Far mountain range — Bukhansan */}
      <path
        d="M0,292 C80,242 162,268 244,252 C318,240 392,208 474,228 C548,214 618,184 704,206
           C782,192 856,168 944,186 C1022,172 1094,196 1184,182 C1272,170 1356,202 1440,192
           L1440,480 L0,480 Z"
        fill="#091422"
      />

      {/* Near mountain range */}
      <path
        d="M0,336 C58,314 126,330 198,320 C268,310 330,326 410,316 C488,306 556,322 638,312
           C716,302 786,320 866,310 C948,298 1018,318 1098,308 C1178,298 1258,316 1338,308
           L1440,312 L1440,480 L0,480 Z"
        fill="#0b1826"
      />

      {/* Non-interactive background building silhouettes */}
      {BG_BUILDINGS.map(([x, y, w, h]) => (
        <rect key={`bg-${x}`} x={x} y={y} width={w} height={h} fill="#0d1c2e" opacity={0.75} />
      ))}

      {/* Ground strip */}
      <rect x={0} y={388} width={1440} height={30} fill="#080e1c" />

      {/* Han River */}
      <rect x={0} y={414} width={1440} height={66} fill="url(#knd-river)" />

      {/* River shimmer — warm reflections of the golden sky */}
      <rect x={0} y={418} width={1440} height={2} fill="rgba(255,217,102,0.09)" />
      <rect x={80} y={430} width={420} height={1.5} rx={1} fill="rgba(255,217,102,0.05)" />
      <rect x={580} y={438} width={280} height={1.5} rx={1} fill="rgba(255,255,255,0.04)" />
      <rect x={950} y={445} width={360} height={1.5} rx={1} fill="rgba(255,217,102,0.05)" />
      <rect x={200} y={456} width={180} height={1} rx={1} fill="rgba(255,255,255,0.025)" />
      <rect x={700} y={460} width={240} height={1} rx={1} fill="rgba(255,217,102,0.03)" />
    </svg>
  );
}
