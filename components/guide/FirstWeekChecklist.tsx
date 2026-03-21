"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, CaretDown } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

const enItems = [
  {
    title: "Get your Alien Registration Card (ARC)",
    summary: "Required within 90 days of arrival",
    details:
      "Go to your local Immigration Office (\uCD9C\uC785\uAD6D\uAD00\uB9AC\uC0AC\uBB34\uC18C). Bring: passport, passport photo (3.5\u00D74.5cm), your visa, proof of address, and \u20A930,000 fee. Processing takes 2\u20133 weeks. You\u2019ll need this for almost everything else.",
  },
  {
    title: "Open a bank account",
    summary: "KB Kookmin or IBK are most foreigner-friendly",
    details:
      "Bring your ARC card, passport, and Korean phone number. Visit a main branch \u2014 not every branch processes foreigners. KB Kookmin and IBK Industrial Bank are the most foreigner-friendly. Takes 30\u201360 minutes.",
  },
  {
    title: "Get a phone plan",
    summary: "Budget MVNOs start at \u20A99,900/month",
    details:
      "Three main carriers: SKT, KT, LG U+. Budget MVNOs (\uC54C\uB730\uD3F0) like Hello Mobile cost half as much. You need ARC + passport. Prepaid SIMs available at airports for first arrival.",
  },
  {
    title: "Register for National Health Insurance (NHIS)",
    summary: "Mandatory within 6 months of arrival",
    details:
      "If employed, your employer enrolls you automatically. Otherwise visit a local NHIS (\uAD6D\uBBFC\uAC74\uAC15\uBCF4\uD5D8\uACF5\uB2E8) office. Bring ARC + bank account info. Monthly premium: \u20A950,000\u2013150,000 based on income.",
  },
  {
    title: "Get a T-money transit card",
    summary: "Buy at any convenience store for \u20A93,000",
    details:
      "Available at GS25, CU, 7-Eleven for \u20A93,000. Load money at convenience stores or subway machines. Works on subway, bus, and some taxis. Much cheaper than buying individual tickets.",
  },
  {
    title: "Set up KakaoTalk",
    summary: "Korea\u2019s primary messaging app \u2014 everyone uses it",
    details:
      "Download KakaoTalk and register with your Korean phone number. Your landlord, coworkers, and new friends will all contact you here. Also useful for payments (KakaoPay) and maps.",
  },
  {
    title: "Register your address (\uC804\uC785\uC2E0\uACE0)",
    summary: "Visit your local \uC8FC\uBBFC\uC13C\uD130 with your ARC and lease",
    details:
      "Bring ARC and your lease contract (\uC804\uC138/\uC6D4\uC138 \uACC4\uC57D\uC11C) to your neighborhood community center (\uC8FC\uBBFC\uC13C\uD130). Required for some banking, government services, and to receive mail officially.",
  },
  {
    title: "Download your essential apps",
    summary: "Naver Map, Papago, Baemin, Coupang",
    details:
      "Naver Map is more accurate than Google Maps in Korea. Papago for translation (better than Google Translate for Korean). Baemin for food delivery. Coupang for online shopping with next-day delivery.",
  },
];

