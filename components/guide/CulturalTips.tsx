"use client";

import { useLocale } from "@/lib/i18n";

const enTips = [
  {
    concept: "눈치 (Nunchi)",
    title: "Reading the room",
    body: "Nunchi is the Korean art of sensing others' feelings without being told. Someone with \"good nunchi\" adjusts their behavior to the situation without explanation. If your Korean friend goes quiet mid-conversation, they might be communicating something without words. Pay attention."
  },
  {
    concept: "나이 (Age)",
    title: "Why they ask your age immediately",
    body: "Koreans adjust speech (formal vs. informal) based on relative age. Asking your age right away isn't rude. It's practical. They need to know how to address you. If you're older, expect more formal speech directed at you. If younger, they may speak casually."
  },
  {
    concept: "음주 문화 (Drinking)",
    title: "The art of pouring",
    body: "Never pour your own drink. Pour for others and let them pour for you. Accept with both hands when someone older pours for you. Turn slightly away from elders when drinking."
  },
  {
    concept: "식당 예절 (Restaurants)",
    title: "Calling 저기요 and the banchan rule",
    body: "Call your server by saying '저기요!' (excuse me). Waving works too. Tipping is never practiced. Banchan (side dishes) are free and refillable. Just ask. Sharing main dishes from the same plate is completely normal and expected."
  },
  {
    concept: "지하철 예절 (Subway)",
    title: "The unspoken code underground",
    body: "Priority seats (pink/blue) are genuinely reserved. Don't sit there even when empty. Phone calls are frowned upon; text instead. Eating is generally taboo. Pushing to exit crowded trains is expected, not rude."
  },
  {
    concept: "신발 (Shoes)",
    title: "Always take them off",
    body: "Remove shoes before entering any Korean home, no exceptions. Many traditional restaurants require it too. Look for the step at the entrance or a shoe rack. Bring clean socks, always."
  },
  {
    concept: "인사 (Bowing)",
    title: "It's all in the angle",
    body: "A 15-degree nod is fine for casual greetings. 45 degrees for someone much older or senior. Full 90-degree bows are for very formal situations. Don't bow and shake hands simultaneously. Bow first, then shake if they extend."
  },
  {
    concept: "\"밥 한번 먹자\"",
    title: "When it's not an invitation",
    body: "\"다음에 밥 한번 먹자\" (let's eat sometime) is often a polite parting phrase, not a real invitation. If they mean it, they'll suggest a specific time. Don't follow up with \"when?\". Wait for them to initiate. This is different from actual plans."
  },
  {
    concept: "빨리빨리 Culture",
    title: "The culture of speed",
    body: "Korea moves fast. Food arrives fast. Buses leave fast. Construction happens overnight. '빨리빨리' (hurry hurry) is a national operating mode. If a Korean seems to rush you, they're not being rude. They genuinely believe faster is better, and they're probably right."
  },
  {
    concept: "공유 음식 (Sharing)",
    title: "Food is a team sport",
    body: "Korean meals are communal. Dishes are shared from the same plate; everyone takes from communal bowls with their own utensils. Finishing everything on a shared dish is polite. It signals you enjoyed it. Don't be shy about reaching in."
  },
];

const koTips = [
  {
    concept: "눈치",
    title: "분위기 읽기",
    body: "눈치는 직접 말하지 않아도 상대방의 감정과 분위기를 파악하는 능력이에요. 한국 사회에서 매우 중요한 덕목이에요. 한국인 친구가 갑자기 말이 없어진다면, 말 없이 무언가를 전달하는 것일 수도 있어요."
  },
  {
    concept: "나이",
    title: "처음 만나면 나이를 물어보는 이유",
    body: "한국에서는 나이에 따라 말투(존댓말/반말)가 달라져요. 처음 만나는 자리에서 나이를 묻는 건 실례가 아니에요. 어떻게 말을 걸어야 할지 파악하기 위한 거예요."
  },
  {
    concept: "음주 문화",
    title: "술 따르는 법",
    body: "자신의 술은 직접 따르지 않아요. 상대방에게 따라주고, 상대방이 따라주게 해요. 윗사람이 따라줄 때는 두 손으로 받아요."
  },
  {
    concept: "식당 예절",
    title: "'저기요'와 반찬 리필",
    body: "'저기요!'라고 부르거나 손을 흔들면 직원을 부를 수 있어요. 팁 문화는 없어요. 반찬은 무료이고 리필도 돼요. 부탁하면 됩니다. 공용 반찬에서 함께 나눠 먹는 건 자연스러운 문화예요."
  },
  {
    concept: "지하철 예절",
    title: "지하철의 불문율",
    body: "노약자석(분홍색/파란색)은 비어있어도 앉지 마세요. 전화 통화는 삼가고 문자로 하세요. 음식 먹는 것도 자제해요. 혼잡한 지하철에서 밀치며 내리는 건 무례한 게 아니에요. 당연한 문화예요."
  },
  {
    concept: "신발",
    title: "반드시 벗어야 해요",
    body: "한국 가정에 들어갈 때는 신발을 반드시 벗어요. 예외는 없어요. 전통 음식점에서도 벗어야 하는 경우가 있어요. 현관의 단차나 신발장이 보이면 그 신호예요. 깨끗한 양말을 신고 다니세요."
  },
  {
    concept: "인사",
    title: "각도가 중요해요",
    body: "가볍게 15도 정도 고개를 숙이면 일상적인 인사로 충분해요. 나이 차이가 많거나 직급이 높은 분께는 45도로 인사해요. 악수와 인사를 동시에 하지 말고, 먼저 인사를 한 다음 상대가 손을 내밀면 악수하세요."
  },
  {
    concept: "\"밥 한번 먹자\"",
    title: "진짜 약속이 아닐 수도 있어요",
    body: "'다음에 밥 한번 먹자'는 대화를 마무리하는 인사말일 때가 많아요. 진심이라면 구체적인 날짜를 잡아줄 거예요. '언제요?'라고 먼저 묻기보다 상대방이 먼저 연락하길 기다리는 게 좋아요."
  },
  {
    concept: "빨리빨리 문화",
    title: "속도의 문화",
    body: "한국은 빠르게 움직여요. 음식도 빠르게 나오고, 버스도 빨리 떠나요. '빨리빨리'는 한국의 국민 정서예요. 한국인이 서두르는 것처럼 보인다면, 무례한 게 아니에요. 빠름이 미덕인 문화를 살고 있는 거예요."
  },
  {
    concept: "공유 음식",
    title: "음식은 함께 나눠 먹는 것",
    body: "한국 식사는 함께 나눠 먹는 문화예요. 공용 반찬에서 각자 덜어 먹는 게 일반적이에요. 공용 그릇을 깨끗이 비우는 건 맛있었다는 칭찬이에요. 적극적으로 집어 먹어도 돼요."
  },
];

export default function CulturalTips() {
  const { locale } = useLocale();
  const tips = locale === "ko" ? koTips : enTips;

  return (
    <section id="culture" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {locale === "ko" ? "문화" : "Culture"}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {locale === "ko" ? "한국인이 말 안 해주는 것들" : "Things Koreans won't tell you"}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {locale === "ko"
            ? "외국인들이 몇 년 걸려야 파악하는 불문율들. 미리 알아두세요."
            : "Unwritten rules that take expats years to figure out. Here's your shortcut."}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm"
            >
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#c9a800]">{tip.concept}</p>
              <h3 className="mb-2 text-base font-bold text-zinc-900">{tip.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{tip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
