"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";

type ML = Record<string, string>;
const l = (obj: ML, locale: string): string => obj[locale] ?? obj["en"];

const STRINGS = {
  eyebrow: { en: "What Changed", ko: "변경 사항", ja: "変更点", "zh-CN": "最新变化", "zh-TW": "最新變化", pt: "O Que Mudou", es: "Qué Cambió" },
  title: { en: "Recent visa rule changes", ko: "최근 비자 규정 변경사항", ja: "最近のビザ規則変更", "zh-CN": "近期签证规则变化", "zh-TW": "近期簽證規則變化", pt: "Mudanças recentes nas regras de visto", es: "Cambios recientes en las reglas de visa" },
  desc: { en: "2024-2026 updates that affect your plans. Always verify with HiKorea or a licensed immigration consultant before applying.", ko: "귀하의 계획에 영향을 미치는 2024-2026년 변경사항. 신청 전 하이코리아 또는 전문 행정사에 확인하세요.", ja: "あなたの計画に影響する2024〜2026年の更新情報。申請前にHiKoreaまたは専門家にご確認ください。", "zh-CN": "2024-2026年影响您计划的更新。申请前请务必向HiKorea或持牌移民顾问确认。", "zh-TW": "2024-2026年影響您計劃的更新。申請前請務必向HiKorea或持牌移民顧問確認。", pt: "Atualizações de 2024 a 2026 que afetam seus planos. Sempre verifique com HiKorea antes de aplicar.", es: "Actualizaciones de 2024-2026 que afectan tus planes. Siempre verifica con HiKorea antes de aplicar." },
};

