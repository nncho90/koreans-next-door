"use client";
import { BuildingShape, DIMS } from "./skylineData";

const C = {
  body: "#1e3050",
  bodyDark: "#111e38",
  bodySide: "#162844",
  shadow: "#070d1a",
  roof: "#0f1c2e",
  accent: "#ffd966",
  white: "rgba(255,255,255,0.45)",
  red: "#6a1212",
  redLit: "#9b1a1a",
  green: "#1a3a1f",
  greenDark: "#122818",
};

const WIN_DIM = "rgba(255,200,80,0.07)";
const WIN_LIT = "rgba(255,200,80,0.90)";

interface WinProps {
  cols: number;
  rows: number;
  sx: number;
  sy: number;
  dx: number;
  dy: number;
  ww: number;
  wh: number;
  fill: string;
  rx?: number;
}

function Wins({ cols, rows, sx, sy, dx, dy, ww, wh, fill, rx = 1 }: WinProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={sx + c * dx}
            y={sy + r * dy}
            width={ww}
            height={wh}
            rx={rx}
            fill={fill}
          />
        ))
      )}
    </>
  );
}

export default function BuildingSVG({
  shape,
  isHovered,
}: {
  shape: BuildingShape;
  isHovered: boolean;
}) {
  const { w, h } = DIMS[shape];
  const win = isHovered ? WIN_LIT : WIN_DIM;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      {renderShape(shape, win, isHovered)}
    </svg>
  );
}

function renderShape(shape: BuildingShape, win: string, isHovered: boolean) {
  switch (shape) {
    case "namsan":
      return <Namsan win={win} />;
    case "skyscraper":
      return <Skyscraper win={win} />;
    case "office":
      return <Office win={win} />;
    case "government":
      return <Government win={win} />;
    case "hospital":
      return <Hospital win={win} />;
    case "hanok":
      return <Hanok win={win} />;
    case "pagoda":
      return <Pagoda win={win} />;
    case "subway":
      return <Subway win={win} isHovered={isHovered} />;
    case "gate":
      return <Gate win={win} />;
    case "bookshop":
      return <Bookshop win={win} />;
    case "convenience":
      return <Convenience win={win} />;
    case "document-office":
      return <DocumentOffice win={win} />;
  }
}

// ── N Seoul Tower on Namsan (90×200) ─────────────────────────────────────
function Namsan({ win }: { win: string }) {
  return (
    <>
      {/* Mountain base */}
      <polygon points="0,178 45,72 90,178 90,200 0,200" fill={C.bodyDark} />
      {/* Mountain lit face */}
      <polygon points="22,178 45,105 68,178" fill={C.body} opacity={0.5} />
      {/* Tower shaft */}
      <rect x={38} y={34} width={9} height={68} fill={C.bodySide} />
      <rect x={38} y={34} width={14} height={68} fill={C.body} />
      <rect x={46} y={34} width={6} height={68} fill={C.bodySide} />
      {/* Observation deck */}
      <rect x={27} y={44} width={36} height={16} fill={C.bodyDark} />
      <rect x={27} y={44} width={24} height={16} fill={C.body} />
      {/* Upper shaft */}
      <rect x={40} y={20} width={10} height={26} fill={C.bodyDark} />
      <rect x={40} y={20} width={7} height={26} fill={C.body} />
      {/* Spire */}
      <polygon points="43,8 47,8 48,20 42,20" fill={C.bodyDark} />
      <polygon points="43,8 45,1 47,8 48,20 42,20" fill={C.body} />
      {/* Obs deck windows */}
      <Wins cols={3} rows={1} sx={31} sy={48} dx={8} dy={0} ww={5} wh={8} fill={win} />
      {/* Tower window */}
      <rect x={41} y={57} width={7} height={6} rx={1} fill={win} />
      {/* Mountain windows */}
      <Wins cols={3} rows={2} sx={22} sy={130} dx={18} dy={18} ww={10} wh={11} fill={win} />
    </>
  );
}

