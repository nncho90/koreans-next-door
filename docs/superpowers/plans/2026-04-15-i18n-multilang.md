# i18n Multi-Language Expansion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand KND from 2 languages (en/ko) to 7 (+ ja, zh-CN, zh-TW, pt, es) with a globe icon + dropdown language picker replacing the current EN/한 pill toggle.

**Architecture:** Lazy-load the 5 new locale dicts via dynamic import on first switch; en/ko stay statically imported. New `LanguagePicker` component (globe icon → dropdown) replaces the pill in SharedNavbar. `guideData.ts` extended with locale fields + helper functions.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS

---

## File Map

| File | Action |
|------|--------|
| `lib/i18n/types.ts` | Edit — expand Locale, add navbar keys to Dictionary |
| `lib/i18n/context.tsx` | Edit — lazy loading, isLoading state |
| `lib/i18n/en.ts` | Edit — add navbar.ourStory/events/guides/tools |
| `lib/i18n/ko.ts` | Edit — add navbar.ourStory/events/guides/tools |
| `lib/i18n/ja.ts` | Create |
| `lib/i18n/zh-CN.ts` | Create |
| `lib/i18n/zh-TW.ts` | Create |
| `lib/i18n/pt.ts` | Create |
| `lib/i18n/es.ts` | Create |
| `components/LanguagePicker.tsx` | Create |
| `lib/guideData.ts` | Edit — add locale fields + helpers |
| `components/SharedNavbar.tsx` | Edit — swap picker, use locale helpers |

---

## Task 1: Expand types + update en.ts/ko.ts + rewrite context

**Files:**
- Modify: `lib/i18n/types.ts`
- Modify: `lib/i18n/context.tsx`
- Modify: `lib/i18n/en.ts`
- Modify: `lib/i18n/ko.ts`

- [ ] **Step 1: Update `lib/i18n/types.ts`**

```ts
export type Locale = "en" | "ko" | "ja" | "zh-CN" | "zh-TW" | "pt" | "es";

export interface Dictionary {
  navbar: {
    joinUs: string;
    langToggle: string;
    ourStory: string;
    events: string;
    guides: string;
    tools: string;
  };
  // ... rest unchanged
```

Full file — replace only the `Locale` type line and add 4 keys to `navbar`:

```ts
export type Locale = "en" | "ko" | "ja" | "zh-CN" | "zh-TW" | "pt" | "es";

export interface Dictionary {
  navbar: {
    joinUs: string;
    langToggle: string;
    ourStory: string;
    events: string;
    guides: string;
    tools: string;
  };
  hero: {
    tagline: string;
    learnMore: string;
  };
  mission: {
    phase1: string;
    knockKnock: string;
    hiNeighbors: string;
    worries: string[];
    pillars: {
      icon: string;
      title: string;
      body: string;
    }[];
  };
  events: {
    label: string;
    heading: string;
    subheading: string;
    cards: {
      emoji: string;
      type: string;
      title: string;
      description: string;
      date?: string;
    }[];
  };
  impact: {
    metrics: {
      label: string;
    }[];
  };
  upcoming: {
    label: string;
    heading: string;
    subheading: string;
  };
  gallery: {
    label: string;
    heading: string;
    subheading: string;
  };
  testimonials: {
    label: string;
    heading: string;
  };
  globe: {
    label: string;
    heading: string;
    subheading: string;
    addPin: string;
    beFirst: string;
    modalTitle: string;
    modalSubtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formCity: string;
    formCityPlaceholder: string;
    formNote: string;
    formNotePlaceholder: string;
    formInstagram: string;
    formInstagramOptional: string;
    formSubmit: string;
    formSubmitting: string;
    formError: string;
    successTitle: string;
    successSubtitle: string;
    noCitiesFound: string;
    neighborCount: string;
  };
  survivalKit: {
    label: string;
    heading: string;
    subheading: string;
    categories: {
      title: string;
      items: {
        note: string;
      }[];
    }[];
  };
  faq: {
    label: string;
    heading: string;
    items: {
      q: string;
      a?: string;
    }[];
  };
  contact: {
    heading: string;
    subheading: string;
    instagram: string;
    kakao: string;
  };
  phraseOfDay: {
    label: string;
    phrases: {
      english: string;
      context: string;
    }[];
  };
  footer: {
    copyright: string;
  };
}
```

- [ ] **Step 2: Add 4 missing keys to `lib/i18n/en.ts` navbar section**

In `en.ts`, change the `navbar` block to:
```ts
navbar: {
  joinUs: "Join us",
  langToggle: "한국어",
  ourStory: "Our Story",
  events: "Events",
  guides: "Guides",
  tools: "Tools",
},
```

- [ ] **Step 3: Add 4 missing keys to `lib/i18n/ko.ts` navbar section**

```ts
navbar: {
  joinUs: "함께하기",
  langToggle: "EN",
  ourStory: "우리 이야기",
  events: "이벤트",
  guides: "가이드",
  tools: "도구",
},
```

- [ ] **Step 4: Rewrite `lib/i18n/context.tsx`**

```tsx
"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Locale, Dictionary } from "./types";
import { en } from "./en";
import { ko } from "./ko";
import { updateMetadata } from "./metadata";

const ALL_LOCALES: Locale[] = ["en", "ko", "ja", "zh-CN", "zh-TW", "pt", "es"];

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => en,
  ko: async () => ko,
  ja: async () => (await import("./ja")).ja,
  "zh-CN": async () => (await import("./zh-CN")).zhCN,
  "zh-TW": async () => (await import("./zh-TW")).zhTW,
  pt: async () => (await import("./pt")).pt,
  es: async () => (await import("./es")).es,
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
  isLoading: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [t, setT] = useState<Dictionary>(en);
  const [isLoading, setIsLoading] = useState(false);
  const cache = useRef<Partial<Record<Locale, Dictionary>>>({ en, ko });

  useEffect(() => {
    const stored = localStorage.getItem("knd-locale") as Locale | null;
    if (stored && ALL_LOCALES.includes(stored)) {
      applyLocale(stored);
    }
  }, []);

  async function applyLocale(next: Locale) {
    if (cache.current[next]) {
      setLocaleState(next);
      setT(cache.current[next]!);
      updateMetadata(next);
      return;
    }
    setIsLoading(true);
    try {
      const dict = await loaders[next]();
      cache.current[next] = dict;
      setLocaleState(next);
      setT(dict);
      updateMetadata(next);
    } finally {
      setIsLoading(false);
    }
  }

  const setLocale = (next: Locale) => {
    localStorage.setItem("knd-locale", next);
    applyLocale(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /Users/nelsoncho/projects/koreans-next-door && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors only about missing `ja/zh-CN/zh-TW/pt/es` modules (not yet created). No errors in types.ts or context.tsx.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/types.ts lib/i18n/context.tsx lib/i18n/en.ts lib/i18n/ko.ts
git commit -m "feat(i18n): expand Locale type to 7 locales + lazy-load context"
```

---

## Task 2: Create Japanese dictionary (`lib/i18n/ja.ts`)

- [ ] **Step 1: Create the file**