const koItems = [
  {
    title: "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D(ARC) \uBC1B\uAE30",
    summary: "\uC785\uAD6D \uD6C4 90\uC77C \uC774\uB0B4 \uD544\uC218",
    details:
      "\uAC00\uAE4C\uC6B4 \uCD9C\uC785\uAD6D\uAD00\uB9AC\uC0AC\uBB34\uC18C\uB97C \uBC29\uBB38\uD558\uC138\uC694. \uC5EC\uAD8C, \uC99D\uBA85\uC0AC\uC9C4(3.5\u00D74.5cm), \uBE44\uC790, \uAC70\uC8FC\uC9C0 \uC99D\uBA85\uC11C\uB958, \uC218\uC218\uB8CC 3\uB9CC\uC6D0\uC774 \uD544\uC694\uD574\uC694. \uBC1C\uAE09\uAE4C\uC9C0 2~3\uC8FC \uC18C\uC694\uB3FC\uC694.",
  },
  {
    title: "\uC740\uD589 \uACC4\uC88C \uAC1C\uC124\uD558\uAE30",
    summary: "\uAD6D\uBBFC\uC740\uD589\uC774\uB098 \uAE30\uC5C5\uC740\uD589 \uCD94\uCC9C",
    details:
      "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D, \uC5EC\uAD8C, \uD55C\uAD6D \uC804\uD654\uBC88\uD638\uAC00 \uD544\uC694\uD574\uC694. \uBAA8\uB4E0 \uC9C0\uC810\uC5D0\uC11C \uC678\uAD6D\uC778 \uCC98\uB9AC\uAC00 \uB418\uC9C0 \uC54A\uC744 \uC218 \uC788\uC73C\uB2C8 \uD070 \uC9C0\uC810\uC744 \uBC29\uBB38\uD558\uC138\uC694. 30~60\uBD84 \uC18C\uC694\uB3FC\uC694.",
  },
  {
    title: "\uD734\uB300\uD3F0 \uC694\uAE08\uC81C \uAC00\uC785\uD558\uAE30",
    summary: "\uC54C\uB730\uD3F0\uC740 \uC6D4 9,900\uC6D0\uBD80\uD130",
    details:
      "SKT, KT, LG U+ 3\uB300 \uD1B5\uC2E0\uC0AC\uAC00 \uC788\uC5B4\uC694. \uC54C\uB730\uD3F0(MVNO)\uC740 \uC808\uBC18 \uAC00\uACA9\uC774\uC5D0\uC694. \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uC5EC\uAD8C\uC774 \uD544\uC694\uD574\uC694.",
  },
  {
    title: "\uAC74\uAC15\uBCF4\uD5D8(\uAD6D\uBBFC\uAC74\uAC15\uBCF4\uD5D8) \uAC00\uC785\uD558\uAE30",
    summary: "\uC785\uAD6D \uD6C4 6\uAC1C\uC6D4 \uC774\uB0B4 \uC758\uBB34 \uAC00\uC785",
    details:
      "\uC9C1\uC7A5\uC778\uC740 \uC790\uB3D9 \uAC00\uC785\uB3FC\uC694. \uADF8 \uC678\uC5D0\uB294 \uAD6D\uBBFC\uAC74\uAC15\uBCF4\uD5D8\uACF5\uB2E8 \uC9C0\uC0AC\uB97C \uBC29\uBB38\uD558\uC138\uC694. \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uD1B5\uC7A5\uC774 \uD544\uC694\uD574\uC694. \uC6D4 \uBCF4\uD5D8\uB8CC\uB294 \uC18C\uB4DD\uC5D0 \uB530\uB77C 5\uB9CC~15\uB9CC\uC6D0 \uC218\uC900\uC774\uC5D0\uC694.",
  },
  {
    title: "T\uBA38\uB2C8 \uCE74\uB4DC \uAD6C\uC785\uD558\uAE30",
    summary: "\uD3B8\uC758\uC810\uC5D0\uC11C 3,000\uC6D0\uC5D0 \uAD6C\uC785 \uAC00\uB2A5",
    details:
      "GS25, CU, 7-Eleven \uB4F1 \uD3B8\uC758\uC810\uC5D0\uC11C \uAD6C\uC785\uD560 \uC218 \uC788\uC5B4\uC694. \uD3B8\uC758\uC810\uC774\uB098 \uC9C0\uD558\uCCA0\uC5ED \uCDA9\uC804\uAE30\uC5D0\uC11C \uCDA9\uC804\uD558\uBA74 \uB3FC\uC694. \uC9C0\uD558\uCCA0, \uBC84\uC2A4, \uC77C\uBD80 \uD0DD\uC2DC\uC5D0\uC11C \uC0AC\uC6A9 \uAC00\uB2A5\uD574\uC694.",
  },
  {
    title: "\uCE74\uCE74\uC624\uD1A1 \uC124\uCE58\uD558\uAE30",
    summary: "\uD55C\uAD6D\uC758 \uAD6D\uBBFC \uBA54\uC2E0\uC800",
    details:
      "\uD55C\uAD6D \uC804\uD654\uBC88\uD638\uB85C \uAC00\uC785\uD558\uC138\uC694. \uC9D1\uC8FC\uC778, \uC9C1\uC7A5 \uB3D9\uB8CC, \uC0C8 \uCE5C\uAD6C\uB4E4 \uBAA8\uB450 \uCE74\uCE74\uC624\uD1A1\uC73C\uB85C \uC5F0\uB77D\uD574\uC694. \uCE74\uCE74\uC624\uD398\uC774, \uCE74\uCE74\uC624\uB9F5\uB3C4 \uD568\uAED8 \uD65C\uC6A9\uD560 \uC218 \uC788\uC5B4\uC694.",
  },
  {
    title: "\uC804\uC785\uC2E0\uACE0\uD558\uAE30",
    summary: "\uC8FC\uBBFC\uC13C\uD130\uC5D0 \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uACC4\uC57D\uC11C \uC9C0\uCC38",
    details:
      "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uC784\uB300\uCC28 \uACC4\uC57D\uC11C\uB97C \uAC00\uC9C0\uACE0 \uC8FC\uBBFC\uC13C\uD130\uB97C \uBC29\uBB38\uD558\uC138\uC694. \uC77C\uBD80 \uAE08\uC735 \uC11C\uBE44\uC2A4 \uC774\uC6A9\uACFC \uACF5\uC2DD \uC6B0\uD3B8 \uC218\uB839\uC5D0 \uD544\uC694\uD574\uC694.",
  },
  {
    title: "\uD544\uC218 \uC571 \uB2E4\uC6B4\uBC1B\uAE30",
    summary: "\uB124\uC774\uBC84 \uC9C0\uB3C4, \uD30C\uD30C\uACE0, \uBC30\uBBFC, \uCFE0\uD321",
    details:
      "\uB124\uC774\uBC84 \uC9C0\uB3C4\uB294 \uD55C\uAD6D\uC5D0\uC11C \uAD6C\uAE00 \uC9C0\uB3C4\uBCF4\uB2E4 \uD6E8\uC52C \uC815\uD655\uD574\uC694. \uD30C\uD30C\uACE0\uB294 \uD55C\uAD6D\uC5B4 \uBC88\uC5ED\uC5D0 \uCD5C\uC801\uD654\uB3FC \uC788\uC5B4\uC694. \uBC30\uBBFC\uC73C\uB85C \uBC30\uB2EC, \uCFE0\uD321\uC73C\uB85C \uB2E4\uC74C\uB0A0 \uBC30\uC1A1 \uC1FC\uD551\uC774 \uAC00\uB2A5\uD574\uC694.",
  },
];

