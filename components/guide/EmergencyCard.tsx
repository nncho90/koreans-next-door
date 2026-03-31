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

    canvas.width = 390;
    canvas.height = 844;

    // Rounded rect helper
    const rr = (x: number, ry: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, ry);
      ctx.lineTo(x + w - r, ry);
      ctx.quadraticCurveTo(x + w, ry, x + w, ry + r);
      ctx.lineTo(x + w, ry + h - r);
      ctx.quadraticCurveTo(x + w, ry + h, x + w - r, ry + h);
      ctx.lineTo(x + r, ry + h);
      ctx.quadraticCurveTo(x, ry + h, x, ry + h - r);
      ctx.lineTo(x, ry + r);
      ctx.quadraticCurveTo(x, ry, x + r, ry);
      ctx.closePath();
    };

    // ── Background gradient ──
    const bg = ctx.createLinearGradient(0, 0, 0, 844);
    bg.addColorStop(0, "#0c0c14");
    bg.addColorStop(1, "#111118");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 390, 844);

    // Warm radial glow in header area
    const glow = ctx.createRadialGradient(195, 80, 0, 195, 80, 220);
    glow.addColorStop(0, "rgba(255,217,102,0.06)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 390, 340);

    const PAD = 24;
    const cardW = 342;
    let y = 92;

    // ── HEADER ──
    ctx.textAlign = "center";
    ctx.font = "bold 50px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#ffd966";
    ctx.fillText("SOS", 195, y);
    y += 36;

    ctx.font = "bold 12px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#777777";
    ctx.fillText("EMERGENCY  \u00B7  \uBE44\uC0C1", 195, y);
    y += 28;

    // Gold accent line
    ctx.fillStyle = "rgba(255,217,102,0.5)";
    ctx.fillRect(195 - 100, y, 200, 1.5);
    y += 44;

    // ── EMERGENCY NUMBER CARDS ──
    const nums = [
      { num: "112", label: "Police \u00B7 \uACBD\uCC30" },
      { num: "119", label: "Fire & Ambulance" },
      { num: "1330", label: "Helpline (English)" },
    ];

    const cH = 68;
    for (const item of nums) {
      rr(PAD, y, cardW, cH, 14);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 30px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#ffd966";
      ctx.textAlign = "left";
      ctx.fillText(item.num, PAD + 20, y + cH / 2 + 11);

      ctx.font = "13px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.textAlign = "right";
      ctx.fillText(item.label, PAD + cardW - 20, y + cH / 2 + 6);

      y += cH + 10;
    }
    y += 16;

    // ── PHRASES ──
    ctx.font = "bold 10px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#4a4a4a";
    ctx.textAlign = "left";
    ctx.fillText("\uC774 \uD654\uBA74\uC744 \uBCF4\uC5EC\uC8FC\uC138\uC694  \u00B7  SHOW THIS SCREEN", PAD, y);
    y += 28;

    const phrases = [
      { kr: "\uB3C4\uC640\uC8FC\uC138\uC694", en: "I need help" },
      { kr: "\uD55C\uAD6D\uC5B4\uB97C \uBABB\uD574\uC694", en: "I can\u2019t speak Korean" },
      { kr: "\uAD6C\uAE09\uCC28\uB97C \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call an ambulance" },
      { kr: "\uACBD\uCC30\uC744 \uBD88\uB7EC\uC8FC\uC138\uC694", en: "Call the police" },
    ];

    for (const p of phrases) {
      // Gold left accent bar
      rr(PAD, y - 16, 3, 42, 1.5);
      ctx.fillStyle = "rgba(255,217,102,0.65)";
      ctx.fill();

      ctx.font = "bold 21px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(p.kr, PAD + 14, y);

      ctx.font = "13px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#5a5a5a";
      ctx.fillText(p.en, PAD + 14, y + 21);

      y += 54;
    }

    // ── ADDRESS (optional) ──
    if (address) {
      y += 10;

      // Pre-measure lines for dynamic card height
      ctx.font = "bold 16px -apple-system, Arial, sans-serif";
      const maxW = cardW - 40;
      const addrWords = address.split(" ");
      const addrLines: string[] = [];
      let cur = "";
      for (const word of addrWords) {
        const test = cur + word + " ";
        if (ctx.measureText(test).width > maxW && cur) {
          addrLines.push(cur.trim());
          cur = word + " ";
        } else {
          cur = test;
        }
      }
      addrLines.push(cur.trim());

      const addrCardH = 20 + 12 + addrLines.length * 22 + 16;

      rr(PAD, y, cardW, addrCardH, 14);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 11px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#555555";
      ctx.textAlign = "left";
      ctx.fillText("My address  \u00B7  \uB0B4 \uC8FC\uC18C", PAD + 16, y + 20);

      ctx.font = "bold 16px -apple-system, Arial, sans-serif";
      ctx.fillStyle = "#ffd966";
      addrLines.forEach((l, i) => {
        ctx.fillText(l, PAD + 16, y + 20 + 12 + 18 + i * 22);
      });
    }

    // ── KND BRANDING ──
    ctx.font = "bold 11px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#484848";
    ctx.textAlign = "center";
    ctx.fillText("koreans next door", 195, 806);

    ctx.font = "10px -apple-system, Arial, sans-serif";
    ctx.fillStyle = "#383838";
    ctx.fillText("koreansnextdoor.com", 195, 822);
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
    <section id="emergency" className="bg-zinc-950 px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "비상시" : "Emergency"}
        </p>
        <h2 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {locale === "ko" ? "비상 잠금화면 카드" : "Emergency lockscreen card"}
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-zinc-400">
          {c.description}
        </p>

        {/* Card preview — centered hero */}
        <div className="mb-8 flex justify-center">
          <canvas
            ref={canvasRef}
            className="rounded-[32px]"
            style={{
              width: 195,
              height: 422,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.6), 0 0 80px rgba(255,217,102,0.07)",
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-full">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={c.addressPlaceholder}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[#ffd966]"
            />
            <p className="mt-1.5 text-xs text-zinc-500">
              {locale === "ko"
                ? "선택 사항 — 입력하면 카드에 표시돼요."
                : "Optional — your address appears on the card if filled."}
            </p>
          </div>
          <button
            onClick={download}
            className="w-full rounded-full bg-[#ffd966] px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-[#e6c34d]"
          >
            {c.downloadBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