Create `lib/i18n/ja.ts` with full `Dictionary` content. Key values:
- `navbar.joinUs`: "参加する"
- `navbar.ourStory`: "私たちについて"
- `navbar.events`: "イベント"
- `navbar.guides`: "ガイド"
- `navbar.tools`: "ツール"
- `hero.tagline`: "異国の地でも、我が家のように感じられるように。あなたのそばで歩んでいきます。"
- `hero.learnMore`: "もっと見る"
- `mission.phase1`: "ソウルに引っ越してきたばかりですね。"
- `mission.knockKnock`: "コンコン。"
- `mission.hiNeighbors`: "こんにちは、お隣さんです :)"
- `mission.worries` (18 strings): "「注文した料理が何なのか全くわかりませんでした。」" / "「まともな会話を何週間もしていません。」" / "「地下鉄でみんなに見られています。」" / "「同僚たちは一緒に昼食を食べているのに、私だけひとりです。」" / "「看板も読めません。」" / "「昨夜、泣きながら母に電話しました。」" / "「こんなに孤独だって、誰も教えてくれなかった。」" / "「韓国人の友達の作り方がわかりません。」" / "「毎週末ひとりで過ごしています。」" / "「ここでは透明人間みたいです。」" / "「道に迷っても、誰にも聞けませんでした。」" / "「ずっとこんな感じなんでしょうか？」" / "「また一人で夕食を食べました。」" / "「だんだん楽になると思っていました。」" / "「なぜ来たんだろうと思う日があります。」" / "「部屋の静けさが耐えられません。」" / "「わかってくれる人たちが恋しいです。」" / "「1年経ってもまだ韓国語が全然ダメです。」"
- `mission.pillars[0]`: icon "🏙️", title "ただの隣人", body "正式な団体でも旅行会社でもありません。見知らぬ街を親しみやすい場所に変えるのはおもてなしだと信じる友人たちのグループです。"
- `mission.pillars[1]`: icon "🌍", title "誰でも大歓迎", body "どこから来ても、何を信じていても、どのくらいここにいても関係ありません。来てくれれば、仲間です。"
- `mission.pillars[2]`: icon "💛", title "裏の目的なし", body "外国で歓迎してもらった気持ちを忘れていません。あなたにとってそんな隣人になりたいんです。"
- `events.label`: "私たちの活動" / `events.heading`: "一緒にやってきたこと" / `events.subheading`: "まだ手探りで進めています — それが楽しいところ。こんなことが待っています。"
- events cards: [{ emoji:"🥢", type:"文化交流", title:"ソルラルのトッグク・パーティー", date:"2026年1月", description:"一緒に餃子を作り、トッグクを食べ、ユンノリで遊びながら、新しい友人たちと韓国の正月を楽しみました。" }, { emoji:"⛰️", type:"自然とアドベンチャー", title:"冠岳山ナイトハイク", date:"2026年2月", description:"夜、靴を履いて冠岳山に登りました — ソウルが下でキラキラ光り、素晴らしい仲間と一緒でした。" }, { emoji:"🗣️", type:"言語交換", title:"ランゲージ・エクスチェンジ・ナイト", date:"毎月最終土曜日", description:"グループゲームや笑い、時々ぎこちない文法ミスをしながら韓国語と英語を練習します。初心者大歓迎。" }, { emoji:"☕", type:"カジュアルな集まり", title:"コーヒー＆おしゃべり", date:"随時", description:"時にはただコーヒーを飲んで、美味しいものを食べて、本音で話すだけ。特別な目的なし。" }]
- `impact.metrics`: [{ label:"カ国から" }, { label:"人の隣人" }, { label:"回のイベント" }, { label:"一つの家族" }]
- `upcoming`: label "次は" / heading "予定のイベント" / subheading "誰でも参加できます。気軽にどうぞ。"
- `gallery`: label "一緒の瞬間" / heading "私たちの街角" / subheading "本物の人たち、本物の瞬間、本物のつながり。"
- `testimonials`: label "隣人の声" / heading "みんなの声"
- `globe`: label "私たちのコミュニティ" / heading "世界中から" / subheading "私たちの隣人は世界中から来ています。" / addPin "+ ピンを追加する" / beFirst "最初にピンを追加してみましょう！" / modalTitle "ピンを追加する" / modalSubtitle "すぐにグローブに表示されます。" / formName "名前" / formNamePlaceholder "名前を入力してください" / formCity "都市" / formCityPlaceholder "世界中の都市を検索..." / formNote "ひと言紹介" / formNotePlaceholder "例：仕事で来て、食べ物にはまって留まっています" / formInstagram "インスタグラム" / formInstagramOptional "（任意）" / formSubmit "ピンを追加" / formSubmitting "送信中..." / formError "エラーが発生しました。もう一度試してください！" / successTitle "地図に載りました！" / successSubtitle "グローブに表示されました。ようこそ、隣人！" / noCitiesFound "都市が見つかりません — 別の名前で試してください" / neighborCount "世界中から{count}人の隣人"
- `survivalKit`: label "ソウル・サバイバルキット" / heading "知っておくと便利なこと" / subheading "隣人たちが韓国に初めて来たとき知っておきたかったこと。" / categories: [{ title:"移動", items:[{note:"地下鉄路線とリアルタイム到着情報"},{note:"ナビ — ここではグーグルマップより精度が高い"},{note:"タップ式交通カード、コンビニで購入可能"}] }, { title:"食べ物と日常生活", items:[{note:"最も人気の配達アプリ"},{note:"配達が早く、キャンペーンが多い"},{note:"5,000ウォン以下で何でも揃う"}] }, { title:"コミュニケーション", items:[{note:"韓国の全員が使うメッセンジャー"},{note:"最高の韓国語↔英語翻訳アプリ"},{note:"豊富な語彙と例文"}] }, { title:"便利なアプリ", items:[{note:"韓国の主要検索エンジンと地図"},{note:"地域のフリマ・コミュニティアプリ"},{note:"翌日配送のオンラインショッピング"}] }, { title:"医療", items:[{note:"最寄りの薬局を探す"},{note:"英語対応の医師を検索"},{note:"入国後6ヶ月以内に加入が必要"}] }, { title:"緊急番号", items:[{note:"警察"},{note:"消防・救急"},{note:"韓国観光公社ヘルプライン（英語）"}] }]
- `faq`: label "よくある質問" / heading "みんなが聞くこと" / items: [{ q:"これらのイベントは宗教的ですか？" }, { q:"韓国語ができなくても参加できますか？", a:"もちろんです。私たちの中にも学んでいる人がたくさんいます。イベントはバイリンガル（英語と韓国語）で進行され、言語交換ナイトは完全な初心者も大歓迎です。スペイン語、ポルトガル語、日本語、中国語が話せる韓国人メンバーもいるので、英語や韓国語が苦手でも気にしないでください。プレッシャーは全くありません。" }, { q:"費用や会員資格はありますか？", a:"会員費は一切ありません。定期的な言語交換イベントや特定のイベントには少額の参加費（10,000ウォン以下）がかかることがありますが、全額スナックや備品に使われます。ディナー交流会やアクティビティには別途費用はなく、自分の食事やアクティビティ代だけ持ってきてください。" }, { q:"予定イベントはどうやって知れますか？" }, { q:"KNDを運営しているのは誰ですか？", a:"시광교회の友人グループです。海外に住んだことのある人もいれば、留学した人もいます。でも私たち全員が、どこかで異国に馴染めなかった経験と — それでも温かく迎えてもらった経験を持っています。見知らぬ場所を少しでも家のように感じてもらえる隣人になりたいんです。" }, { q:"友達を連れてきてもいいですか？", a:"もちろんです。多ければ多いほど楽しい。" }]
- `contact`: heading "隣人になりませんか" / subheading "ゲストとして来て、隣人として残ってください。インスタグラムをフォローするか、カカオトークのオープンチャットに参加して最新情報をチェックしてください。" / instagram "インスタグラム" / kakao "カカオトーク・オープンチャット"
- `phraseOfDay`: label "今日の韓国語" / phrases[0..29] — the `english` field becomes the Japanese "when to use" description; `context` is the Japanese tip. Examples: { english:"感謝を伝えるとき", context:"韓国で一番役立つ言葉" } / { english:"何かを注文するとき", context:"メニューを指差して言えばOK" } / { english:"値段を聞くとき", context:"市場や屋台では必須" } / { english:"トイレの場所を聞くとき", context:"絶対必要になります — 信じて" } / { english:"大丈夫だと言うとき", context:"「大丈夫ですか？」の意味にもなる" } / { english:"挨拶するとき", context:"どこでも使えるあいさつ" } / { english:"丁寧に謝るとき", context:"どんな場面でも使える礼儀正しい謝り方" } / { english:"注文したいとき", context:"これでスタッフの注意を引ける" } / { english:"美味しいとき", context:"シェフを褒めて — 本当に喜ばれます" } / { english:"お会計するとき", context:"手を振りながら言えばOK" } / { english:"肯定の返事をするとき", context:"「デ」とも発音します — どちらもOK" } / { english:"断るとき", context:"丁寧な断り方" } / { english:"少し待ってほしいとき", context:"どんな場面でも時間を稼げる" } / { english:"レストランでスタッフを呼ぶとき", context:"普通のことです — 遠慮なく" } / { english:"水を頼むとき", context:"レストランでは大体無料" } / { english:"もう一つ欲しいとき", context:"おかわり、副菜の追加、何でもOK" } / { english:"カード払いできるか聞くとき", context:"韓国ではほぼどこでもカード使えます" } / { english:"Wi-Fiパスワードを聞くとき", context:"たいていサインか領収書に書いてある" } / { english:"写真を撮ってもらいたいとき", context:"スマホを渡して言えばOK" } / { english:"何かが何かを聞くとき", context:"何かを指差して使ってください" } / { english:"おすすめを頼むとき", context:"メニューが多すぎるレストランで最高" } / { english:"持ち帰りするとき", context:"持ち帰りのときに使う言葉" } / { english:"助けが必要なとき", context:"韓国人はとても親切に助けてくれます" } / { english:"ゆっくり話してほしいとき", context:"話が速すぎるときの救命綱" } / { english:"韓国語が話せないと言うとき", context:"皮肉なことに、これを韓国語で言うと感動される" } / { english:"コンビニがどこにあるか聞くとき", context:"50メートルおきにあるけど、念のため" } / { english:"どこに乗るか聞くとき", context:"バス、地下鉄、電車すべてに使える" } / { english:"焼酎を注文するとき", context:"本場の韓国ディナー体験を解禁" } / { english:"驚いたとき", context:"現地人のように反応する — どんな会話でも使える" } / { english:"楽しいとき", context:"何か面白いときの反応" }
- `footer.copyright`: "コリアンズ・ネクスト・ドア · ソウル、韓国"

- [ ] **Step 2: Verify type-checks**

```bash
cd /Users/nelsoncho/projects/koreans-next-door && npx tsc --noEmit 2>&1 | grep "ja.ts"
```

Expected: no errors in `ja.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/ja.ts
git commit -m "feat(i18n): add Japanese dictionary"
```

---

## Task 3: Create Simplified Chinese (`lib/i18n/zh-CN.ts`)

Export name: `zhCN` (not `zh-CN` — hyphens are invalid JS identifiers).

- [ ] **Step 1: Create `lib/i18n/zh-CN.ts`**

