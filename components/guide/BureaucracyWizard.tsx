"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bank,
  IdentificationCard,
  Phone,
  Heart,
  CurrencyDollar,
  Car,
  CaretDown,
} from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhosphorIcon = React.FC<any>;

interface Task {
  icon: PhosphorIcon;
  title: string;
  subtitle: string;
  steps: string[];
  note: string;
}

const enTasks: Task[] = [
  {
    icon: Bank,
    title: "Opening a bank account",
    subtitle: "KB Kookmin, IBK Industrial, or Shinhan",
    steps: [
      "Bring: ARC card, passport, and Korean phone number.",
      "Visit a main branch \u2014 not every branch processes foreigners.",
      "KB Kookmin (\uAD6D\uBBFC\uC740\uD589) and IBK Industrial Bank (\uAE30\uC5C5\uC740\uD589) are most foreigner-friendly.",
      "Fill out forms \u2014 staff can often assist in basic English.",
      "Set up mobile banking immediately \u2014 you\u2019ll use it constantly.",
    ],
    note: "Some banks may require proof of employment or enrollment. Call ahead if possible.",
  },
  {
    icon: IdentificationCard,
    title: "Getting your ARC",
    subtitle: "Apply within 90 days of arrival at hikorea.go.kr",
    steps: [
      "Find your nearest immigration office at hikorea.go.kr.",
      "Bring: passport, passport-sized photo (3.5\u00D74.5cm), application form (available on-site), visa, proof of address, \u20A930,000.",
      "Submit your application and receive a receipt.",
      "Your card will be ready in 2\u20133 weeks \u2014 pick up at the same office.",
      "You\u2019ll need this ARC for banking, phone plans, and most official services.",
    ],
    note: "You can book appointments online at hikorea.go.kr to avoid long wait times.",
  },
  {
    icon: Phone,
    title: "Getting a phone plan",
    subtitle: "Budget MVNOs start at \u20A99,900/month",
    steps: [
      "Decide: postpaid contract vs prepaid SIM. Contract requires ARC; prepaid is available at airports.",
      "Main carriers: SKT, KT, LG U+. Budget MVNOs (\uC54C\uB730\uD3F0): Hello Mobile, SK7Mobile \u2014 half the price.",
      "Visit a carrier store or buy online (some MVNOs are online-only).",
      "Bring ARC + passport for any contract plan.",
      "Consider KT or SKT\u2019s unlimited data plans around \u20A955,000\u201365,000/month.",
    ],
    note: "If you arrive before getting your ARC, buy a prepaid tourist SIM at Incheon Airport.",
  },
  {
    icon: Heart,
    title: "Registering for health insurance (NHIS)",
    subtitle: "Mandatory within 6 months of arrival",
    steps: [
      "If employed full-time, your employer automatically enrolls you \u2014 confirm with HR.",
      "If freelance, student, or self-employed: visit a local NHIS (\uAD6D\uBBFC\uAC74\uAC15\uBCF4\uD5D8\uACF5\uB2E8) office.",
      "Bring: ARC card and bank account information.",
      "Monthly premium: approximately \u20A950,000\u2013150,000 depending on income.",
      "Once enrolled, you pay 30\u201350% of medical costs; the rest is covered.",
    ],
    note: "Don\u2019t skip this \u2014 without NHIS, a hospital visit can cost 5\u201310\u00D7 more.",
  },
  {
    icon: CurrencyDollar,
    title: "Sending money home",
    subtitle: "Wise has the best rates \u2014 set it up before you leave home",
    steps: [
      "Download the Wise app and verify your identity (passport or ARC + selfie).",
      "Add your Korean bank account as the source.",
      "Enter the recipient\u2019s bank details in your home country.",
      "Transfer \u2014 usually arrives within 1\u20132 business days.",
      "Alternative: Remitly (slightly faster for some corridors), or KakaoBank if you have it.",
    ],
    note: "Avoid bank wire transfers from Korean banks \u2014 fees can reach \u20A925,000\u201350,000 per transfer.",
  },
  {
    icon: Car,
    title: "Getting a Korean driver\u2019s license",
    subtitle: "Many countries qualify for direct exchange \u2014 no road test needed",
    steps: [
      "Check if your home country has a license exchange agreement with Korea at the Road Traffic Authority website.",
      "Most Western countries qualify for direct exchange \u2014 no road test required.",
      "Visit a Driver\u2019s License Testing Center (\uC6B4\uC804\uBA74\uD5C8\uC2DC\uD5D8\uC7A5) \u2014 there are several in Seoul.",
      "Bring: original license, certified Korean translation (from an authorized translator), ARC, passport.",
      "Pass a basic eye test and submit documents \u2014 new license issued same day.",
    ],
    note: "If your country doesn\u2019t qualify for exchange, you\u2019ll need to take the written and practical tests.",
  },
];

