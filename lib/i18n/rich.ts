import type { Locale } from "./types";
import type { ReactNode } from "react";

// Per-locale override for FAQ item index 3 ("How do I find out about upcoming events?")
// Returns null for items with no special treatment (falls back to dictionary string)
const faqEventAnswers: Record<Locale, string> = {
  en: "Follow us on Instagram @koreansnextdoor or join our KakaoTalk open chat. We always post event details there first.",
  ko: "인스타그램 @koreansnextdoor을 팔로우하거나 카카오톡 오픈채팅에 참여하세요. 이벤트 정보는 항상 거기서 먼저 공개됩니다.",
  ja: "Instagram @koreansnextdoor をフォローするか、KakaoTalkのオープンチャットに参加してください。イベント情報は常にそちらで先行公開しています。",
  "zh-CN": "关注我们的Instagram @koreansnextdoor 或加入KakaoTalk群聊。活动信息总是在那里率先发布。",
  "zh-TW": "追蹤我們的Instagram @koreansnextdoor 或加入KakaoTalk群聊。活動資訊總是在那裡率先發布。",
  pt: "Siga-nos no Instagram @koreansnextdoor ou entre no nosso grupo do KakaoTalk. Sempre postamos os detalhes dos eventos lá primeiro.",
  es: "Síguenos en Instagram @koreansnextdoor o únete a nuestro grupo de KakaoTalk. Siempre publicamos los detalles de los eventos allí primero.",
};

export function getJsxFaqAnswers(locale: Locale): (ReactNode | null)[] {
  // 6 FAQ items; only index 3 gets a special answer
  return [null, null, null, faqEventAnswers[locale] ?? faqEventAnswers.en, null, null];
}

export interface TestimonialQuote {
  quote: string;
  name: string;
  detail: string;
  photo: string;
}

const testimonials: Record<Locale, TestimonialQuote[]> = {
  en: [
    {
      quote:
        "I'd been in Seoul for two months and hadn't made a single friend outside of work. KND changed that in one evening.",
      name: "Sarah M.",
      detail: "Canadian, teaching English in Mapo-gu",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "I was nervous to come alone, but the language exchange nights are so relaxed. My Korean has improved — but more importantly, I finally have people to explore the city with.",
      name: "James T.",
      detail: "British, studying at Yonsei University",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "It's rare to find a community that's genuinely warm and not just networking. KND feels like home.",
      name: "Aisha K.",
      detail: "Nigerian-American, working at a Seoul startup",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  ko: [
    {
      quote:
        "처음에는 외국인 행사가 어색할 것 같았는데, 오히려 새로운 관점을 가진 친구들을 많이 사귀게 됐어요. 저도 언어 교환으로 영어 실력이 늘었고요.",
      name: "김민준",
      detail: "서울 거주, 스타트업 근무",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "KND 덕분에 외국인 친구들과 진짜 우정을 나눌 수 있었어요. 단순한 이벤트가 아니라 진심 어린 커뮤니티예요.",
      name: "이서연",
      detail: "서울 거주, 대학원생",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "첫 번째 언어 교환에서 지금의 친한 친구를 만났어요. 외국 생활이 얼마나 힘든지 직접 들으면서 공감 능력도 높아졌죠.",
      name: "박지후",
      detail: "마포 거주, 디자이너",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  ja: [
    {
      quote:
        "ソウルに来て3ヶ月、仕事以外に友達ができなかったんですが、KNDのイベントで一晩で変わりました。今では毎月通っています。",
      name: "田中 美咲",
      detail: "日本人、ソウルのIT企業勤務",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "言語交換は思ったよりずっとリラックスした雰囲気で、初心者でも全然大丈夫。韓国語の練習もできて、友達も増えて最高です。",
      name: "山本 健太",
      detail: "日本人、延世大学留学中",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "本当に温かいコミュニティで、ただ仲間として受け入れてくれる。ソウルが第二の故郷になりました。",
      name: "佐藤 さくら",
      detail: "日本人、フリーランスライター",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  "zh-CN": [
    {
      quote:
        "在首尔待了两个月，工作以外一个朋友都没有。参加了KND的一次活动，一晚上就认识了好几个靠谱的朋友。",
      name: "张小雨",
      detail: "中国人，首尔互联网公司工作",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "语言交换之夜完全没有压力，就算韩语很烂也没关系。在这里我找到了一起探索这座城市的伙伴。",
      name: "李明轩",
      detail: "中国人，延世大学留学生",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "很少见到这么真诚的社区，没有任何目的，就是真心接纳你。现在首尔对我来说真的像第二个家了。",
      name: "陈晓彤",
      detail: "中国人，首尔创业公司设计师",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  "zh-TW": [
    {
      quote:
        "在首爾待了兩個月，工作以外一個朋友都沒有。參加了KND的一次活動，一晚上就認識了好幾個靠譜的朋友。",
      name: "張小雨",
      detail: "台灣人，首爾科技公司工作",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "語言交換之夜完全沒有壓力，就算韓語很爛也沒關係。在這裡我找到了一起探索這座城市的夥伴。",
      name: "李明軒",
      detail: "台灣人，延世大學交換生",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "很少見到這麼真誠的社群，沒有任何目的，就是真心接納你。現在首爾對我來說真的像第二個家了。",
      name: "陳曉彤",
      detail: "台灣人，首爾新創公司設計師",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  pt: [
    {
      quote:
        "Fiquei dois meses em Seul sem fazer amigos fora do trabalho. O KND mudou isso em uma noite. Agora tenho pessoas para explorar a cidade junto.",
      name: "Gabriela S.",
      detail: "Brasileira, trabalhando em Gangnam",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "As noites de intercâmbio são muito relaxadas. Meu coreano melhorou — mas mais importante, finalmente tenho amigos de verdade em Seul.",
      name: "Rafael M.",
      detail: "Brasileiro, estudante na Universidade de Yonsei",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "É raro encontrar uma comunidade genuinamente acolhedora. O KND não é networking — é como ter uma família em Seul.",
      name: "Mariana C.",
      detail: "Portuguesa, professora de inglês",
      photo: "/images/testimonial-3.jpg",
    },
  ],
  es: [
    {
      quote:
        "Llevaba dos meses en Seúl sin hacer amigos fuera del trabajo. El KND cambió eso en una sola noche. Ahora tengo personas con quienes explorar la ciudad.",
      name: "Valentina R.",
      detail: "Colombiana, trabajando en Gangnam",
      photo: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "Las noches de intercambio son muy relajadas. Mi coreano ha mejorado — pero lo más importante, por fin tengo amigos de verdad en Seúl.",
      name: "Marcos A.",
      detail: "Argentino, estudiante en Yonsei",
      photo: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "Es raro encontrar una comunidad genuinamente acogedora. KND no es networking — es como tener una familia en Seúl.",
      name: "Sofía L.",
      detail: "Española, diseñadora freelance",
      photo: "/images/testimonial-3.jpg",
    },
  ],
};

export function getTestimonialQuotes(locale: Locale): TestimonialQuote[] {
  return testimonials[locale] ?? testimonials.en;
}