export default function FirstWeekChecklist() {
  const { locale } = useLocale();
  const items = locale === "ko" ? koItems : enItems;
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));
  const [expanded, setExpanded] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("knd-checklist");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    localStorage.setItem("knd-checklist", JSON.stringify(next));
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <section id="first-week" className="bg-white px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "\uCCAB\uC9F8 \uC8FC" : "First Week"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko"
            ? "\uCCAB\uC9F8 \uC8FC \uCCB4\uD06C\uB9AC\uC2A4\uD2B8"
            : "Your first week checklist"}
        </h2>

        {/* Progress bar */}
        <div className="mb-8 mt-4">
          <div className="mb-1 flex items-center justify-between text-sm text-zinc-500">
            <span>
              {locale === "ko"
                ? `${items.length}\uAC1C \uC911 ${completedCount}\uAC1C \uC644\uB8CC`
                : `${completedCount} of ${items.length} complete`}
            </span>
            <span className="font-semibold text-zinc-900">
              {Math.round((completedCount / items.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-100">
            <div
              className="h-1.5 rounded-full bg-[#ffd966] transition-all duration-500"
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col divide-y divide-zinc-100">
          {items.map((item, i) => (
            <div
              key={i}
              className={`py-4 transition-opacity ${checked[i] ? "opacity-50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggle(i)}
                  className="mt-0.5 shrink-0 text-zinc-300 transition-colors hover:text-[#ffd966]"
                >
                  {checked[i] ? (
                    <CheckCircle
                      size={22}
                      weight="fill"
                      className="text-[#ffd966]"
                    />
                  ) : (
                    <Circle size={22} />
                  )}
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div>
                      <p
                        className={`font-semibold text-zinc-900 ${checked[i] ? "line-through" : ""}`}
                      >
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-400">{item.summary}</p>
                    </div>
                    <CaretDown
                      size={16}
                      className={`ml-4 shrink-0 text-zinc-300 transition-transform ${expanded === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                          {item.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