const koTasks: Task[] = [
  {
    icon: Bank,
    title: "\uC740\uD589 \uACC4\uC88C \uAC1C\uC124\uD558\uAE30",
    subtitle: "\uAD6D\uBBFC\uC740\uD589, \uAE30\uC5C5\uC740\uD589, \uC2E0\uD55C\uC740\uD589 \uCD94\uCC9C",
    steps: [
      "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D, \uC5EC\uAD8C, \uD55C\uAD6D \uC804\uD654\uBC88\uD638\uB97C \uC900\uBE44\uD558\uC138\uC694.",
      "\uBAA8\uB4E0 \uC9C0\uC810\uC5D0\uC11C \uC678\uAD6D\uC778 \uCC98\uB9AC\uAC00 \uAC00\uB2A5\uD558\uC9C0 \uC54A\uC544\uC694 \u2014 \uD070 \uC9C0\uC810\uC744 \uBC29\uBB38\uD558\uC138\uC694.",
      "\uAD6D\uBBFC\uC740\uD589(KB)\uACFC \uAE30\uC5C5\uC740\uD589(IBK)\uC774 \uC678\uAD6D\uC778\uC5D0\uAC8C \uAC00\uC7A5 \uCE5C\uD654\uC801\uC774\uC5D0\uC694.",
      "\uC11C\uB958\uB97C \uC791\uC131\uD558\uBA74 \uB3FC\uC694 \u2014 \uC9C1\uC6D0\uC774 \uAE30\uBCF8 \uC601\uC5B4\uB85C \uB3C4\uC6C0\uC744 \uC904 \uC218 \uC788\uC5B4\uC694.",
      "\uAC00\uC785 \uC989\uC2DC \uBAA8\uBC14\uC77C \uBC45\uD0B9\uC744 \uC124\uC815\uD558\uC138\uC694.",
    ],
    note: "\uC77C\uBD80 \uC740\uD589\uC5D0\uC11C\uB294 \uC7AC\uC9C1\uC99D\uBA85\uC11C\uB098 \uC7AC\uD559\uC99D\uBA85\uC11C\uB97C \uCD94\uAC00\uB85C \uC694\uCCAD\uD560 \uC218 \uC788\uC5B4\uC694.",
  },
  {
    icon: IdentificationCard,
    title: "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D(ARC) \uBC1B\uAE30",
    subtitle: "\uC785\uAD6D \uD6C4 90\uC77C \uC774\uB0B4, hikorea.go.kr\uC5D0\uC11C \uC0AC\uBB34\uC18C \uD655\uC778",
    steps: [
      "hikorea.go.kr\uC5D0\uC11C \uAC00\uAE4C\uC6B4 \uCD9C\uC785\uAD6D\uAD00\uB9AC\uC0AC\uBB34\uC18C\uB97C \uCC3E\uC73C\uC138\uC694.",
      "\uC900\uBE44\uBB3C: \uC5EC\uAD8C, \uC99D\uBA85\uC0AC\uC9C4(3.5\u00D74.5cm), \uC2E0\uCCAD\uC11C(\uD604\uC7A5 \uBC30\uBD80), \uBE44\uC790, \uAC70\uC8FC \uC99D\uBA85\uC11C\uB958, \uC218\uC218\uB8CC 3\uB9CC\uC6D0.",
      "\uC2E0\uCCAD\uC11C\uB97C \uC81C\uCD9C\uD558\uACE0 \uC811\uC218\uC99D\uC744 \uBC1B\uC73C\uC138\uC694.",
      "2~3\uC8FC \uD6C4 \uAC19\uC740 \uC0AC\uBB34\uC18C\uC5D0\uC11C \uC218\uB839\uD560 \uC218 \uC788\uC5B4\uC694.",
      "\uC740\uD589, \uD1B5\uC2E0\uC0AC, \uB300\uBD80\uBD84\uC758 \uACF5\uC2DD \uC11C\uBE44\uC2A4 \uC774\uC6A9\uC5D0 \uD544\uC694\uD574\uC694.",
    ],
    note: "hikorea.go.kr\uC5D0\uC11C \uC608\uC57D\uD558\uBA74 \uB300\uAE30 \uC2DC\uAC04\uC744 \uC904\uC77C \uC218 \uC788\uC5B4\uC694.",
  },
  {
    icon: Phone,
    title: "\uD734\uB300\uD3F0 \uC694\uAE08\uC81C \uAC00\uC785\uD558\uAE30",
    subtitle: "\uC54C\uB730\uD3F0\uC740 \uC6D4 9,900\uC6D0\uBD80\uD130",
    steps: [
      "\uC120\uD0DD: \uD6C4\uBD88\uC81C(\uACC4\uC57D) vs \uC120\uBD88 \uC720\uC2EC. \uD6C4\uBD88\uC740 \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D \uD544\uC694, \uC120\uBD88\uC740 \uACF5\uD56D\uC5D0\uC11C\uB3C4 \uAD6C\uC785 \uAC00\uB2A5.",
      "\uC8FC\uC694 \uD1B5\uC2E0\uC0AC: SKT, KT, LG U+. \uC54C\uB730\uD3F0: \uD5EC\uB85C\uBAA8\uBC14\uC77C, SK7\uBAA8\uBC14\uC77C \u2014 \uC808\uBC18 \uAC00\uACA9.",
      "\uD1B5\uC2E0\uC0AC \uB9E4\uC7A5 \uBC29\uBB38 \uB610\uB294 \uC628\uB77C\uC778 \uAC00\uC785(\uC77C\uBD80 \uC54C\uB730\uD3F0\uC740 \uC628\uB77C\uC778\uB9CC \uAC00\uB2A5).",
      "\uACC4\uC57D \uC694\uAE08\uC81C\uB294 \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uC5EC\uAD8C\uC774 \uD544\uC694\uD574\uC694.",
      "\uBB34\uC81C\uD55C \uB370\uC774\uD130 \uC694\uAE08\uC81C\uB294 \uBCF4\uD1B5 \uC6D4 55,000~65,000\uC6D0 \uC218\uC900\uC774\uC5D0\uC694.",
    ],
    note: "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uC774 \uC5C6\uB2E4\uBA74 \uC778\uCC9C\uACF5\uD56D\uC5D0\uC11C \uC120\uBD88 \uC720\uC2EC\uC744 \uAD6C\uC785\uD558\uC138\uC694.",
  },
  {
    icon: Heart,
    title: "\uAC74\uAC15\uBCF4\uD5D8(NHIS) \uAC00\uC785\uD558\uAE30",
    subtitle: "\uC785\uAD6D \uD6C4 6\uAC1C\uC6D4 \uC774\uB0B4 \uC758\uBB34 \uAC00\uC785",
    steps: [
      "\uC9C1\uC7A5\uC778\uC774\uB77C\uBA74 \uD68C\uC0AC\uC5D0\uC11C \uC790\uB3D9 \uAC00\uC785\uB3FC\uC694 \u2014 HR\uC5D0 \uD655\uC778\uD558\uC138\uC694.",
      "\uD504\uB9AC\uB79C\uC11C, \uD559\uC0DD, \uC790\uC601\uC5C5\uC790\uB294 \uAD6D\uBBFC\uAC74\uAC15\uBCF4\uD5D8\uACF5\uB2E8 \uC9C0\uC0AC\uB97C \uBC29\uBB38\uD558\uC138\uC694.",
      "\uC678\uAD6D\uC778\uB4F1\uB85D\uC99D\uACFC \uD1B5\uC7A5 \uC815\uBCF4\uB97C \uAC00\uC838\uC624\uC138\uC694.",
      "\uC6D4 \uBCF4\uD5D8\uB8CC: \uC18C\uB4DD\uC5D0 \uB530\uB77C \uC57D 5\uB9CC~15\uB9CC\uC6D0.",
      "\uAC00\uC785 \uD6C4 \uC758\uB8CC\uBE44\uC758 30~50%\uB9CC \uBD80\uB2F4\uD558\uBA74 \uB3FC\uC694.",
    ],
    note: "\uAC00\uC785\uD558\uC9C0 \uC54A\uC73C\uBA74 \uBCD1\uC6D0\uBE44\uAC00 5~10\uBC30 \uBE44\uC2F8\uC9C8 \uC218 \uC788\uC5B4\uC694.",
  },
  {
    icon: CurrencyDollar,
    title: "\uD574\uC678 \uC1A1\uAE08\uD558\uAE30",
    subtitle: "Wise\uAC00 \uC218\uC218\uB8CC \uCD5C\uC800 \u2014 \uCD9C\uAD6D \uC804\uC5D0 \uBBF8\uB9AC \uC124\uC815 \uCD94\uCC9C",
    steps: [
      "Wise \uC571\uC744 \uB2E4\uC6B4\uBC1B\uACE0 \uC2E0\uC6D0 \uC778\uC99D(\uC5EC\uAD8C \uB610\uB294 \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D + \uC140\uCE74)\uC744 \uC644\uB8CC\uD558\uC138\uC694.",
      "\uD55C\uAD6D \uACC4\uC88C\uB97C \uCD9C\uAE08 \uACC4\uC88C\uB85C \uB4F1\uB85D\uD558\uC138\uC694.",
      "\uBCF8\uAD6D\uC758 \uC218\uC2E0 \uACC4\uC88C \uC815\uBCF4\uB97C \uC785\uB825\uD558\uC138\uC694.",
      "\uC774\uCCB4 \u2014 \uBCF4\uD1B5 1~2 \uC601\uC5C5\uC77C \uB0B4 \uB3C4\uCC29\uD574\uC694.",
      "\uB300\uC548: Remitly(\uC77C\uBD80 \uB178\uC120\uC5D0\uC11C \uB354 \uBE60\uB984), \uCE74\uCE74\uC624\uBC45\uD06C(\uC788\uB2E4\uBA74).",
    ],
    note: "\uD55C\uAD6D \uC740\uD589 \uD574\uC678 \uC1A1\uAE08\uC740 \uC218\uC218\uB8CC\uAC00 \uAC74\uB2F9 25,000~50,000\uC6D0\uC774\uC5D0\uC694 \u2014 \uD53C\uD558\uB294 \uAC8C \uC88B\uC544\uC694.",
  },
  {
    icon: Car,
    title: "\uD55C\uAD6D \uC6B4\uC804\uBA74\uD5C8 \uCDE8\uB4DD\uD558\uAE30",
    subtitle: "\uB9CE\uC740 \uB098\uB77C\uC5D0\uC11C \uD544\uAE30/\uC2E4\uAE30 \uC5C6\uC774 \uAD50\uD658 \uAC00\uB2A5",
    steps: [
      "\uB3C4\uB85C\uAD50\uD1B5\uACF5\uB2E8 \uD648\uD398\uC774\uC9C0\uC5D0\uC11C \uBCF8\uAD6D \uBA74\uD5C8 \uAD50\uD658 \uAC00\uB2A5 \uC5EC\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694.",
      "\uB300\uBD80\uBD84\uC758 \uC11C\uAD6C\uAD8C \uAD6D\uAC00\uB294 \uAD50\uD658\uC774 \uAC00\uB2A5\uD574\uC694 \u2014 \uC2E4\uAE30 \uC2DC\uD5D8 \uBD88\uD544\uC694.",
      "\uC6B4\uC804\uBA74\uD5C8\uC2DC\uD5D8\uC7A5\uC744 \uBC29\uBB38\uD558\uC138\uC694 \u2014 \uC11C\uC6B8\uC5D0 \uC5EC\uB7EC \uACF3 \uC788\uC5B4\uC694.",
      "\uC900\uBE44\uBB3C: \uBCF8\uAD6D \uBA74\uD5C8\uC99D, \uACF5\uC778 \uD55C\uAD6D\uC5B4 \uBC88\uC5ED\uBCF8, \uC678\uAD6D\uC778\uB4F1\uB85D\uC99D, \uC5EC\uAD8C.",
      "\uAC04\uB2E8\uD55C \uC2DC\uB825 \uAC80\uC0AC \uD6C4 \uC11C\uB958\uB97C \uC81C\uCD9C\uD558\uBA74 \uB2F9\uC77C \uBC1C\uAE09\uB3FC\uC694.",
    ],
    note: "\uAD50\uD658 \uB300\uC0C1\uC774 \uC544\uB2CC \uAD6D\uAC00\uC758 \uACBD\uC6B0 \uD544\uAE30 \uBC0F \uC2E4\uAE30 \uC2DC\uD5D8\uC744 \uBD10\uC57C \uD574\uC694.",
  },
];