// ── Lotte Tower-style skyscraper (55×250) ────────────────────────────────
function Skyscraper({ win }: { win: string }) {
  return (
    <>
      {/* Main shaft */}
      <rect x={8} y={50} width={39} height={198} fill={C.body} />
      {/* Reflective right face */}
      <rect x={36} y={50} width={11} height={198} fill={C.bodySide} />
      {/* Step 2 */}
      <rect x={11} y={30} width={33} height={22} fill={C.bodyDark} />
      <rect x={11} y={30} width={22} height={22} fill={C.body} />
      {/* Step 3 */}
      <rect x={17} y={14} width={21} height={18} fill={C.bodyDark} />
      <rect x={17} y={14} width={14} height={18} fill={C.body} />
      {/* Spire */}
      <rect x={24} y={0} width={7} height={17} fill={C.bodySide} />
      <rect x={24} y={0} width={4} height={17} fill={C.body} />
      {/* Windows — left column */}
      <Wins cols={1} rows={13} sx={13} sy={58} dx={0} dy={14} ww={9} wh={9} fill={win} />
      {/* Windows — right column */}
      <Wins cols={1} rows={13} sx={27} sy={58} dx={0} dy={14} ww={9} wh={9} fill={win} />
      {/* Top section windows */}
      <rect x={14} y={35} width={11} height={10} rx={1} fill={win} />
    </>
  );
}

// ── Modern office tower (70×162) ─────────────────────────────────────────
function Office({ win }: { win: string }) {
  return (
    <>
      {/* Main body */}
      <rect x={5} y={40} width={60} height={120} fill={C.body} />
      {/* Side shadow face */}
      <rect x={54} y={40} width={11} height={120} fill={C.bodySide} />
      {/* Setback top */}
      <rect x={10} y={22} width={50} height={20} fill={C.bodyDark} />
      <rect x={10} y={22} width={34} height={20} fill={C.body} />
      {/* Rooftop equipment */}
      <rect x={17} y={14} width={10} height={10} fill={C.bodySide} />
      <rect x={44} y={14} width={8} height={10} fill={C.bodySide} />
      {/* Windows 3×6 */}
      <Wins cols={3} rows={6} sx={12} sy={48} dx={17} dy={17} ww={11} wh={11} fill={win} />
      {/* Top section windows */}
      <Wins cols={2} rows={1} sx={18} sy={27} dx={20} dy={0} ww={12} wh={10} fill={win} />
    </>
  );
}

// ── Government / immigration building (112×132) ─────────────────────────
function Government({ win }: { win: string }) {
  return (
    <>
      {/* Main body */}
      <rect x={5} y={54} width={102} height={76} fill={C.bodyDark} />
      <rect x={5} y={54} width={65} height={76} fill={C.body} />
      {/* Central portico — taller */}
      <rect x={34} y={40} width={44} height={90} fill={C.body} />
      <rect x={62} y={40} width={16} height={90} fill={C.bodySide} />
      {/* Triangular pediment */}
      <polygon points="34,40 78,40 56,20" fill={C.bodySide} />
      <polygon points="34,40 66,40 56,20" fill={C.body} />
      {/* Columns */}
      {[42, 52, 62, 72].map((cx) => (
        <rect key={cx} x={cx} y={38} width={3} height={42} fill={C.shadow} opacity={0.7} />
      ))}
      {/* Flagpole */}
      <rect x={55} y={4} width={2} height={20} fill={C.bodySide} />
      <rect x={57} y={5} width={14} height={9} fill={C.red} opacity={0.75} />
      {/* Main body windows 4×2 */}
      <Wins cols={4} rows={2} sx={10} sy={62} dx={17} dy={22} ww={10} wh={14} fill={win} />
      {/* Portico windows */}
      <Wins cols={2} rows={2} sx={40} sy={44} dx={16} dy={16} ww={10} wh={10} fill={win} />
    </>
  );
}