Key values:
- `navbar`: joinUs "加入我们" / ourStory "我们的故事" / events "活动" / guides "指南" / tools "工具"
- `hero.tagline`: "在异乡，也能感受到家的温暖。我们陪你一路同行。" / learnMore "了解更多"
- `mission.phase1`: "你刚搬到首尔。" / knockKnock "咚咚咚。" / hiNeighbors "嗨，我们是你的邻居 :)"
- `mission.worries` (18): "「点了餐，却不知道送来的是什么。」" / "「好几个星期没有认真聊过天了。」" / "「在地铁上，大家都盯着我看。」" / "「同事们一起吃午饭，我只能一个人坐着。」" / "「连路牌都看不懂。」" / "「昨晚哭着给妈妈打了电话。」" / "「没人告诉我会这么孤独。」" / "「不知道怎么交韩国朋友。」" / "「每个周末都是一个人。」" / "「在这里感觉像个隐形人。」" / "「迷路了，却没办法向任何人问路。」" / "「一直都会是这种感觉吗？」" / "「又一个人吃了晚饭。」" / "「以为会慢慢好起来的。」" / "「有时候会想，我当初为什么要来。」" / "「公寓里的寂静让人喘不过气。」" / "「好想有能理解我的人在身边。」" / "「来了一年，韩语还是很烂。」"
- `mission.pillars`: [{ icon:"🏙️", title:"只是邻居", body:"不是正式组织，也不是旅行社。只是一群相信温暖的招待能让陌生城市变成温馨家园的朋友。" }, { icon:"🌍", title:"欢迎所有人", body:"不管你从哪里来，信仰什么，来了多久，来了就是我们中的一员。" }, { icon:"💛", title:"没有隐藏议程", body:"我们没有忘记在异国他乡被人热情款待的感觉。我们只想成为那样的邻居。" }]
- `events`: label "我们的活动" / heading "我们一起做过的事" / subheading "我们还在摸索前进 — 这正是乐趣所在。以下是你可以期待的。" / cards: [{ emoji:"🥢", type:"文化交流", title:"春节年糕汤派对", date:"2026年1月", description:"我们一起包饺子、分享年糕汤，玩了尤茨游戏，和新朋友们庆祝韩国新年。" }, { emoji:"⛰️", type:"自然与冒险", title:"冠岳山夜间徒步", date:"2026年2月", description:"我们穿上运动鞋，在夜晚登上冠岳山 — 首尔在脚下闪闪发光，身边有志同道合的伙伴。" }, { emoji:"🗣️", type:"语言交换", title:"语言交换之夜", date:"每月最后一个周六", description:"在小组游戏和笑声中练习韩语和英语，偶尔也会犯一些尴尬的语法错误。欢迎所有人，不要求流利。" }, { emoji:"☕", type:"休闲聚会", title:"咖啡与闲聊", date:"不定期", description:"有时只是喝杯咖啡、吃点好吃的、进行真诚的交流。没有特别目的。" }]
- `impact.metrics`: [{ label:"个国家" }, { label:"位邻居" }, { label:"次活动" }, { label:"一个大家庭" }]
- `upcoming`: label "接下来" / heading "即将举行的活动" / subheading "所有活动免费开放，欢迎所有人。随时来。"
- `gallery`: label "共同的瞬间" / heading "我们街区的一角" / subheading "真实的人，真实的瞬间，真实的联结。"
- `testimonials`: label "邻居的声音" / heading "大家说什么"
- `globe`: label "我们的社区" / heading "来自世界各地" / subheading "我们的邻居来自世界各个角落。" / addPin "+ 添加你的标记" / beFirst "成为第一个添加标记的人！" / modalTitle "添加你的标记" / modalSubtitle "你将立刻出现在地球仪上。" / formName "名字" / formNamePlaceholder "请输入你的名字" / formCity "城市" / formCityPlaceholder "搜索世界上的任何城市..." / formNote "一句话介绍" / formNotePlaceholder "例：来工作的，却因为食物留了下来" / formInstagram "Instagram" / formInstagramOptional "（可选）" / formSubmit "添加标记" / formSubmitting "发送中..." / formError "出了点问题，请再试一次！" / successTitle "你上地图了！" / successSubtitle "你出现在地球仪上了。欢迎，邻居！" / noCitiesFound "未找到城市 — 换个名字试试" / neighborCount "来自世界各地的 {count} 位邻居"
- `survivalKit`: label "首尔生存指南" / heading "值得了解的事" / subheading "邻居们希望刚来韩国时就知道的事情。" / categories: [{ title:"出行", items:[{note:"地铁线路和实时到站信息"},{note:"导航 — 这里比谷歌地图更准确"},{note:"可刷卡的交通卡，便利店可购买"}] }, { title:"饮食与日常生活", items:[{note:"最受欢迎的外卖应用"},{note:"配送快，经常有优惠活动"},{note:"5000韩元以下满足所有日常需求"}] }, { title:"沟通", items:[{note:"韩国人人都在用的通讯软件"},{note:"最好的韩英翻译应用"},{note:"丰富的词汇和例句"}] }, { title:"实用应用", items:[{note:"韩国主要搜索引擎和地图"},{note:"本地二手和社区应用"},{note:"次日达的网购平台"}] }, { title:"医疗", items:[{note:"查找最近的药店"},{note:"搜索会英语的医生"},{note:"入境后6个月内需完成登记"}] }, { title:"紧急电话", items:[{note:"警察"},{note:"消防/急救"},{note:"韩国旅游求助热线（英语）"}] }]
- `faq`: label "常见问题" / heading "大家常问的" / items: [{ q:"这些活动是宗教性质的吗？" }, { q:"不会说韩语可以参加吗？", a:"当然可以。我们中很多人也在学习。活动以双语（英语和韩语）进行，语言交换之夜欢迎完全的初学者。我们也有会说西班牙语、葡萄牙语、日语和普通话的韩国成员，所以即使英语或韩语不好也不用担心。完全没有压力。" }, { q:"有费用或会员要求吗？", a:"永远没有会员费。定期的语言交换活动和部分特别活动可能会有少量参与费（10,000韩元以下），全部用于零食和物资。晚餐聚会或活动不额外收费 — 只需带够自己的餐费或活动费用。" }, { q:"怎么知道即将举行的活动？" }, { q:"KND是谁在运营？", a:"시광교회的一小群朋友。有些人在海外生活过，有些人留学过。但我们都有过在异国他乡感到不自在的经历，也都被人温暖地接纳过。我们只想成为能让陌生地方感觉更像家的邻居。" }, { q:"可以带朋友来吗？", a:"当然可以。人越多越好。" }]
- `contact`: heading "加入这个街区" / subheading "以客人身份来，以邻居身份留下。关注我们的Instagram或加入KakaoTalk群组获取最新消息。" / instagram "Instagram" / kakao "KakaoTalk群聊"
- `phraseOfDay`: label "每日韩语" / phrases (30) — english field is Chinese "when to use"; context is Chinese tip: { english:"表达感谢时", context:"韩国最实用的词" } / { english:"点餐时", context:"指着菜单说这句话就行" } / { english:"问价格时", context:"在市场和路边摊必备" } / { english:"问洗手间在哪时", context:"你一定会用到的 — 相信我" } / { english:"说没关系时", context:"也有'你还好吗？'的意思" } / { english:"打招呼时", context:"走到哪都能用的问候语" } / { english:"道歉时", context:"任何场合都适用的礼貌道歉" } / { english:"要点餐时", context:"说这句话引起服务员注意" } / { english:"说好吃时", context:"夸厨师 — 他们真的很喜欢" } / { english:"结账时", context:"挥手说这句话就行" } / { english:"回答是时", context:"也发音为'데' — 两个都行" } / { english:"拒绝时", context:"礼貌拒绝的方式" } / { english:"让人稍等时", context:"任何情况下都能争取时间" } / { english:"在餐厅叫服务员时", context:"叫餐厅服务员 — 完全正常" } / { english:"要水时", context:"餐厅里通常免费" } / { english:"要再来一份时", context:"续杯、加小菜、任何都行" } / { english:"问能否刷卡时", context:"韩国几乎到处都能刷卡" } / { english:"问WiFi密码时", context:"通常在牌子上或收据上" } / { english:"请人帮拍照时", context:"把手机递过去说这句" } / { english:"问某物是什么时", context:"指着东西问" } / { english:"要推荐时", context:"菜单太多时在餐厅很好用" } / { english:"打包时", context:"带走时说这句" } / { english:"需要帮助时", context:"韩国人对新来的邻居非常热心" } / { english:"让对方说慢点时", context:"说太快时的救命稻草" } / { english:"说不会说韩语时", context:"讽刺的是，用韩语说这句会让人很感动" } / { english:"问附近有没有便利店时", context:"每50米就有一家 — 不过以防万一" } / { english:"问在哪里上车时", context:"公交、地铁、火车都适用" } / { english:"点烧酒时", context:"解锁正宗韩式用餐体验" } / { english:"表示惊讶时", context:"像本地人一样反应 — 任何对话都能用" } / { english:"表示有趣时", context:"遇到有意思的事时的反应" }
- `footer.copyright`: "科里安斯邻居 · 首尔，韩国"

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | grep "zh-CN"
```

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/zh-CN.ts && git commit -m "feat(i18n): add Simplified Chinese dictionary"
```

---

## Task 4: Create Traditional Chinese (`lib/i18n/zh-TW.ts`)

Export name: `zhTW`. Content is identical structure to zh-CN but with traditional characters throughout.

- [ ] **Step 1: Create `lib/i18n/zh-TW.ts`**

