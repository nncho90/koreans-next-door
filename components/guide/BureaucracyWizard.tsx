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
import type { Locale } from "@/lib/i18n/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhosphorIcon = React.FC<any>;

interface Task {
  icon: PhosphorIcon;
  title: string;
  subtitle: string;
  steps: string[];
  note: string;
}

const TASKS: Record<Locale, Task[]> = {
  en: [
    {
      icon: Bank,
      title: "Opening a bank account",
      subtitle: "KB Kookmin, IBK Industrial, or Shinhan",
      steps: [
        "Bring: ARC card, passport, and Korean phone number.",
        "Visit a main branch — not every branch processes foreigners.",
        "KB Kookmin (국민은행) and IBK Industrial Bank (기업은행) are most foreigner-friendly.",
        "Fill out forms — staff can often assist in basic English.",
        "Set up mobile banking immediately — you'll use it constantly.",
      ],
      note: "Some banks may require proof of employment or enrollment. Call ahead if possible.",
    },
    {
      icon: IdentificationCard,
      title: "Getting your ARC",
      subtitle: "Apply within 90 days of arrival at hikorea.go.kr",
      steps: [
        "Find your nearest immigration office at hikorea.go.kr.",
        "Bring: passport, passport-sized photo (3.5×4.5cm), application form (available on-site), visa, proof of address, ₩30,000.",
        "Submit your application and receive a receipt.",
        "Your card will be ready in 2–3 weeks — pick up at the same office.",
        "You'll need this ARC for banking, phone plans, and most official services.",
      ],
      note: "You can book appointments online at hikorea.go.kr to avoid long wait times.",
    },
    {
      icon: Phone,
      title: "Getting a phone plan",
      subtitle: "Budget MVNOs start at ₩9,900/month",
      steps: [
        "Decide: postpaid contract vs prepaid SIM. Contract requires ARC; prepaid is available at airports.",
        "Main carriers: SKT, KT, LG U+. Budget MVNOs (알뜰폰): Hello Mobile, SK7Mobile — half the price.",
        "Visit a carrier store or buy online (some MVNOs are online-only).",
        "Bring ARC + passport for any contract plan.",
        "Consider KT or SKT's unlimited data plans around ₩55,000–65,000/month.",
      ],
      note: "If you arrive before getting your ARC, buy a prepaid tourist SIM at Incheon Airport.",
    },
    {
      icon: Heart,
      title: "Registering for health insurance (NHIS)",
      subtitle: "Mandatory within 6 months of arrival",
      steps: [
        "If employed full-time, your employer automatically enrolls you — confirm with HR.",
        "If freelance, student, or self-employed: visit a local NHIS (국민건강보험공단) office.",
        "Bring: ARC card and bank account information.",
        "Monthly premium: approximately ₩50,000–150,000 depending on income.",
        "Once enrolled, you pay 30–50% of medical costs; the rest is covered.",
      ],
      note: "Don't skip this — without NHIS, a hospital visit can cost 5–10× more.",
    },
    {
      icon: CurrencyDollar,
      title: "Sending money home",
      subtitle: "Wise has the best rates — set it up before you leave home",
      steps: [
        "Download the Wise app and verify your identity (passport or ARC + selfie).",
        "Add your Korean bank account as the source.",
        "Enter the recipient's bank details in your home country.",
        "Transfer — usually arrives within 1–2 business days.",
        "Alternative: Remitly (slightly faster for some corridors), or KakaoBank if you have it.",
      ],
      note: "Avoid bank wire transfers from Korean banks — fees can reach ₩25,000–50,000 per transfer.",
    },
    {
      icon: Car,
      title: "Getting a Korean driver's license",
      subtitle: "Many countries qualify for direct exchange — no road test needed",
      steps: [
        "Check if your home country has a license exchange agreement with Korea at the Road Traffic Authority website.",
        "Most Western countries qualify for direct exchange — no road test required.",
        "Visit a Driver's License Testing Center (운전면허시험장) — there are several in Seoul.",
        "Bring: original license, certified Korean translation (from an authorized translator), ARC, passport.",
        "Pass a basic eye test and submit documents — new license issued same day.",
      ],
      note: "If your country doesn't qualify for exchange, you'll need to take the written and practical tests.",
    },
  ],
  ko: [
    {
      icon: Bank,
      title: "은행 계좌 개설하기",
      subtitle: "국민은행, 기업은행, 신한은행 추천",
      steps: [
        "외국인등록증, 여권, 한국 전화번호를 준비하세요.",
        "모든 지점에서 외국인 처리가 가능하지 않아요 — 큰 지점을 방문하세요.",
        "국민은행(KB)과 기업은행(IBK)이 외국인에게 가장 친화적이에요.",
        "서류를 작성하면 돼요 — 직원이 기본 영어로 도움을 줄 수 있어요.",
        "가입 즉시 모바일 뱅킹을 설정하세요.",
      ],
      note: "일부 은행에서는 재직증명서나 재학증명서를 추가로 요청할 수 있어요.",
    },
    {
      icon: IdentificationCard,
      title: "외국인등록증(ARC) 받기",
      subtitle: "입국 후 90일 이내, hikorea.go.kr에서 사무소 확인",
      steps: [
        "hikorea.go.kr에서 가까운 출입국관리사무소를 찾으세요.",
        "준비물: 여권, 증명사진(3.5×4.5cm), 신청서(현장 배부), 비자, 거주 증명서류, 수수료 3만원.",
        "신청서를 제출하고 접수증을 받으세요.",
        "2~3주 후 같은 사무소에서 수령할 수 있어요.",
        "은행, 통신사, 대부분의 공식 서비스 이용에 필요해요.",
      ],
      note: "hikorea.go.kr에서 예약하면 대기 시간을 줄일 수 있어요.",
    },
    {
      icon: Phone,
      title: "휴대폰 요금제 가입하기",
      subtitle: "알뜰폰은 월 9,900원부터",
      steps: [
        "선택: 후불제(계약) vs 선불 유심. 후불은 외국인등록증 필요, 선불은 공항에서도 구입 가능.",
        "주요 통신사: SKT, KT, LG U+. 알뜰폰: 헬로모바일, SK7모바일 — 절반 가격.",
        "통신사 매장 방문 또는 온라인 가입(일부 알뜰폰은 온라인만 가능).",
        "계약 요금제는 외국인등록증과 여권이 필요해요.",
        "무제한 데이터 요금제는 보통 월 55,000~65,000원 수준이에요.",
      ],
      note: "외국인등록증이 없다면 인천공항에서 선불 유심을 구입하세요.",
    },
    {
      icon: Heart,
      title: "건강보험(NHIS) 가입하기",
      subtitle: "입국 후 6개월 이내 의무 가입",
      steps: [
        "직장인이라면 회사에서 자동 가입돼요 — HR에 확인하세요.",
        "프리랜서, 학생, 자영업자는 국민건강보험공단 지사를 방문하세요.",
        "외국인등록증과 통장 정보를 가져오세요.",
        "월 보험료: 소득에 따라 약 5만~15만원.",
        "가입 후 의료비의 30~50%만 부담하면 돼요.",
      ],
      note: "가입하지 않으면 병원비가 5~10배 비싸질 수 있어요.",
    },
    {
      icon: CurrencyDollar,
      title: "해외 송금하기",
      subtitle: "Wise가 수수료 최저 — 출국 전에 미리 설정 추천",
      steps: [
        "Wise 앱을 다운받고 신원 인증(여권 또는 외국인등록증 + 셀카)을 완료하세요.",
        "한국 계좌를 출금 계좌로 등록하세요.",
        "본국의 수신 계좌 정보를 입력하세요.",
        "이체 — 보통 1~2 영업일 내 도착해요.",
        "대안: Remitly(일부 노선에서 더 빠름), 카카오뱅크(있다면).",
      ],
      note: "한국 은행 해외 송금은 수수료가 건당 25,000~50,000원이에요 — 피하는 게 좋아요.",
    },
    {
      icon: Car,
      title: "한국 운전면허 취득하기",
      subtitle: "많은 나라에서 필기/실기 없이 교환 가능",
      steps: [
        "도로교통공단 홈페이지에서 본국 면허 교환 가능 여부를 확인하세요.",
        "대부분의 서구권 국가는 교환이 가능해요 — 실기 시험 불필요.",
        "운전면허시험장을 방문하세요 — 서울에 여러 곳 있어요.",
        "준비물: 본국 면허증, 공인 한국어 번역본, 외국인등록증, 여권.",
        "간단한 시력 검사 후 서류를 제출하면 당일 발급돼요.",
      ],
      note: "교환 대상이 아닌 국가의 경우 필기 및 실기 시험을 봐야 해요.",
    },
  ],
  ja: [
    {
      icon: Bank,
      title: "銀行口座の開設",
      subtitle: "KB国民銀行、IBK企業銀行、新韓銀行がおすすめ",
      steps: [
        "必要書類: 외국인등록증(外国人登録証/ARC)、パスポート、韓国の電話番号。",
        "すべての支店で外国人対応できるわけではないため、大きな支店へ行きましょう。",
        "KB国民銀行(국민은행)とIBK企業銀行(기업은행)が外国人に最も親切です。",
        "書類を記入します — スタッフが簡単な英語でサポートしてくれることがあります。",
        "すぐにモバイルバンキングを設定しましょう — 頻繁に使います。",
      ],
      note: "一部の銀行では在職証明書や在学証明書が必要な場合があります。事前に電話確認を。",
    },
    {
      icon: IdentificationCard,
      title: "외국인등록증(外国人登録証/ARC)の取得",
      subtitle: "入国後90日以内にhikorea.go.krで申請",
      steps: [
        "hikorea.go.krで最寄りの出入国管理事務所を確認しましょう。",
        "必要書類: パスポート、証明写真(3.5×4.5cm)、申請書(現地配布)、ビザ、住所証明、₩30,000。",
        "申請書を提出し、受付票を受け取りましょう。",
        "2〜3週間後に同じ事務所で受け取れます。",
        "銀行、携帯プラン、ほぼすべての公的手続きにARCが必要です。",
      ],
      note: "hikorea.go.krでオンライン予約すると長い待ち時間を避けられます。",
    },
    {
      icon: Phone,
      title: "携帯プランの契約",
      subtitle: "格安SIM(알뜰폰)は月₩9,900〜",
      steps: [
        "後払い契約 vs 前払いSIMを選択。契約にはARCが必要。前払いは空港でも購入可能。",
        "主要キャリア: SKT、KT、LG U+。格安SIM(알뜰폰): Hello Mobile、SK7Mobile — 半額以下。",
        "キャリアショップへ行くか、オンラインで申し込み(一部MVNOはオンラインのみ)。",
        "契約プランにはARC + パスポートが必要。",
        "無制限データプランは月₩55,000〜65,000程度です。",
      ],
      note: "ARC取得前に到着した場合は、仁川空港で前払い観光SIMを購入しましょう。",
    },
    {
      icon: Heart,
      title: "国民健康保険(NHIS)への加入",
      subtitle: "入国後6ヶ月以内に加入義務あり",
      steps: [
        "正社員の場合、雇用主が自動的に加入手続きをしてくれます — HR部門に確認を。",
        "フリーランス、学生、自営業の方は国民健康保険公団(국민건강보험공단)の支部へ。",
        "ARC + 銀行口座情報を持参してください。",
        "月額保険料: 収入に応じて約₩50,000〜150,000。",
        "加入後は医療費の30〜50%のみ自己負担になります。",
      ],
      note: "未加入だと病院の費用が5〜10倍になる場合があります。必ず加入しましょう。",
    },
    {
      icon: CurrencyDollar,
      title: "海外送金",
      subtitle: "Wiseが最もレートが良い — 出国前に設定することを推奨",
      steps: [
        "Wiseアプリをダウンロードし、本人確認(パスポートまたはARC + 自撮り)を完了させましょう。",
        "韓国の銀行口座を送金元として登録します。",
        "母国の受取口座情報を入力します。",
        "送金 — 通常1〜2営業日以内に到着します。",
        "代替手段: Remitly(一部の送金先でより早い)、KakaoBank(お持ちの場合)。",
      ],
      note: "韓国の銀行から国際送金すると手数料が₩25,000〜50,000かかる場合があります。",
    },
    {
      icon: Car,
      title: "韓国の運転免許取得",
      subtitle: "多くの国が実技試験なしで免許交換可能",
      steps: [
        "道路交通公団のウェブサイトで、母国の免許が韓国と交換協定を結んでいるか確認しましょう。",
        "多くの欧米諸国は直接交換可能 — 実技試験不要。",
        "運転免許試験場(운전면허시험장)を訪問 — ソウル市内に複数あります。",
        "必要書類: 元の免許証、認定翻訳者による韓国語翻訳、ARC、パスポート。",
        "簡単な視力検査後、書類提出 — 当日発行されます。",
      ],
      note: "交換対象国でない場合は、筆記・実技試験を受ける必要があります。",
    },
  ],
  "zh-CN": [
    {
      icon: Bank,
      title: "开设银行账户",
      subtitle: "推荐KB国民银行、IBK企业银行或新韩银行",
      steps: [
        "所需材料：외국인등록증（外国人登录证/ARC）、护照、韩国手机号码。",
        "不是所有支行都能为外国人办理业务，请前往主要支行。",
        "KB国民银行(국민은행)和IBK企业银行(기업은행)对外国人最友好。",
        "填写表格 — 工作人员通常能用基础英语提供帮助。",
        "立即设置手机银行 — 你会经常使用。",
      ],
      note: "部分银行可能要求提供就业或在学证明，建议提前致电确认。",
    },
    {
      icon: IdentificationCard,
      title: "办理外国人登录证(ARC/외국인등록증)",
      subtitle: "入境后90天内在hikorea.go.kr申请",
      steps: [
        "在hikorea.go.kr查找最近的出入境管理事务所。",
        "所需材料：护照、证件照(3.5×4.5cm)、申请表(现场领取)、签证、住址证明、₩30,000费用。",
        "提交申请并领取受理收据。",
        "2〜3周后到同一事务所领取。",
        "银行、手机套餐及大多数官方服务都需要ARC。",
      ],
      note: "可在hikorea.go.kr在线预约，避免长时间等待。",
    },
    {
      icon: Phone,
      title: "办理手机套餐",
      subtitle: "低价虚拟运营商(알뜰폰)月费从₩9,900起",
      steps: [
        "选择：后付费合约 vs 预付SIM卡。合约需要ARC；预付卡可在机场购买。",
        "主要运营商：SKT、KT、LG U+。低价虚拟运营商(알뜰폰)：Hello Mobile、SK7Mobile — 价格减半。",
        "前往运营商门店或在线办理（部分虚拟运营商仅限线上）。",
        "合约套餐需携带ARC + 护照。",
        "无限流量套餐约₩55,000〜65,000/月。",
      ],
      note: "如果还没有ARC，可在仁川机场购买预付旅游SIM卡。",
    },
    {
      icon: Heart,
      title: "加入国民健康保险(NHIS)",
      subtitle: "入境后6个月内强制加入",
      steps: [
        "如为全职员工，雇主会自动帮您加入 — 请与HR确认。",
        "自由职业者、学生、自营业者请前往当地国民健康保险公团(국민건강보험공단)办公室。",
        "携带：ARC + 银行账户信息。",
        "月保费：约₩50,000〜150,000，视收入而定。",
        "加入后，医疗费用只需自付30〜50%。",
      ],
      note: "切勿忽略 — 未加入保险，一次住院费用可能高出5〜10倍。",
    },
    {
      icon: CurrencyDollar,
      title: "向海外汇款",
      subtitle: "Wise汇率最优 — 建议出国前提前设置",
      steps: [
        "下载Wise应用并完成身份验证（护照或ARC + 自拍照）。",
        "将韩国银行账户设为汇款来源账户。",
        "输入您本国的收款账户信息。",
        "汇款 — 通常1〜2个工作日内到账。",
        "备选：Remitly（部分汇款路线更快）或KakaoBank（如已有账户）。",
      ],
      note: "避免使用韩国银行进行国际电汇 — 手续费可能高达₩25,000〜50,000。",
    },
    {
      icon: Car,
      title: "申请韩国驾照",
      subtitle: "许多国家可直接换证，无需路试",
      steps: [
        "在道路交通公团官网确认您所在国是否与韩国签有驾照互换协议。",
        "大多数西方国家可直接换证 — 无需路试。",
        "前往驾照考试场(운전면허시험장) — 首尔有多个考场。",
        "所需材料：原驾照、经认证翻译员翻译的韩文版本、ARC、护照。",
        "通过简单视力测试并提交材料 — 当天发证。",
      ],
      note: "若您所在国不符合换证条件，需参加笔试和实际路试。",
    },
  ],
  "zh-TW": [
    {
      icon: Bank,
      title: "開設銀行帳戶",
      subtitle: "推薦KB國民銀行、IBK企業銀行或新韓銀行",
      steps: [
        "所需材料：외국인등록증（外國人登錄證/ARC）、護照、韓國手機號碼。",
        "不是所有分行都能為外國人辦理業務，請前往主要分行。",
        "KB國民銀行(국민은행)和IBK企業銀行(기업은행)對外國人最友好。",
        "填寫表格 — 工作人員通常能以基礎英文提供協助。",
        "立即設定手機銀行 — 你會經常使用。",
      ],
      note: "部分銀行可能要求提供就業或在學證明，建議提前致電確認。",
    },
    {
      icon: IdentificationCard,
      title: "辦理外國人登錄證(ARC/외국인등록증)",
      subtitle: "入境後90天內在hikorea.go.kr申請",
      steps: [
        "在hikorea.go.kr查找最近的出入境管理事務所。",
        "所需材料：護照、證件照(3.5×4.5cm)、申請表(現場領取)、簽證、住址證明、₩30,000費用。",
        "提交申請並領取受理收據。",
        "2〜3週後到同一事務所領取。",
        "銀行、手機方案及大多數官方服務都需要ARC。",
      ],
      note: "可在hikorea.go.kr線上預約，避免長時間等待。",
    },
    {
      icon: Phone,
      title: "辦理手機方案",
      subtitle: "低價虛擬電信業者(알뜰폰)月費從₩9,900起",
      steps: [
        "選擇：後付費合約 vs 預付SIM卡。合約需要ARC；預付卡可在機場購買。",
        "主要電信業者：SKT、KT、LG U+。低價虛擬業者(알뜰폰)：Hello Mobile、SK7Mobile — 費用減半。",
        "前往電信門市或線上辦理（部分虛擬業者僅限線上）。",
        "合約方案需攜帶ARC + 護照。",
        "無限流量方案約₩55,000〜65,000/月。",
      ],
      note: "如果還沒有ARC，可在仁川機場購買預付旅遊SIM卡。",
    },
    {
      icon: Heart,
      title: "加入國民健康保險(NHIS)",
      subtitle: "入境後6個月內強制加入",
      steps: [
        "若為全職員工，雇主會自動協助加入 — 請與HR確認。",
        "自由工作者、學生、自營業者請前往當地國民健康保險公團(국민건강보험공단)辦公室。",
        "攜帶：ARC + 銀行帳戶資訊。",
        "月保費：約₩50,000〜150,000，視收入而定。",
        "加入後，醫療費用只需自付30〜50%。",
      ],
      note: "切勿忽略 — 未加入保險，一次住院費用可能高出5〜10倍。",
    },
    {
      icon: CurrencyDollar,
      title: "向海外匯款",
      subtitle: "Wise匯率最優 — 建議出國前提前設定",
      steps: [
        "下載Wise應用程式並完成身份驗證（護照或ARC + 自拍照）。",
        "將韓國銀行帳戶設為匯款來源帳戶。",
        "輸入您本國的收款帳戶資訊。",
        "匯款 — 通常1〜2個工作天內到帳。",
        "備選：Remitly（部分匯款路線更快）或KakaoBank（如已有帳戶）。",
      ],
      note: "避免使用韓國銀行進行國際電匯 — 手續費可能高達₩25,000〜50,000。",
    },
    {
      icon: Car,
      title: "申請韓國駕照",
      subtitle: "許多國家可直接換證，無需路試",
      steps: [
        "在道路交通公團官網確認您所在國是否與韓國簽有駕照互換協議。",
        "大多數西方國家可直接換證 — 無需路試。",
        "前往駕照考試場(운전면허시험장) — 首爾有多個考場。",
        "所需材料：原駕照、經認證翻譯員翻譯的韓文版本、ARC、護照。",
        "通過簡單視力測試並提交材料 — 當天發證。",
      ],
      note: "若您所在國不符合換證條件，需參加筆試和實際路試。",
    },
  ],
  pt: [
    {
      icon: Bank,
      title: "Abrindo uma conta bancária",
      subtitle: "KB Kookmin, IBK Industrial ou Shinhan",
      steps: [
        "Leve: cartão ARC (외국인등록증), passaporte e número de celular coreano.",
        "Vá a uma agência principal — nem todas atendem estrangeiros.",
        "KB Kookmin (국민은행) e IBK Industrial Bank (기업은행) são as mais amigáveis para estrangeiros.",
        "Preencha os formulários — a equipe geralmente consegue ajudar em inglês básico.",
        "Configure o banco móvel imediatamente — você vai usar o tempo todo.",
      ],
      note: "Alguns bancos podem exigir comprovante de emprego ou matrícula. Ligue antes se possível.",
    },
    {
      icon: IdentificationCard,
      title: "Obtendo seu ARC (외국인등록증)",
      subtitle: "Solicite em até 90 dias da chegada em hikorea.go.kr",
      steps: [
        "Encontre o escritório de imigração mais próximo em hikorea.go.kr.",
        "Leve: passaporte, foto tamanho passaporte (3,5×4,5cm), formulário de solicitação (disponível no local), visto, comprovante de endereço, ₩30.000.",
        "Envie sua solicitação e receba o comprovante.",
        "Seu cartão ficará pronto em 2–3 semanas — retire no mesmo escritório.",
        "Você precisará do ARC para banco, plano de celular e a maioria dos serviços oficiais.",
      ],
      note: "Você pode agendar consultas online em hikorea.go.kr para evitar longas esperas.",
    },
    {
      icon: Phone,
      title: "Escolhendo um plano de celular",
      subtitle: "MVNOs econômicos a partir de ₩9.900/mês",
      steps: [
        "Decida: contrato pós-pago vs SIM pré-pago. Contrato requer ARC; pré-pago disponível em aeroportos.",
        "Operadoras principais: SKT, KT, LG U+. MVNOs econômicos (알뜰폰): Hello Mobile, SK7Mobile — metade do preço.",
        "Visite uma loja da operadora ou compre online (alguns MVNOs são só online).",
        "Leve ARC + passaporte para qualquer plano contratual.",
        "Planos de dados ilimitados da KT ou SKT custam cerca de ₩55.000–65.000/mês.",
      ],
      note: "Se chegar antes de ter o ARC, compre um SIM pré-pago turístico no Aeroporto de Incheon.",
    },
    {
      icon: Heart,
      title: "Registrando no seguro saúde (NHIS)",
      subtitle: "Obrigatório em até 6 meses da chegada",
      steps: [
        "Se empregado em tempo integral, o empregador automaticamente o inscreve — confirme com o RH.",
        "Se freelancer, estudante ou autônomo: visite um escritório local do NHIS (국민건강보험공단).",
        "Leve: cartão ARC e informações da conta bancária.",
        "Mensalidade: aproximadamente ₩50.000–150.000 dependendo da renda.",
        "Após a inscrição, você paga 30–50% dos custos médicos; o restante é coberto.",
      ],
      note: "Não pule isso — sem NHIS, uma visita ao hospital pode custar 5–10× mais.",
    },
    {
      icon: CurrencyDollar,
      title: "Enviando dinheiro para casa",
      subtitle: "Wise tem as melhores taxas — configure antes de sair de casa",
      steps: [
        "Baixe o app Wise e verifique sua identidade (passaporte ou ARC + selfie).",
        "Adicione sua conta bancária coreana como origem.",
        "Insira os dados bancários do destinatário no seu país de origem.",
        "Transfira — geralmente chega em 1–2 dias úteis.",
        "Alternativa: Remitly (um pouco mais rápido para alguns países), ou KakaoBank se tiver.",
      ],
      note: "Evite transferências bancárias de bancos coreanos — as taxas podem chegar a ₩25.000–50.000 por transferência.",
    },
    {
      icon: Car,
      title: "Obtendo carteira de motorista coreana",
      subtitle: "Muitos países qualificam para troca direta — sem prova prática",
      steps: [
        "Verifique se seu país tem acordo de troca de carteira com a Coreia no site da Autoridade de Tráfego Rodoviário.",
        "A maioria dos países ocidentais qualifica para troca direta — sem prova prática.",
        "Visite um Centro de Testes de Carteira de Motorista (운전면허시험장) — há vários em Seul.",
        "Leve: carteira original, tradução coreana certificada (por tradutor autorizado), ARC, passaporte.",
        "Passe no teste básico de visão e entregue os documentos — nova carteira emitida no mesmo dia.",
      ],
      note: "Se seu país não qualifica para troca, você precisará fazer os testes escrito e prático.",
    },
  ],
  es: [
    {
      icon: Bank,
      title: "Abrir una cuenta bancaria",
      subtitle: "KB Kookmin, IBK Industrial o Shinhan",
      steps: [
        "Lleva: tarjeta ARC (외국인등록증), pasaporte y número de teléfono coreano.",
        "Ve a una sucursal principal — no todas atienden a extranjeros.",
        "KB Kookmin (국민은행) e IBK Industrial Bank (기업은행) son los más amigables para extranjeros.",
        "Completa los formularios — el personal generalmente puede ayudar en inglés básico.",
        "Configura la banca móvil de inmediato — la usarás constantemente.",
      ],
      note: "Algunos bancos pueden requerir comprobante de empleo o matrícula. Llama antes si es posible.",
    },
    {
      icon: IdentificationCard,
      title: "Obtener tu ARC (외국인등록증)",
      subtitle: "Solicítalo dentro de los 90 días de llegada en hikorea.go.kr",
      steps: [
        "Encuentra la oficina de inmigración más cercana en hikorea.go.kr.",
        "Lleva: pasaporte, foto tamaño carnet (3,5×4,5cm), formulario de solicitud (disponible en el lugar), visa, comprobante de domicilio, ₩30.000.",
        "Presenta tu solicitud y recibe el comprobante.",
        "Tu tarjeta estará lista en 2–3 semanas — recógela en la misma oficina.",
        "Necesitarás el ARC para bancaria, planes de celular y la mayoría de servicios oficiales.",
      ],
      note: "Puedes reservar citas online en hikorea.go.kr para evitar largas esperas.",
    },
    {
      icon: Phone,
      title: "Elegir un plan de celular",
      subtitle: "Los MVNOs económicos empiezan en ₩9.900/mes",
      steps: [
        "Elige: contrato postpago vs SIM prepago. El contrato requiere ARC; el prepago está disponible en aeropuertos.",
        "Operadoras principales: SKT, KT, LG U+. MVNOs económicos (알뜰폰): Hello Mobile, SK7Mobile — mitad de precio.",
        "Visita una tienda de la operadora o compra en línea (algunos MVNOs son solo en línea).",
        "Lleva ARC + pasaporte para cualquier plan contratado.",
        "Los planes de datos ilimitados de KT o SKT cuestan alrededor de ₩55.000–65.000/mes.",
      ],
      note: "Si llegas antes de tener el ARC, compra un SIM prepago turístico en el Aeropuerto de Incheon.",
    },
    {
      icon: Heart,
      title: "Registrarse en el seguro médico (NHIS)",
      subtitle: "Obligatorio dentro de los 6 meses de llegada",
      steps: [
        "Si trabajas tiempo completo, tu empleador te inscribe automáticamente — confirma con Recursos Humanos.",
        "Si eres freelance, estudiante o autónomo: visita una oficina local del NHIS (국민건강보험공단).",
        "Lleva: tarjeta ARC e información de tu cuenta bancaria.",
        "Cuota mensual: aproximadamente ₩50.000–150.000 según ingresos.",
        "Una vez inscrito, pagas el 30–50% de los costos médicos; el resto está cubierto.",
      ],
      note: "No lo omitas — sin NHIS, una visita al hospital puede costar 5–10× más.",
    },
    {
      icon: CurrencyDollar,
      title: "Enviar dinero a casa",
      subtitle: "Wise tiene las mejores tarifas — configúralo antes de salir",
      steps: [
        "Descarga la app Wise y verifica tu identidad (pasaporte o ARC + selfie).",
        "Agrega tu cuenta bancaria coreana como origen.",
        "Ingresa los datos bancarios del destinatario en tu país de origen.",
        "Transfiere — generalmente llega en 1–2 días hábiles.",
        "Alternativa: Remitly (un poco más rápido para algunos destinos), o KakaoBank si ya tienes.",
      ],
      note: "Evita las transferencias bancarias desde bancos coreanos — las comisiones pueden llegar a ₩25.000–50.000 por transferencia.",
    },
    {
      icon: Car,
      title: "Obtener licencia de conducir coreana",
      subtitle: "Muchos países califican para canje directo — sin prueba práctica",
      steps: [
        "Verifica si tu país tiene acuerdo de canje de licencia con Corea en el sitio de la Autoridad de Tráfico.",
        "La mayoría de los países occidentales califican para canje directo — sin prueba práctica.",
        "Visita un Centro de Exámenes de Conducción (운전면허시험장) — hay varios en Seúl.",
        "Lleva: licencia original, traducción coreana certificada (por traductor autorizado), ARC, pasaporte.",
        "Supera el examen básico de visión y entrega los documentos — nueva licencia emitida el mismo día.",
      ],
      note: "Si tu país no califica para el canje, necesitarás realizar los exámenes teórico y práctico.",
    },
  ],
};

