"use client";

import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

interface Tip {
  concept: string;
  title: string;
  body: string;
}

const TIPS: Record<Locale, Tip[]> = {
  en: [
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
  ],
  ko: [
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
  ],
  ja: [
    {
      concept: "눈치（ヌンチ）",
      title: "空気を読む",
      body: "눈치は、直接言わなくても相手の気持ちや雰囲気を察する韓国固有の能力です。「眼치がいい人」は説明なしに状況に応じた行動をとります。会話中に友人が突然黙り込んだ場合、言葉なく何かを伝えているのかもしれません。注意して観察しましょう。"
    },
    {
      concept: "나이（年齢）",
      title: "すぐ年齢を聞くのはなぜ？",
      body: "韓国語は相手との年齢差によって敬語(존댓말)か砕けた言葉(반말)かが変わります。初対面で年齢を聞くのは失礼ではなく、どう話しかけるべきかを知るための実用的な行為です。"
    },
    {
      concept: "음주 문화（飲酒文化）",
      title: "お酒の注ぎ方",
      body: "自分のグラスには自分で注がないのが礼儀です。相手に注いであげ、相手に注いでもらいましょう。年上の方が注いでくれるときは両手で受け取ります。年長者の前でお酒を飲むときは、少し体を横に向けるのがマナーです。"
    },
    {
      concept: "식당 예절（レストランマナー）",
      title: "「저기요」とバンチャンのルール",
      body: "店員を呼ぶときは「저기요！」(すみません)と声をかけます。手を振るのもOK。チップの習慣はありません。バンチャン(小皿料理)は無料でおかわり自由です。共有皿から食べるのは完全に普通のことです。"
    },
    {
      concept: "지하철 예절（地下鉄マナー）",
      title: "地下鉄の暗黙のルール",
      body: "優先席(ピンク・青)は空いていても座ってはいけません。通話は遠慮してテキストで。飲食も基本的にNGです。混雑した電車で押して降りるのは失礼ではなく、普通の行動です。"
    },
    {
      concept: "신발（靴）",
      title: "必ず脱ぐこと",
      body: "韓国の家に入る前は必ず靴を脱ぎます。例外はありません。伝統的な飲食店でも必要な場合があります。入口の段差や靴箱があればそのサインです。常に清潔な靴下を履いておきましょう。"
    },
    {
      concept: "인사（挨拶）",
      title: "お辞儀の角度が大事",
      body: "カジュアルな挨拶は15度の軽いお辞儀で十分。年齢や役職が大きく上の方には45度。90度のお辞儀は非常にフォーマルな場面用です。お辞儀と握手を同時にせず、先にお辞儀してから相手が手を差し出せば握手しましょう。"
    },
    {
      concept: "「밥 한번 먹자」",
      title: "本当の誘いじゃないこともある",
      body: "「今度ご飯食べましょう(다음에 밥 한번 먹자)」は別れ際の礼儀的な挨拶で、実際の誘いではないことが多いです。本気なら具体的な日時を提案してきます。「いつですか？」と聞かずに、相手から連絡があるのを待ちましょう。"
    },
    {
      concept: "빨리빨리カルチャー",
      title: "スピードの文化",
      body: "韓国は何でも速い。料理も早く出て、バスもすぐ出発します。「빨리빨리(ペリペリ/急いで急いで)」は韓国の国民的マインドセットです。韓国人が急かしているように見えても、失礼ではありません。早さが美徳なのです。"
    },
    {
      concept: "공유 음식（料理のシェア）",
      title: "食事はチームスポーツ",
      body: "韓国の食事は共有が基本。共通の皿から各自取って食べます。共有皿を綺麗に食べきるのは、美味しかったというサインです。遠慮せず積極的に取りましょう。"
    },
  ],
  "zh-CN": [
    {
      concept: "눈치（察言观色）",
      title: "洞察情境的能力",
      body: "눈치是韩国人在没有明说的情况下感知他人情绪和氛围的能力。\"눈치好的人\"会在不需要解释的情况下调整自己的行为。如果韩国朋友在对话中突然沉默，他们可能在用无声的方式传达某种信息。注意观察。"
    },
    {
      concept: "나이（年龄）",
      title: "为什么他们一见面就问年龄？",
      body: "韩语的敬语和非敬语取决于双方的年龄差。初次见面就问年龄并不失礼，而是实际需要——他们需要知道如何称呼你。如果你年长，预期会收到更正式的语气；如果你年轻，对方可能用更随意的方式交谈。"
    },
    {
      concept: "음주 문화（饮酒文化）",
      title: "倒酒的艺术",
      body: "不要自己给自己倒酒，要给别人倒，让别人给你倒。年长者给你倒酒时，用双手接受。在年长者面前喝酒时，要微微侧过身子。"
    },
    {
      concept: "식당 예절（餐厅礼仪）",
      title: "叫服务员和小菜规则",
      body: "叫服务员时说「저기요!」（打扰一下）。挥手也可以。韩国没有小费文化。小菜（밥찬）是免费的，可以续。从同一盘子里共享主菜是完全正常且被期待的。"
    },
    {
      concept: "지하철 예절（地铁礼仪）",
      title: "地铁的潜规则",
      body: "优先席（粉色/蓝色）是真正保留给老弱人群的，即使空着也不要坐。不提倡打电话，建议发短信。一般不在车上吃东西。拥挤时推挤下车是正常现象，不是粗鲁行为。"
    },
    {
      concept: "신발（鞋子）",
      title: "进门必须脱鞋",
      body: "进入任何韩国家庭前必须脱鞋，没有例外。很多传统餐厅也需要脱鞋。看到门口有台阶或鞋架就是信号。随时穿着干净的袜子。"
    },
    {
      concept: "인사（问候/鞠躬）",
      title: "角度很重要",
      body: "日常问候鞠躬15度即可。对年长或职位高的人鞠躬45度。90度鞠躬用于非常正式的场合。不要同时鞠躬和握手，先鞠躬，对方伸手后再握手。"
    },
    {
      concept: "\"밥 한번 먹자\"",
      title: "不一定是真正的邀请",
      body: "「改天一起吃饭(다음에 밥 한번 먹자)」常常只是礼貌性的告别用语，不是真正的邀请。如果是认真的，他们会提出具体时间。不要追问「什么时候？」，等他们主动联系。"
    },
    {
      concept: "빨리빨리文化",
      title: "速度文化",
      body: "韩国节奏很快。上菜快，公交车开走快，建筑一夜之间完工。「빨리빨리」（快快快）是韩国的国民运行模式。如果韩国人显得催促，那不是粗鲁，而是他们真心相信越快越好，而且他们可能是对的。"
    },
    {
      concept: "공유 음식（共享食物）",
      title: "吃饭是集体运动",
      body: "韩国饮食文化注重共享。从同一盘子里取菜，大家用自己的餐具从公用碗里取食。把共享菜吃完是礼貌的表现，代表你觉得好吃。不要害羞，尽管取吧。"
    },
  ],
  "zh-TW": [
    {
      concept: "눈치（察言觀色）",
      title: "洞察情境的能力",
      body: "눈치是韓國人在沒有明說的情況下感知他人情緒和氛圍的能力。「눈치好的人」會在不需要解釋的情況下調整自己的行為。如果韓國朋友在對話中突然沉默，他們可能在用無聲的方式傳達某種訊息。注意觀察。"
    },
    {
      concept: "나이（年齡）",
      title: "為什麼他們一見面就問年齡？",
      body: "韓語的敬語和非敬語取決於雙方的年齡差。初次見面就問年齡並不失禮，而是實際需要——他們需要知道如何稱呼你。如果你年長，預期會收到更正式的語氣；如果你年輕，對方可能用更隨意的方式交談。"
    },
    {
      concept: "음주 문화（飲酒文化）",
      title: "倒酒的藝術",
      body: "不要自己給自己倒酒，要給別人倒，讓別人給你倒。年長者給你倒酒時，用雙手接受。在年長者面前喝酒時，要微微側過身子。"
    },
    {
      concept: "식당 예절（餐廳禮儀）",
      title: "叫服務員和小菜規則",
      body: "叫服務員時說「저기요！」（打擾一下）。揮手也可以。韓國沒有小費文化。小菜（반찬）是免費的，可以續。從同一盤子裡共享主菜是完全正常且被期待的。"
    },
    {
      concept: "지하철 예절（地鐵禮儀）",
      title: "地鐵的潛規則",
      body: "優先席（粉色/藍色）是真正保留給老弱人群的，即使空著也不要坐。不提倡打電話，建議發簡訊。一般不在車上吃東西。擁擠時推擠下車是正常現象，不是粗魯行為。"
    },
    {
      concept: "신발（鞋子）",
      title: "進門必須脫鞋",
      body: "進入任何韓國家庭前必須脫鞋，沒有例外。很多傳統餐廳也需要脫鞋。看到門口有台階或鞋架就是信號。隨時穿著乾淨的襪子。"
    },
    {
      concept: "인사（問候/鞠躬）",
      title: "角度很重要",
      body: "日常問候鞠躬15度即可。對年長或職位高的人鞠躬45度。90度鞠躬用於非常正式的場合。不要同時鞠躬和握手，先鞠躬，對方伸手後再握手。"
    },
    {
      concept: "\"밥 한번 먹자\"",
      title: "不一定是真正的邀請",
      body: "「改天一起吃飯(다음에 밥 한번 먹자)」常常只是禮貌性的告別用語，不是真正的邀請。如果是認真的，他們會提出具體時間。不要追問「什麼時候？」，等他們主動聯繫。"
    },
    {
      concept: "빨리빨리文化",
      title: "速度文化",
      body: "韓國節奏很快。上菜快，公車開走快，建築一夜之間完工。「빨리빨리」（快快快）是韓國的國民運行模式。如果韓國人顯得催促，那不是粗魯，而是他們真心相信越快越好。"
    },
    {
      concept: "공유 음식（共享食物）",
      title: "吃飯是集體運動",
      body: "韓國飲食文化注重共享。從同一盤子裡取菜，大家用自己的餐具從公用碗裡取食。把共享菜吃完是禮貌的表現，代表你覺得好吃。不要害羞，儘管取吧。"
    },
  ],
  pt: [
    {
      concept: "눈치 (Nunchi)",
      title: "Ler o ambiente",
      body: "Nunchi é a arte coreana de perceber os sentimentos dos outros sem que digam nada. Uma pessoa com \"bom nunchi\" ajusta o comportamento à situação sem precisar de explicação. Se um amigo coreano ficar em silêncio no meio de uma conversa, pode estar comunicando algo sem palavras. Preste atenção."
    },
    {
      concept: "나이 (Idade)",
      title: "Por que perguntam sua idade imediatamente",
      body: "Os coreanos ajustam a fala (formal vs. informal) com base na diferença de idade. Perguntar a idade logo não é falta de educação — é prático. Eles precisam saber como se dirigir a você. Se você for mais velho, espere uma fala mais formal. Se mais novo, podem falar de forma casual."
    },
    {
      concept: "음주 문화 (Bebida)",
      title: "A arte de servir",
      body: "Nunca sirva sua própria bebida. Sirva os outros e deixe-os servirem você. Aceite com as duas mãos quando alguém mais velho servir. Vire levemente o corpo ao beber na presença de mais velhos."
    },
    {
      concept: "식당 예절 (Restaurantes)",
      title: "Chamar com 저기요 e a regra do banchan",
      body: "Chame o garçom dizendo '저기요!' (com licença). Acenar também funciona. Gorjeta não é praticada. Banchan (acompanhamentos) é gratuito e recarregável. É só pedir. Compartilhar pratos principais do mesmo prato é completamente normal."
    },
    {
      concept: "지하철 예절 (Metrô)",
      title: "O código não dito no metrô",
      body: "Os assentos prioritários (rosa/azul) são realmente reservados. Não sente lá, mesmo vazio. Ligações são mal vistas; use mensagens. Comer geralmente é tabu. Empurrar para sair dos trens lotados é esperado, não é grosseria."
    },
    {
      concept: "신발 (Sapatos)",
      title: "Sempre tire os sapatos",
      body: "Tire os sapatos antes de entrar em qualquer casa coreana, sem exceções. Muitos restaurantes tradicionais também exigem. Procure o degrau na entrada ou um rack de sapatos. Traga meias limpas, sempre."
    },
    {
      concept: "인사 (Reverência)",
      title: "Tudo está no ângulo",
      body: "Um aceno de 15 graus serve para saudações casuais. 45 graus para alguém muito mais velho ou superior. Reverências de 90 graus são para situações muito formais. Não faça a reverência e aperto de mão ao mesmo tempo. Primeiro a reverência, depois aperte a mão se estenderem."
    },
    {
      concept: "\"밥 한번 먹자\"",
      title: "Quando não é um convite",
      body: "\"다음에 밥 한번 먹자\" (vamos comer algum dia) é frequentemente uma frase de despedida educada, não um convite real. Se for sério, vão sugerir um horário específico. Não pergunte \"quando?\". Espere que eles tomem a iniciativa."
    },
    {
      concept: "Cultura 빨리빨리",
      title: "A cultura da velocidade",
      body: "A Coreia se move rápido. A comida chega rápido. Os ônibus saem rápido. A construção acontece da noite para o dia. '빨리빨리' (depressa, depressa) é o modo de operação nacional. Se um coreano parece te apressar, não é grosseria — eles genuinamente acreditam que mais rápido é melhor."
    },
    {
      concept: "공유 음식 (Compartilhar)",
      title: "Comida é esporte coletivo",
      body: "Refeições coreanas são comunais. Os pratos são compartilhados da mesma travessa; todos pegam dos bowls comuns com seus próprios utensílios. Terminar tudo em um prato compartilhado é educado — sinaliza que você gostou. Não seja tímido."
    },
  ],
  es: [
    {
      concept: "눈치 (Nunchi)",
      title: "Leer el ambiente",
      body: "Nunchi es el arte coreano de percibir los sentimientos de los demás sin que lo digan. Alguien con \"buen nunchi\" ajusta su comportamiento a la situación sin necesidad de explicación. Si un amigo coreano se queda callado a mitad de una conversación, puede estar comunicando algo sin palabras. Presta atención."
    },
    {
      concept: "나이 (Edad)",
      title: "Por qué preguntan tu edad de inmediato",
      body: "Los coreanos ajustan el habla (formal vs. informal) según la diferencia de edad. Preguntar la edad de inmediato no es maleducado — es práctico. Necesitan saber cómo dirigirse a ti. Si eres mayor, espera un trato más formal. Si eres menor, puede que hablen de forma casual."
    },
    {
      concept: "음주 문화 (Bebida)",
      title: "El arte de servir",
      body: "Nunca te sirvas tu propia bebida. Sirve a los demás y deja que te sirvan. Acepta con ambas manos cuando alguien mayor te sirve. Gira ligeramente el cuerpo al beber frente a personas mayores."
    },
    {
      concept: "식당 예절 (Restaurantes)",
      title: "Llamar con 저기요 y la regla del banchan",
      body: "Llama al mesero diciendo '저기요!' (disculpa). Hacer señas también funciona. Las propinas no se practican nunca. El banchan (guarniciones) es gratuito y rellenable. Solo pídelo. Compartir platos principales del mismo plato es completamente normal."
    },
    {
      concept: "지하철 예절 (Metro)",
      title: "El código no escrito del metro",
      body: "Los asientos prioritarios (rosa/azul) están genuinamente reservados. No te sientes ahí aunque estén vacíos. Las llamadas telefónicas están mal vistas; usa mensajes. Comer es generalmente tabú. Empujar para salir de trenes llenos es esperado, no es grosería."
    },
    {
      concept: "신발 (Zapatos)",
      title: "Siempre quítatelos",
      body: "Quítate los zapatos antes de entrar a cualquier hogar coreano, sin excepciones. Muchos restaurantes tradicionales también lo requieren. Busca el escalón en la entrada o un perchero de zapatos. Lleva calcetines limpios, siempre."
    },
    {
      concept: "인사 (Reverencia)",
      title: "Todo está en el ángulo",
      body: "Un asentimiento de 15 grados es suficiente para saludos casuales. 45 grados para alguien mucho mayor o superior. Las reverencias de 90 grados son para situaciones muy formales. No hagas la reverencia y el apretón de manos al mismo tiempo. Primero la reverencia, luego estrecha la mano si la extienden."
    },
    {
      concept: "\"밥 한번 먹자\"",
      title: "Cuando no es una invitación",
      body: "\"다음에 밥 한번 먹자\" (comamos algún día) suele ser una frase de despedida cortés, no una invitación real. Si lo dicen en serio, sugerirán un momento específico. No preguntes \"¿cuándo?\". Espera a que ellos tomen la iniciativa."
    },
    {
      concept: "Cultura 빨리빨리",
      title: "La cultura de la velocidad",
      body: "Corea se mueve rápido. La comida llega rápido. Los autobuses salen rápido. La construcción ocurre de la noche a la mañana. '빨리빨리' (rápido rápido) es el modo de operación nacional. Si un coreano parece apurarte, no es grosería — genuinamente creen que más rápido es mejor."
    },
    {
      concept: "공유 음식 (Compartir)",
      title: "Comer es un deporte de equipo",
      body: "Las comidas coreanas son comunales. Los platos se comparten del mismo plato; todos toman de los cuencos comunes con sus propios utensilios. Terminar todo en un plato compartido es educado — señala que lo disfrutaste. No seas tímido al tomar."
    },
  ],
};