Key differences from zh-CN (traditional characters):
- `navbar`: joinUs "加入我們" / ourStory "我們的故事" / events "活動" / guides "指南" / tools "工具"
- `hero.tagline`: "在異鄉，也能感受到家的溫暖。我們陪你一路同行。" / learnMore "了解更多"
- `mission.phase1`: "你剛搬到首爾。" / hiNeighbors "嗨，我們是你的鄰居 :)"
- worries (18, traditional): "「點了餐，卻不知道送來的是什麼。」" / "「好幾個星期沒有認真聊過天了。」" / "「在捷運上，大家都盯著我看。」" / "「同事們一起吃午飯，我只能一個人坐著。」" / "「連路牌都看不懂。」" / "「昨晚哭著給媽媽打了電話。」" / "「沒人告訴我會這麼孤獨。」" / "「不知道怎麼交韓國朋友。」" / "「每個週末都是一個人。」" / "「在這裡感覺像個隱形人。」" / "「迷路了，卻沒辦法向任何人問路。」" / "「一直都會是這種感覺嗎？」" / "「又一個人吃了晚飯。」" / "「以為會慢慢好起來的。」" / "「有時候會想，我當初為什麼要來。」" / "「公寓裡的寂靜讓人喘不過氣。」" / "「好想有能理解我的人在身邊。」" / "「來了一年，韓語還是很爛。」"
- pillars: [{ icon:"🏙️", title:"只是鄰居", body:"不是正式組織，也不是旅行社。只是一群相信溫暖的招待能讓陌生城市變成溫馨家園的朋友。" }, { icon:"🌍", title:"歡迎所有人", body:"不管你從哪裡來，信仰什麼，來了多久，來了就是我們中的一員。" }, { icon:"💛", title:"沒有隱藏議程", body:"我們沒有忘記在異國他鄉被人熱情款待的感覺。我們只想成為那樣的鄰居。" }]
- events: label "我們的活動" / heading "我們一起做過的事" / subheading "我們還在摸索前進 — 這正是樂趣所在。以下是你可以期待的。" / cards: [{ emoji:"🥢", type:"文化交流", title:"春節年糕湯派對", date:"2026年1月", description:"我們一起包餃子、分享年糕湯，玩了尤茨遊戲，和新朋友們慶祝韓國新年。" }, { emoji:"⛰️", type:"自然與冒險", title:"冠岳山夜間健行", date:"2026年2月", description:"我們穿上運動鞋，在夜晚登上冠岳山 — 首爾在腳下閃閃發光，身邊有志同道合的夥伴。" }, { emoji:"🗣️", type:"語言交換", title:"語言交換之夜", date:"每月最後一個週六", description:"在小組遊戲和笑聲中練習韓語和英語，偶爾也會犯一些尷尬的文法錯誤。歡迎所有人，不要求流利。" }, { emoji:"☕", type:"休閒聚會", title:"咖啡與閒聊", date:"不定期", description:"有時只是喝杯咖啡、吃點好吃的、進行真誠的交流。沒有特別目的。" }]
- impact.metrics: [{ label:"個國家" }, { label:"位鄰居" }, { label:"次活動" }, { label:"一個大家庭" }]
- upcoming: label "接下來" / heading "即將舉行的活動" / subheading "所有活動免費開放，歡迎所有人。隨時來。"
- gallery: label "共同的瞬間" / heading "我們街區的一角" / subheading "真實的人，真實的瞬間，真實的連結。"
- testimonials: label "鄰居的聲音" / heading "大家說什麼"
- globe: label "我們的社區" / heading "來自世界各地" / subheading "我們的鄰居來自世界各個角落。" / addPin "+ 新增你的標記" / beFirst "成為第一個新增標記的人！" / modalTitle "新增你的標記" / modalSubtitle "你將立刻出現在地球儀上。" / formName "名字" / formNamePlaceholder "請輸入你的名字" / formCity "城市" / formCityPlaceholder "搜尋世界上的任何城市..." / formNote "一句話介紹" / formNotePlaceholder "例：來工作的，卻因為食物留了下來" / formInstagram "Instagram" / formInstagramOptional "（選填）" / formSubmit "新增標記" / formSubmitting "傳送中..." / formError "出了點問題，請再試一次！" / successTitle "你上地圖了！" / successSubtitle "你出現在地球儀上了。歡迎，鄰居！" / noCitiesFound "找不到城市 — 換個名稱試試" / neighborCount "來自世界各地的 {count} 位鄰居"
- survivalKit: label "首爾生存指南" / heading "值得了解的事" / subheading "鄰居們希望剛來韓國時就知道的事情。" / categories: [{ title:"出行", items:[{note:"捷運路線和即時到站資訊"},{note:"導航 — 這裡比Google地圖更準確"},{note:"可刷卡的交通卡，便利商店可購買"}] }, { title:"飲食與日常生活", items:[{note:"最受歡迎的外送應用"},{note:"配送快，經常有優惠活動"},{note:"5000韓元以下滿足所有日常需求"}] }, { title:"溝通", items:[{note:"韓國人人都在用的通訊軟體"},{note:"最好的韓英翻譯應用"},{note:"豐富的詞彙和例句"}] }, { title:"實用應用", items:[{note:"韓國主要搜尋引擎和地圖"},{note:"在地二手和社區應用"},{note:"隔日到貨的網購平台"}] }, { title:"醫療", items:[{note:"查找最近的藥局"},{note:"搜尋會英語的醫生"},{note:"入境後6個月內需完成登記"}] }, { title:"緊急電話", items:[{note:"警察"},{note:"消防/急救"},{note:"韓國旅遊求助熱線（英語）"}] }]
- faq: label "常見問題" / heading "大家常問的" / items: [{ q:"這些活動是宗教性質的嗎？" }, { q:"不會說韓語可以參加嗎？", a:"當然可以。我們中很多人也在學習。活動以雙語（英語和韓語）進行，語言交換之夜歡迎完全的初學者。我們也有會說西班牙語、葡萄牙語、日語和普通話的韓國成員，所以即使英語或韓語不好也不用擔心。完全沒有壓力。" }, { q:"有費用或會員要求嗎？", a:"永遠沒有會員費。定期的語言交換活動和部分特別活動可能會有少量參與費（10,000韓元以下），全部用於零食和物資。晚餐聚會或活動不額外收費 — 只需帶夠自己的餐費或活動費用。" }, { q:"怎麼知道即將舉行的活動？" }, { q:"KND是誰在運營？", a:"시광교회的一小群朋友。有些人在海外生活過，有些人留學過。但我們都有過在異國他鄉感到不自在的經歷，也都被人溫暖地接納過。我們只想成為能讓陌生地方感覺更像家的鄰居。" }, { q:"可以帶朋友來嗎？", a:"當然可以。人越多越好。" }]
- contact: heading "加入這個街區" / subheading "以客人身份來，以鄰居身份留下。追蹤我們的Instagram或加入KakaoTalk群組獲取最新消息。" / instagram "Instagram" / kakao "KakaoTalk群聊"
- phraseOfDay: label "每日韓語" / phrases (30) — same as zh-CN but traditional chars where applicable: { english:"表達感謝時", context:"韓國最實用的詞" } / { english:"點餐時", context:"指著菜單說這句話就行" } / { english:"問價格時", context:"在市場和路邊攤必備" } / { english:"問洗手間在哪時", context:"你一定會用到的 — 相信我" } / { english:"說沒關係時", context:"也有'你還好嗎？'的意思" } / { english:"打招呼時", context:"走到哪都能用的問候語" } / { english:"道歉時", context:"任何場合都適用的禮貌道歉" } / { english:"要點餐時", context:"說這句話引起服務員注意" } / { english:"說好吃時", context:"誇廚師 — 他們真的很喜歡" } / { english:"結帳時", context:"揮手說這句話就行" } / { english:"回答是時", context:"也發音為'데' — 兩個都行" } / { english:"拒絕時", context:"禮貌拒絕的方式" } / { english:"讓人稍等時", context:"任何情況下都能爭取時間" } / { english:"在餐廳叫服務員時", context:"叫餐廳服務員 — 完全正常" } / { english:"要水時", context:"餐廳裡通常免費" } / { english:"要再來一份時", context:"續杯、加小菜、任何都行" } / { english:"問能否刷卡時", context:"韓國幾乎到處都能刷卡" } / { english:"問WiFi密碼時", context:"通常在牌子上或收據上" } / { english:"請人幫拍照時", context:"把手機遞過去說這句" } / { english:"問某物是什麼時", context:"指著東西問" } / { english:"要推薦時", context:"菜單太多時在餐廳很好用" } / { english:"打包時", context:"帶走時說這句" } / { english:"需要幫助時", context:"韓國人對新來的鄰居非常熱心" } / { english:"讓對方說慢點時", context:"說太快時的救命稻草" } / { english:"說不會說韓語時", context:"諷刺的是，用韓語說這句會讓人很感動" } / { english:"問附近有沒有便利商店時", context:"每50公尺就有一家 — 不過以防萬一" } / { english:"問在哪裡上車時", context:"公車、捷運、火車都適用" } / { english:"點燒酒時", context:"解鎖正宗韓式用餐體驗" } / { english:"表示驚訝時", context:"像本地人一樣反應 — 任何對話都能用" } / { english:"表示有趣時", context:"遇到有意思的事時的反應" }
- footer.copyright: "科里安斯鄰居 · 首爾，韓國"

- [ ] **Step 2: Verify + commit**

```bash
npx tsc --noEmit 2>&1 | grep "zh-TW"
git add lib/i18n/zh-TW.ts && git commit -m "feat(i18n): add Traditional Chinese dictionary"
```

---

## Task 5: Create Portuguese (`lib/i18n/pt.ts`)

- [ ] **Step 1: Create `lib/i18n/pt.ts`**

