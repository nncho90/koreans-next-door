"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";

type ML = Record<string, string>;
const l = (obj: ML, locale: string): string => obj[locale] ?? obj["en"];

const STRINGS = {
  eyebrow: { en: "Modeling in Korea", ko: "한국에서 모델 활동", ja: "韓国でのモデル活動", "zh-CN": "在韩国从事模特", "zh-TW": "在韓國從事模特", pt: "Modelagem na Coreia", es: "Modelado en Corea" },
  title: { en: "The visa you need is E-6-1, not E-6-3", ko: "필요한 비자는 E-6-3이 아닌 E-6-1입니다", ja: "必要なビザはE-6-3ではなくE-6-1です", "zh-CN": "您需要的签证是E-6-1，而非E-6-3", "zh-TW": "您需要的簽證是E-6-1，而非E-6-3", pt: "O visto que você precisa é E-6-1, não E-6-3", es: "El visa que necesitas es E-6-1, no E-6-3" },
  misconception: { en: "E-6-3 is only for professional athletes and coaches. It is not for entertainers, models, or performing artists. Many guides and agencies online have this wrong. If someone is telling you to apply for E-6-3 as a model, that is incorrect and your application will likely be rejected.", ko: "E-6-3는 프로 운동선수와 코치 전용입니다. 연예인, 모델, 공연 예술가와는 무관합니다. 많은 온라인 가이드와 에이전시가 이를 잘못 안내하고 있습니다. 모델 활동을 위해 E-6-3을 신청하라고 안내받는다면 이는 잘못된 정보이며 신청이 거부될 가능성이 높습니다.", ja: "E-6-3はプロアスリートとコーチのみ対象です。エンターテイナー、モデル、舞台芸術家は対象外です。多くのオンラインガイドやエージェンシーがこの点を間違えています。モデルとしてE-6-3の申請を勧められた場合、それは誤りであり申請は却下される可能性が高いです。", "zh-CN": "E-6-3仅适用于职业运动员和教练，与艺人、模特或表演艺术家无关。许多在线指南和经纪公司对此有误。如果有人告诉您以模特身份申请E-6-3，这是错误的，您的申请很可能会被拒绝。", "zh-TW": "E-6-3僅適用於職業運動員和教練，與藝人、模特或表演藝術家無關。許多在線指南和經紀公司對此有誤。如果有人告訴您以模特身份申請E-6-3，這是錯誤的，您的申請很可能會被拒絕。", pt: "E-6-3 é apenas para atletas profissionais e treinadores. Não é para artistas, modelos ou artistas performáticos. Muitos guias e agências online erram nisso. Se alguém está dizendo para você solicitar E-6-3 como modelo, isso está errado e sua solicitação provavelmente será rejeitada.", es: "E-6-3 es solo para atletas profesionales y entrenadores. No es para artistas, modelos o artistas escénicos. Muchas guías y agencias en línea se equivocan en esto. Si alguien te dice que solicites E-6-3 como modelo, eso es incorrecto y tu solicitud probablemente será rechazada." },
  checklistTitle: { en: "2026 E-6-1 modeling requirements", ko: "2026년 E-6-1 모델 요건", ja: "2026年E-6-1モデル要件", "zh-CN": "2026年E-6-1模特要求", "zh-TW": "2026年E-6-1模特要求", pt: "Requisitos de modelagem E-6-1 em 2026", es: "Requisitos de modelado E-6-1 en 2026" },
  warningTitle: { en: "Why did this get stricter in 2024-2025?", ko: "2024-2025년에 요건이 강화된 이유는?", ja: "2024〜2025年に要件が厳格化された理由は？", "zh-CN": "为什么2024-2025年要求更加严格？", "zh-TW": "為什麼2024-2025年要求更加嚴格？", pt: "Por que ficou mais rígido em 2024-2025?", es: "¿Por qué se volvió más estricto en 2024-2025?" },
  warningBody: { en: "Korea expanded its trafficking-screening protocols for entertainment visas in 2024. Immigration officers now apply additional scrutiny to E-6-1 applicants. This means legitimate models face more paperwork and stricter documentation standards. The tighter requirements exist to protect workers, not to block legitimate applications. If your documentation is solid, the process is manageable.", ko: "한국은 2024년 연예 비자에 대한 인신매매 심사 프로토콜을 강화했습니다. 출입국 담당자들은 이제 E-6-1 신청자에 대해 추가적인 심사를 적용합니다. 이는 합법적인 모델들이 더 많은 서류와 엄격한 문서 기준을 맞닥뜨린다는 것을 의미합니다. 더 엄격해진 요건은 근로자를 보호하기 위한 것이며, 합법적인 신청을 막으려는 것이 아닙니다. 서류가 충분하다면 절차는 감당할 수 있습니다.", ja: "韓国は2024年にエンターテインメントビザの人身売買審査プロトコルを強化しました。出入国管理官はE-6-1申請者に対してより厳しい審査を行います。これは正当なモデルがより多くの書類と厳格な文書化基準に直面することを意味します。要件の強化は労働者を保護するためであり、正当な申請を阻むためではありません。書類が整っていれば、手続きは対処可能です。", "zh-CN": "韩国于2024年加强了娱乐签证的人口贩卖审查程序。出入境官员现在对E-6-1申请者实施额外审查。这意味着合法模特需要面对更多文件和更严格的证明标准。更严格的要求是为了保护劳动者，而非阻止合法申请。如果您的文件齐备，整个流程是可以应对的。", "zh-TW": "韓國於2024年加強了娛樂簽證的人口販賣審查程序。出入境官員現在對E-6-1申請者實施額外審查。這意味著合法模特需要面對更多文件和更嚴格的證明標準。更嚴格的要求是為了保護勞動者，而非阻止合法申請。如果您的文件齊備，整個流程是可以應對的。", pt: "A Coreia expandiu seus protocolos de rastreio de tráfico para vistos de entretenimento em 2024. Os agentes de imigração agora aplicam scrutínio adicional aos solicitantes do E-6-1. Isso significa que modelos legítimos enfrentam mais papelada e padrões de documentação mais rígidos. Os requisitos mais rígidos existem para proteger os trabalhadores, não para bloquear aplicações legítimas. Se sua documentação for sólida, o processo é gerenciável.", es: "Corea expandió sus protocolos de detección de tráfico para visas de entretenimiento en 2024. Los agentes de inmigración ahora aplican un escrutinio adicional a los solicitantes de E-6-1. Esto significa que los modelos legítimos enfrentan más papeleo y estándares de documentación más estrictos. Los requisitos más estrictos existen para proteger a los trabajadores, no para bloquear solicitudes legítimas. Si tu documentación está en orden, el proceso es manejable." },
  shortShootTitle: { en: "For short shoots (under 90 days)", ko: "단기 촬영의 경우 (90일 미만)", ja: "短期撮影の場合（90日未満）", "zh-CN": "短期拍摄（90天以内）", "zh-TW": "短期拍攝（90天以內）", pt: "Para filmagens curtas (menos de 90 dias)", es: "Para rodajes cortos (menos de 90 días)" },
  shortShootBody: { en: "The C-4-5 short-term work visa may apply instead of E-6-1 for specific shoot assignments under 90 days. In this case, the recommendation letter comes from the Korea Media Rating Board (영상물등급위원회), not the MCST. Discuss this option with your Korean agency before assuming you need the full E-6-1 process.", ko: "90일 미만 단기 특정 촬영에는 E-6-1 대신 C-4-5 단기취업비자가 적용될 수 있습니다. 이 경우 추천서는 MCST가 아닌 영상물등급위원회에서 발급합니다. E-6-1 전체 절차가 필요하다고 가정하기 전에 한국 에이전시와 이 옵션을 논의하세요.", ja: "90日未満の特定の撮影案件には、E-6-1の代わりにC-4-5短期就労ビザが適用される場合があります。この場合、推薦状はMCSTではなく映像物等級委員会（영상물등급위원회）から取得します。E-6-1の全手続きが必要と判断する前に、韓国エージェンシーと相談してください。", "zh-CN": "90天以内的特定拍摄任务可以使用C-4-5短期工作签证代替E-6-1。在这种情况下，推荐信来自韩国媒体评级委员会（영상물등급위원회），而非MCST。在假设需要完整E-6-1流程之前，请与您的韩国经纪公司讨论这一选项。", "zh-TW": "90天以內的特定拍攝任務可以使用C-4-5短期工作簽證代替E-6-1。在這種情況下，推薦信來自韓國媒體評級委員會（영상물등급위원회），而非MCST。在假設需要完整E-6-1流程之前，請與您的韓國經紀公司討論這一選項。", pt: "O visto de trabalho de curto prazo C-4-5 pode ser aplicado em vez do E-6-1 para tarefas de filmagem específicas com menos de 90 dias. Neste caso, a carta de recomendação vem do Korea Media Rating Board (영상물등급위원회), não do MCST. Discuta esta opção com sua agência coreana antes de assumir que precisa do processo completo do E-6-1.", es: "La visa de trabajo de corto plazo C-4-5 puede aplicarse en lugar de E-6-1 para tareas de filmación específicas de menos de 90 días. En este caso, la carta de recomendación proviene del Korea Media Rating Board (영상물등급위원회), no del MCST. Discute esta opción con tu agencia coreana antes de asumir que necesitas el proceso completo de E-6-1." },
  verifiedLabel: { en: "Verified May 2026", ko: "2026년 5월 검증", ja: "2026年5月検証", "zh-CN": "2026年5月验证", "zh-TW": "2026年5月驗證", pt: "Verificado em maio de 2026", es: "Verificado mayo 2026" },
};

