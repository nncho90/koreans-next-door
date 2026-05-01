"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, CaretDown } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

interface ChecklistItem {
  title: string;
  summary: string;
  details: string;
}

const ITEMS: Record<Locale, ChecklistItem[]> = {
  en: [
    {
      title: "Get your Alien Registration Card (ARC / 외국인등록증)",
      summary: "Required within 90 days of arrival",
      details:
        "Go to your local Immigration Office (출입국관리사무소). Bring: passport, passport photo (3.5×4.5cm), your visa, proof of address, and ₩30,000 fee. Processing takes 2–3 weeks. You'll need this for almost everything else.",
    },
    {
      title: "Open a bank account",
      summary: "KB Kookmin or IBK are most foreigner-friendly",
      details:
        "Bring your ARC card, passport, and Korean phone number. Visit a main branch — not every branch processes foreigners. KB Kookmin and IBK Industrial Bank are the most foreigner-friendly. Takes 30–60 minutes.",
    },
    {
      title: "Get a phone plan",
      summary: "Budget MVNOs start at ₩9,900/month",
      details:
        "Three main carriers: SKT, KT, LG U+. Budget MVNOs (알뜰폰) like Hello Mobile cost half as much. You need ARC + passport. Prepaid SIMs available at airports for first arrival.",
    },
    {
      title: "Register for National Health Insurance (NHIS)",
      summary: "Mandatory within 6 months of arrival",
      details:
        "If employed, your employer enrolls you automatically. Otherwise visit a local NHIS (국민건강보험공단) office. Bring ARC + bank account info. Monthly premium: ₩50,000–150,000 based on income.",
    },
    {
      title: "Get a T-money transit card",
      summary: "Buy at any convenience store for ₩3,000",
      details:
        "Available at GS25, CU, 7-Eleven for ₩3,000. Load money at convenience stores or subway machines. Works on subway, bus, and some taxis. Much cheaper than buying individual tickets.",
    },
    {
      title: "Set up KakaoTalk",
      summary: "Korea's primary messaging app — everyone uses it",
      details:
        "Download KakaoTalk and register with your Korean phone number. Your landlord, coworkers, and new friends will all contact you here. Also useful for payments (KakaoPay) and maps.",
    },
    {
      title: "Register your address (전입신고)",
      summary: "Visit your local 주민센터 with your ARC and lease",
      details:
        "Bring ARC and your lease contract (전세/월세 계약서) to your neighborhood community center (주민센터). Required for some banking, government services, and to receive mail officially.",
    },
    {
      title: "Download your essential apps",
      summary: "Naver Map, Papago, Baemin, Coupang",
      details:
        "Naver Map is more accurate than Google Maps in Korea. Papago for translation (better than Google Translate for Korean). Baemin for food delivery. Coupang for online shopping with next-day delivery.",
    },
  ],
  ko: [
    {
      title: "외국인등록증(ARC) 받기",
      summary: "입국 후 90일 이내 필수",
      details:
        "가까운 출입국관리사무소를 방문하세요. 여권, 증명사진(3.5×4.5cm), 비자, 거주지 증명서류, 수수료 3만원이 필요해요. 발급까지 2~3주 소요돼요.",
    },
    {
      title: "은행 계좌 개설하기",
      summary: "국민은행이나 기업은행 추천",
      details:
        "외국인등록증, 여권, 한국 전화번호가 필요해요. 모든 지점에서 외국인 처리가 되지 않을 수 있으니 큰 지점을 방문하세요. 30~60분 소요돼요.",
    },
    {
      title: "휴대폰 요금제 가입하기",
      summary: "알뜰폰은 월 9,900원부터",
      details:
        "SKT, KT, LG U+ 3대 통신사가 있어요. 알뜰폰(MVNO)은 절반 가격이에요. 외국인등록증과 여권이 필요해요.",
    },
    {
      title: "건강보험(국민건강보험) 가입하기",
      summary: "입국 후 6개월 이내 의무 가입",
      details:
        "직장인은 자동 가입돼요. 그 외에는 국민건강보험공단 지사를 방문하세요. 외국인등록증과 통장이 필요해요. 월 보험료는 소득에 따라 5만~15만원 수준이에요.",
    },
    {
      title: "T머니 카드 구입하기",
      summary: "편의점에서 3,000원에 구입 가능",
      details:
        "GS25, CU, 7-Eleven 등 편의점에서 구입할 수 있어요. 편의점이나 지하철역 충전기에서 충전하면 돼요. 지하철, 버스, 일부 택시에서 사용 가능해요.",
    },
    {
      title: "카카오톡 설치하기",
      summary: "한국의 국민 메신저",
      details:
        "한국 전화번호로 가입하세요. 집주인, 직장 동료, 새 친구들 모두 카카오톡으로 연락해요. 카카오페이, 카카오맵도 함께 활용할 수 있어요.",
    },
    {
      title: "전입신고하기",
      summary: "주민센터에 외국인등록증과 계약서 지참",
      details:
        "외국인등록증과 임대차 계약서를 가지고 주민센터를 방문하세요. 일부 금융 서비스 이용과 공식 우편 수령에 필요해요.",
    },
    {
      title: "필수 앱 다운받기",
      summary: "네이버 지도, 파파고, 배민, 쿠팡",
      details:
        "네이버 지도는 한국에서 구글 지도보다 훨씬 정확해요. 파파고는 한국어 번역에 최적화돼 있어요. 배민으로 배달, 쿠팡으로 다음날 배송 쇼핑이 가능해요.",
    },
  ],
  ja: [
    {
      title: "외국인등록증(外国人登録証/ARC)の取得",
      summary: "入国後90日以内に必須",
      details:
        "最寄りの出入国管理事務所(출입국관리사무소)へ。パスポート、証明写真(3.5×4.5cm)、ビザ、住所証明書、₩30,000が必要です。発行まで2〜3週間かかります。",
    },
    {
      title: "銀行口座の開設",
      summary: "KB国民銀行またはIBK企業銀行がおすすめ",
      details:
        "ARC、パスポート、韓国の電話番号が必要です。すべての支店で外国人対応できるわけではないため、大きな支店へ。30〜60分かかります。",
    },
    {
      title: "携帯プランの契約",
      summary: "格安SIM(알뜰폰)は月₩9,900〜",
      details:
        "主要キャリア: SKT、KT、LG U+。格安SIM(알뜰폰)は半額以下。ARC + パスポートが必要です。空港でも前払いSIMを購入できます。",
    },
    {
      title: "国民健康保険(NHIS)への加入",
      summary: "入国後6ヶ月以内に加入義務",
      details:
        "正社員の場合は雇用主が自動加入手続きをしてくれます。それ以外は国民健康保険公団(국민건강보험공단)の支部へ。ARC + 銀行口座情報を持参してください。月額₩50,000〜150,000。",
    },
    {
      title: "T-money交通カードの購入",
      summary: "コンビニで₩3,000で購入可能",
      details:
        "GS25、CU、7-Elevenなどのコンビニで購入できます。地下鉄やバス、一部タクシーで使用可能。個別チケットより格安です。",
    },
    {
      title: "KakaoTalkの設定",
      summary: "韓国の主要メッセージアプリ",
      details:
        "韓国の電話番号で登録します。家主、同僚、新しい友人みんながKakaoTalkで連絡してきます。KakaoPay(決済)や地図機能も便利です。",
    },
    {
      title: "住所登録(전입신고)",
      summary: "주민센터にARCと賃貸契約書を持参",
      details:
        "ARC + 賃貸契約書を持って住民センター(주민센터)へ。一部の銀行手続きや公式郵便の受け取りに必要です。",
    },
    {
      title: "必須アプリのダウンロード",
      summary: "Naver Map、Papago、Baemin、Coupang",
      details:
        "Naver Mapは韓国でGoogleマップより精度が高い。Papagoは韓国語翻訳に最適。Baeminで料理デリバリー、Coupangで翌日配送ショッピング。",
    },
  ],
  "zh-CN": [
    {
      title: "办理外国人登录证(ARC/외국인등록증)",
      summary: "入境后90天内必须办理",
      details:
        "前往当地出入境管理事务所(출입국관리사무소)。需携带：护照、证件照(3.5×4.5cm)、签证、住址证明、₩30,000手续费。办理需2〜3周。",
    },
    {
      title: "开设银行账户",
      summary: "推荐KB国民银行或IBK企业银行",
      details:
        "需携带ARC、护照和韩国手机号码。前往主要分行，因为并非所有支行都能为外国人办理业务。约需30〜60分钟。",
    },
    {
      title: "办理手机套餐",
      summary: "低价虚拟运营商(알뜰폰)月费从₩9,900起",
      details:
        "主要运营商：SKT、KT、LG U+。低价虚拟运营商(알뜰폰)价格减半。需要ARC + 护照。在机场也可购买预付SIM卡。",
    },
    {
      title: "加入国民健康保险(NHIS)",
      summary: "入境后6个月内强制加入",
      details:
        "全职员工的雇主会自动办理加入手续。其他情况请前往当地国民健康保险公团(국민건강보험공단)。携带ARC + 银行账户信息。月保费₩50,000〜150,000。",
    },
    {
      title: "购买T-money交通卡",
      summary: "在任意便利店以₩3,000购买",
      details:
        "在GS25、CU、7-Eleven等便利店购买。可在便利店或地铁机器充值。适用于地铁、公交及部分出租车。比购买单程票划算得多。",
    },
    {
      title: "安装KakaoTalk",
      summary: "韩国主要聊天应用，人人都在用",
      details:
        "用韩国手机号注册KakaoTalk。房东、同事和新朋友都会通过KakaoTalk联系您。KakaoPay付款和地图功能也很好用。",
    },
    {
      title: "登记地址(전입신고)",
      summary: "携带ARC和租约前往当地주민센터",
      details:
        "携带ARC + 租赁合同前往社区中心(주민센터)。部分银行服务和正式邮件收取需要此登记。",
    },
    {
      title: "下载必备应用",
      summary: "Naver Map、Papago、Baemin、Coupang",
      details:
        "Naver Map在韩国比谷歌地图更准确。Papago专为韩语翻译优化。Baemin点餐外卖，Coupang次日达购物。",
    },
  ],
  "zh-TW": [
    {
      title: "辦理外國人登錄證(ARC/외국인등록증)",
      summary: "入境後90天內必須辦理",
      details:
        "前往當地出入境管理事務所(출입국관리사무소)。需攜帶：護照、證件照(3.5×4.5cm)、簽證、住址證明、₩30,000手續費。辦理需2〜3週。",
    },
    {
      title: "開設銀行帳戶",
      summary: "推薦KB國民銀行或IBK企業銀行",
      details:
        "需攜帶ARC、護照和韓國手機號碼。前往主要分行，因為並非所有分行都能為外國人辦理業務。約需30〜60分鐘。",
    },
    {
      title: "辦理手機方案",
      summary: "低價虛擬電信業者(알뜰폰)月費從₩9,900起",
      details:
        "主要電信業者：SKT、KT、LG U+。低價虛擬業者(알뜰폰)費用減半。需要ARC + 護照。在機場也可購買預付SIM卡。",
    },
    {
      title: "加入國民健康保險(NHIS)",
      summary: "入境後6個月內強制加入",
      details:
        "全職員工的雇主會自動辦理加入手續。其他情況請前往當地國民健康保險公團(국민건강보험공단)。攜帶ARC + 銀行帳戶資訊。月保費₩50,000〜150,000。",
    },
    {
      title: "購買T-money交通卡",
      summary: "在任意便利商店以₩3,000購買",
      details:
        "在GS25、CU、7-Eleven等便利商店購買。可在便利商店或捷運機器儲值。適用於捷運、公車及部分計程車。比購買單程票划算得多。",
    },
    {
      title: "安裝KakaoTalk",
      summary: "韓國主要聊天應用，人人都在用",
      details:
        "用韓國手機號碼註冊KakaoTalk。房東、同事和新朋友都會透過KakaoTalk聯絡您。KakaoPay付款和地圖功能也很好用。",
    },
    {
      title: "登記地址(전입신고)",
      summary: "攜帶ARC和租約前往當地주민센터",
      details:
        "攜帶ARC + 租賃合約前往社區中心(주민센터)。部分銀行服務和正式郵件收取需要此登記。",
    },
    {
      title: "下載必備應用程式",
      summary: "Naver Map、Papago、Baemin、Coupang",
      details:
        "Naver Map在韓國比Google地圖更準確。Papago專為韓語翻譯最佳化。Baemin點餐外送，Coupang次日達購物。",
    },
  ],
  pt: [
    {
      title: "Obter o Cartão de Registro de Estrangeiro (ARC / 외국인등록증)",
      summary: "Obrigatório em até 90 dias da chegada",
      details:
        "Vá ao Escritório de Imigração local (출입국관리사무소). Leve: passaporte, foto tamanho passaporte (3,5×4,5cm), visto, comprovante de endereço e taxa de ₩30.000. O processamento leva 2–3 semanas.",
    },
    {
      title: "Abrir uma conta bancária",
      summary: "KB Kookmin ou IBK são os mais amigáveis para estrangeiros",
      details:
        "Leve seu cartão ARC, passaporte e número de celular coreano. Vá a uma agência principal — nem todas atendem estrangeiros. Leva 30–60 minutos.",
    },
    {
      title: "Contratar um plano de celular",
      summary: "MVNOs econômicos a partir de ₩9.900/mês",
      details:
        "Três operadoras principais: SKT, KT, LG U+. MVNOs econômicos (알뜰폰) como Hello Mobile custam a metade. Você precisa de ARC + passaporte. SIMs pré-pagos disponíveis nos aeroportos.",
    },
    {
      title: "Registrar no Seguro Nacional de Saúde (NHIS)",
      summary: "Obrigatório em até 6 meses da chegada",
      details:
        "Se empregado, o empregador registra automaticamente. Caso contrário, visite um escritório do NHIS (국민건강보험공단). Leve ARC + informações da conta bancária. Mensalidade: ₩50.000–150.000.",
    },
    {
      title: "Comprar um cartão de transporte T-money",
      summary: "Compre em qualquer conveniência por ₩3.000",
      details:
        "Disponível em GS25, CU, 7-Eleven por ₩3.000. Carregue em conveniências ou máquinas do metrô. Funciona no metrô, ônibus e alguns táxis.",
    },
    {
      title: "Configurar o KakaoTalk",
      summary: "O principal app de mensagens da Coreia — todo mundo usa",
      details:
        "Baixe o KakaoTalk e registre com seu número de celular coreano. Seu senhorio, colegas e novos amigos vão te contatar aqui. Também útil para pagamentos (KakaoPay) e mapas.",
    },
    {
      title: "Registrar seu endereço (전입신고)",
      summary: "Visite o 주민센터 local com seu ARC e contrato",
      details:
        "Leve ARC e seu contrato de aluguel (전세/월세 계약서) ao centro comunitário do bairro (주민센터). Necessário para alguns serviços bancários e governamentais.",
    },
    {
      title: "Baixar os apps essenciais",
      summary: "Naver Map, Papago, Baemin, Coupang",
      details:
        "Naver Map é mais preciso que o Google Maps na Coreia. Papago para tradução. Baemin para delivery. Coupang para compras com entrega no dia seguinte.",
    },
  ],
  es: [
    {
      title: "Obtener la Tarjeta de Registro de Extranjero (ARC / 외국인등록증)",
      summary: "Obligatorio en los primeros 90 días de llegada",
      details:
        "Ve a la Oficina de Inmigración local (출입국관리사무소). Lleva: pasaporte, foto tamaño carnet (3,5×4,5cm), visa, comprobante de domicilio y ₩30.000 de tasa. El trámite tarda 2–3 semanas.",
    },
    {
      title: "Abrir una cuenta bancaria",
      summary: "KB Kookmin o IBK son los más amigables para extranjeros",
      details:
        "Lleva tu tarjeta ARC, pasaporte y número de celular coreano. Ve a una sucursal principal — no todas atienden a extranjeros. Tarda 30–60 minutos.",
    },
    {
      title: "Contratar un plan de celular",
      summary: "Los MVNOs económicos empiezan en ₩9.900/mes",
      details:
        "Tres operadoras principales: SKT, KT, LG U+. MVNOs económicos (알뜰폰) como Hello Mobile cuestan la mitad. Necesitas ARC + pasaporte. SIMs prepago disponibles en aeropuertos.",
    },
    {
      title: "Registrarse en el Seguro Nacional de Salud (NHIS)",
      summary: "Obligatorio en los primeros 6 meses de llegada",
      details:
        "Si estás empleado, el empleador te registra automáticamente. Si no, visita una oficina del NHIS (국민건강보험공단). Lleva ARC + información de tu cuenta bancaria. Cuota mensual: ₩50.000–150.000.",
    },
    {
      title: "Comprar una tarjeta de transporte T-money",
      summary: "Cómprala en cualquier tienda de conveniencia por ₩3.000",
      details:
        "Disponible en GS25, CU, 7-Eleven por ₩3.000. Recarga en tiendas de conveniencia o máquinas del metro. Funciona en metro, autobús y algunos taxis.",
    },
    {
      title: "Configurar KakaoTalk",
      summary: "La app de mensajería principal de Corea — todo el mundo la usa",
      details:
        "Descarga KakaoTalk y regístrate con tu número de celular coreano. Tu arrendador, compañeros de trabajo y nuevos amigos te contactarán aquí. También útil para pagos (KakaoPay) y mapas.",
    },
    {
      title: "Registrar tu dirección (전입신고)",
      summary: "Visita tu 주민센터 local con el ARC y el contrato",
      details:
        "Lleva ARC y tu contrato de arrendamiento (전세/월세 계약서) al centro comunitario del barrio (주민센터). Necesario para algunos servicios bancarios y gubernamentales.",
    },
    {
      title: "Descargar las apps esenciales",
      summary: "Naver Map, Papago, Baemin, Coupang",
      details:
        "Naver Map es más preciso que Google Maps en Corea. Papago para traducción. Baemin para delivery. Coupang para compras con entrega al día siguiente.",
    },
  ],
};

