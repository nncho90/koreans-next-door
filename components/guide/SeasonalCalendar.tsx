"use client";

import { useLocale } from "@/lib/i18n";

interface MonthData {
  en: string;
  ko: string;
  emoji: string;
  weather: { en: string; ko: string };
  tip: { en: string; ko: string };
  holiday?: { en: string; ko: string };
  warning?: { en: string; ko: string };
}

const months: MonthData[] = [
  {
    en: "January",
    ko: "1월",
    emoji: "❄️",
    weather: {
      en: "-10°C to 2°C. The coldest month.",
      ko: "영하 10도~2도. 가장 추운 달이에요.",
    },
    tip: {
      en: "Layer up with wool base layers under a padded coat. Buses and subways are heated, so dress in easy-to-remove layers.",
      ko: "울 소재 내복 위에 패딩 코트를 입으세요. 대중교통은 따뜻하니 벗기 쉬운 레이어링을 추천해요.",
    },
    holiday: {
      en: "설날 (Lunar New Year) — often in Jan or Feb. Most businesses close for 3+ days.",
      ko: "설날이 1월이나 2월에 오면 많은 가게가 3일 이상 문을 닫아요.",
    },
  },
  {
    en: "February",
    ko: "2월",
    emoji: "🧧",
    weather: {
      en: "-5°C to 8°C. Cold but warming.",
      ko: "영하 5도~8도. 아직 춥지만 조금씩 풀려요.",
    },
    tip: {
      en: "Lunar New Year (설날) often falls in February. Plan ahead — shops and restaurants close for several days.",
      ko: "설날이 2월에 자주 와요. 미리 장을 봐두세요 — 가게들이 며칠간 문을 닫아요.",
    },
    holiday: {
      en: "설날 — 2-4 day national holiday.",
      ko: "설날 연휴 — 2~4일간 문을 닫는 가게가 많아요.",
    },
  },
  {
    en: "March",
    ko: "3월",
    emoji: "🌬️",
    weather: {
      en: "5°C to 15°C. Spring begins, but Yellow Dust arrives.",
      ko: "5도~15도. 봄이 시작되지만 황사도 시작돼요.",
    },
    tip: {
      en: "Yellow Dust (황사) from China starts blowing in. Stock up on KF94 masks and check air quality apps before outdoor plans.",
      ko: "중국발 황사가 시작돼요. KF94 마스크를 미리 사두고, 나가기 전에 공기질 앱을 확인하세요.",
    },
    warning: {
      en: "황사 (Yellow Dust) season begins. KF94 masks essential.",
      ko: "황사 시즌 시작. KF94 마스크 필수예요.",
    },
  },
  {
    en: "April",
    ko: "4월",
    emoji: "🌸",
    weather: {
      en: "10°C to 20°C. Cherry blossoms. Best spring weather.",
      ko: "10도~20도. 벚꽃이 피는 봄의 절정이에요.",
    },
    tip: {
      en: "Cherry blossom season — usually 1-2 weeks in early April. Go to Yeouido or Gyeongbokgung. It goes fast.",
      ko: "벚꽃 시즌이에요! 여의도나 경복궁에 꼭 가보세요. 1~2주 안에 지니 서두르세요.",
    },
    holiday: {
      en: "벚꽃 festivals across Seoul.",
      ko: "서울 곳곳에서 벚꽃 축제가 열려요.",
    },
  },
  {
    en: "May",
    ko: "5월",
    emoji: "🌿",
    weather: {
      en: "15°C to 25°C. Best weather of the year. Clear skies.",
      ko: "15도~25도. 1년 중 날씨가 가장 좋아요.",
    },
    tip: {
      en: "Best month in Korea. Perfect for hiking and outdoor events. Children's Day and Buddha's Birthday are holidays.",
      ko: "한국에서 날씨가 가장 좋은 달이에요. 등산이나 야외 활동을 즐기기 최고예요.",
    },
    holiday: {
      en: "어린이날 (May 5), 부처님오신날 (varies).",
      ko: "어린이날(5월 5일), 부처님오신날.",
    },
  },
  {
    en: "June",
    ko: "6월",
    emoji: "🌧️",
    weather: {
      en: "20°C to 30°C. Humidity rises. Pre-monsoon heat.",
      ko: "20도~30도. 습도가 올라가고 장마 직전이에요.",
    },
    tip: {
      en: "Monsoon season (장마) starts late June. Buy a sturdy umbrella now. Consider a dehumidifier for your apartment.",
      ko: "6월 말부터 장마가 시작돼요. 지금 튼튼한 우산을 사세요. 제습기도 미리 챙기면 좋아요.",
    },
    warning: {
      en: "장마 (monsoon) begins late June. Prepare for weeks of rain.",
      ko: "6월 말 장마 시작. 몇 주간 비가 계속돼요.",
    },
  },
  {
    en: "July",
    ko: "7월",
    emoji: "☔",
    weather: {
      en: "25°C to 35°C. Peak monsoon. Hot and very humid.",
      ko: "25도~35도. 장마 절정. 덥고 습해요.",
    },
    tip: {
      en: "Carry an umbrella at all times. Air conditioning indoors is very strong — bring a light layer.",
      ko: "항상 우산을 들고 다니세요. 실내 냉방이 강하니 얇은 겉옷을 챙기세요.",
    },
    warning: {
      en: "Peak humidity — keep clothes aired out to prevent mold.",
      ko: "습도 최고조 — 옷에 곰팡이가 슬 수 있어요.",
    },
  },
  {
    en: "August",
    ko: "8월",
    emoji: "🥵",
    weather: {
      en: "28°C to 38°C. Hottest month. Very humid.",
      ko: "28도~38도. 가장 더운 달. 습도도 높아요.",
    },
    tip: {
      en: "Survive with iced Americano from convenience stores. 광복절 (Liberation Day) August 15th is a public holiday.",
      ko: "편의점 아이스 아메리카노로 버티세요. 광복절(8월 15일)은 공휴일이에요.",
    },
    holiday: {
      en: "광복절 August 15th — Liberation Day.",
      ko: "광복절 8월 15일 — 전국 공휴일.",
    },
  },
  {
    en: "September",
    ko: "9월",
    emoji: "🍂",
    weather: {
      en: "20°C to 28°C. Comfortable. Crisp air returns.",
      ko: "20도~28도. 선선하고 쾌적해요.",
    },
    tip: {
      en: "추석 (Chuseok, Korean Thanksgiving) usually in September. Major 3-day holiday — many businesses close and Koreans travel home. Seoul gets quieter.",
      ko: "추석이 보통 9월에 와요. 3일 연휴 동안 많은 가게가 문을 닫고 사람들이 고향에 가요.",
    },
    holiday: {
      en: "추석 (Chuseok) — 3 day national holiday. Most businesses close.",
      ko: "추석 연휴 3일 — 음식과 생필품을 미리 준비하세요.",
    },
  },
  {
    en: "October",
    ko: "10월",
    emoji: "🍁",
    weather: {
      en: "10°C to 22°C. Perfect fall. Foliage starts.",
      ko: "10도~22도. 단풍이 드는 완벽한 가을이에요.",
    },
    tip: {
      en: "Best time to buy a winter coat before prices increase in November. Fall foliage is stunning on any mountain near Seoul.",
      ko: "겨울 코트를 지금 사세요 — 11월이 되면 가격이 올라요. 서울 근교 산의 단풍이 절경이에요.",
    },
  },
  {
    en: "November",
    ko: "11월",
    emoji: "🧥",
    weather: {
      en: "2°C to 14°C. Cold arrives fast.",
      ko: "2도~14도. 갑자기 추워져요.",
    },
    tip: {
      en: "Learn how your 보일러 (boiler/floor heating system) works before you really need it. Heating bills spike significantly.",
      ko: "보일러 사용법을 미리 숙지해두세요. 난방비가 생각보다 많이 나올 수 있어요.",
    },
    warning: {
      en: "First frost. Learn your 보일러 (boiler) before you need heat urgently.",
      ko: "첫 서리. 보일러 사용법을 미리 알아두세요.",
    },
  },
  {
    en: "December",
    ko: "12월",
    emoji: "🎄",
    weather: {
      en: "-5°C to 5°C. Cold. First snow possible.",
      ko: "영하 5도~5도. 추워요. 첫눈이 올 수도 있어요.",
    },
    tip: {
      en: "Christmas is celebrated but most things stay open. New Year's Eve street party at Bosingak bell tower is unmissable.",
      ko: "크리스마스는 기념하지만 대부분 가게가 문을 열어요. 12월 31일 보신각 타종 행사는 꼭 한번 가보세요.",
    },
    holiday: {
      en: "크리스마스 Dec 25. 신정 Jan 1 (new year countdown at Bosingak).",
      ko: "크리스마스 12월 25일. 신정(1월 1일) 보신각 타종 행사.",
    },
  },
];

