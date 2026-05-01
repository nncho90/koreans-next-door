"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { Copy, MagnifyingGlass } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

type AddressResult = {
  englishAddress: string;
  koreanAddress: string;
  lotAddress: string;
  postalCode: string;
};

type AddressStrings = {
  sectionLabel: string;
  heading: string;
  sub: string;
  tipTitle: string;
  tipBody: string;
  orderKo: string;
  orderEn: string;
  koreanLabel: string;
  englishLabel: string;
  postal: string;
  city: string;
  district: string;
  road: string;
  number: string;
  country: string;
  converterTitle: string;
  converterBody: string;
  inputLabel: string;
  placeholder: string;
  search: string;
  searching: string;
  sample: string;
  setup: string;
  noResults: string;
  source: string;
  copy: string;
  copied: string;
};

const STRINGS: Record<Locale, AddressStrings> = {
  en: {
    sectionLabel: "Korean addresses",
    heading: "That little (우) means postal code",
    sub: "Korean addresses start big and get smaller. English addresses usually flip the order.",
    tipTitle: "Use this pattern when forms ask for an English address",
    tipBody: "Keep the postal code, move the building number before the road name, then add district, city, and country.",
    orderKo: "Korean order",
    orderEn: "English order",
    koreanLabel: "Sigwang Church example",
    englishLabel: "English mailing format",
    postal: "postal code",
    city: "city",
    district: "district",
    road: "road name",
    number: "building no.",
    country: "country",
    converterTitle: "Korean to English address converter",
    converterBody: "This uses Korea's official Road Name Address English API when a Juso approval key is configured on the server.",
    inputLabel: "Korean address",
    placeholder: "서울 서대문구 독립문로 56",
    search: "Search",
    searching: "Searching",
    sample: "Try the sample address",
    setup: "Live lookup needs JUSO_CONFM_KEY on the server. The color-coded example still shows the format.",
    noResults: "No matching address found. Try a road-name address with city or district.",
    source: "Source: Korea Road Name Address English API",
    copy: "Copy",
    copied: "Copied",
  },
  ko: {
    sectionLabel: "한국 주소",
    heading: "주소 앞의 (우)는 우편번호 표시예요",
    sub: "한국 주소는 큰 지역에서 작은 정보로 내려갑니다. 영어 주소는 보통 순서가 반대로 바뀌어요.",
    tipTitle: "영문 주소 입력란에는 이렇게 바꾸면 됩니다",
    tipBody: "우편번호는 그대로 두고, 건물번호를 도로명 앞으로 옮긴 뒤 구, 시, 국가 순서로 적으세요.",
    orderKo: "한국어 순서",
    orderEn: "영어 순서",
    koreanLabel: "시광교회 예시",
    englishLabel: "영문 우편 형식",
    postal: "우편번호",
    city: "시",
    district: "구",
    road: "도로명",
    number: "건물번호",
    country: "국가",
    converterTitle: "한국어 주소 영문 변환기",
    converterBody: "서버에 Juso 승인키가 설정되어 있으면 공식 도로명주소 영문 API로 조회합니다.",
    inputLabel: "한국어 주소",
    placeholder: "서울 서대문구 독립문로 56",
    search: "검색",
    searching: "검색 중",
    sample: "예시 주소 넣기",
    setup: "실시간 조회에는 서버의 JUSO_CONFM_KEY가 필요합니다. 색상 예시는 그대로 참고할 수 있어요.",
    noResults: "일치하는 주소가 없어요. 시/구를 포함한 도로명주소로 다시 검색해 보세요.",
    source: "출처: 도로명주소 영문 API",
    copy: "복사",
    copied: "복사됨",
  },
  ja: {
    sectionLabel: "韓国の住所",
    heading: "住所の前の（우）は郵便番号の印",
    sub: "韓国語の住所は大きい地域から小さい情報へ進みます。英語住所は多くの場合、順番を逆にします。",
    tipTitle: "英語住所フォームではこの形にします",
    tipBody: "郵便番号は残し、建物番号を道路名の前へ移動して、区、市、国を続けます。",
    orderKo: "韓国語の順番",
    orderEn: "英語の順番",
    koreanLabel: "シグァン教会の例",
    englishLabel: "英語の郵送形式",
    postal: "郵便番号",
    city: "市",
    district: "区",
    road: "道路名",
    number: "建物番号",
    country: "国",
    converterTitle: "韓国語住所の英語変換",
    converterBody: "サーバーにJuso承認キーが設定されている場合、公式の道路名住所英語APIで検索します。",
    inputLabel: "韓国語住所",
    placeholder: "서울 서대문구 독립문로 56",
    search: "検索",
    searching: "検索中",
    sample: "例の住所を使う",
    setup: "ライブ検索にはサーバーのJUSO_CONFM_KEYが必要です。色分け例はそのまま参考にできます。",
    noResults: "一致する住所がありません。市区を含む道路名住所で試してください。",
    source: "出典: 韓国道路名住所英語API",
    copy: "コピー",
    copied: "コピー済み",
  },
  "zh-CN": {
    sectionLabel: "韩国地址",
    heading: "地址前的（우）表示邮政编码",
    sub: "韩文地址从大区域写到小细节。英文地址通常会把顺序反过来。",
    tipTitle: "填写英文地址表单时可以这样转换",
    tipBody: "保留邮编，把建筑号码放到道路名之前，然后写区、市、国家。",
    orderKo: "韩文顺序",
    orderEn: "英文顺序",
    koreanLabel: "Sigwang Church 示例",
    englishLabel: "英文邮寄格式",
    postal: "邮编",
    city: "城市",
    district: "区",
    road: "道路名",
    number: "建筑号",
    country: "国家",
    converterTitle: "韩文地址转英文",
    converterBody: "服务器配置 Juso 授权密钥后，会使用韩国官方道路名地址英文 API 查询。",
    inputLabel: "韩文地址",
    placeholder: "서울 서대문구 독립문로 56",
    search: "搜索",
    searching: "搜索中",
    sample: "使用示例地址",
    setup: "实时查询需要服务器上的 JUSO_CONFM_KEY。上方彩色示例仍可用于理解格式。",
    noResults: "没有找到匹配地址。请尝试包含市或区的道路名地址。",
    source: "来源：韩国道路名地址英文 API",
    copy: "复制",
    copied: "已复制",
  },
  "zh-TW": {
    sectionLabel: "韓國地址",
    heading: "地址前的（우）表示郵遞區號",
    sub: "韓文地址從大區域寫到小細節。英文地址通常會把順序反過來。",
    tipTitle: "填英文地址表單時可以這樣轉換",
    tipBody: "保留郵遞區號，把建物號碼放到道路名前面，接著寫區、市、國家。",
    orderKo: "韓文順序",
    orderEn: "英文順序",
    koreanLabel: "Sigwang Church 範例",
    englishLabel: "英文郵寄格式",
    postal: "郵遞區號",
    city: "城市",
    district: "區",
    road: "道路名",
    number: "建物號碼",
    country: "國家",
    converterTitle: "韓文地址轉英文",
    converterBody: "伺服器設定 Juso 授權金鑰後，會使用韓國官方道路名地址英文 API 查詢。",
    inputLabel: "韓文地址",
    placeholder: "서울 서대문구 독립문로 56",
    search: "搜尋",
    searching: "搜尋中",
    sample: "使用範例地址",
    setup: "即時查詢需要伺服器上的 JUSO_CONFM_KEY。上方色彩範例仍可用來理解格式。",
    noResults: "找不到符合的地址。請嘗試包含市或區的道路名地址。",
    source: "來源：韓國道路名地址英文 API",
    copy: "複製",
    copied: "已複製",
  },
  pt: {
    sectionLabel: "Endereços coreanos",
    heading: "O pequeno (우) indica o código postal",
    sub: "Endereços coreanos começam pela área maior e ficam mais específicos. Em inglês, a ordem geralmente muda.",
    tipTitle: "Use este padrão em formulários que pedem endereço em inglês",
    tipBody: "Mantenha o código postal, coloque o número do prédio antes da rua e depois adicione distrito, cidade e país.",
    orderKo: "Ordem em coreano",
    orderEn: "Ordem em inglês",
    koreanLabel: "Exemplo da Sigwang Church",
    englishLabel: "Formato postal em inglês",
    postal: "código postal",
    city: "cidade",
    district: "distrito",
    road: "nome da rua",
    number: "nº do prédio",
    country: "país",
    converterTitle: "Conversor de endereço coreano para inglês",
    converterBody: "Quando uma chave Juso estiver configurada no servidor, isto usa a API oficial coreana de endereços em inglês.",
    inputLabel: "Endereço em coreano",
    placeholder: "서울 서대문구 독립문로 56",
    search: "Buscar",
    searching: "Buscando",
    sample: "Usar endereço de exemplo",
    setup: "A busca ao vivo precisa de JUSO_CONFM_KEY no servidor. O exemplo colorido ainda mostra o formato.",
    noResults: "Nenhum endereço encontrado. Tente um endereço de rua com cidade ou distrito.",
    source: "Fonte: API coreana de endereço em inglês",
    copy: "Copiar",
    copied: "Copiado",
  },
  es: {
    sectionLabel: "Direcciones coreanas",
    heading: "El pequeño (우) indica el código postal",
    sub: "Las direcciones coreanas van de lo más grande a lo más específico. En inglés, normalmente se invierte el orden.",
    tipTitle: "Usa este patrón cuando un formulario pida la dirección en inglés",
    tipBody: "Conserva el código postal, mueve el número del edificio antes del nombre de la calle y luego agrega distrito, ciudad y país.",
    orderKo: "Orden en coreano",
    orderEn: "Orden en inglés",
    koreanLabel: "Ejemplo de Sigwang Church",
    englishLabel: "Formato postal en inglés",
    postal: "código postal",
    city: "ciudad",
    district: "distrito",
    road: "nombre de calle",
    number: "nº de edificio",
    country: "país",
    converterTitle: "Convertidor de dirección coreana a inglés",
    converterBody: "Cuando el servidor tenga una clave Juso configurada, usa la API oficial coreana de direcciones en inglés.",
    inputLabel: "Dirección coreana",
    placeholder: "서울 서대문구 독립문로 56",
    search: "Buscar",
    searching: "Buscando",
    sample: "Usar dirección de ejemplo",
    setup: "La búsqueda en vivo necesita JUSO_CONFM_KEY en el servidor. El ejemplo con colores sigue mostrando el formato.",
    noResults: "No se encontró una dirección. Prueba con una dirección vial que incluya ciudad o distrito.",
    source: "Fuente: API coreana de direcciones en inglés",
    copy: "Copiar",
    copied: "Copiado",
  },
};