Key values:
- navbar: joinUs "Junte-se a nós" / ourStory "Nossa História" / events "Eventos" / guides "Guias" / tools "Ferramentas"
- hero.tagline: "Caminhando ao seu lado para que todos possamos nos sentir em casa em terra estrangeira." / learnMore "Saiba mais"
- mission.phase1: "Você acabou de se mudar para Seul." / knockKnock "Toc toc." / hiNeighbors "Oi, somos seus vizinhos :)"
- mission.worries (18): "\"Pedi comida e não sabia o que havia chegado.\"" / "\"Não tive uma conversa de verdade há semanas.\"" / "\"Todo mundo me olha fixo no metrô.\"" / "\"Meus colegas almoçam juntos e eu fico sozinho.\"" / "\"Não consigo nem ler as placas.\"" / "\"Liguei para minha mãe chorando ontem à noite.\"" / "\"Ninguém me avisou que seria tão solitário.\"" / "\"Não sei como fazer amigos coreanos.\"" / "\"Passo todos os fins de semana sozinho.\"" / "\"Me sinto invisível aqui.\"" / "\"Me perdi e não conseguia pedir ajuda a ninguém.\"" / "\"Vai ser sempre assim?\"" / "\"Jantar sozinho. De novo.\"" / "\"Achei que ficaria mais fácil.\"" / "\"Tem dias que me pergunto por que vim.\"" / "\"O silêncio no apartamento é ensurdecedor.\"" / "\"Sinto falta de ter pessoas que me entendam.\"" / "\"Meu coreano ainda é terrível depois de um ano.\""
- pillars: [{ icon:"🏙️", title:"Só vizinhos", body:"Não somos uma organização formal nem uma agência de turismo. Apenas um grupo de amigos que acredita que a hospitalidade transforma uma cidade estranha em um lar." }, { icon:"🌍", title:"Aberto a todos", body:"Não importa de onde você vem, o que você acredita ou há quanto tempo está aqui. Apareça e você já é um de nós." }, { icon:"💛", title:"Sem agendas ocultas", body:"Não esquecemos como é ser bem-recebido em um país estrangeiro. Queremos ser esses vizinhos para você." }]
- events: label "O que fazemos" / heading "Coisas que fizemos juntos" / subheading "Ainda estamos descobrindo no caminho — e essa é a parte divertida. Um gostinho do que te espera." / cards: [{ emoji:"🥢", type:"Troca Cultural", title:"Festa de Tteokguk do Seollal", date:"Janeiro 2026", description:"Fizemos bolinhos juntos, compartilhamos uma tigela de tteokguk e jogamos Yut Nori — celebrando o Ano Novo coreano com novos amigos." }, { emoji:"⛰️", type:"Natureza e Aventura", title:"Trilha Noturna ao Gwanaksan", date:"Fevereiro 2026", description:"Amarramos os tênis e subimos o 관악산 à noite — Seul brilhando lá embaixo e boa companhia por todos os lados." }, { emoji:"🗣️", type:"Intercâmbio de Idiomas", title:"Noites de Intercâmbio de Idiomas", date:"Último sábado de cada mês", description:"Praticando coreano e inglês com jogos em grupo, risadas e o ocasional erro de gramática embaraçoso. Todos são bem-vindos, sem necessidade de fluência." }, { emoji:"☕", type:"Encontros Casuais", title:"Café e Conversa", date:"Contínuo", description:"Às vezes é só tomar um café, comer algo bom e ter conversas de verdade. Sem agenda — só pessoas se conhecendo." }]
- impact.metrics: [{ label:"países representados" }, { label:"vizinhos recebidos" }, { label:"eventos realizados" }, { label:"uma grande família" }]
- upcoming: label "O que vem aí" / heading "Próximos eventos" / subheading "Todos os eventos são gratuitos e abertos a todos. É só aparecer."
- gallery: label "Momentos juntos" / heading "Um vislumbre do nosso bairro" / subheading "Pessoas reais, momentos reais, conexões reais."
- testimonials: label "Da nossa vizinhança" / heading "O que as pessoas dizem"
- globe: label "Nossa comunidade" / heading "De todos os cantos do mundo" / subheading "Nossos vizinhos vêm de todos os cantos do globo." / addPin "+ Adicionar meu marcador" / beFirst "Seja o primeiro a adicionar seu marcador!" / modalTitle "Adicionar meu marcador" / modalSubtitle "Você vai aparecer no globo na hora." / formName "Nome" / formNamePlaceholder "Seu primeiro nome" / formCity "Cidade" / formCityPlaceholder "Buscar qualquer cidade do mundo..." / formNote "Uma frase sobre você" / formNotePlaceholder "ex: Vim a trabalho, fiquei pela comida" / formInstagram "Instagram" / formInstagramOptional "(opcional)" / formSubmit "Adicionar marcador" / formSubmitting "Enviando..." / formError "Algo deu errado. Tente de novo!" / successTitle "Você está no mapa!" / successSubtitle "Você está no globo. Bem-vindo, vizinho." / noCitiesFound "Nenhuma cidade encontrada — tente outro nome" / neighborCount "{count} vizinhos de todos os cantos do mundo"
- survivalKit: label "Kit de sobrevivência em Seul" / heading "Coisas que vale saber" / subheading "Coisas que seus vizinhos gostariam de ter sabido quando chegaram na Coreia." / categories: [{ title:"Como se locomover", items:[{note:"Rotas de metrô e chegadas em tempo real"},{note:"Navegação — melhor que o Google Maps aqui"},{note:"Cartão de transporte pré-pago, compre em qualquer conveniência"}] }, { title:"Alimentação e vida diária", items:[{note:"Aplicativo de delivery mais popular"},{note:"Entrega rápida, frequentemente com promoções"},{note:"Tudo que você precisa por menos de ₩5.000"}] }, { title:"Comunicação", items:[{note:"Como todo mundo na Coreia se comunica"},{note:"Melhor aplicativo de tradução coreano ↔ inglês"},{note:"Vocabulário rico e exemplos de frases"}] }, { title:"Aplicativos úteis", items:[{note:"Principal mecanismo de busca e mapas da Coreia"},{note:"Marketplace local e aplicativo de bairro"},{note:"Compras online com entrega no dia seguinte"}] }, { title:"Saúde", items:[{note:"Encontre a farmácia mais próxima"},{note:"Busca de médicos que falam inglês"},{note:"Cadastre-se dentro de 6 meses após a chegada"}] }, { title:"Números de emergência", items:[{note:"Polícia"},{note:"Bombeiros e ambulância"},{note:"Linha de ajuda ao turista na Coreia (inglês)"}] }]
- faq: label "Perguntas" / heading "O que as pessoas perguntam" / items: [{ q:"Esses eventos são religiosos?" }, { q:"Preciso falar coreano para participar?", a:"Não. Muitos de nós ainda estamos aprendendo também. Os eventos são bilíngues — inglês e coreano — e nossas noites de intercâmbio de idiomas são abertas a iniciantes completos. Também temos membros coreanos que falam espanhol, português, japonês e mandarim, então não hesite mesmo que inglês ou coreano não sejam o seu forte. Sem pressão alguma." }, { q:"Há alguma taxa ou requisito de associação?", a:"Não há taxa de associação — nunca. Nossos eventos regulares de intercâmbio de idiomas e alguns eventos especiais podem ter uma pequena taxa de participação (menos de ₩10.000), que vai inteiramente para lanches e materiais. Para jantares ou atividades, não há taxa extra — apenas traga o suficiente para cobrir sua própria refeição ou atividade." }, { q:"Como fico sabendo dos próximos eventos?" }, { q:"Quem organiza o KND?", a:"Um pequeno grupo de amigos da Sigwang Church. Alguns de nós já moraram no exterior. Alguns estudaram fora. Mas todos nós, de alguma forma, já sentimos o que é não se sentir em casa — e também fomos acolhidos. Queremos apenas ser os vizinhos que ajudam o desconhecido a parecer um pouco mais com um lar." }, { q:"Posso trazer um amigo?", a:"Por favor. Quanto mais, melhor." }]
- contact: heading "Junte-se ao bairro" / subheading "Venha como convidado, fique como vizinho. Siga-nos no Instagram ou entre no nosso grupo do KakaoTalk para ficar por dentro." / instagram "Instagram" / kakao "KakaoTalk Open Chat"
- phraseOfDay: label "Coreano do dia" / phrases (30): { english:"Obrigado", context:"A palavra mais útil na Coreia" } / { english:"Esse aqui, por favor", context:"Aponte para o cardápio e diga isso" } / { english:"Quanto custa?", context:"Essencial em mercados e feiras" } / { english:"Onde fica o banheiro?", context:"Você vai precisar disso — confie em nós" } / { english:"Tudo bem", context:"Também significa 'Você está bem?'" } / { english:"Olá", context:"Use essa saudação em qualquer lugar" } / { english:"Desculpe", context:"Pedido de desculpas educado para qualquer situação" } / { english:"Gostaria de pedir", context:"Diga isso para chamar a atenção do garçom" } / { english:"Está delicioso!", context:"Elogie o chef — eles adoram" } / { english:"A conta, por favor", context:"Faça um sinal e diga isso quando terminar" } / { english:"Sim", context:"Também pronunciado 'de' — os dois funcionam" } / { english:"Não", context:"Maneira educada de recusar" } / { english:"Um momento", context:"Ganha tempo em qualquer situação" } / { english:"Com licença! (Por aqui!)", context:"Para chamar o atendente no restaurante — completamente normal" } / { english:"Água, por favor", context:"A água geralmente é gratuita nos restaurantes" } / { english:"Mais um, por favor", context:"Funciona para refis, acompanhamentos extras, qualquer coisa" } / { english:"Posso pagar com cartão?", context:"Quase todo lugar aceita cartão na Coreia" } / { english:"Qual é a senha do Wi-Fi?", context:"Geralmente está numa placa ou no recibo" } / { english:"Por favor, tire uma foto minha", context:"Entregue seu celular e peça" } / { english:"O que é isso?", context:"Aponte para algo e pergunte" } / { english:"Por favor, me recomende algo", context:"Ótimo em restaurantes quando o cardápio é enorme" } / { english:"Para viagem, por favor", context:"Para pedir para levar" } / { english:"Por favor, me ajude", context:"Os coreanos são incrivelmente prestativos com novos vizinhos" } / { english:"Fale mais devagar, por favor", context:"Salva-vidas quando falam rápido demais" } / { english:"Não falo coreano", context:"Ironicamente, dizer isso em coreano impressiona as pessoas" } / { english:"Tem alguma conveniência perto daqui?", context:"Tem uma a cada 50 metros — mas por via das dúvidas" } / { english:"Onde eu embarco?", context:"Para ônibus, metrô e trens" } / { english:"Uma garrafa de soju, por favor", context:"Desbloqueie a experiência completa de jantar coreano" } / { english:"Sério?", context:"Reaja como um local — funciona em qualquer conversa" } / { english:"É divertido / interessante", context:"Ótima reação a qualquer coisa animada" }
- footer.copyright: "Koreans Next Door · Seul, Coreia"

- [ ] **Step 2: Verify + commit**

```bash
npx tsc --noEmit 2>&1 | grep "pt.ts"
git add lib/i18n/pt.ts && git commit -m "feat(i18n): add Portuguese dictionary"
```

---

## Task 6: Create Spanish (`lib/i18n/es.ts`)

- [ ] **Step 1: Create `lib/i18n/es.ts`**