// ── Hospital (96×142) ────────────────────────────────────────────────────
function Hospital({ win }: { win: string }) {
  return (
    <>
      {/* Side wings */}
      <rect x={0} y={60} width={20} height={80} fill={C.bodyDark} />
      <rect x={76} y={60} width={20} height={80} fill={C.bodySide} />
      {/* Main body */}
      <rect x={14} y={34} width={68} height={106} fill={C.body} />
      <rect x={58} y={34} width={24} height={106} fill={C.bodySide} />
      {/* Medical cross */}
      <rect x={42} y={42} width={12} height={32} fill="rgba(255,80,80,0.55)" rx={1} />
      <rect x={35} y={52} width={26} height={12} fill="rgba(255,80,80,0.55)" rx={1} />
      {/* Wing windows */}
      <Wins cols={1} rows={3} sx={5} sy={68} dx={0} dy={20} ww={10} wh={13} fill={win} />
      <Wins cols={1} rows={3} sx={81} sy={68} dx={0} dy={20} ww={10} wh={13} fill={win} />
      {/* Main body windows */}
      <Wins cols={2} rows={3} sx={19} sy={82} dx={20} dy={18} ww={12} wh={12} fill={win} />
      <Wins cols={1} rows={2} sx={62} sy={82} dx={0} dy={18} ww={12} wh={12} fill={win} />
    </>
  );
}

// ── Traditional hanok (112×100) ──────────────────────────────────────────
function Hanok({ win }: { win: string }) {
  return (
    <>
      {/* Main body */}
      <rect x={8} y={62} width={96} height={36} fill={C.bodyDark} />
      <rect x={8} y={62} width={62} height={36} fill={C.body} />
      {/* Curved roof — upswept eaves */}
      <path
        d="M0,62 Q14,28 28,42 Q44,18 56,34 Q70,16 84,32 Q98,24 112,62 Z"
        fill={C.bodySide}
      />
      <path
        d="M0,62 Q14,28 28,42 Q44,18 56,34 Q70,16 84,32 Q98,24 112,62 Z"
        fill={C.body}
        opacity={0.45}
      />
      {/* Ridge beam */}
      <rect x={20} y={34} width={72} height={5} fill={C.bodyDark} />
      {/* Eave tips */}
      <circle cx={0} cy={62} r={5} fill={C.bodySide} />
      <circle cx={112} cy={62} r={5} fill={C.bodySide} />
      {/* Door */}
      <rect x={46} y={76} width={20} height={22} fill={C.shadow} rx={1} />
      {/* Paper screen windows */}
      <rect x={12} y={66} width={22} height={20} fill={win} rx={0} />
      <rect x={78} y={66} width={22} height={20} fill={win} rx={0} />
      {/* Window dividers */}
      <line x1={23} y1={66} x2={23} y2={86} stroke={C.body} strokeWidth={1.5} />
      <line x1={12} y1={76} x2={34} y2={76} stroke={C.body} strokeWidth={1.5} />
      <line x1={89} y1={66} x2={89} y2={86} stroke={C.body} strokeWidth={1.5} />
      <line x1={78} y1={76} x2={100} y2={76} stroke={C.body} strokeWidth={1.5} />
    </>
  );
}

