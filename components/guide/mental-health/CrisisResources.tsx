"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CRISIS_RESOURCES } from "@/lib/mentalHealthData";
import { loc } from "@/lib/i18n/guideLocale";
import type { Locale } from "@/lib/i18n/types";

const STRINGS: Record<Locale, {
  eyebrow: string;
  heading: string;
  subtitle: string;
  callout: string;
}> = {
  en: {
    eyebrow: "Crisis Resources",
    heading: "On a hard day,\ncall these",
    subtitle: "If you're having a hard day, or a really hard day, here's who to call. Reaching out is never weakness.",
    callout: "💛 You don't have to be in crisis to call. Feeling lonely, overwhelmed, or just really sad is enough reason. These lines exist for exactly that.",
  },
  ko: {
    eyebrow: "위기 상황",
    heading: "힘든 날엔\n여기로 전화하세요",
    subtitle: "힘든 날이든, 정말 힘든 날이든 — 전화할 곳이 있습니다. 전화하는 것은 절대 약하지 않습니다.",
    callout: "💛 위기라고 느껴지지 않아도 괜찮습니다. 그냥 힘들어서 전화해도 됩니다. 그것만으로도 충분한 이유입니다.",
  },
  ja: {
    eyebrow: "危機サポート",
    heading: "つらい日は\nここに電話して",
    subtitle: "つらい日でも、本当につらい日でも — 電話できる場所があります。助けを求めることは決して弱さではありません。",
    callout: "💛 危機的な状況でなくても電話してください。孤独を感じたり、圧倒されたり、ただとても悲しい気持ちでも、それで十分な理由です。",
  },
  "zh-CN": {
    eyebrow: "危机资源",
    heading: "艰难的日子，\n拨打这些电话",
    subtitle: "无论是难熬的一天，还是真的很难熬的一天——都有可以打电话的地方。寻求帮助永远不是软弱。",
    callout: "💛 不必处于危机状态才能拨打。感到孤独、不知所措或只是非常悲伤，都是充分的理由。这些热线就是为此而设的。",
  },
  "zh-TW": {
    eyebrow: "危機資源",
    heading: "艱難的日子，\n撥打這些電話",
    subtitle: "無論是難熬的一天，還是真的很難熬的一天——都有可以打電話的地方。尋求幫助永遠不是軟弱。",
    callout: "💛 不必處於危機狀態才能撥打。感到孤獨、不知所措或只是非常悲傷，都是充分的理由。這些熱線就是為此而設的。",
  },
  pt: {
    eyebrow: "Recursos de Crise",
    heading: "Em um dia difícil,\nligue para estes",
    subtitle: "Se você está tendo um dia difícil, ou um dia realmente difícil, aqui está para quem ligar. Pedir ajuda nunca é fraqueza.",
    callout: "💛 Você não precisa estar em crise para ligar. Sentir-se solitário, sobrecarregado ou simplesmente muito triste é razão suficiente. Essas linhas existem exatamente para isso.",
  },
  es: {
    eyebrow: "Recursos de Crisis",
    heading: "En un día difícil,\nllama a estos",
    subtitle: "Si estás teniendo un día difícil, o un día realmente difícil, aquí está a quién llamar. Pedir ayuda nunca es debilidad.",
    callout: "💛 No tienes que estar en crisis para llamar. Sentirte solo, abrumado o simplemente muy triste es razón suficiente. Estas líneas existen exactamente para eso.",
  },
};

export default function CrisisResources() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;

  return (
    <section id="crisis" className="bg-zinc-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {s.eyebrow}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {s.heading}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-400">
            {s.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {CRISIS_RESOURCES.map((resource, i) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="text-3xl">{resource.emoji}</span>
                <div>
                  <h3 className="font-bold text-white leading-snug">{resource.name}</h3>
                  <p className="text-sm text-zinc-400">{resource.nameKo}</p>
                </div>
              </div>

              {/* Big phone number */}
              <a
                href={`tel:${resource.number.split(" / ")[0]}`}
                className="mb-4 block text-4xl font-black tracking-tight text-[#ffd966] hover:text-white transition-colors md:text-5xl"
              >
                {resource.number}
              </a>

              <p className="mb-3 text-sm leading-relaxed text-zinc-400">
                {loc(resource as Record<string, unknown>, "desc", locale)}
              </p>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {loc(resource as Record<string, unknown>, "available", locale)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compassionate note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-[#ffd966]/30 bg-[#ffd966]/5 px-6 py-6"
        >
          <p className="text-base font-semibold text-white">
            {s.callout}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