Key values:
- navbar: joinUs "Únete" / ourStory "Nuestra Historia" / events "Eventos" / guides "Guías" / tools "Herramientas"
- hero.tagline: "Caminando a tu lado para que todos podamos sentirnos en casa en tierra extraña." / learnMore "Saber más"
- mission.phase1: "Acabas de mudarte a Seúl." / knockKnock "Toc toc." / hiNeighbors "Hola, somos tus vecinos :)"
- mission.worries (18): "\"Pedí comida y no tenía idea de lo que llegó.\"" / "\"No he tenido una conversación de verdad en semanas.\"" / "\"Todos me miran fijo en el metro.\"" / "\"Mis compañeros de trabajo almuerzan juntos y yo me quedo solo.\"" / "\"Ni siquiera puedo leer los letreros.\"" / "\"Anoche llamé a mi mamá llorando.\"" / "\"Nadie me avisó que sería tan solitario.\"" / "\"No sé cómo hacer amigos coreanos.\"" / "\"Paso todos los fines de semana solo.\"" / "\"Me siento invisible aquí.\"" / "\"Me perdí y no podía pedirle ayuda a nadie.\"" / "\"¿Siempre va a ser así?\"" / "\"Cené solo. De nuevo.\"" / "\"Pensé que se pondría más fácil.\"" / "\"Algunos días me pregunto por qué vine.\"" / "\"El silencio en mi apartamento es ensordecedor.\"" / "\"Extraño tener personas que me entiendan.\"" / "\"Mi coreano sigue siendo terrible después de un año.\""
- pillars: [{ icon:"🏙️", title:"Solo vecinos", body:"No somos una organización formal ni una agencia de turismo. Solo un grupo de amigos que cree que la hospitalidad convierte una ciudad desconocida en un hogar familiar." }, { icon:"🌍", title:"Abierto a todos", body:"No importa de dónde vengas, qué creas o cuánto tiempo llevas aquí. Aparece y ya eres uno de nosotros." }, { icon:"💛", title:"Sin agendas ocultas", body:"No olvidamos lo que se siente al ser bienvenido en un país extranjero. Solo queremos ser esos vecinos para ti." }]
- events: label "Lo que hacemos" / heading "Cosas que hemos hecho juntos" / subheading "Todavía lo vamos descubriendo sobre la marcha — y eso es parte de la diversión. Aquí un adelanto de lo que te espera." / cards: [{ emoji:"🥢", type:"Intercambio Cultural", title:"Fiesta de Tteokguk en Seollal", date:"Enero 2026", description:"Hicimos dumplings juntos, compartimos un bowl de tteokguk y jugamos Yut Nori — celebrando el Año Nuevo coreano con nuevos amigos." }, { emoji:"⛰️", type:"Naturaleza y Aventura", title:"Caminata Nocturna al Gwanaksan", date:"Febrero 2026", description:"Nos atamos los zapatos y subimos al 관악산 de noche — Seúl brillando debajo de nosotros y buena compañía por todos lados." }, { emoji:"🗣️", type:"Intercambio de Idiomas", title:"Noches de Intercambio de Idiomas", date:"Último sábado de cada mes", description:"Practicando coreano e inglés con juegos en grupo, risas y algún que otro error gramatical. Todos son bienvenidos, sin necesidad de ser fluente." }, { emoji:"☕", type:"Encuentros Casuales", title:"Café y Conversación", date:"Continuamente", description:"A veces es solo tomar un café, comer algo rico y tener conversaciones de verdad. Sin agenda — solo personas conociéndose." }]
- impact.metrics: [{ label:"países representados" }, { label:"vecinos recibidos" }, { label:"eventos organizados" }, { label:"una gran familia" }]
- upcoming: label "Lo que viene" / heading "Próximos eventos" / subheading "Todos los eventos son gratuitos y abiertos a todos. Solo aparece."
- gallery: label "Momentos juntos" / heading "Una mirada a nuestro barrio" / subheading "Personas reales, momentos reales, conexiones reales."
- testimonials: label "De nuestros vecinos" / heading "Lo que dicen"
- globe: label "Nuestra comunidad" / heading "De todo el mundo" / subheading "Nuestros vecinos vienen de todos los rincones del globo." / addPin "+ Añadir mi marcador" / beFirst "¡Sé el primero en añadir tu marcador!" / modalTitle "Añadir mi marcador" / modalSubtitle "Aparecerás en el globo de inmediato." / formName "Nombre" / formNamePlaceholder "Tu nombre" / formCity "Ciudad" / formCityPlaceholder "Busca cualquier ciudad del mundo..." / formNote "Una frase sobre ti" / formNotePlaceholder "ej. Vine por trabajo, me quedé por la comida" / formInstagram "Instagram" / formInstagramOptional "(opcional)" / formSubmit "Añadir marcador" / formSubmitting "Enviando..." / formError "Algo salió mal. ¡Inténtalo de nuevo!" / successTitle "¡Estás en el mapa!" / successSubtitle "Estás en el globo. Bienvenido, vecino." / noCitiesFound "No se encontraron ciudades — prueba con otro nombre" / neighborCount "{count} vecinos de todo el mundo"
- survivalKit: label "Kit de supervivencia en Seúl" / heading "Cosas que vale la pena saber" / subheading "Cosas que tus vecinos desearían haber sabido cuando llegaron a Corea." / categories: [{ title:"Cómo moverse", items:[{note:"Rutas de metro y llegadas en tiempo real"},{note:"Navegación — mejor que Google Maps aquí"},{note:"Tarjeta de transporte recargable, cómprala en cualquier tienda de conveniencia"}] }, { title:"Comida y vida diaria", items:[{note:"La app de delivery más popular"},{note:"Entrega rápida, frecuentemente con promociones"},{note:"Todo lo que necesitas por menos de ₩5.000"}] }, { title:"Comunicación", items:[{note:"Cómo se comunica todo el mundo en Corea"},{note:"La mejor app de traducción coreano ↔ inglés"},{note:"Vocabulario rico y frases de ejemplo"}] }, { title:"Apps útiles", items:[{note:"El principal motor de búsqueda y mapas de Corea"},{note:"Mercado local y app de barrio"},{note:"Compras online con entrega al día siguiente"}] }, { title:"Salud", items:[{note:"Encuentra la farmacia más cercana"},{note:"Búsqueda de médicos que hablan inglés"},{note:"Regístrate dentro de los 6 meses de llegada"}] }, { title:"Números de emergencia", items:[{note:"Policía"},{note:"Bomberos y ambulancia"},{note:"Línea de ayuda al turista en Corea (inglés)"}] }]
- faq: label "Preguntas" / heading "Lo que la gente pregunta" / items: [{ q:"¿Estos eventos son religiosos?" }, { q:"¿Necesito hablar coreano para unirme?", a:"Para nada. Muchos de nosotros también estamos aprendiendo. Los eventos son bilingües — inglés y coreano — y nuestras noches de intercambio de idiomas están abiertas a principiantes totales. También tenemos miembros coreanos que hablan español, portugués, japonés y mandarín, así que no dudes en venir aunque el inglés o el coreano no sean lo tuyo. Sin presión alguna." }, { q:"¿Hay algún costo o requisito de membresía?", a:"No hay cuota de membresía — nunca. Nuestros eventos regulares de intercambio de idiomas y algunos eventos especiales pueden tener una pequeña tarifa de participación (menos de ₩10.000), que va íntegramente a snacks y materiales. Para cenas o actividades, no hay tarifa extra — solo trae suficiente para cubrir tu propia comida o actividad." }, { q:"¿Cómo me entero de los próximos eventos?" }, { q:"¿Quién organiza KND?", a:"Un pequeño grupo de amigos de Sigwang Church. Algunos de nosotros hemos vivido en el extranjero. Algunos hemos estudiado fuera. Pero todos nosotros, de alguna manera, hemos sentido lo que es no sentirse en casa — y también hemos sido bienvenidos. Solo queremos ser los vecinos que ayuden a que lo desconocido se sienta un poco más como un hogar." }, { q:"¿Puedo traer a un amigo?", a:"Por favor. Cuantos más, mejor." }]
- contact: heading "Únete al barrio" / subheading "Ven como invitado, quédate como vecino. Síguenos en Instagram o únete a nuestro grupo de KakaoTalk para enterarte de lo que hay." / instagram "Instagram" / kakao "KakaoTalk Open Chat"
- phraseOfDay: label "Coreano del día" / phrases (30): { english:"Gracias", context:"La palabra más útil en Corea" } / { english:"Esto, por favor", context:"Señala el menú y di esto" } / { english:"¿Cuánto cuesta?", context:"Esencial en mercados y puestos callejeros" } / { english:"¿Dónde está el baño?", context:"Lo necesitarás — créenos" } / { english:"Está bien", context:"También significa '¿Estás bien?'" } / { english:"Hola", context:"Úsalo como saludo en cualquier lugar" } / { english:"Lo siento", context:"Disculpa educada para cualquier situación" } / { english:"Quisiera ordenar", context:"Di esto para llamar la atención del mesero" } / { english:"¡Está delicioso!", context:"Elogia al chef — les encanta" } / { english:"La cuenta, por favor", context:"Haz un gesto y di esto cuando termines" } / { english:"Sí", context:"También se pronuncia 'de' — ambos funcionan" } / { english:"No", context:"Manera educada de declinar" } / { english:"Un momento", context:"Te gana tiempo en cualquier situación" } / { english:"¡Perdón! (¡Aquí!)", context:"Para llamar al personal en restaurantes — completamente normal" } / { english:"Agua, por favor", context:"El agua suele ser gratis en los restaurantes" } / { english:"Uno más, por favor", context:"Sirve para recargas, acompañamientos extra, cualquier cosa" } / { english:"¿Puedo pagar con tarjeta?", context:"Casi todos los lugares aceptan tarjeta en Corea" } / { english:"¿Cuál es la contraseña del Wi-Fi?", context:"Suele estar en un cartel o en el recibo" } / { english:"¿Puedes tomarme una foto?", context:"Entrega tu teléfono y pregunta" } / { english:"¿Qué es esto?", context:"Señala algo y pregunta" } / { english:"Por favor, recomiéndame algo", context:"Genial en restaurantes cuando el menú es abrumador" } / { english:"Para llevar, por favor", context:"Para pedir que te lo empaquen" } / { english:"Por favor, ayúdame", context:"Los coreanos son increíblemente serviciales con los nuevos vecinos" } / { english:"Habla más despacio, por favor", context:"Un salvavidas cuando hablan demasiado rápido" } / { english:"No hablo coreano", context:"Irónicamente, decir esto en coreano impresiona a la gente" } / { english:"¿Hay una tienda de conveniencia cerca?", context:"Hay una cada 50 metros — pero por si acaso" } / { english:"¿Dónde me subo?", context:"Para autobuses, metro y trenes" } / { english:"Una botella de soju, por favor", context:"Desbloquea la experiencia completa de cena coreana" } / { english:"¿En serio?", context:"Reacciona como un local — funciona en cualquier conversación" } / { english:"Es divertido / interesante", context:"Buena reacción ante cualquier cosa entretenida" }
- footer.copyright: "Koreans Next Door · Seúl, Corea"

- [ ] **Step 2: Verify + commit**

```bash
npx tsc --noEmit 2>&1 | grep "es.ts"
git add lib/i18n/es.ts && git commit -m "feat(i18n): add Spanish dictionary"
```

