"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n";

const cardLines = {
  en: {
    title: "\uD83C\uDD98 Emergency / \uBE44\uC0C1",
    police: "112 \u2014 Police (\uACBD\uCC30)",
    fire: "119 \u2014 Fire & Ambulance (\uC18C\uBC29/\uAD6C\uAE09)",
    helpline: "1330 \u2014 Tourism Helpline (English)",
    phrases: [
      { kr: "\uB3C4\uC640\uC8FC\uC138\uC694", en: "I need help" },
      { kr: "\uD55C\uAD6D\uC5B4\uB97C \uBABB\uD574\uC694", en: "I can\u2019t speak Korean" },
      { kr: "\uAD6C\uAE09\uCC28\uB97C \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call an ambulance" },
      { kr: "\uACBD\uCC30\uC744 \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call the police" },
    ],
    addressLabel: "My address / \uB0B4 \uC8FC\uC18C:",
    addressPlaceholder: "e.g. \uC11C\uC6B8\uC2DC \uB9C8\uD3EC\uAD6C \uD569\uC815\uB3D9 123-4",
    downloadBtn: "Download for lockscreen",
    description:
      "Save this to your phone. If you\u2019re ever in trouble and can\u2019t communicate, show it to someone.",
  },
  ko: {
    title: "\uD83C\uDD98 \uBE44\uC0C1 / Emergency",
    police: "112 \u2014 \uACBD\uCC30",
    fire: "119 \u2014 \uC18C\uBC29/\uAD6C\uAE09\uB300",
    helpline: "1330 \u2014 \uAD00\uAD11\uC548\uB0B4 (\uC601\uC5B4)",
    phrases: [
      { kr: "\uB3C4\uC640\uC8FC\uC138\uC694", en: "I need help" },
      { kr: "\uD55C\uAD6D\uC5B4\uB97C \uBABB\uD574\uC694", en: "I can\u2019t speak Korean" },
      { kr: "\uAD6C\uAE09\uCC28\uB97C \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call an ambulance" },
      { kr: "\uACBD\uCC30\uC744 \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call the police" },
    ],
    addressLabel: "\uB0B4 \uC8FC\uC18C:",
    addressPlaceholder: "\uC608: \uC11C\uC6B8\uC2DC \uB9C8\uD3EC\uAD6C \uD569\uC815\uB3D9 123-4",
    downloadBtn: "\uC7A0\uAE08\uD654\uBA74\uC6A9 \uB2E4\uC6B4\uB85C\uB4DC",
    description:
      "\uC774 \uCE74\uB4DC\uB97C \uD3F0\uC5D0 \uC800\uC7A5\uD574\uB450\uC138\uC694. \uC704\uAE09 \uC0C1\uD669\uC5D0\uC11C \uC758\uC0AC\uC18C\uD1B5\uC774 \uC5B4\uB835\uB2E4\uBA74 \uC774 \uD654\uBA74\uC744 \uBCF4\uC5EC\uC8FC\uC138\uC694.",
  },
};

export default function EmergencyCard() {
  const { locale } = useLocale();
  const c = locale === "ko" ? cardLines.ko : cardLines.en;
  const [address, setAddress] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // iPhone aspect ratio: 390x844
    canvas.width = 390;
    canvas.height = 844;

    // Background
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, 390, 844);

    // Yellow accent bar at top
    ctx.fillStyle = "#ffd966";
    ctx.fillRect(0, 0, 390, 6);

    let y = 60;

    // Title
    ctx.font = "bold 24px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("\uD83C\uDD98  Emergency / \uBE44\uC0C1", 195, y);
    y += 50;

    // Divider
    ctx.fillStyle = "#333333";
    ctx.fillRect(24, y, 342, 1);
    y += 30;

    // Emergency numbers
    ctx.font = "bold 20px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#ffd966";
    ctx.textAlign = "left";
    [
      "112 \u2014 Police (\uACBD\uCC30)",
      "119 \u2014 Fire & Ambulance",
      "1330 \u2014 Tourism Helpline (EN)",
    ].forEach((line) => {
      ctx.fillText(line, 24, y);
      y += 36;
    });
    y += 20;

    // Divider
    ctx.fillStyle = "#333333";
    ctx.fillRect(24, y, 342, 1);
    y += 30;

    // Phrases
    ctx.font = "bold 14px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText("Show this to someone nearby:", 24, y);
    y += 30;

    const phrases = [
      { kr: "\uB3C4\uC640\uC8FC\uC138\uC694", en: "I need help" },
      { kr: "\uD55C\uAD6D\uC5B4\uB97C \uBABB\uD574\uC694", en: "I can\u2019t speak Korean" },
      { kr: "\uAD6C\uAE09\uCC28\uB97C \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call an ambulance" },
      { kr: "\uACBD\uCC30\uC744 \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call the police" },
    ];

    phrases.forEach((p) => {
      ctx.font = "bold 22px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(p.kr, 24, y);
      ctx.font = "16px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#888888";
      ctx.fillText(p.en, 24, y + 22);
      y += 60;
    });

    // Address section
    if (address) {
      y += 10;
      ctx.fillStyle = "#333333";
      ctx.fillRect(24, y, 342, 1);
      y += 24;
      ctx.font = "bold 13px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText("My address / \uB0B4 \uC8FC\uC18C:", 24, y);
      y += 24;
      ctx.font = "bold 17px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#ffd966";
      // Word wrap address
      const words = address.split(" ");
      let line = "";
      for (const word of words) {
        const test = line + word + " ";
        if (ctx.measureText(test).width > 342 && line) {
          ctx.fillText(line.trim(), 24, y);
          line = word + " ";
          y += 26;
        } else {
          line = test;
        }
      }
      ctx.fillText(line.trim(), 24, y);
    }

    // Bottom: KND credit
    ctx.font = "12px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#444444";
    ctx.textAlign = "center";
    ctx.fillText("koreans next door \u00B7 koreansnextdoor.com", 195, 820);
  };

  useEffect(() => {
    drawCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, locale]);

  const download = () => {
    drawCard();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "knd-emergency-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section id="emergency" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "\uBE44\uC0C1\uC2DC" : "Emergency"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko"
            ? "\uBE44\uC0C1 \uC7A0\uAE08\uD654\uBA74 \uCE74\uB4DC"
            : "Emergency lockscreen card"}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {c.description}
        </p>

        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Card preview */}
          <div className="shrink-0">
            <canvas
              ref={canvasRef}
              className="rounded-[32px] shadow-2xl"
              style={{ width: 195, height: 422 }}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-6 pt-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-700">
                {c.addressLabel}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={c.addressPlaceholder}
                className="w-full max-w-sm rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#ffd966]"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                {locale === "ko"
                  ? "\uC120\uD0DD \uC0AC\uD56D \u2014 \uC785\uB825\uD558\uBA74 \uCE74\uB4DC\uC5D0 \uD45C\uC2DC\uB3FC\uC694."
                  : "Optional \u2014 appears on the card if filled."}
              </p>
            </div>
            <button
              onClick={download}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              {c.downloadBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
