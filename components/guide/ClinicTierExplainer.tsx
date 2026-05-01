"use client";

import { useLocale } from "@/lib/i18n";
import { CLINIC_TIERS } from "@/lib/healthData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  egLabel: string;
  callout: string;
}> = {
  en: {
    eyebrow: "The 4-Tier System",
    heading: "Which clinic do you go to?",
    subtitle: "Korea's healthcare is organized in 4 tiers. Start at the bottom — it's cheaper, faster, and usually all you need.",
    egLabel: "E.g.: ",
    callout: "💳 Always bring your ARC (Alien Registration Card). Clinics use it to look up your NHIS insurance automatically — no card needed, just the number.",
  },
  ko: {
    eyebrow: "진료기관 종류",
    heading: "어떤 병원에 가야 할까?",
    subtitle: "한국의 의료기관은 4단계로 나뉩니다. 대부분의 경우 의원에서 시작하세요.",
    egLabel: "예시: ",
    callout: "💳 진료 시 외국인등록증(ARC)을 지참하세요. 건강보험이 자동으로 조회됩니다.",
  },
  ja: {
    eyebrow: "4段階の医療体制",
    heading: "どのクリニックに行けばいいですか？",
    subtitle: "韓国の医療は4段階に分かれています。まず最初の段階（의원）から始めましょう — 安くて早く、多くの場合それで十分です。",
    egLabel: "例: ",
    callout: "💳 必ず外国人登録証（ARC）を持参してください。クリニックが国民健康保険を自動照会します。",
  },
  "zh-CN": {
    eyebrow: "四级医疗体系",
    heading: "应该去哪个诊所？",
    subtitle: "韩国医疗按4个级别组织。从最低级别开始——更便宜、更快，通常就够了。",
    egLabel: "例如: ",
    callout: "💳 就诊时请携带外国人登录证（ARC）。诊所会自动查询您的国民健康保险。",
  },
  "zh-TW": {
    eyebrow: "四級醫療體系",
    heading: "應該去哪個診所？",
    subtitle: "韓國醫療按4個級別組織。從最低級別開始——更便宜、更快，通常就夠了。",
    egLabel: "例如: ",
    callout: "💳 就診時請攜帶外國人登錄證（ARC）。診所會自動查詢您的國民健康保險。",
  },
  pt: {
    eyebrow: "O Sistema de 4 Níveis",
    heading: "Qual clínica você vai?",
    subtitle: "A saúde da Coreia é organizada em 4 níveis. Comece pelo mais baixo — é mais barato, mais rápido e geralmente é tudo que você precisa.",
    egLabel: "Ex.: ",
    callout: "💳 Sempre traga seu ARC (Cartão de Registro de Estrangeiro). As clínicas o usam para verificar seu seguro NHIS automaticamente.",
  },
  es: {
    eyebrow: "El Sistema de 4 Niveles",
    heading: "¿A qué clínica vas?",
    subtitle: "La atención médica de Corea está organizada en 4 niveles. Empieza por el más bajo — es más barato, más rápido y generalmente es todo lo que necesitas.",
    egLabel: "Ej.: ",
    callout: "💳 Siempre lleva tu ARC (Tarjeta de Registro de Extranjero). Las clínicas la usan para verificar tu seguro NHIS automáticamente.",
  },
};

function tierText(tier: Record<string, unknown>, field: string, locale: Locale) {
  return loc(tier, field, locale) || String(tier[field] ?? "");
}

export default function ClinicTierExplainer() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="tiers" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-xl text-zinc-500">
          {s.subtitle}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CLINIC_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[#fafaf8] p-6"
            >
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd966] text-sm font-bold text-zinc-900">
                {tier.tier}
              </div>
              <div className="mb-1 text-xl font-bold text-zinc-950">
                {tier.ko}
                <span className="ml-2 text-sm font-normal text-zinc-400">
                  ({tierText(tier as Record<string, unknown>, "en", locale)})
                </span>
              </div>
              <p className="mb-3 text-sm text-zinc-500">
                {tierText(tier as Record<string, unknown>, "description", locale)}
              </p>
              <div className="mt-auto space-y-2 text-xs">
                <div className="rounded-lg bg-white px-3 py-2 text-zinc-600 border border-zinc-100">
                  <span className="font-semibold text-zinc-800">{s.egLabel}</span>
                  {tierText(tier as Record<string, unknown>, "examples", locale)}
                </div>
                <div className="rounded-lg bg-white px-3 py-2 text-zinc-600 border border-zinc-100">
                  <span className="font-semibold text-zinc-800">NHIS: </span>
                  {tierText(tier as Record<string, unknown>, "nhis", locale)}
                </div>
                <div className="rounded-lg bg-zinc-800 px-3 py-2 text-xs font-medium text-white">
                  💡 {tierText(tier as Record<string, unknown>, "tip", locale)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key callout */}
        <div className="mt-8 rounded-2xl border border-[#ffd966]/40 bg-[#ffd966]/10 px-6 py-5">
          <p className="text-sm font-semibold text-zinc-800">
            {s.callout}
          </p>
        </div>
      </div>
    </section>
  );
}
