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
      name: "Raychel",
      detail: "American, living in Seoul",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "I was nervous to come alone, but the language exchange nights are so relaxed. My Korean has improved — but more importantly, I finally have people to explore the city with.",
      name: "Sammi",
      detail: "Canadian, studying in Seoul",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "It's rare to find a community that's genuinely warm and not just networking. KND feels like home.",
      name: "Amy",
      detail: "British, working in Gangnam",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  ko: [
    {
      quote:
        "처음에는 외국인 행사가 어색할 것 같았는데, 오히려 새로운 관점을 가진 친구들을 많이 사귀게 됐어요. 언어 교환으로 영어 실력도 늘었고요.",
      name: "Raychel",
      detail: "미국인, 서울 거주",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "KND 덕분에 외국인 친구들과 진짜 우정을 나눌 수 있었어요. 단순한 이벤트가 아니라 진심 어린 커뮤니티예요.",
      name: "Sammi",
      detail: "캐나다인, 서울 유학 중",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "이런 따뜻한 커뮤니티는 정말 드물어요. 단순한 네트워킹이 아니라, 서울에서 진짜 가족 같은 느낌이에요.",
      name: "Amy",
      detail: "영국인, 강남 근무",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  ja: [
    {
      quote:
        "ソウルに来て2ヶ月、仕事以外に友達ができなかったんですが、KNDのイベントで一晩で変わりました。",
      name: "Raychel",
      detail: "アメリカ人、ソウル在住",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "言語交換は思ったよりずっとリラックスした雰囲気で、初心者でも全然大丈夫。韓国語の練習もできて、友達も増えました。",
      name: "Sammi",
      detail: "カナダ人、ソウル留学中",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "本当に温かいコミュニティで、ただ仲間として受け入れてくれる。ソウルが第二の故郷になりました。",
      name: "Amy",
      detail: "イギリス人、江南勤務",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  "zh-CN": [
    {
      quote:
        "在首尔待了两个月，工作以外一个朋友都没有。参加了KND的一次活动，一晚上就认识了好几个靠谱的朋友。",
      name: "Raychel",
      detail: "美国人，首尔定居",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "语言交换之夜完全没有压力，就算韩语很烂也没关系。在这里我找到了一起探索这座城市的伙伴。",
      name: "Sammi",
      detail: "加拿大人，首尔留学",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "很少见到这么真诚的社区，没有任何目的，就是真心接纳你。现在首尔对我来说真的像第二个家了。",
      name: "Amy",
      detail: "英国人，江南上班",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  "zh-TW": [
    {
      quote:
        "在首爾待了兩個月，工作以外一個朋友都沒有。參加了KND的一次活動，一晚上就認識了好幾個靠譜的朋友。",
      name: "Raychel",
      detail: "美國人，首爾定居",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "語言交換之夜完全沒有壓力，就算韓語很爛也沒關係。在這裡我找到了一起探索這座城市的夥伴。",
      name: "Sammi",
      detail: "加拿大人，首爾留學",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "很少見到這麼真誠的社群，沒有任何目的，就是真心接納你。現在首爾對我來說真的像第二個家了。",
      name: "Amy",
      detail: "英國人，江南上班",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  pt: [
    {
      quote:
        "Fiquei dois meses em Seul sem fazer amigos fora do trabalho. O KND mudou isso em uma noite.",
      name: "Raychel",
      detail: "Americana, morando em Seul",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "As noites de intercâmbio são muito relaxadas. Meu coreano melhorou — mas mais importante, finalmente tenho amigos de verdade em Seul.",
      name: "Sammi",
      detail: "Canadense, estudando em Seul",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "É raro encontrar uma comunidade genuinamente acolhedora. O KND não é networking — é como ter uma família em Seul.",
      name: "Amy",
      detail: "Britânica, trabalhando em Gangnam",
      photo: "/photos/testimonial-amy.png",
    },
  ],
  es: [
    {
      quote:
        "Llevaba dos meses en Seúl sin hacer amigos fuera del trabajo. El KND cambió eso en una sola noche.",
      name: "Raychel",
      detail: "Estadounidense, viviendo en Seúl",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote:
        "Las noches de intercambio son muy relajadas. Mi coreano ha mejorado — pero lo más importante, por fin tengo amigos de verdad en Seúl.",
      name: "Sammi",
      detail: "Canadiense, estudiando en Seúl",
      photo: "/photos/testimonial-sammi.png",
    },
    {
      quote:
        "Es raro encontrar una comunidad genuinamente acogedora. KND no es networking — es como tener una familia en Seúl.",
      name: "Amy",
      detail: "Británica, trabajando en Gangnam",
      photo: "/photos/testimonial-amy.png",
    },
  ],
};

export function getTestimonialQuotes(locale: Locale): TestimonialQuote[] {
  return testimonials[locale] ?? testimonials.en;
}
