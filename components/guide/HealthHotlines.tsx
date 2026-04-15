"use client";

import { useLocale } from "@/lib/i18n";
import { HOTLINES } from "@/lib/healthData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const TIPS_DATA = [
  {
    labelEn: "Bring your ARC",
    labelKo: "외국인등록증 지참",
    labelJa: "ARCを持参する",
    labelZhCN: "携带外国人登录证",
    labelZhTW: "攜帶外國人登錄證",
    labelPt: "Traga seu ARC",
    labelEs: "Lleva tu ARC",
    detailEn: "Clinics use your ARC number to look up NHIS insurance automatically. You don't need a physical insurance card.",
    detailKo: "건강보험은 외국인등록증 번호로 자동 조회됩니다. 별도의 보험 카드는 필요 없어요.",
    detailJa: "クリニックはARC番号で国民健康保険を自動照会します。保険カードは不要です。",
    detailZhCN: "诊所通过外国人登录证号码自动查询国民健康保险，无需单独的保险卡。",
    detailZhTW: "診所通過外國人登錄證號碼自動查詢國民健康保險，無需單獨的保險卡。",
    detailPt: "As clínicas usam seu número ARC para verificar o seguro NHIS automaticamente. Você não precisa de um cartão de seguro físico.",
    detailEs: "Las clínicas usan tu número ARC para verificar el seguro NHIS automáticamente. No necesitas una tarjeta de seguro física.",
  },
  {
    labelEn: "Fill prescriptions same day",
    labelKo: "처방전은 당일 사용",
    labelJa: "処方箋は当日使用",
    labelZhCN: "当天使用处方笺",
    labelZhTW: "當天使用處方箋",
    labelPt: "Preencha prescrições no mesmo dia",
    labelEs: "Rellena recetas el mismo día",
    detailEn: "Doctors give you a paper prescription slip (처방전) to take to an outside pharmacy (약국). They keep the slip — fill it same day.",
    detailKo: "의사가 처방전을 발행하면 근처 약국에서 수령하세요. 약국이 처방전을 보관하므로 당일 바로 가세요.",
    detailJa: "医師が処方箋(처방전)を発行したら、近くの薬局(약국)で受け取ってください。当日中に行きましょう。",
    detailZhCN: "医生会开具纸质处方（처방전），需带到外部药店（약국）取药。药店会保留处方，请当天前往。",
    detailZhTW: "醫生會開具紙質處方（처방전），需帶到外部藥店（약국）取藥。藥店會保留處方，請當天前往。",
    detailPt: "Os médicos dão uma receita em papel (처방전) para levar a uma farmácia externa (약국). Eles ficam com a receita — use no mesmo dia.",
    detailEs: "Los médicos te dan una receta en papel (처방전) para llevar a una farmacia externa (약국). Ellos guardan la receta — úsala el mismo día.",
  },
  {
    labelEn: 'Search "영어 가능" on Naver Maps',
    labelKo: "네이버 지도에서 '영어 가능' 검색",
    labelJa: "NaverマップでTR「영어 가능」検索",
    labelZhCN: "在Naver地图搜索「영어 가능」",
    labelZhTW: "在Naver地圖搜索「영어 가능」",
    labelPt: 'Pesquise "영어 가능" no Naver Maps',
    labelEs: 'Busca "영어 가능" en Naver Maps',
    detailEn: 'Type "영어 가능 병원" in Naver Maps to find English-speaking clinics near you. Or call ahead: "영어로 진료 가능한가요?"',
    detailKo: "네이버 지도에서 '영어 가능 병원'을 검색하거나, 전화로 '영어로 진료 가능한가요?'라고 물어보세요.",
    detailJa: "Naverマップで「영어 가능 병원」を検索するか、電話で「영어로 진료 가능한가요?」と聞いてみてください。",
    detailZhCN: "在Naver地图输入「영어 가능 병원」搜索附近英语诊所，或电话询问：「영어로 진료 가능한가요?」",
    detailZhTW: "在Naver地圖輸入「영어 가능 병원」搜索附近英語診所，或電話詢問：「영어로 진료 가능한가요?」",
    detailPt: 'Digite "영어 가능 병원" no Naver Maps para encontrar clínicas de língua inglesa perto de você. Ou ligue: "영어로 진료 가능한가요?"',
    detailEs: 'Escribe "영어 가능 병원" en Naver Maps para encontrar clínicas de habla inglesa cerca de ti. O llama: "영어로 진료 가능한가요?"',
  },
];

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  tipsHeading: string;
}> = {
  en: {
    eyebrow: "Hotlines",
    heading: "Who to call",
    tipsHeading: "Practical tips",
  },
  ko: {
    eyebrow: "긴급 연락처",
    heading: "급할 때 전화하세요",
    tipsHeading: "알아두면 좋은 것들",
  },
  ja: {
    eyebrow: "緊急連絡先",
    heading: "電話すべき番号",
    tipsHeading: "実用的なヒント",
  },
  "zh-CN": {
    eyebrow: "紧急联系方式",
    heading: "需要时拨打的电话",
    tipsHeading: "实用提示",
  },
  "zh-TW": {
    eyebrow: "緊急聯絡方式",
    heading: "需要時撥打的電話",
    tipsHeading: "實用提示",
  },
  pt: {
    eyebrow: "Linhas de Ajuda",
    heading: "Para quem ligar",
    tipsHeading: "Dicas práticas",
  },
  es: {
    eyebrow: "Líneas de Ayuda",
    heading: "A quién llamar",
    tipsHeading: "Consejos prácticos",
  },
};

function getTipLabel(tip: typeof TIPS_DATA[number], locale: Locale): string {
  if (locale === "ko") return tip.labelKo;
  if (locale === "ja") return tip.labelJa;
  if (locale === "zh-CN") return tip.labelZhCN;
  if (locale === "zh-TW") return tip.labelZhTW;
  if (locale === "pt") return tip.labelPt;
  if (locale === "es") return tip.labelEs;
  return tip.labelEn;
}

function getTipDetail(tip: typeof TIPS_DATA[number], locale: Locale): string {
  if (locale === "ko") return tip.detailKo;
  if (locale === "ja") return tip.detailJa;
  if (locale === "zh-CN") return tip.detailZhCN;
  if (locale === "zh-TW") return tip.detailZhTW;
  if (locale === "pt") return tip.detailPt;
  if (locale === "es") return tip.detailEs;
  return tip.detailEn;
}

export default function HealthHotlines() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Hotlines */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.eyebrow}
        </p>
        <h2 className="mb-8 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm"
            >
              <div className={`mb-3 self-start rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${h.color}`}>
                {loc(h as Record<string, unknown>, "label", locale)}
              </div>
              <div className="text-3xl font-bold tracking-tight text-zinc-950">
                {h.number}
              </div>
              <p className="mt-2 text-sm text-zinc-500">{loc(h as Record<string, unknown>, "detail", locale)}</p>
            </a>
          ))}
        </div>

        {/* Practical Tips */}
        <h2 className="mb-6 mt-14 text-2xl font-bold text-zinc-950">
          {s.tipsHeading}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {TIPS_DATA.map((tip) => (
            <div
              key={tip.labelEn}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <p className="mb-2 font-semibold text-zinc-900">
                {getTipLabel(tip, locale)}
              </p>
              <p className="text-sm text-zinc-500">
                {getTipDetail(tip, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