---

## Task 7: Create `LanguagePicker` component

**File:** Create `components/LanguagePicker.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const LANG_OPTIONS: { locale: Locale; native: string; subtitle: string }[] = [
  { locale: "ko", native: "한국어", subtitle: "Korean" },
  { locale: "en", native: "English", subtitle: "English" },
  { locale: "ja", native: "日本語", subtitle: "Japanese" },
  { locale: "zh-CN", native: "简体中文", subtitle: "Simplified" },
  { locale: "zh-TW", native: "繁體中文", subtitle: "Traditional" },
  { locale: "pt", native: "Português", subtitle: "Portuguese" },
  { locale: "es", native: "Español", subtitle: "Spanish" },
];

interface Props {
  dark: boolean;
}

export default function LanguagePicker({ dark }: Props) {
  const { locale, setLocale, isLoading } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className={`flex items-center justify-center w-[34px] h-[34px] rounded-[10px] transition-colors duration-300 ${
          dark ? "bg-zinc-100 hover:bg-zinc-200" : "bg-white/15 hover:bg-white/25"
        }`}
      >
        {isLoading ? (
          <span
            className="block w-4 h-4 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: dark ? "#71717a" : "rgba(255,255,255,0.7)" }}
          />
        ) : (
          <span className="text-base leading-none select-none">🌐</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-xl border border-zinc-100/80 p-1.5 min-w-[180px] z-50">
          {LANG_OPTIONS.map(({ locale: l, native, subtitle }) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              className={`w-full flex justify-between items-center px-3.5 py-2.5 rounded-xl transition-colors ${
                locale === l ? "bg-zinc-100" : "hover:bg-zinc-50"
              }`}
            >
              <span className={`text-sm ${locale === l ? "font-bold text-zinc-950" : "font-semibold text-zinc-800"}`}>
                {native}
              </span>
              <span className="text-[10px] text-zinc-400">{subtitle}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify no type errors**

```bash
npx tsc --noEmit 2>&1 | grep "LanguagePicker"
```

- [ ] **Step 3: Commit**

```bash
git add components/LanguagePicker.tsx
git commit -m "feat: add LanguagePicker component (globe icon + 7-locale dropdown)"
```

---

## Task 8: Extend `lib/guideData.ts`

- [ ] **Step 1: Update `GuideGroup` interface and `guideCategories`**

Add these fields to the `GuideGroup` interface (after existing fields):

```ts
import type { Locale } from "@/lib/i18n/types";

export interface GuideGroup {
  href: string;
  labelEn: string; labelKo: string; labelJa: string; labelZhCN: string; labelZhTW: string; labelPt: string; labelEs: string;
  descEn: string;  descKo: string;  descJa: string;  descZhCN: string;  descZhTW: string;  descPt: string;  descEs: string;
  items: { en: string[]; ko: string[]; ja: string[]; zhCN: string[]; zhTW: string[]; pt: string[]; es: string[] };
  bg: string; labelColor: string; headingColor: string; descColor: string; itemColor: string; dotColor: string; arrowColor: string;
  category: GuideCategory;
  emoji: string;
}
```

Update `guideCategories` type to include locale labels:

```ts
export const guideCategories: {
  id: GuideCategory;
  labelEn: string; labelKo: string; labelJa: string; labelZhCN: string; labelZhTW: string; labelPt: string; labelEs: string;
}[] = [
  { id: "getting-started", labelEn: "Getting Started", labelKo: "처음 시작", labelJa: "はじめに", labelZhCN: "入门指南", labelZhTW: "入門指南", labelPt: "Primeiros Passos", labelEs: "Primeros Pasos" },
  { id: "living-here", labelEn: "Living Here", labelKo: "생활하기", labelJa: "生活する", labelZhCN: "在这里生活", labelZhTW: "在這裡生活", labelPt: "Vivendo Aqui", labelEs: "Viviendo Aquí" },
  { id: "wellbeing", labelEn: "Wellbeing", labelKo: "건강 & 안전", labelJa: "健康・安全", labelZhCN: "健康与安全", labelZhTW: "健康與安全", labelPt: "Bem-Estar", labelEs: "Bienestar" },
  { id: "discover", labelEn: "Discover Seoul", labelKo: "서울 탐험", labelJa: "ソウル探訪", labelZhCN: "发现首尔", labelZhTW: "發現首爾", labelPt: "Descobrir Seul", labelEs: "Descubrir Seúl" },
];
```

Add helpers at the bottom of the file:

```ts
export function getGuideLabel(g: GuideGroup, locale: Locale): string {
  switch (locale) {
    case "ko": return g.labelKo;
    case "ja": return g.labelJa;
    case "zh-CN": return g.labelZhCN;
    case "zh-TW": return g.labelZhTW;
    case "pt": return g.labelPt;
    case "es": return g.labelEs;
    default: return g.labelEn;
  }
}

export function getGuideDesc(g: GuideGroup, locale: Locale): string {
  switch (locale) {
    case "ko": return g.descKo;
    case "ja": return g.descJa;
    case "zh-CN": return g.descZhCN;
    case "zh-TW": return g.descZhTW;
    case "pt": return g.descPt;
    case "es": return g.descEs;
    default: return g.descEn;
  }
}

