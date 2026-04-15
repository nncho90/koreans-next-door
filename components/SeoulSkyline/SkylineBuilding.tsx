"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { guideGroups, getGuideLabel, getGuideDesc } from "@/lib/guideData";
import { BuildingConfig, DIMS } from "./skylineData";
import BuildingSVG from "./BuildingSVG";

interface Props {
  building: BuildingConfig;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  mouseX: MotionValue<number>;
  entrance: { visible: boolean; delay: number };
}

export default function SkylineBuilding({
  building,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  mouseX,
  entrance,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { locale, t } = useLocale();
  const { w, h } = DIMS[building.shape];

  // Resolve localized label + desc — prefer guideData helpers, fall back to building fields
  const guideGroup = guideGroups.find((g) => g.href === building.href);
  const toolLabels: Record<string, { label: string; desc: string }> = {
    "/tools/phrasebook": {
      label: t.guideSection.toolPhrasebookLabel,
      desc: t.guideSection.toolPhrasebookDesc,
    },
    "/tools/forms": {
      label: t.guideSection.toolFormDecoderLabel,
      desc: t.guideSection.toolFormDecoderDesc,
    },
  };
  const localizedLabel = guideGroup
    ? getGuideLabel(guideGroup, locale)
    : toolLabels[building.href]?.label ?? building.labelEn;
  const localizedDesc = guideGroup
    ? getGuideDesc(guideGroup, locale)
    : toolLabels[building.href]?.desc ?? building.descEn;

  // Parallax: depth 0 → moves up to 24px; depth 1 → barely moves
  const parallaxX = useTransform(mouseX, (x) => x * (1 - building.depth) * 24);

  // Very tall buildings (namsan, skyscraper, pagoda) would clip above the scene
  // when tooltip appears above — show to the side instead
  const isVeryTall = h >= 175;
  const tooltipSide: "above" | "right" | "left" = isVeryTall
    ? building.xPct < 55
      ? "right"
      : "left"
    : "above";

  // Above-tooltip alignment for shorter buildings near edges
  const tooltipAboveAlign =
    building.xPct < 16
      ? "left-0"
      : building.xPct > 84
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <motion.div
      className="absolute"
      style={{
        bottom: 94,
        left: `calc(${building.xPct}% - ${w / 2}px)`,
        width: w,
        height: h,
        x: parallaxX,
        zIndex: 10,
      }}
      animate={{
        y: entrance.visible ? 0 : 52,
        opacity: !entrance.visible ? 0 : isDimmed ? 0.3 : 1,
      }}
      initial={{ y: 52, opacity: 0 }}
      transition={{
        y: {
          delay: entrance.visible ? entrance.delay : 0,
          type: "spring",
          stiffness: 170,
          damping: 22,
        },
        opacity: { duration: 0.28, ease: "easeOut" },
      }}
    >
      <Link
        href={building.href}
        aria-label={`${building.labelEn} — ${building.descEn}`}
        className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd966] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverStart();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverEnd();
        }}
        onFocus={() => {
          setIsHovered(true);
          onHoverStart();
        }}
        onBlur={() => {
          setIsHovered(false);
          onHoverEnd();
        }}
      >
        <motion.div
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            filter: isHovered
              ? "drop-shadow(0 0 18px rgba(255,200,80,0.45))"
              : "drop-shadow(0 0 0px rgba(255,200,80,0))",
            transition: "filter 0.4s ease",
          }}
        >
          <BuildingSVG shape={building.shape} isHovered={isHovered} />
        </motion.div>
      </Link>

      {/* Tooltip card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={[
              "absolute w-52 pointer-events-none z-50",
              tooltipSide === "right"
                ? "left-full ml-3 top-1/3 -translate-y-1/2"
                : tooltipSide === "left"
                ? "right-full mr-3 top-1/3 -translate-y-1/2"
                : `bottom-full mb-3 ${tooltipAboveAlign}`,
            ].join(" ")}
            initial={
              tooltipSide === "right"
                ? { opacity: 0, x: -8, scale: 0.93 }
                : tooltipSide === "left"
                ? { opacity: 0, x: 8, scale: 0.93 }
                : { opacity: 0, y: 10, scale: 0.93 }
            }
            animate={
              tooltipSide === "right"
                ? { opacity: 1, x: 0, scale: 1 }
                : tooltipSide === "left"
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.17, ease: "easeOut" }}
            role="tooltip"
          >
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <span className="text-2xl block mb-1.5">{building.emoji}</span>
              <p className="font-bold text-[#1a1a1a] text-sm leading-tight">
                {localizedLabel}
              </p>
              {locale !== "ko" && (
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                  {building.labelKo}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                {localizedDesc}
              </p>
              <p className="text-xs font-semibold text-[#c9a800] mt-2.5">
                {t.guideSection.open} →
              </p>
            </div>
            {/* Directional arrow */}
            {tooltipSide === "right" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full h-0 w-0 border-y-[7px] border-r-[8px] border-y-transparent border-r-white" />
            )}
            {tooltipSide === "left" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full h-0 w-0 border-y-[7px] border-l-[8px] border-y-transparent border-l-white" />
            )}
            {tooltipSide === "above" && (
              <div
                className={`absolute top-full h-0 w-0 border-x-[7px] border-t-[8px] border-x-transparent border-t-white ${
                  building.xPct < 16
                    ? "left-6"
                    : building.xPct > 84
                    ? "right-6"
                    : "left-1/2 -translate-x-1/2"
                }`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
