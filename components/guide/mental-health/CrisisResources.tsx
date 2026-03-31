"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import { CRISIS_RESOURCES } from "@/lib/mentalHealthData";

export default function CrisisResources() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

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
            {isKo ? "위기 상황" : "Crisis Resources"}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {isKo ? "힘든 날엔\n여기로 전화하세요" : "On a hard day,\ncall these"}
          </h2>
          <p className="mb-10 max-w-xl text-zinc-400">
            {isKo
              ? "힘든 날이든, 정말 힘든 날이든 — 전화할 곳이 있습니다. 전화하는 것은 절대 약하지 않습니다."
              : "If you're having a hard day, or a really hard day, here's who to call. Reaching out is never weakness."}
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
                {isKo ? resource.descKo : resource.descEn}
              </p>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {resource.available}
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
            {isKo
              ? "💛 위기라고 느껴지지 않아도 괜찮습니다. 그냥 힘들어서 전화해도 됩니다. 그것만으로도 충분한 이유입니다."
              : "💛 You don't have to be in crisis to call. Feeling lonely, overwhelmed, or just really sad is enough reason. These lines exist for exactly that."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