// ── Buddhist temple with 3-tier pagoda (85×188) ─────────────────────────
function Pagoda({ win }: { win: string }) {
  return (
    <>
      {/* Base temple building */}
      <rect x={8} y={150} width={69} height={36} fill={C.bodyDark} />
      <rect x={8} y={150} width={44} height={36} fill={C.body} />
      {/* Base temple curved roof (like hanok) */}
      <path d="M0,150 Q12,128 24,138 Q42,120 56,132 Q70,124 85,150 Z" fill={C.bodySide} />
      <path d="M0,150 Q12,128 24,138 Q42,120 56,132 Q70,124 85,150 Z" fill={C.body} opacity={0.45} />
      {/* Base ridge */}
      <rect x={18} y={130} width={50} height={4} fill={C.bodyDark} />
      {/* Base eave tips */}
      <circle cx={0} cy={150} r={4} fill={C.bodySide} />
      <circle cx={85} cy={150} r={4} fill={C.bodySide} />
      {/* Temple door */}
      <rect x={34} y={163} width={17} height={23} fill={C.shadow} rx={1} />
      {/* Temple windows (lantern-style, round-top) */}
      <rect x={12} y={156} width={14} height={16} fill={win} rx={7} />
      <rect x={59} y={156} width={14} height={16} fill={win} rx={7} />

      {/* ── Pagoda tier 1 (bottom) ── */}
      <rect x={22} y={122} width={41} height={26} fill={C.body} />
      <rect x={44} y={122} width={19} height={26} fill={C.bodySide} />
      {/* Tier 1 roof */}
      <polygon points="14,122 42,107 71,122" fill={C.bodyDark} />
      <polygon points="14,122 42,107 56,122" fill={C.body} opacity={0.5} />
      {/* Tier 1 eave tips */}
      <circle cx={14} cy={122} r={3} fill={C.bodySide} />
      <circle cx={71} cy={122} r={3} fill={C.bodySide} />
      {/* Tier 1 window */}
      <rect x={35} y={127} width={15} height={12} fill={win} rx={7} />

      {/* ── Pagoda tier 2 ── */}
      <rect x={27} y={97} width={31} height={23} fill={C.body} />
      <rect x={45} y={97} width={13} height={23} fill={C.bodySide} />
      {/* Tier 2 roof */}
      <polygon points="19,97 42,83 66,97" fill={C.bodyDark} />
      <polygon points="19,97 42,83 54,97" fill={C.body} opacity={0.5} />
      <circle cx={19} cy={97} r={3} fill={C.bodySide} />
      <circle cx={66} cy={97} r={3} fill={C.bodySide} />
      {/* Tier 2 window */}
      <rect x={35} y={102} width={12} height={10} fill={win} rx={5} />

      {/* ── Pagoda tier 3 (top) ── */}
      <rect x={31} y={74} width={23} height={21} fill={C.body} />
      <rect x={44} y={74} width={10} height={21} fill={C.bodySide} />
      {/* Tier 3 roof */}
      <polygon points="24,74 42,62 61,74" fill={C.bodyDark} />
      <polygon points="24,74 42,62 52,74" fill={C.body} opacity={0.5} />
      <circle cx={24} cy={74} r={2.5} fill={C.bodySide} />
      <circle cx={61} cy={74} r={2.5} fill={C.bodySide} />
      {/* Tier 3 window */}
      <rect x={36} y={78} width={10} height={8} fill={win} rx={4} />

      {/* ── Spire ── */}
      <rect x={39} y={50} width={6} height={14} fill={C.bodyDark} />
      {/* Finial/jewel */}
      <ellipse cx={42} cy={47} rx={5} ry={4} fill={C.bodySide} />
      <ellipse cx={42} cy={44} rx={3} ry={3} fill={C.bodyDark} />
      {/* Tip */}
      <rect x={41} y={38} width={2} height={8} fill={C.bodySide} />
    </>
  );
}