const CHECKLIST: ML[] = [
  { en: "3+ years of documented modeling experience (hard floor, apostilled certificate required)", ko: "3년 이상 모델 경력 입증 (최소 기준, 아포스티유 증명서 필요)", ja: "3年以上の証明されたモデル経験（最低基準、アポスティーユ証明書が必要）", "zh-CN": "3年以上有记录的模特经验（硬性最低要求，需公证认证证书）", "zh-TW": "3年以上有記錄的模特經驗（硬性最低要求，需公證認證證書）", pt: "3+ anos de experiência de modelagem documentada (piso fixo, certificado apostilado necessário)", es: "3+ años de experiencia de modelado documentada (piso fijo, certificado apostillado requerido)" },
  { en: "Korean agency registered as 대중문화예술기획업 with entertainment-only license scope", ko: "오락 전용 사업 범위로 대중문화예술기획업 등록된 한국 에이전시", ja: "エンターテインメント専用のライセンス範囲で대중문화예술기획업登録された韓国エージェンシー", "zh-CN": "经纪公司须以娱乐专用范围登记为대중문화예술기획업", "zh-TW": "經紀公司須以娛樂專用範圍登記為대중문화예술기획업", pt: "Agência coreana registrada como 대중문화예술기획업 com escopo de licença exclusivo para entretenimento", es: "Agencia coreana registrada como 대중문화예술기획업 con alcance de licencia exclusivo de entretenimiento" },
  { en: "MCST (Ministry of Culture, Sports and Tourism) recommendation letter", ko: "문화체육관광부(MCST) 추천서", ja: "MCST（文化体育観光部）推薦状", "zh-CN": "MCST（文化体育观光部）推荐信", "zh-TW": "MCST（文化體育觀光部）推薦信", pt: "Carta de recomendação do MCST (Ministério da Cultura, Desporto e Turismo)", es: "Carta de recomendación del MCST (Ministerio de Cultura, Deportes y Turismo)" },
  { en: "Bilingual employment contract in Korean and English showing specific bookings (required from 2026)", ko: "특정 예약 일정이 명시된 한국어/영어 이중 계약서 (2026년부터 의무)", ja: "特定の予約を示す韓国語・英語バイリンガル雇用契約書（2026年より必須）", "zh-CN": "列明具体工作安排的韩英双语劳动合同（2026年起强制执行）", "zh-TW": "列明具體工作安排的韓英雙語勞動合約（2026年起強制執行）", pt: "Contrato de trabalho bilíngue em coreano e inglês mostrando reservas específicas (obrigatório a partir de 2026)", es: "Contrato de trabajo bilingue en coreano e inglés que muestre reservas específicas (obligatorio desde 2026)" },
  { en: "Apostilled criminal background check valid within 6 months of submission", ko: "제출일 기준 6개월 이내 발급된 아포스티유 범죄경력확인서", ja: "提出日から6ヶ月以内に発行されたアポスティーユ付き犯罪経歴証明書", "zh-CN": "在提交日期前6个月内开具的公证认证无犯罪记录证明", "zh-TW": "在提交日期前6個月內開具的公證認證無犯罪記錄證明", pt: "Verificação de antecedentes criminais apostilada válida dentro de 6 meses da submissão", es: "Verificación de antecedentes penales apostillada válida dentro de 6 meses de la presentación" },
  { en: "Medical exam on arrival in Korea (HIV, TB, drugs)", ko: "한국 입국 후 건강검진 (HIV, 결핵, 약물)", ja: "韓国入国後の健康診断（HIV・結核・薬物）", "zh-CN": "抵达韩国后进行体检（HIV、结核、药物）", "zh-TW": "抵達韓國後進行體檢（HIV、結核、藥物）", pt: "Exame médico na chegada à Coreia (HIV, TB, drogas)", es: "Examen médico a la llegada a Corea (VIH, TB, drogas)" },
];