export default function BureaucracyWizard() {
  const { locale } = useLocale();
  const tasks = locale === "ko" ? koTasks : enTasks;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="bureaucracy" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "\uD589\uC815 \uC548\uB0B4" : "Bureaucracy"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko"
            ? "\uD589\uC815 \uCC98\uB9AC \uAC00\uC774\uB4DC"
            : "Getting things sorted"}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {locale === "ko"
            ? "\uD55C\uAD6D \uC0DD\uD65C\uC5D0 \uD544\uC694\uD55C \uD544\uC218 \uD589\uC815 \uC808\uCC28\uB4E4\uC744 \uB2E8\uACC4\uBCC4\uB85C \uC548\uB0B4\uD574\uB4DC\uB824\uC694."
            : "Step-by-step guides for the admin tasks every newcomer has to deal with."}
        </p>

        <div className="flex flex-col gap-3">
          {tasks.map((task, i) => {
            const Icon = task.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <Icon size={20} className="text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-900">{task.title}</p>
                    <p className="text-sm text-zinc-400">{task.subtitle}</p>
                  </div>
                  <CaretDown
                    size={16}
                    className={`shrink-0 text-zinc-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-100 px-5 pb-5 pt-4">
                        <ol className="flex flex-col gap-2">
                          {task.steps.map((step, j) => (
                            <li
                              key={j}
                              className="flex gap-3 text-sm text-zinc-600"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffd966] text-xs font-bold text-zinc-900">
                                {j + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                        {task.note && (
                          <p className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
                            {"\uD83D\uDCA1"} {task.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