const CHANGES = [
  {
    date: { en: "April 2025", ko: "2025년 4월", ja: "2025年4月", "zh-CN": "2025年4月", "zh-TW": "2025年4月", pt: "Abril 2025", es: "Abril 2025" },
    title: { en: "E-7 unified wage standard", ko: "E-7 통합 임금 기준 도입", ja: "E-7統一賃金基準", "zh-CN": "E-7统一薪资标准", "zh-TW": "E-7統一薪資標準", pt: "Padrão salarial unificado E-7", es: "Estándar salarial unificado E-7" },
    desc: { en: "The old tiered wage system based on company size was replaced with a single unified floor in April 2025. The 2026 floor for E-7-1 holders is KRW 31.12M per year (effective February 1, 2026). Important: bonuses and allowances do not count toward this threshold, only base salary.", ko: "회사 규모별 기존 임금 기준이 2025년 4월 단일 기준으로 대체됐습니다. 2026년 E-7-1 최저 연봉 3,112만 원 (2026년 2월 1일 적용). 중요: 상여금과 수당은 기준에 포함되지 않으며, 기본급만 해당됩니다.", ja: "企業規模別の旧賃金制度が2025年4月に単一基準に置き換えられました。2026年E-7-1最低年収3,112万ウォン（2026年2月1日適用）。重要：賞与・手当は基準に算入されず、基本給のみが対象です。", "zh-CN": "旧有按公司规模分级薪资制度于2025年4月被统一标准取代。2026年E-7-1年薪底线为3,112万韩元（2026年2月1日起生效）。重要：奖金和津贴不计入门槛，仅基本工资有效。", "zh-TW": "舊有按公司規模分級薪資制度於2025年4月被統一標準取代。2026年E-7-1年薪底線為3,112萬韓元（2026年2月1日起生效）。重要：獎金和津貼不計入門檻，僅基本工資有效。", pt: "O sistema escalonado por tamanho de empresa foi substituído por piso único em abril de 2025. O piso 2026 para E-7-1 é KRW 31,12M/ano (vigente a partir de 1o/fev/2026). Importante: bônus e adicionais não contam para este piso, apenas o salário base.", es: "El sistema escalonado por tamaño de empresa fue reemplazado por un piso único en abril de 2025. El piso 2026 para E-7-1 es KRW 31,12M/año (vigente desde el 1 de febrero de 2026). Importante: bonificaciones y asignaciones no cuentan para este umbral, solo el salario base." },
    tag: "E-7",
  },
  {
    date: { en: "January 2024", ko: "2024년 1월", ja: "2024年1月", "zh-CN": "2024年1月", "zh-TW": "2024年1月", pt: "Janeiro 2024", es: "Enero 2024" },
    title: { en: "F-1-D Workation (Digital Nomad) visa launched", ko: "F-1-D 워케이션 비자 도입", ja: "F-1-Dワーケーションビザ開始", "zh-CN": "F-1-D远程办公签证推出", "zh-TW": "F-1-D遠端工作簽證推出", pt: "Visto F-1-D Workation lançado", es: "Visa F-1-D Workation lanzada" },
    desc: { en: "Korea opened a dedicated Digital Nomad visa (F-1-D) for remote workers employed by non-Korean companies earning KRW 88M+ per year. Now a permanent program. No work for Korean clients allowed, even informally.", ko: "한국 외 기업 재직 원격근무자를 위한 디지털노마드 비자(F-1-D) 도입. 연 소득 8,800만 원 이상 필요. 현재 영구 제도. 한국 고객사 업무는 비공식이라도 불가.", ja: "韓国以外の企業雇用のリモートワーカー向けデジタルノマドビザ（F-1-D）が開始。年収8,800万ウォン以上が必要。現在は恒久制度。非公式でも韓国クライアントへの業務は不可。", "zh-CN": "韩国为受雇于非韩国公司的远程工作者推出数字游民签证（F-1-D），年收入须达8,800万韩元以上。现已成为永久制度。即使非正式，也不得为韩国客户服务。", "zh-TW": "韓國為受雇於非韓國公司的遠端工作者推出數位遊牧簽證（F-1-D），年收入須達8,800萬韓元以上。現已成為永久制度。即使非正式，也不得為韓國客戶服務。", pt: "A Coreia abriu uma visa de Nômade Digital (F-1-D) para trabalhadores remotos de empresas não coreanas com KRW 88M+/ano. Agora é permanente. Nenhum trabalho para clientes coreanos é permitido.", es: "Corea abrió una visa de Nómada Digital (F-1-D) para trabajadores remotos de empresas no coreanas con KRW 88M+/año. Ahora es permanente. No se permite trabajo para clientes coreanos, ni informalmente." },
    tag: "F-1-D",
  },
  {
    date: { en: "March 2025", ko: "2025년 3월", ja: "2025年3月", "zh-CN": "2025年3月", "zh-TW": "2025年3月", pt: "Março 2025", es: "Marzo 2025" },
    title: { en: "Top-Tier Talent Visa launched", ko: "탑티어 비자 도입", ja: "トップティアビザ開始", "zh-CN": "顶尖人才签证推出", "zh-TW": "頂尖人才簽證推出", pt: "Visto Top-Tier lançado", es: "Visa Top-Tier lanzada" },
    desc: { en: "New elite track for STEM, biotech, and advanced-tech professionals. Grants F-2 residency immediately; F-5 permanent residency eligible after 3 years. Salary shortcut: earning 4x Korea GNI per year waives all degree and experience requirements.", ko: "STEM, 바이오테크, 첨단기술 분야 엘리트 트랙 신설. F-2 거주자격 즉시 부여; 3년 후 F-5 영주권 신청 가능. 고연봉 특례: 연 GNI 4배 이상이면 학력/경력 요건 면제.", ja: "STEM・バイオテク・先端技術分野の新エリートトラック。F-2居住資格を即時付与；3年後にF-5永住権申請可能。給与ショートカット：年収GNI4倍以上で学歴・経験要件免除。", "zh-CN": "面向STEM、生物技术及先进技术领域的新精英通道。立即授予F-2居住资格；3年后可申请F-5永久居留权。高薪捷径：年薪达韩国GNI的4倍可豁免所有学历和经验要求。", "zh-TW": "面向STEM、生物技術及先進技術領域的新精英通道。立即授予F-2居住資格；3年後可申請F-5永久居留權。高薪捷徑：年薪達韓國GNI的4倍可豁免所有學歷和經驗要求。", pt: "Nova trilha de elite para profissionais de STEM e tecnologia avançada. Concede residência F-2 imediatamente; F-5 permanente elegível após 3 anos. Atalho salarial: 4x GNI da Coreia dispensa diploma e experiência.", es: "Nueva modalidad de élite para profesionales de STEM y tecnología avanzada. Otorga residencia F-2 de inmediato; F-5 permanente elegible después de 3 años. Atajo salarial: 4x GNI de Corea exime título y experiencia." },
    tag: "Top-Tier",
  },
  {
    date: { en: "December 2025", ko: "2025년 12월", ja: "2025年12月", "zh-CN": "2025年12月", "zh-TW": "2025年12月", pt: "Dezembro 2025", es: "Diciembre 2025" },
    title: { en: "K-STAR expanded to 32 universities", ko: "K-STAR 협약 대학 32개로 확대", ja: "K-STAR提携大学数が32校に拡大", "zh-CN": "K-STAR合作大学扩展至32所", "zh-TW": "K-STAR合作大學擴展至32所", pt: "K-STAR expandido para 32 universidades", es: "K-STAR expandido a 32 universidades" },
    desc: { en: "The K-STAR fast-track for Korean university STEM graduates now covers 32 partner universities. STEM grads can skip the standard E-7 route and go directly to F-2 residency status, with a path to F-5 permanent residency.", ko: "국내 대학교 이공계 졸업자 대상 K-STAR 패스트트랙이 32개 협약 대학으로 확장. 이공계 졸업자는 일반 E-7 경로를 건너뛰고 F-2 직접 취득 후 F-5 영주권 경로로 진행 가능.", ja: "韓国大学STEM卒業者向けK-STARファストトラックが32校に拡大。STEM卒業者はE-7をスキップしてF-2を直接取得、F-5永住権への経路も用意。", "zh-CN": "面向韩国大学理工科毕业生的K-STAR快速通道已扩展至32所合作大学。理工科毕业生可跳过标准E-7途径直接获得F-2居住资格，并可进一步申请F-5永久居留权。", "zh-TW": "面向韓國大學理工科畢業生的K-STAR快速通道已擴展至32所合作大學。理工科畢業生可跳過標準E-7途徑直接獲得F-2居住資格，並可進一步申請F-5永久居留權。", pt: "O K-STAR para graduados em STEM de universidades coreanas agora cobre 32 parceiras. Graduados pulam a rota E-7 e vão direto ao status F-2, com caminho para F-5 permanente.", es: "El K-STAR para graduados en STEM de universidades coreanas ahora cubre 32 socias. Los graduados saltan la ruta E-7 y van directo al estado F-2, con camino hacia F-5 permanente." },
    tag: "K-STAR",
  },
  {
    date: { en: "April 2025", ko: "2025년 4월", ja: "2025年4月", "zh-CN": "2025年4月", "zh-TW": "2025年4月", pt: "Abril 2025", es: "Abril 2025" },
    title: { en: "F-3 in-country dependent applications ended", ko: "F-3 국내 동반자 신청 폐지", ja: "F-3国内同伴者申請廃止", "zh-CN": "F-3境内家属申请终止", "zh-TW": "F-3境內家屬申請終止", pt: "Pedidos de dependente F-3 no país encerrados", es: "Solicitudes de dependientes F-3 en el país finalizadas" },
    desc: { en: "Dependents can no longer apply for F-3 status from inside Korea. They must now obtain F-3 at a Korean consulate in their home country before arriving. Plan visa logistics before travel.", ko: "국내에서 F-3 신청하던 방식이 폐지됐습니다. 이제 동반자는 한국에 오기 전 본국 한국 영사관에서 F-3를 취득해야 합니다. 출국 전 비자 일정을 계획하세요.", ja: "韓国国内からのF-3申請が廃止。同伴者は来韓前に本国の韓国領事館でF-3を取得する必要があります。渡航前にビザの段取りを計画してください。", "zh-CN": "家属不再能从韩国境内申请F-3身份。他们现在必须在抵达韩国前在本国韩国领事馆获得F-3签证。请在出行前安排好签证事宜。", "zh-TW": "家屬不再能從韓國境內申請F-3身份。他們現在必須在抵達韓國前在本國韓國領事館獲得F-3簽證。請在出行前安排好簽證事宜。", pt: "Dependentes não podem mais solicitar status F-3 dentro da Coreia. Devem obter F-3 em consulado coreano no país de origem antes de chegar. Planeje a logística do visto antes de viajar.", es: "Los dependientes ya no pueden solicitar el estado F-3 desde dentro de Corea. Deben obtener F-3 en un consulado coreano en su país de origen antes de llegar. Planifica la logística del visa antes de viajar." },
    tag: "F-3",
  },
  {
    date: { en: "January 2026", ko: "2026년 1월", ja: "2026年1月", "zh-CN": "2026年1月", "zh-TW": "2026年1月", pt: "Janeiro 2026", es: "Enero 2026" },
    title: { en: "e-Arrival Card mandatory; K-ETA exemption extended", ko: "전자 입국신고서 의무화; K-ETA 면제 연장", ja: "電子入国カード義務化；K-ETA免除延長", "zh-CN": "电子入境卡强制实施；K-ETA豁免延期至2026年底", "zh-TW": "電子入境卡強制實施；K-ETA豁免延期至2026年底", pt: "Cartão de chegada eletrônico obrigatório; isenção K-ETA estendida", es: "Tarjeta de llegada electrónica obligatoria; exención K-ETA extendida" },
    desc: { en: "From January 1, 2026, all arriving travelers must complete the electronic Arrival Card before boarding or at the airport kiosk. The K-ETA visa waiver exemption for eligible nationalities was also extended through December 31, 2026.", ko: "2026년 1월 1일부터 모든 입국자는 탑승 전 또는 공항 키오스크에서 전자 입국신고서를 작성해야 합니다. K-ETA 면제도 2026년 12월 31일까지 연장됐습니다.", ja: "2026年1月1日より全入国者は搭乗前または空港キオスクで電子入国カード記入が必須。K-ETA免除も2026年12月31日まで延長。", "zh-CN": "自2026年1月1日起，所有入境旅客须在登机前或机场自助服务机填写电子入境卡。K-ETA豁免也延期至2026年12月31日。", "zh-TW": "自2026年1月1日起，所有入境旅客須在登機前或機場自助服務機填寫電子入境卡。K-ETA豁免也延期至2026年12月31日。", pt: "A partir de 1º/jan/2026, todos os viajantes devem preencher o Cartão de Chegada eletrônico antes do embarque ou no quiosque do aeroporto. A isenção K-ETA foi estendida até 31/dez/2026.", es: "Desde el 1/ene/2026, todos los viajeros deben completar la Tarjeta de Llegada electrónica antes de abordar o en el quiosco del aeropuerto. La exención K-ETA fue extendida hasta el 31/dic/2026." },
    tag: "Entry",
  },
  {
    date: { en: "2026 quota", ko: "2026년 쿼터", ja: "2026年クォータ", "zh-CN": "2026年配额", "zh-TW": "2026年配額", pt: "Cota 2026", es: "Cuota 2026" },
    title: { en: "E-9 EPS quota cut to 80,000", ko: "E-9 EPS 쿼터 8만 명으로 감소", ja: "E-9 EPSクォータが8万人に削減", "zh-CN": "E-9 EPS配额削减至8万名", "zh-TW": "E-9 EPS配額削減至8萬名", pt: "Cota E-9 EPS reduzida para 80.000", es: "Cuota E-9 EPS reducida a 80,000" },
    desc: { en: "The annual EPS quota for E-9 workers dropped from 165,000 in 2024 to 80,000 in 2026. Expect longer waiting times and more competition for available slots from sending countries.", ko: "E-9 고용허가제 연간 쿼터가 2024년 16만 5천 명에서 2026년 8만 명으로 감소. 송출국 신청자는 더 긴 대기 시간과 높은 경쟁률을 예상해야 합니다.", ja: "E-9 EPS年間クォータが2024年の165,000人から2026年には80,000人に削減。送出国からの申請者はより長い待ち時間と競争激化が見込まれます。", "zh-CN": "E-9 EPS年度配额从2024年的16.5万名下降至2026年的8万名。来自输出国的申请者需面对更长等待时间和更激烈竞争。", "zh-TW": "E-9 EPS年度配額從2024年的16.5萬名下降至2026年的8萬名。來自輸出國的申請者需面對更長等待時間和更激烈競爭。", pt: "A cota anual do EPS para trabalhadores E-9 caiu de 165.000 em 2024 para 80.000 em 2026. Espere tempos de espera mais longos e mais concorrência.", es: "La cuota anual del EPS para trabajadores E-9 cayó de 165,000 en 2024 a 80,000 en 2026. Espera tiempos de espera más largos y más competencia." },
    tag: "E-9",
  },
  {
    date: { en: "2024-2026", ko: "2024-2026년", ja: "2024〜2026年", "zh-CN": "2024-2026年", "zh-TW": "2024-2026年", pt: "2024-2026", es: "2024-2026" },
    title: { en: "E-6-1 modeling requirements tightened", ko: "E-6-1 모델 요건 강화", ja: "E-6-1モデル要件の厳格化", "zh-CN": "E-6-1模特要求收紧", "zh-TW": "E-6-1模特要求收緊", pt: "Requisitos de modelagem E-6-1 endurecidos", es: "Requisitos de modelado E-6-1 endurecidos" },
    desc: { en: "Following a 2024 trafficking-screening expansion, E-6-1 modeling now requires 3+ years of documented experience, an MCST recommendation letter, and an agency registered as 대중문화예술기획업. Bilingual contracts are mandatory from 2026.", ko: "2024년 인신매매 심사 강화 이후 E-6-1 모델은 3년 이상 입증된 경력, MCST 추천서, 대중문화예술기획업 등록 에이전시가 필요합니다. 2026년부터 이중 계약서 의무화.", ja: "2024年人身売買審査強化後、E-6-1モデルには3年以上の証明された経験、MCST推薦状、대중문화예술기획업登録エージェンシーが必要。バイリンガル契約書は2026年より義務化。", "zh-CN": "2024年加强人口贩卖审查后，E-6-1模特需要3年以上有记录的经验、MCST推荐信及注册为대중문화예술기획업的经纪公司。双语合同自2026年起强制执行。", "zh-TW": "2024年加強人口販賣審查後，E-6-1模特需要3年以上有記錄的經驗、MCST推薦信及登記為대중문화예술기획업的經紀公司。雙語合約自2026年起強制執行。", pt: "Após expansão de rastreio de tráfico em 2024, E-6-1 agora exige 3+ anos de experiência documentada, carta MCST e agência registrada como 대중문화예술기획업. Contratos bilíngues obrigatórios a partir de 2026.", es: "Tras expansión del escrutinio de tráfico en 2024, E-6-1 ahora requiere 3+ años de experiencia documentada, carta MCST y agencia registrada como 대중문화예술기획업. Contratos bilingues obligatorios desde 2026." },
    tag: "E-6-1",
  },
];

export default function RecentVisaChanges() {
  const { locale } = useLocale();

  return (
    <section id="recent-changes" className="bg-zinc-950 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            {l(STRINGS.eyebrow, locale)}
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            {l(STRINGS.title, locale)}
          </h2>
          <p className="mb-12 max-w-xl text-zinc-400">
            {l(STRINGS.desc, locale)}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {CHANGES.map((change, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="flex flex-col rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-[#ffd966] px-2.5 py-0.5 text-xs font-bold text-zinc-900">
                  {l(change.date, locale)}
                </span>
                <span className="rounded-lg border border-zinc-600 px-2.5 py-0.5 text-xs font-bold text-zinc-400">
                  {change.tag}
                </span>
              </div>
              <h3 className="mb-3 font-bold leading-snug text-white">
                {l(change.title, locale)}
              </h3>
              <div className="mb-3 h-px w-full bg-zinc-800" />
              <p className="text-sm leading-relaxed text-zinc-400">
                {l(change.desc, locale)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