const SAMPLE_KOREAN_ADDRESS = "서울시 서대문구 독립문로 56";
const SAMPLE_ENGLISH_ADDRESS =
  "56, Dongnimmun-ro, Seodaemun-gu, Seoul 03745, Republic of Korea";

const COLORS = {
  postal: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  city: "bg-sky-100 text-sky-800 ring-sky-200",
  district: "bg-violet-100 text-violet-800 ring-violet-200",
  road: "bg-amber-100 text-amber-900 ring-amber-200",
  number: "bg-rose-100 text-rose-800 ring-rose-200",
  country: "bg-zinc-200 text-zinc-800 ring-zinc-300",
};

function Chip({
  children,
  color,
  label,
}: {
  children: ReactNode;
  color: keyof typeof COLORS;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline rounded-md px-2 py-1 text-sm font-semibold ring-1 ${COLORS[color]}`}
    >
      <span>{children}</span>
      <span className="ml-1 text-[10px] font-medium uppercase opacity-70">
        {label}
      </span>
    </span>
  );
}

export default function KoreanAddressGuide() {
  const { locale } = useLocale();
  const s = STRINGS[locale] ?? STRINGS.en;
  const [query, setQuery] = useState(SAMPLE_KOREAN_ADDRESS);
  const [results, setResults] = useState<AddressResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");
    setResults([]);

    try {
      const res = await fetch(`/api/address/english?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.setup ?? data?.error ?? s.noResults);
        return;
      }

      setResults(Array.isArray(data.items) ? data.items : []);
      setStatus("idle");
      setMessage(data.items?.length ? "" : s.noResults);
    } catch {
      setStatus("error");
      setMessage(s.noResults);
    }
  }

  async function copyAddress(address: string) {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(address);
    setCopied(address);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return (
    <section id="address" className="bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {s.sectionLabel}
        </p>
        <h2 className="mb-3 text-3xl font-bold text-zinc-950 md:text-4xl">
          {s.heading}
        </h2>
        <p className="mb-10 max-w-2xl text-zinc-500">{s.sub}</p>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5 md:p-6"
          >
            <div className="mb-5 flex flex-col gap-2 border-b border-zinc-200 pb-5">
              <h3 className="text-lg font-bold text-zinc-950">{s.tipTitle}</h3>
              <p className="text-sm leading-6 text-zinc-500">{s.tipBody}</p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {s.koreanLabel} · {s.orderKo}
                </p>
                <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 text-zinc-950">
                  <Chip color="postal" label={s.postal}>
                    (우)03745
                  </Chip>
                  <Chip color="city" label={s.city}>
                    서울시
                  </Chip>
                  <Chip color="district" label={s.district}>
                    서대문구
                  </Chip>
                  <Chip color="road" label={s.road}>
                    독립문로
                  </Chip>
                  <Chip color="number" label={s.number}>
                    56
                  </Chip>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {s.englishLabel} · {s.orderEn}
                </p>
                <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 text-zinc-950">
                  <Chip color="number" label={s.number}>
                    56
                  </Chip>
                  <Chip color="road" label={s.road}>
                    Dongnimmun-ro
                  </Chip>
                  <Chip color="district" label={s.district}>
                    Seodaemun-gu
                  </Chip>
                  <Chip color="city" label={s.city}>
                    Seoul
                  </Chip>
                  <Chip color="postal" label={s.postal}>
                    03745
                  </Chip>
                  <Chip color="country" label={s.country}>
                    Republic of Korea
                  </Chip>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6"
          >
            <h3 className="text-lg font-bold text-zinc-950">
              {s.converterTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {s.converterBody}
            </p>

            <form className="mt-5 space-y-3" onSubmit={submitSearch}>
              <label
                htmlFor="korean-address-search"
                className="block text-xs font-semibold uppercase tracking-widest text-zinc-400"
              >
                {s.inputLabel}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="korean-address-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={s.placeholder}
                  className="min-h-11 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-wait disabled:bg-zinc-400"
                >
                  <MagnifyingGlass size={16} weight="bold" aria-hidden />
                  {status === "loading" ? s.searching : s.search}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setQuery(SAMPLE_KOREAN_ADDRESS)}
                className="text-sm font-medium text-zinc-500 underline-offset-4 hover:text-zinc-950 hover:underline"
              >
                {s.sample}
              </button>
            </form>

            <div className="mt-5 space-y-3" aria-live="polite">
              {message && (
                <p
                  className={`rounded-lg px-3 py-2 text-sm ${
                    status === "error"
                      ? "bg-amber-50 text-amber-900"
                      : "bg-zinc-50 text-zinc-500"
                  }`}
                >
                  {message}
                </p>
              )}

              {results.length === 0 && status === "idle" && !message && (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    {s.englishLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-zinc-950">
                    {SAMPLE_ENGLISH_ADDRESS}
                  </p>
                </div>
              )}

              {results.map((result) => (
                <div
                  key={`${result.englishAddress}-${result.postalCode}`}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                >
                  <p className="text-sm font-bold leading-6 text-zinc-950">
                    {result.englishAddress}
                    {result.postalCode ? ` ${result.postalCode}` : ""}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    {result.koreanAddress || result.lotAddress}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyAddress(
                        `${result.englishAddress}${
                          result.postalCode ? ` ${result.postalCode}` : ""
                        }`
                      )
                    }
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950"
                  >
                    <Copy size={14} weight="bold" aria-hidden />
                    {copied.startsWith(result.englishAddress)
                      ? s.copied
                      : s.copy}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-zinc-400">{s.source}</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
