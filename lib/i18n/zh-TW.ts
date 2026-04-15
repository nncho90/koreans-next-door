import type { Dictionary } from "./types";

export const zhTW: Dictionary = {
  navbar: {
    joinUs: "加入我們",
    langToggle: "EN",
    ourStory: "我們的故事",
    events: "活動",
    guides: "指南",
    tools: "工具",
  },
  hero: {
    tagline: "在異鄉，也能感受到家的溫暖。我們陪你一路同行。",
    learnMore: "了解更多",
  },
  mission: {
    phase1: "你剛搬到首爾。",
    knockKnock: "咚咚咚。",
    hiNeighbors: "嗨，我們是你的鄰居 :)",
    worries: [
      "「點了餐，卻不知道送來的是什麼。」",
      "「好幾個星期沒有認真聊過天了。」",
      "「在捷運上，大家都盯著我看。」",
      "「同事們一起吃午飯，我只能一個人坐著。」",
      "「連路牌都看不懂。」",
      "「昨晚哭著給媽媽打了電話。」",
      "「沒人告訴我會這麼孤獨。」",
      "「不知道怎麼交韓國朋友。」",
      "「每個週末都是一個人。」",
      "「在這裡感覺像個隱形人。」",
      "「迷路了，卻沒辦法向任何人問路。」",
      "「一直都會是這種感覺嗎？」",
      "「又一個人吃了晚飯。」",
      "「以為會慢慢好起來的。」",
      "「有時候會想，我當初為什麼要來。」",
      "「公寓裡的寂靜讓人喘不過氣。」",
      "「好想有能理解我的人在身邊。」",
      "「來了一年，韓語還是很爛。」",
    ],
    pillars: [
      {
        icon: "🏙️",
        title: "只是鄰居",
        body: "不是正式組織，也不是旅行社。只是一群相信溫暖的招待能讓陌生城市變成溫馨家園的朋友。",
      },
      {
        icon: "🌍",
        title: "歡迎所有人",
        body: "不管你從哪裡來，信仰什麼，來了多久，來了就是我們中的一員。",
      },
      {
        icon: "💛",
        title: "沒有隱藏議程",
        body: "我們沒有忘記在異國他鄉被人熱情款待的感覺。我們只想成為那樣的鄰居。",
      },
    ],
  },
  events: {
    label: "我們的活動",
    heading: "我們一起做過的事",
    subheading: "我們還在摸索前進 — 這正是樂趣所在。以下是你可以期待的。",
    cards: [
      {
        emoji: "🥢",
        type: "文化交流",
        title: "春節年糕湯派對",
        date: "2026年1月",
        description:
          "我們一起包餃子、分享年糕湯，玩了尤茨遊戲，和新朋友們慶祝韓國新年。",
      },
      {
        emoji: "⛰️",
        type: "自然與冒險",
        title: "冠岳山夜間健行",
        date: "2026年2月",
        description:
          "我們穿上運動鞋，在夜晚登上冠岳山 — 首爾在腳下閃閃發光，身邊有志同道合的夥伴。",
      },
      {
        emoji: "🗣️",
        type: "語言交換",
        title: "語言交換之夜",
        date: "每月最後一個週六",
        description:
          "在小組遊戲和笑聲中練習韓語和英語，偶爾也會犯一些尷尬的文法錯誤。歡迎所有人，不要求流利。",
      },
      {
        emoji: "☕",
        type: "休閒聚會",
        title: "咖啡與閒聊",
        date: "不定期",
        description:
          "有時只是喝杯咖啡、吃點好吃的、進行真誠的交流。沒有特別目的。",
      },
    ],
  },
  impact: {
    metrics: [
      { label: "個國家" },
      { label: "位鄰居" },
      { label: "次活動" },
      { label: "一個大家庭" },
    ],
  },
  upcoming: {
    label: "接下來",
    heading: "即將舉行的活動",
    subheading: "所有活動免費開放，歡迎所有人。隨時來。",
  },
  gallery: {
    label: "共同的瞬間",
    heading: "我們街區的一角",
    subheading: "真實的人，真實的瞬間，真實的連結。",
  },
  testimonials: {
    label: "鄰居的聲音",
    heading: "大家說什麼",
  },
  globe: {
    label: "我們的社區",
    heading: "來自世界各地",
    subheading: "我們的鄰居來自世界各個角落。",
    addPin: "+ 新增你的標記",
    beFirst: "成為第一個新增標記的人！",
    modalTitle: "新增你的標記",
    modalSubtitle: "你將立刻出現在地球儀上。",
    formName: "名字",
    formNamePlaceholder: "請輸入你的名字",
    formCity: "城市",
    formCityPlaceholder: "搜尋世界上的任何城市...",
    formNote: "一句話介紹",
    formNotePlaceholder: "例：來工作的，卻因為食物留了下來",
    formInstagram: "Instagram",
    formInstagramOptional: "（選填）",
    formSubmit: "新增標記",
    formSubmitting: "傳送中...",
    formError: "出了點問題，請再試一次！",
    successTitle: "你上地圖了！",
    successSubtitle: "你出現在地球儀上了。歡迎，鄰居！",
    noCitiesFound: "找不到城市 — 換個名稱試試",
    neighborCount: "來自世界各地的 {count} 位鄰居",
  },
  survivalKit: {
    label: "首爾生存指南",
    heading: "值得了解的事",
    subheading: "鄰居們希望剛來韓國時就知道的事情。",
    categories: [
      {
        title: "出行",
        items: [
          { note: "捷運路線和即時到站資訊" },
          { note: "導航 — 這裡比Google地圖更準確" },
          { note: "可刷卡的交通卡，便利商店可購買" },
        ],
      },
      {
        title: "飲食與日常生活",
        items: [
          { note: "最受歡迎的外送應用" },
          { note: "配送快，經常有優惠活動" },
          { note: "5000韓元以下滿足所有日常需求" },
        ],
      },
      {
        title: "溝通",
        items: [
          { note: "韓國人人都在用的通訊軟體" },
          { note: "最好的韓英翻譯應用" },
          { note: "豐富的詞彙和例句" },
        ],
      },
      {
        title: "實用應用",
        items: [
          { note: "韓國主要搜尋引擎和地圖" },
          { note: "在地二手和社區應用" },
          { note: "隔日到貨的網購平台" },
        ],
      },
      {
        title: "醫療",
        items: [
          { note: "查找最近的藥局" },
          { note: "搜尋會英語的醫生" },
          { note: "入境後6個月內需完成登記" },
        ],
      },
      {
        title: "緊急電話",
        items: [
          { note: "警察" },
          { note: "消防/急救" },
          { note: "韓國旅遊求助熱線（英語）" },
        ],
      },
    ],
  },
  faq: {
    label: "常見問題",
    heading: "大家常問的",
    items: [
      { q: "這些活動是宗教性質的嗎？" },
      {
        q: "不會說韓語可以參加嗎？",
        a: "當然可以。我們中很多人也在學習。活動以雙語（英語和韓語）進行，語言交換之夜歡迎完全的初學者。我們也有會說西班牙語、葡萄牙語、日語和普通話的韓國成員，所以即使英語或韓語不好也不用擔心。完全沒有壓力。",
      },
      {
        q: "有費用或會員要求嗎？",
        a: "永遠沒有會員費。定期的語言交換活動和部分特別活動可能會有少量參與費（10,000韓元以下），全部用於零食和物資。晚餐聚會或活動不額外收費 — 只需帶夠自己的餐費或活動費用。",
      },
      { q: "怎麼知道即將舉行的活動？" },
      {
        q: "KND是誰在運營？",
        a: "시광교회的一小群朋友。有些人在海外生活過，有些人留學過。但我們都有過在異國他鄉感到不自在的經歷，也都被人溫暖地接納過。我們只想成為能讓陌生地方感覺更像家的鄰居。",
      },
      { q: "可以帶朋友來嗎？", a: "當然可以。人越多越好。" },
    ],
  },
  contact: {
    heading: "加入這個街區",
    subheading:
      "以客人身份來，以鄰居身份留下。追蹤我們的Instagram或加入KakaoTalk群組獲取最新消息。",
    instagram: "Instagram",
    kakao: "KakaoTalk群聊",
  },
  phraseOfDay: {
    label: "每日韓語",
    phrases: [
      { english: "表達感謝時", context: "韓國最實用的詞" },
      { english: "點餐時", context: "指著菜單說這句話就行" },
      { english: "問價格時", context: "在市場和路邊攤必備" },
      { english: "問洗手間在哪時", context: "你一定會用到的 — 相信我" },
      { english: "說沒關係時", context: "也有'你還好嗎？'的意思" },
      { english: "打招呼時", context: "走到哪都能用的問候語" },
      { english: "道歉時", context: "任何場合都適用的禮貌道歉" },
      { english: "要點餐時", context: "說這句話引起服務員注意" },
      { english: "說好吃時", context: "誇廚師 — 他們真的很喜歡" },
      { english: "結帳時", context: "揮手說這句話就行" },
      { english: "回答是時", context: "也發音為'데' — 兩個都行" },
      { english: "拒絕時", context: "禮貌拒絕的方式" },
      { english: "讓人稍等時", context: "任何情況下都能爭取時間" },
      { english: "在餐廳叫服務員時", context: "叫餐廳服務員 — 完全正常" },
      { english: "要水時", context: "餐廳裡通常免費" },
      { english: "要再來一份時", context: "續杯、加小菜、任何都行" },
      { english: "問能否刷卡時", context: "韓國幾乎到處都能刷卡" },
      { english: "問WiFi密碼時", context: "通常在牌子上或收據上" },
      { english: "請人幫拍照時", context: "把手機遞過去說這句" },
      { english: "問某物是什麼時", context: "指著東西問" },
      { english: "要推薦時", context: "菜單太多時在餐廳很好用" },
      { english: "打包時", context: "帶走時說這句" },
      { english: "需要幫助時", context: "韓國人對新來的鄰居非常熱心" },
      { english: "讓對方說慢點時", context: "說太快時的救命稻草" },
      { english: "說不會說韓語時", context: "諷刺的是，用韓語說這句會讓人很感動" },
      { english: "問附近有沒有便利商店時", context: "每50公尺就有一家 — 不過以防萬一" },
      { english: "問在哪裡上車時", context: "公車、捷運、火車都適用" },
      { english: "點燒酒時", context: "解鎖正宗韓式用餐體驗" },
      { english: "表示驚訝時", context: "像本地人一樣反應 — 任何對話都能用" },
      { english: "表示有趣時", context: "遇到有意思的事時的反應" },
    ],
  },
  footer: {
    copyright: "科里安斯鄰居 · 首爾，韓國",
  },
};
