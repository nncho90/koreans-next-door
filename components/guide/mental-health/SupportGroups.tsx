"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { SUPPORT_GROUPS } from "@/lib/mentalHealthData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  howToFind: string;
  kndHighlight: string;
  footerHeading: string;
  footerBody: string;
}> = {
  en: {
    eyebrow: "Community",
    heading: "Connection is medicine",
    subtitle: "Connection is medicine. Here's where to find your people.",
    howToFind: "How to find",
    kndHighlight: "✨ That's us — come say hi!",
    footerHeading: "The hardest part is showing up the first time",
    footerBody: "Going to a group or an event for the first time feels scary. But most people there are also looking for connection — just like you. Just go. It gets easier every time.",
  },
  ko: {
    eyebrow: "커뮤니티",
    heading: "연결이 약입니다",
    subtitle: "당신의 사람들을 찾을 수 있는 곳입니다. 외국인 그룹, 지원 모임, 그리고 KND.",
    howToFind: "찾는 방법",
    kndHighlight: "✨ 이게 바로 저희입니다 — 직접 연락해 주세요!",
    footerHeading: "처음 시작하기가 제일 어렵습니다",
    footerBody: "그룹에 처음 나가거나 이벤트에 처음 참석하는 건 무섭습니다. 하지만 대부분의 사람들이 당신처럼 연결을 원하고 있습니다. 그냥 가세요.",
  },
  ja: {
    eyebrow: "コミュニティ",
    heading: "つながりが薬です",
    subtitle: "あなたの仲間を見つける場所です。外国人グループ、サポートグループ、そしてKND。",
    howToFind: "見つけ方",
    kndHighlight: "✨ それが私たちです — ぜひ声をかけてください！",
    footerHeading: "一番難しいのは初めて参加することです",
    footerBody: "初めてグループやイベントに行くのは怖いです。でもそこにいるほとんどの人も、あなたと同じようにつながりを求めています。ただ行ってみてください。",
  },
  "zh-CN": {
    eyebrow: "社区",
    heading: "连接是良药",
    subtitle: "这里是找到你的同伴的地方。外国人群体、支援团体，还有KND。",
    howToFind: "如何找到",
    kndHighlight: "✨ 这就是我们 — 来打声招呼吧！",
    footerHeading: "最难的是第一次出现",
    footerBody: "第一次去一个团体或活动感觉很可怕。但那里的大多数人也在寻找联系——就像你一样。去吧，每次都会变得更容易。",
  },
  "zh-TW": {
    eyebrow: "社區",
    heading: "連接是良藥",
    subtitle: "這裡是找到你的同伴的地方。外國人群體、支援團體，還有KND。",
    howToFind: "如何找到",
    kndHighlight: "✨ 這就是我們 — 來打聲招呼吧！",
    footerHeading: "最難的是第一次出現",
    footerBody: "第一次去一個團體或活動感覺很可怕。但那裡的大多數人也在尋找聯繫——就像你一樣。去吧，每次都會變得更容易。",
  },
  pt: {
    eyebrow: "Comunidade",
    heading: "Conexão é medicamento",
    subtitle: "Aqui está onde encontrar seu grupo. Grupos de expatriados, grupos de apoio e KND.",
    howToFind: "Como encontrar",
    kndHighlight: "✨ Somos nós — venha dizer oi!",
    footerHeading: "A parte mais difícil é aparecer pela primeira vez",
    footerBody: "Ir a um grupo ou evento pela primeira vez parece assustador. Mas a maioria das pessoas lá também está procurando conexão — assim como você. Vá. Fica mais fácil cada vez.",
  },
  es: {
    eyebrow: "Comunidad",
    heading: "La conexión es medicina",
    subtitle: "Aquí está dónde encontrar a tu gente. Grupos de expatriados, grupos de apoyo y KND.",
    howToFind: "Cómo encontrar",
    kndHighlight: "✨ Ese somos nosotros — ¡ven a saludar!",
    footerHeading: "Lo más difícil es aparecer la primera vez",
    footerBody: "Ir a un grupo o evento por primera vez da miedo. Pero la mayoría de las personas allí también buscan conexión — igual que tú. Solo ve. Cada vez se vuelve más fácil.",
  },
};

export default function SupportGroups() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="community" className="bg-[#fafaf8] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c9a800]">
            {s.eyebrow}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
            {s.heading}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-500">
            {s.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {SUPPORT_GROUPS.map((group, i) => (
            <motion.div
              key={group.nameEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="mb-1">
                <h3 className="font-bold text-zinc-950">{loc(group as Record<string, unknown>, "name", locale)}</h3>
                {locale !== "ko" && <p className="text-sm text-zinc-400">{group.nameKo}</p>}
              </div>
              <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                {loc(group as Record<string, unknown>, "desc", locale)}
              </p>
              <div className="mt-auto rounded-xl bg-[#fafaf8] px-4 py-3">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  {s.howToFind}
                </p>
                <p className="text-sm font-medium text-zinc-700">{group.contact}</p>
              </div>

              {/* Highlight KND */}
              {group.nameEn.includes("KND") && (
                <div className="mt-3 rounded-xl border border-[#ffd966]/50 bg-[#ffd966]/10 px-4 py-2">
                  <p className="text-xs font-semibold text-zinc-800">
                    {s.kndHighlight}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-2xl bg-zinc-950 px-6 py-6 text-white"
        >
          <h3 className="mb-2 text-lg font-bold">
            {s.footerHeading}
          </h3>
          <p className="text-sm text-zinc-400">
            {s.footerBody}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