export default function SeasonalCalendar() {
  const { locale } = useLocale();
  const currentMonth = new Date().getMonth(); // 0-indexed

  return (
    <section id="seasons" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "계절 안내" : "Seasons"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko"
            ? "월별 서울 생활 가이드"
            : "What to expect each month"}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {locale === "ko"
            ? "관광 정보가 아닌, 실제 서울 생활에 필요한 월별 안내예요."
            : "Not tourist tips — practical monthly guidance for actually living in Seoul."}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((m, i) => {
            const isCurrentMonth = i === currentMonth;
            return (
              <div
                key={m.en}
                className={`rounded-2xl p-5 transition-shadow ${
                  isCurrentMonth
                    ? "border-2 border-[#ffd966] bg-white shadow-md"
                    : "border border-zinc-200 bg-white shadow-sm"
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">{m.emoji}</span>
                  <div>
                    <p className="font-bold text-zinc-950">
                      {locale === "ko" ? m.ko : m.en}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {locale === "ko" ? m.weather.ko : m.weather.en}
                    </p>
                  </div>
                  {isCurrentMonth && (
                    <span className="ml-auto rounded-full bg-[#ffd966] px-2 py-0.5 text-xs font-bold text-zinc-900">
                      {locale === "ko" ? "이번 달" : "Now"}
                    </span>
                  )}
                </div>

                <p className="mb-3 text-sm leading-relaxed text-zinc-600">
                  {locale === "ko" ? m.tip.ko : m.tip.en}
                </p>

                {m.holiday && (
                  <p className="mb-1 rounded-lg bg-[#ffd966]/20 px-3 py-1.5 text-xs text-zinc-700">
                    🗓 {locale === "ko" ? m.holiday.ko : m.holiday.en}
                  </p>
                )}
                {m.warning && (
                  <p className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600">
                    ⚠️ {locale === "ko" ? m.warning.ko : m.warning.en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