export default function ModelingCallout() {
  const { locale } = useLocale();

  return (
    <section id="modeling" className="bg-[#fafaf8] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            📸 {l(STRINGS.eyebrow, locale)}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-zinc-950 md:text-4xl">
            {l(STRINGS.title, locale)}
          </h2>
          <p className="max-w-2xl text-zinc-600 leading-relaxed">
            {l(STRINGS.misconception, locale)}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6"
          >
            <h3 className="mb-5 font-bold text-zinc-950">
              {l(STRINGS.checklistTitle, locale)}
            </h3>
            <ul className="space-y-3">
              {CHECKLIST.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-600">
                    {l(item, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="flex flex-col gap-5">
            {/* Warning box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-amber-600">⚠</span>
                <h3 className="font-bold text-zinc-950">
                  {l(STRINGS.warningTitle, locale)}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-700">
                {l(STRINGS.warningBody, locale)}
              </p>
            </motion.div>

            {/* Short shoots note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-lg bg-zinc-950 px-2 py-0.5 text-xs font-bold text-white">
                  C-4-5
                </span>
                <h3 className="font-bold text-zinc-950">
                  {l(STRINGS.shortShootTitle, locale)}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">
                {l(STRINGS.shortShootBody, locale)}
              </p>
            </motion.div>

            {/* Verified date */}
            <p className="text-right text-xs text-zinc-400">
              {l(STRINGS.verifiedLabel, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