const SECTION_STRINGS: Record<Locale, { label: string; heading: string; sub: string }> = {
  en: { label: "Culture", heading: "Things Koreans won't tell you", sub: "Unwritten rules that take expats years to figure out. Here's your shortcut." },
  ko: { label: "문화", heading: "한국인이 말 안 해주는 것들", sub: "외국인들이 몇 년 걸려야 파악하는 불문율들. 미리 알아두세요." },
  ja: { label: "文化", heading: "韓国人が教えてくれないこと", sub: "外国人が何年もかけて気づく暗黙のルール。先に知っておきましょう。" },
  "zh-CN": { label: "文化", heading: "韩国人不会主动告诉你的事", sub: "外国人往往要花几年才能摸清的潜规则，提前了解吧。" },
  "zh-TW": { label: "文化", heading: "韓國人不會主動告訴你的事", sub: "外國人往往要花幾年才能摸清的潛規則，提前了解吧。" },
  pt: { label: "Cultura", heading: "O que os coreanos não te contam", sub: "Regras não escritas que os expatriados levam anos para descobrir. Aqui está seu atalho." },
  es: { label: "Cultura", heading: "Lo que los coreanos no te dirán", sub: "Reglas no escritas que los expatriados tardan años en descubrir. Aquí está tu atajo." },
};

export default function CulturalTips() {
  const { locale } = useLocale();
  const tips = TIPS[locale] ?? TIPS.en;
  const sec = SECTION_STRINGS[locale] ?? SECTION_STRINGS.en;

  return (
    <section id="culture" className="bg-[#fafaf8] px-6 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
          {sec.label}
        </p>
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          {sec.heading}
        </h2>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
          {sec.sub}
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
