"use client";

import { LocaleProvider, useLocale } from "@/lib/i18n";
import SharedNavbar from "@/components/SharedNavbar";
import SharedFooter from "@/components/SharedFooter";
import ContractGuide from "@/components/guide/work/ContractGuide";
import LaborRights from "@/components/guide/work/LaborRights";
import WorkplaceCulture from "@/components/guide/work/WorkplaceCulture";
import JobResources from "@/components/guide/work/JobResources";
import GuideFAQ from "@/components/guide/GuideFAQ";
import { GUIDE_FAQS } from "@/lib/faqData";

function WorkContent() {
  const { locale } = useLocale();
  const isKo = locale === "ko";

  return (
    <>
      <SharedNavbar />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pt-40 pb-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
              {isKo ? "취업 & 근무" : "Work"}
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">
              {isKo ? "한국에서\n일하기" : "Working in\nKorea"}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-500">
              {isKo
                ? "근로계약서 읽는 법, 당신의 권리, 직장 문화, 그리고 취업 정보."
                : "Read your contract. Know your rights. Understand the culture. Find the job."}
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              {isKo ? "마지막 업데이트: 2026년 3월" : "Last updated: March 2026"}
            </p>

            {/* Jump links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { href: "#contract", en: "Employment Contract", ko: "근로계약서" },
                { href: "#rights", en: "Labor Rights", ko: "근로자 권리" },
                { href: "#culture", en: "Workplace Culture", ko: "직장 문화" },
                { href: "#jobs", en: "Find a Job", ko: "취업 정보" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-[#ffd966] hover:bg-[#ffd966]/10 hover:text-zinc-900"
                >
                  {isKo ? link.ko : link.en}
                </a>
              ))}
            </div>
          </div>
        </section>

        <ContractGuide />
        <LaborRights />
        <WorkplaceCulture />
        <JobResources />
        <GuideFAQ faqs={GUIDE_FAQS["work"]} isKo={isKo} />
      </main>
      <SharedFooter />
    </>
  );
}

export default function WorkPage() {
  return (
    <LocaleProvider>
      <WorkContent />
    </LocaleProvider>
  );
}