// ── Seoul 지하철 subway entrance (92×118) ────────────────────────────────
function Subway({ win, isHovered }: { win: string; isHovered: boolean }) {
  const metroGreen = isHovered ? "#1a7a40" : "#145c30";
  return (
    <>
      {/* Underground opening */}
      <rect x={20} y={70} width={52} height={46} fill={C.shadow} rx={2} />

      {/* Left pillar */}
      <rect x={8} y={44} width={14} height={72} fill={C.body} />
      <rect x={17} y={44} width={5} height={72} fill={C.bodySide} />
      {/* Right pillar */}
      <rect x={70} y={44} width={14} height={72} fill={C.bodySide} />
      <rect x={70} y={44} width={8} height={72} fill={C.body} />

      {/* Canopy */}
      <rect x={0} y={30} width={92} height={16} fill={C.bodyDark} />
      <rect x={0} y={30} width={58} height={16} fill={C.body} />
      {/* Canopy top bevel */}
      <polygon points="0,30 92,30 86,24 6,24" fill={C.bodySide} />

      {/* Sign board on canopy */}
      <rect x={14} y={33} width={64} height={9} fill={C.shadow} rx={1} />
      <text
        x={46}
        y={40}
        fontSize={5.5}
        textAnchor="middle"
        fill={`rgba(255,255,255,${isHovered ? 0.85 : 0.5})`}
        fontFamily="sans-serif"
        letterSpacing={0.5}
        style={{ transition: "fill 0.4s" }}
      >
        지하철
      </text>

      {/* Metro circle logo */}
      <circle cx={46} cy={16} r={10} fill={metroGreen} style={{ transition: "fill 0.4s" }} />
      <text
        x={46}
        y={20}
        fontSize={10}
        textAnchor="middle"
        fill="rgba(255,255,255,0.9)"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        M
      </text>

      {/* Visible steps going underground */}
      <rect x={24} y={72} width={44} height={4} fill="#0f1e30" rx={0} />
      <rect x={28} y={78} width={36} height={4} fill="#0d1a28" />
      <rect x={32} y={84} width={28} height={4} fill="#0b1620" />
      <rect x={36} y={90} width={20} height={4} fill="#091218" />

      {/* Ambient light from underground (glow at entrance bottom) */}
      <rect
        x={24}
        y={105}
        width={44}
        height={8}
        fill={win}
        opacity={0.3}
        rx={1}
      />
    </>
  );
}

// ── Gwanghwamun-inspired gate (126×132) ──────────────────────────────────
function Gate({ win }: { win: string }) {
  return (
    <>
      {/* Stone platform base */}
      <rect x={0} y={58} width={126} height={72} fill={C.bodyDark} />
      <rect x={0} y={58} width={80} height={72} fill={C.body} />
      {/* Gate arch opening */}
      <rect x={46} y={72} width={34} height={58} fill={C.shadow} rx={4} />
      {/* Upper pavilion */}
      <rect x={18} y={30} width={90} height={30} fill={C.body} />
      <rect x={78} y={30} width={30} height={30} fill={C.bodySide} />
      {/* Curved roof */}
      <path d="M10,30 Q63,8 116,30 L120,34 Q63,13 6,34 Z" fill={C.bodySide} />
      <path d="M10,30 Q63,8 116,30" fill="none" stroke={C.bodyDark} strokeWidth={2} />
      {/* Roof ridge */}
      <rect x={22} y={24} width={82} height={8} fill={C.bodyDark} />
      {/* Eave tips */}
      <circle cx={10} cy={31} r={4} fill={C.bodySide} />
      <circle cx={116} cy={31} r={4} fill={C.bodySide} />
      {/* Pavilion windows */}
      <rect x={28} y={34} width={14} height={18} rx={1} fill={win} />
      <rect x={84} y={34} width={14} height={18} rx={1} fill={win} />
      {/* Side platform windows */}
      <rect x={8} y={65} width={16} height={18} rx={1} fill={win} />
      <rect x={102} y={65} width={16} height={18} rx={1} fill={win} />
    </>
  );
}