export function getGuideCategoryLabel(
  cat: typeof guideCategories[number],
  locale: Locale
): string {
  switch (locale) {
    case "ko": return cat.labelKo;
    case "ja": return cat.labelJa;
    case "zh-CN": return cat.labelZhCN;
    case "zh-TW": return cat.labelZhTW;
    case "pt": return cat.labelPt;
    case "es": return cat.labelEs;
    default: return cat.labelEn;
  }
}
```

- [ ] **Step 2: Add locale fields to each `guideGroups` entry**

For each of the 10 guide groups, add the locale label/desc/items. Values:

**Settle In (`/guide/settle`)**:
- labelJa "定住する" / labelZhCN "安家落户" / labelZhTW "安家落戶" / labelPt "Instalar-se" / labelEs "Establecerse"
- descJa "最初の実用的なステップ：登録、銀行、健康保険、アプリ。" / descZhCN "实用的第一步：登记、银行、健康保险和应用程序。" / descZhTW "實用的第一步：登記、銀行、健康保險和應用程式。" / descPt "Os primeiros passos práticos: registro, banco, seguro saúde e apps." / descEs "Los primeros pasos prácticos: registro, banca, seguro médico y apps."
- items.ja ["最初の一週間チェックリスト","行政手続きガイド","ソウル・サバイバルキット"] / items.zhCN ["第一周清单","行政手续向导","首尔生存指南"] / items.zhTW ["第一週清單","行政手續向導","首爾生存指南"] / items.pt ["Lista da Primeira Semana","Guia Burocrático","Kit de Sobrevivência em Seul"] / items.es ["Lista de la Primera Semana","Asistente Burocrático","Kit de Supervivencia en Seúl"]

**Visa & Immigration (`/guide/visa`)**:
- labelJa "ビザ・入管" / labelZhCN "签证与移民" / labelZhTW "簽證與移民" / labelPt "Visto e Imigração" / labelEs "Visa e Inmigración"
- descJa "ビザの種類を確認し、外国人登録証を理解し、入国管理局をスムーズに利用する。" / descZhCN "了解你的签证类型、外国人登录证和出入境手续。" / descZhTW "了解你的簽證類型、外國人登錄證和出入境手續。" / descPt "Encontre seu tipo de visto, entenda o ARC e navegue pelos escritórios de imigração sem stress." / descEs "Encuentra tu tipo de visa, entiende el ARC y navega por las oficinas de inmigración sin estrés."
- items.ja ["ビザ検索","ビザタイプガイド","入国管理局のコツ"] / items.zhCN ["签证向导","签证类型指南","出入境事务所技巧"] / items.zhTW ["簽證向導","簽證類型指南","出入境事務所技巧"] / items.pt ["Assistente de Visto","Guia de Tipos de Visto","Dicas para o Escritório de Imigração"] / items.es ["Asistente de Visa","Guía de Tipos de Visa","Consejos para la Oficina de Inmigración"]

**Housing (`/guide/housing`)**:
- labelJa "住まい" / labelZhCN "住房" / labelZhTW "住房" / labelPt "Moradia" / labelEs "Vivienda"
- descJa "チョンセ・ウォルセ・契約書のリスクポイント・地域選び、詐欺に遭わない方法。" / descZhCN "全租、月租、合同红线、选区和避免被骗的方法。" / descZhTW "全租、月租、合約紅線、選區和避免被騙的方法。" / descPt "Jeonse, wolse, armadilhas em contratos, escolha de bairro e como não ser enganado." / descEs "Jeonse, wolse, señales de alerta en contratos, selector de barrio y cómo no ser estafado."
- items.ja ["チョンセ vs ウォルセ","地域選び","賃貸契約書ガイド"] / items.zhCN ["全租vs月租","选区推荐","租赁合同指南"] / items.zhTW ["全租vs月租","選區推薦","租賃合約指南"] / items.pt ["Jeonse vs Wolse","Seletor de Bairro","Guia de Contrato de Aluguel"] / items.es ["Jeonse vs Wolse","Selector de Barrio","Guía de Contrato de Arrendamiento"]

**Money & Banking (`/guide/money`)**:
- labelJa "金融・銀行" / labelZhCN "金融与银行" / labelZhTW "金融與銀行" / labelPt "Dinheiro e Banco" / labelEs "Dinero y Banca"
- descJa "銀行口座の開設、海外送金、納税申告、年金について。" / descZhCN "开设银行账户、汇款回国、报税和了解你的养老金。" / descZhTW "開設銀行帳戶、匯款回國、報稅和了解你的養老金。" / descPt "Abra uma conta bancária, transfira dinheiro para casa, declare impostos e entenda sua pensão." / descEs "Abre una cuenta bancaria, transfiere dinero a casa, declara impuestos y entiende tu pensión."
- items.ja ["銀行口座開設ガイド","送金比較","生活費計算機"] / items.zhCN ["银行账户指南","汇款比较","生活费计算器"] / items.zhTW ["銀行帳戶指南","匯款比較","生活費計算機"] / items.pt ["Guia de Conta Bancária","Comparação de Transferências","Calculadora de Custo de Vida"] / items.es ["Guía de Cuenta Bancaria","Comparación de Transferencias","Calculadora de Costo de Vida"]

**Daily Life (`/guide/daily`)**:
- labelJa "日常生活" / labelZhCN "日常生活" / labelZhTW "日常生活" / labelPt "Vida Cotidiana" / labelEs "Vida Cotidiana"
- descJa "ゴミ分別のルール、デリバリーアプリ、携帯プラン、公共料金、交通手段。" / descZhCN "垃圾分类规定、外卖应用、手机套餐、水电费和出行方式。" / descZhTW "垃圾分類規定、外送應用、手機方案、水電費和出行方式。" / descPt "Regras de reciclagem, apps de delivery, planos de telefone, contas de serviços e como se locomover." / descEs "Reglas de reciclaje, apps de delivery, planes de teléfono, facturas de servicios y cómo moverse."
- items.ja ["ゴミ分別ガイド","携帯プラン","必須アプリ"] / items.zhCN ["垃圾分类指南","手机套餐","必备应用"] / items.zhTW ["垃圾分類指南","手機方案","必備應用"] / items.pt ["Guia de Reciclagem","Planos de Telefone","Apps Essenciais"] / items.es ["Guía de Reciclaje","Planes de Teléfono","Apps Esenciales"]

**Working in Korea (`/guide/work`)**:
- labelJa "韓国で働く" / labelZhCN "在韩工作" / labelZhTW "在韓工作" / labelPt "Trabalhando na Coreia" / labelEs "Trabajando en Corea"
- descJa "労働契約書、労働権、職場文化、就職活動のリソース。" / descZhCN "劳动合同、劳工权益、职场文化和求职资源。" / descZhTW "勞動合約、勞工權益、職場文化和求職資源。" / descPt "Contratos de trabalho, direitos trabalhistas, cultura do local de trabalho e recursos para encontrar emprego." / descEs "Contratos de trabajo, derechos laborales, cultura laboral y recursos para buscar empleo."
- items.ja ["契約書の注意点","労働権利","職場文化"] / items.zhCN ["合同注意事项","劳工权益","职场文化"] / items.zhTW ["合約注意事項","勞工權益","職場文化"] / items.pt ["Sinais de Alerta no Contrato","Direitos Trabalhistas","Cultura do Trabalho"] / items.es ["Señales de Alerta en el Contrato","Derechos Laborales","Cultura Laboral"]

**Healthcare (`/guide/health`)**:
- labelJa "医療案内" / labelZhCN "医疗指南" / labelZhTW "醫療指南" / labelPt "Saúde" / labelEs "Salud"
- descJa "韓国のクリニックシステムを理解し、近くの英語対応の医師を見つける。" / descZhCN "了解韩国的诊所体系，找到附近会说英语的医生。" / descZhTW "了解韓國的診所體系，找到附近會說英語的醫生。" / descPt "Entenda o sistema de clínicas da Coreia e encontre médicos que falam inglês perto de você." / descEs "Entiende el sistema de clínicas de Corea y encuentra médicos que hablan inglés cerca de ti."
- items.ja ["医療機関の種類ガイド","診療科検索","英語対応クリニック"] / items.zhCN ["诊所类型指南","专科查找","英语友好诊所"] / items.zhTW ["診所類型指南","專科查找","英語友好診所"] / items.pt ["Guia de Tipos de Clínica","Buscador de Especialidades","Clínicas com Atendimento em Inglês"] / items.es ["Guía de Tipos de Clínica","Buscador de Especialidades","Clínicas con Atención en Inglés"]

**Mental Health (`/guide/mental-health`)**:
- labelJa "こころの健康" / labelZhCN "心理健康" / labelZhTW "心理健康" / labelPt "Saúde Mental" / labelEs "Salud Mental"
- descJa "カルチャーショック、英語対応のセラピスト、危機サポート、コミュニティ情報。" / descZhCN "文化冲击、会英语的心理咨询师、危机资源和支持团体。" / descZhTW "文化衝擊、會英語的心理諮詢師、危機資源和支持團體。" / descPt "Choque cultural, terapeutas que falam inglês, recursos de crise e grupos de apoio." / descEs "Choque cultural, terapeutas que hablan inglés, recursos de crisis y grupos de apoyo."
- items.ja ["カルチャーショックガイド","セラピストディレクトリ","危機サポート"] / items.zhCN ["文化冲击指南","咨询师目录","危机资源"] / items.zhTW ["文化衝擊指南","諮詢師目錄","危機資源"] / items.pt ["Guia de Choque Cultural","Diretório de Terapeutas","Recursos de Crise"] / items.es ["Guía de Choque Cultural","Directorio de Terapeutas","Recursos de Crisis"]

**In a Pinch (`/guide/pinch`)**:
- labelJa "困ったとき" / labelZhCN "紧急情况" / labelZhTW "緊急情況" / labelPt "Em Apuros" / labelEs "En Apuros"
- descJa "暗黙のルール、緊急情報、そして困ったときに聞ける隣人。" / descZhCN "不成文的规则、紧急信息，以及遇到困难时可以询问的邻居。" / descZhTW "不成文的規則、緊急資訊，以及遇到困難時可以詢問的鄰居。" / descPt "Regras não escritas, informações de emergência e um vizinho real para perguntar quando estiver perdido." / descEs "Reglas no escritas, información de emergencia y un vecino real a quien preguntar cuando estés atascado."
- items.ja ["韓国文化のコツ","緊急ロック画面カード","隣人に聞く"] / items.zhCN ["韩国文化技巧","紧急锁屏卡","向邻居求助"] / items.zhTW ["韓國文化技巧","緊急鎖屏卡","向鄰居求助"] / items.pt ["Dicas Culturais","Cartão de Bloqueio de Tela de Emergência","Pergunte a um Vizinho"] / items.es ["Consejos Culturales","Tarjeta de Pantalla de Bloqueo de Emergencia","Pregunta a un Vecino"]

**Explore Seoul (`/guide/explore`)**:
- labelJa "ソウル探訪" / labelZhCN "探索首尔" / labelZhTW "探索首爾" / labelPt "Explorar Seul" / labelEs "Explorar Seúl"
- descJa "食べ物、地域、各季節の感じ方を理解する。" / descZhCN "了解美食、社区和每个季节的感受。" / descZhTW "了解美食、社區和每個季節的感受。" / descPt "Entenda a comida, os bairros e como cada estação do ano se sente." / descEs "Entiende la comida, los barrios y cómo se siente cada estación del año."
- items.ja ["韓国料理ガイド","地域案内","季節カレンダー"] / items.zhCN ["韩国美食解析","社区指南","季节日历"] / items.zhTW ["韓國美食解析","社區指南","季節日曆"] / items.pt ["Decodificador de Comida Coreana","Guia de Bairros","Calendário das Estações"] / items.es ["Decodificador de Comida Coreana","Guía de Barrios","Calendario de Temporadas"]

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit 2>&1 | grep "guideData"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/guideData.ts
git commit -m "feat(i18n): extend guideData with 5 locale fields + helper functions"
```

---

## Task 9: Update `SharedNavbar.tsx`

**File:** Modify `components/SharedNavbar.tsx`

- [ ] **Step 1: Update imports**

Add to existing imports:
```tsx
import LanguagePicker from "@/components/LanguagePicker";
import { getGuideLabel, getGuideCategoryLabel } from "@/lib/guideData";
```

- [ ] **Step 2: Remove `isKo` and update nav links**

Remove: `const isKo = locale === "ko";`

Replace the two nav link arrays that use `isKo ? ... : ...` with `t.navbar.*`:

```tsx
// Desktop nav links
{ label: t.navbar.ourStory, href: "/#mission" },
{ label: t.navbar.events, href: "/#events" },

// Guides dropdown button label
{t.navbar.guides}

// Tools section heading
{t.navbar.tools}
```

- [ ] **Step 3: Update guide label rendering**

Replace all `isKo ? g.labelKo : g.labelEn` with `getGuideLabel(g, locale)`.
Replace all `isKo ? cat.labelKo : cat.labelEn` with `getGuideCategoryLabel(cat, locale)`.
Replace all `isKo ? tool.labelKo : tool.labelEn` — the TOOLS array still uses `labelKo`/`labelEn`; add a helper inline or extend TOOLS to include all locales. Simplest: add a `getToolLabel` helper inline:

```tsx
function getToolLabel(tool: typeof TOOLS[number], loc: typeof locale): string {
  // TOOLS only has en/ko; fall back gracefully
  return loc === "ko" ? tool.labelKo : tool.labelEn;
}
```

Note: TOOLS (`/tools/phrasebook`, `/tools/forms`) labels only have en/ko. For other locales they fall back to English. This is acceptable for now.

- [ ] **Step 4: Replace language pill with `<LanguagePicker />`**

Desktop — find the pill toggle block (lines ~231–252 in original file) and replace entirely:
```tsx
{/* Language picker */}
<LanguagePicker dark={dark} />
```

Mobile menu — find the language toggle section (lines ~415–434) and replace:
```tsx
{/* Language picker */}
<div className="pt-5">
  <LanguagePicker dark={true} />
</div>
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add components/SharedNavbar.tsx
git commit -m "feat(i18n): replace language pill with LanguagePicker, use locale helpers in navbar"
```

---

## Task 10: Final verification

- [ ] **Step 1: Full build**

```bash
cd /Users/nelsoncho/projects/koreans-next-door && npm run build 2>&1 | tail -20
```

Expected: build completes, no TypeScript errors.

- [ ] **Step 2: Start dev server and smoke test**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Globe icon appears in navbar
- Clicking opens dropdown with 7 languages
- Switching to Japanese renders Japanese text
- Switching to 简体中文 renders Chinese
- Switching back to English works
- Page refresh remembers selected locale

- [ ] **Step 3: Add `.superpowers/` to `.gitignore` if not present**

```bash
grep -q ".superpowers" .gitignore || echo ".superpowers/" >> .gitignore
git add .gitignore && git commit -m "chore: ignore .superpowers brainstorm dir"
```