const SECTION_STRINGS: Record<Locale, { label: string; heading: string; progress: (done: number, total: number) => string }> = {
  en: { label: "First Week", heading: "Your first week checklist", progress: (d, t) => `${d} of ${t} complete` },
  ko: { label: "첫째 주", heading: "첫째 주 체크리스트", progress: (d, t) => `${t}개 중 ${d}개 완료` },
  ja: { label: "最初の1週間", heading: "最初の1週間チェックリスト", progress: (d, t) => `${t}個中${d}個完了` },
  "zh-CN": { label: "第一周", heading: "第一周清单", progress: (d, t) => `共${t}项，已完成${d}项` },
  "zh-TW": { label: "第一週", heading: "第一週清單", progress: (d, t) => `共${t}項，已完成${d}項` },
  pt: { label: "Primeira semana", heading: "Sua lista da primeira semana", progress: (d, t) => `${d} de ${t} concluídos` },
  es: { label: "Primera semana", heading: "Tu lista de la primera semana", progress: (d, t) => `${d} de ${t} completados` },
};

export default function FirstWeekChecklist() {
  const { locale } = useLocale();
  const items = ITEMS[locale] ?? ITEMS.en;
  const sec = SECTION_STRINGS[locale] ?? SECTION_STRINGS.en;
  const [checked, setChecked] = useState<boolean[]>(new Array(8).fill(false));
  const [expanded, setExpanded] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem("knd-checklist");
      if (saved) setChecked(JSON.parse(saved));
    });
    return () => cancelAnimationFrame(frame);
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
          {sec.label}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {sec.heading}
        </h2>

        {/* Progress bar */}
        <div className="mb-8 mt-4">
          <div className="mb-1 flex items-center justify-between text-sm text-zinc-500">
            <span>{sec.progress(completedCount, items.length)}</span>
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