// ── Kyobo-style bookshop (70×92) ─────────────────────────────────────────
function Bookshop({ win }: { win: string }) {
  return (
    <>
      {/* Body */}
      <rect x={3} y={26} width={64} height={64} fill={C.body} />
      <rect x={52} y={26} width={15} height={64} fill={C.bodySide} />
      {/* Sign board */}
      <rect x={3} y={18} width={64} height={10} fill={C.bodyDark} />
      {/* Awning */}
      <polygon points="0,40 70,40 65,30 5,30" fill={C.roof} />
      {/* Awning stripes */}
      {[14, 28, 42, 56].map((x) => (
        <line key={x} x1={x} y1={31} x2={x - 4} y2={40} stroke={C.body} strokeWidth={1.5} opacity={0.5} />
      ))}
      {/* Display window */}
      <rect x={8} y={42} width={54} height={28} fill={C.shadow} rx={2} />
      {/* Book spines in window */}
      {[13, 19, 26, 33, 40, 47].map((x) => (
        <rect key={x} x={x} y={46} width={4} height={18} rx={0.5} fill={win} opacity={0.5} />
      ))}
      {/* Door */}
      <rect x={27} y={62} width={16} height={28} fill={C.shadow} rx={1} />
      {/* Upper windows */}
      <Wins cols={2} rows={1} sx={10} sy={26} dx={30} dy={0} ww={15} wh={9} fill={win} />
    </>
  );
}

// ── CU/GS25-style convenience store (76×84) ──────────────────────────────
function Convenience({ win }: { win: string }) {
  return (
    <>
      {/* Body */}
      <rect x={3} y={20} width={70} height={62} fill={C.body} />
      <rect x={60} y={20} width={13} height={62} fill={C.bodySide} />
      {/* Sign board */}
      <rect x={0} y={10} width={76} height={12} fill="#1a3568" />
      {/* Sign highlight */}
      <rect x={8} y={13} width={20} height={6} rx={1} fill="rgba(255,200,80,0.25)" />
      {/* Glass storefront */}
      <rect x={8} y={36} width={55} height={42} fill={C.shadow} rx={1} />
      {/* Shelf lines */}
      {[44, 52, 60].map((y) => (
        <line key={y} x1={12} y1={y} x2={59} y2={y} stroke={win} strokeWidth={1.5} opacity={0.4} />
      ))}
      {/* Products on shelves */}
      {[0, 1, 2].map((row) =>
        [14, 22, 30, 38, 46, 54].map((x) => (
          <rect key={`${row}-${x}`} x={x} y={36 + row * 8} width={4} height={6} rx={0.5} fill={win} opacity={0.3} />
        ))
      )}
      {/* Door */}
      <rect x={32} y={58} width={12} height={20} fill={C.shadow} rx={1} />
    </>
  );
}

// ── 주민센터 / Gu office (86×114) ─────────────────────────────────────────
function DocumentOffice({ win }: { win: string }) {
  return (
    <>
      {/* Body */}
      <rect x={5} y={24} width={76} height={88} fill={C.body} />
      <rect x={62} y={24} width={19} height={88} fill={C.bodySide} />
      {/* Header strip */}
      <rect x={5} y={18} width={76} height={8} fill={C.bodyDark} />
      {/* Document icon on facade */}
      <rect x={33} y={44} width={20} height={24} fill="rgba(255,255,255,0.07)" rx={1} />
      <rect x={37} y={50} width={12} height={2} fill="rgba(255,255,255,0.2)" />
      <rect x={37} y={54} width={12} height={2} fill="rgba(255,255,255,0.2)" />
      <rect x={37} y={58} width={9} height={2} fill="rgba(255,255,255,0.2)" />
      {/* Entrance */}
      <rect x={31} y={86} width={24} height={26} fill={C.shadow} rx={1} />
      {/* Windows 2×2 (left side) */}
      <Wins cols={2} rows={2} sx={10} sy={32} dx={18} dy={22} ww={12} wh={14} fill={win} />
      {/* Windows (right side) */}
      <Wins cols={1} rows={2} sx={68} sy={32} dx={0} dy={22} ww={10} wh={14} fill={win} />
      {/* Lower windows */}
      <Wins cols={2} rows={1} sx={10} sy={72} dx={18} dy={0} ww={12} wh={12} fill={win} />
    </>
  );
}