const SECTION_STRINGS: Record<Locale, { label: string; heading: string; sub: string }> = {
  en: { label: "Bureaucracy", heading: "Getting things sorted", sub: "Step-by-step guides for the admin tasks every newcomer has to deal with." },
  ko: { label: "행정 안내", heading: "행정 처리 가이드", sub: "한국 생활에 필요한 필수 행정 절차들을 단계별로 안내해드려요." },
  ja: { label: "行政手続き", heading: "手続き完全ガイド", sub: "新しく来た方が必ず対応する行政手続きをステップごとに解説します。" },
  "zh-CN": { label: "行政事务", heading: "办理指南", sub: "每位新来者都要处理的行政事务，逐步为您详细说明。" },
  "zh-TW": { label: "行政事務", heading: "辦理指南", sub: "每位新來者都要處理的行政事務，逐步為您詳細說明。" },
  pt: { label: "Burocracia", heading: "Resolvendo a papelada", sub: "Guias passo a passo para as tarefas administrativas que todo recém-chegado precisa resolver." },
  es: { label: "Burocracia", heading: "Poniendo todo en orden", sub: "Guías paso a paso para los trámites administrativos que todo recién llegado debe realizar." },
};

export default function BureaucracyWizard() {
  const { locale } = useLocale();
  const tasks = TASKS[locale] ?? TASKS.en;
  const sec = SECTION_STRINGS[locale] ?? SECTION_STRINGS.en;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="bureaucracy" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {sec.label}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {sec.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {sec.sub}
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
                            💡 {task.note}
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
