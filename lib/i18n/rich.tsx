import type { ReactNode } from "react";
import type { Locale } from "./types";

// ---------------------------------------------------------------------------
// Testimonial quotes (contain <strong> JSX)
// ---------------------------------------------------------------------------

export interface TestimonialQuote {
  quote: ReactNode;
  name: string;
  detail: string;
  photo: string;
}

export function getTestimonialQuotes(locale: Locale): TestimonialQuote[] {
  if (locale === "ja") {
    return [
      {
        quote: (
          <>
            韓国に来たばかりの頃、間違えることが怖くて言葉を話すのが本当につらかった。{" "}
            <strong className="text-zinc-950">KNDは私に挑戦できる場所を与えてくれました</strong>。
            今でも間違えることはあるけど、{" "}
            <strong className="text-zinc-950">以前より大胆に、自信を持って話せるようになりました</strong>。
            このコミュニティに感謝しています。
          </>
        ),
        name: "Raychel",
        detail: "シカゴ出身、アメリカ",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            こんなコミュニティに出会えると思っていなかったけど、{" "}
            <strong className="text-zinc-950">KNDのおかげでソウルでの生活が格段に楽になり</strong>、
            楽しいイベントや美味しい食事を通じてたくさんの友達ができました！
            みんな本当に親切で話しやすく、{" "}
            <strong className="text-zinc-950">自然と繋がりが生まれていきました</strong>。
            新しい街をそっと、でも確かに{" "}
            <strong className="text-zinc-950">家のように感じさせてくれる場所です</strong>。
          </>
        ),
        name: "Amy Izzati",
        detail: "ウェリントン出身、ニュージーランド",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            カナダからソウルに引っ越して6ヶ月、コミュニティが恋しかった。
            他のグループイベントも見たけど、どれも有料か手が届かない感じだった。{" "}
            <strong className="text-zinc-950">KNDに思い切って参加してみたら、クリスチャンじゃなくても温かく迎えてもらえて</strong>、
            多様な集まりがとても気に入りました！
            みんな優しくて、{" "}
            <strong className="text-zinc-950">KNDを通じて素晴らしい人たちと出会えました</strong>。
          </>
        ),
        name: "Sammi",
        detail: "トロント出身、カナダ",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  if (locale === "zh-CN") {
    return [
      {
        quote: (
          <>
            刚来韩国的时候，因为怕犯错，说话真的很难开口。{" "}
            <strong className="text-zinc-950">KND给了我一个可以尝试的空间</strong>，
            现在就算还是会犯错，{" "}
            <strong className="text-zinc-950">说话比以前更大胆、更有自信了</strong>。
            非常感谢这个社区。
          </>
        ),
        name: "Raychel",
        detail: "来自芝加哥，美国",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            没想到会遇到这样的社区，{" "}
            <strong className="text-zinc-950">KND让我在首尔的定居过程轻松了很多</strong>，
            还通过有趣的活动和美食认识了很多新朋友！
            大家都真心友善、热情，很容易聊起来，{" "}
            <strong className="text-zinc-950">关系就这样自然地建立起来了</strong>。
            这里会悄悄却快速地{" "}
            <strong className="text-zinc-950">让一座新城市变成家</strong>。
          </>
        ),
        name: "Amy Izzati",
        detail: "来自惠灵顿，新西兰",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            从加拿大搬来首尔已经6个月了，我很渴望有归属感。
            看了很多其他活动，但要么收费要么感觉遥不可及。{" "}
            <strong className="text-zinc-950">抱着试试看的心态去了KND，虽然我不是基督徒，但感觉非常受欢迎</strong>，
            活动种类也很丰富！大家都很友善，{" "}
            <strong className="text-zinc-950">通过KND认识了很多好人</strong>。
          </>
        ),
        name: "Sammi",
        detail: "来自多伦多，加拿大",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  if (locale === "zh-TW") {
    return [
      {
        quote: (
          <>
            剛來韓國的時候，因為怕犯錯，說話真的很難開口。{" "}
            <strong className="text-zinc-950">KND給了我一個可以嘗試的空間</strong>，
            現在就算還是會犯錯，{" "}
            <strong className="text-zinc-950">說話比以前更大膽、更有自信了</strong>。
            非常感謝這個社群。
          </>
        ),
        name: "Raychel",
        detail: "來自芝加哥，美國",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            沒想到會遇到這樣的社群，{" "}
            <strong className="text-zinc-950">KND讓我在首爾的定居過程輕鬆了很多</strong>，
            還透過有趣的活動和美食認識了很多新朋友！
            大家都真心友善、熱情，很容易聊起來，{" "}
            <strong className="text-zinc-950">關係就這樣自然地建立起來了</strong>。
            這裡會悄悄卻快速地{" "}
            <strong className="text-zinc-950">讓一座新城市變成家</strong>。
          </>
        ),
        name: "Amy Izzati",
        detail: "來自威靈頓，紐西蘭",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            從加拿大搬來首爾已經6個月了，我很渴望有歸屬感。
            看了很多其他活動，但要麼收費要麼感覺遙不可及。{" "}
            <strong className="text-zinc-950">抱著試試看的心態去了KND，雖然我不是基督徒，但感覺非常受歡迎</strong>，
            活動種類也很豐富！大家都很友善，{" "}
            <strong className="text-zinc-950">透過KND認識了很多好人</strong>。
          </>
        ),
        name: "Sammi",
        detail: "來自多倫多，加拿大",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  if (locale === "pt") {
    return [
      {
        quote: (
          <>
            Quando cheguei na Coreia, tinha muito medo de cometer erros e isso me travava na hora de falar.{" "}
            <strong className="text-zinc-950">O KND me deu um espaço seguro para tentar</strong>, e hoje{" "}
            <strong className="text-zinc-950">falo com muito mais coragem e confiança</strong>, mesmo que ainda cometa erros.
            Sou muito grata por essa comunidade.
          </>
        ),
        name: "Raychel",
        detail: "Chicago, EUA",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            Não esperava encontrar uma comunidade assim, mas{" "}
            <strong className="text-zinc-950">o KND tornou a adaptação em Seul muito mais fácil</strong>{" "}
            e me ajudou a fazer um monte de amigos através de atividades divertidas e refeições deliciosas!
            Todo mundo era genuinamente acolhedor e fácil de conversar, e{" "}
            <strong className="text-zinc-950">as conexões se formaram de forma muito natural</strong>.
            É um espaço que, quieta mas rapidamente,{" "}
            <strong className="text-zinc-950">transforma uma cidade nova em lar</strong>.
          </>
        ),
        name: "Amy Izzati",
        detail: "Wellington, Nova Zelândia",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            Já fazia 6 meses desde que me mudei do Canadá para Seul, e eu sentia falta de ter uma comunidade.
            Vi vários outros eventos, mas eram todos pagos ou pareciam inacessíveis.{" "}
            <strong className="text-zinc-950">Resolvi arriscar no KND e, mesmo não sendo cristã, me senti muito bem-vinda</strong>{" "}
            — adoro a diversidade dos encontros! Todos são tão gentis e{" "}
            <strong className="text-zinc-950">conheci pessoas incríveis pelo KND</strong>.
          </>
        ),
        name: "Sammi",
        detail: "Toronto, Canadá",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  if (locale === "es") {
    return [
      {
        quote: (
          <>
            Cuando llegué a Corea, tenía tanto miedo de cometer errores que me costaba mucho hablar.{" "}
            <strong className="text-zinc-950">KND me dio el espacio para intentarlo</strong>, y hoy{" "}
            <strong className="text-zinc-950">hablo con mucha más valentía y confianza</strong>, aunque sigo cometiendo errores.
            Estoy muy agradecida por esta comunidad.
          </>
        ),
        name: "Raychel",
        detail: "Chicago, EE.UU.",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            No esperaba encontrar una comunidad así, pero{" "}
            <strong className="text-zinc-950">KND hizo que adaptarme a Seúl fuera mucho más fácil</strong>{" "}
            y me ayudó a conocer muchos amigos nuevos a través de actividades divertidas y comidas deliciosas.
            Todos eran genuinamente amables y fáciles de tratar, y{" "}
            <strong className="text-zinc-950">las conexiones surgieron de forma muy natural</strong>.
            Es un espacio que, callada pero rápidamente,{" "}
            <strong className="text-zinc-950">hace que una ciudad nueva se sienta como hogar</strong>.
          </>
        ),
        name: "Amy Izzati",
        detail: "Wellington, Nueva Zelanda",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            Llevaba 6 meses desde que me mudé de Canadá a Seúl, y extrañaba tener una comunidad.
            Vi muchos otros eventos grupales, pero todos eran de pago o parecían inalcanzables.{" "}
            <strong className="text-zinc-950">Me arriesgué con KND y, aunque no soy cristiana, me sentí bienvenida</strong>{" "}
            — me encanta la diversidad de sus encuentros. Todos son muy amables y{" "}
            <strong className="text-zinc-950">conocí gente increíble gracias a KND</strong>.
          </>
        ),
        name: "Sammi",
        detail: "Toronto, Canadá",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  if (locale === "ko") {
    return [
      {
        quote: (
          <>
            처음 한국에 왔을 때 실수가 걱정돼서 말하기가 정말 힘들었어요.{" "}
            <strong className="text-zinc-950">KND가 저에게 시도해볼 공간을 만들어줬어요</strong>. 실수를
            해도{" "}
            <strong className="text-zinc-950">더 대담하고 자신감 있게 말하게 됐어요</strong>. 이
            커뮤니티에 감사해요.
          </>
        ),
        name: "Raychel",
        detail: "시카고, 미국",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            이런 커뮤니티를 만날 거라고 기대하지 않았는데,{" "}
            <strong className="text-zinc-950">KND 덕분에 서울 정착이 훨씬 수월해졌고</strong> 재미있는
            활동과 맛있는 음식을 통해 새 친구들을 많이 만났어요! 모두가 진심으로 친절하고
            다가가기 쉬웠고,{" "}
            <strong className="text-zinc-950">관계가 자연스럽게 형성됐어요</strong>. 조용하지만 빠르게{" "}
            <strong className="text-zinc-950">새 도시를 집처럼 느끼게 해주는</strong> 공간이에요.
          </>
        ),
        name: "Amy Izzati",
        detail: "웰링턴, 뉴질랜드",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            캐나다에서 서울로 이사 온 지 6개월이 됐을 때 커뮤니티가 그리웠어요. 다른 그룹 행사들도
            봤지만 다 유료이거나 접근하기 어려워 보였어요.{" "}
            <strong className="text-zinc-950">KND에 처음 가봤는데 기독교인이 아니어도 환영받는 느낌이었고</strong>{" "}
            다양한 모임들이 정말 좋았어요! 모두가 친절했고{" "}
            <strong className="text-zinc-950">KND를 통해 좋은 사람들을 만났어요</strong>.
          </>
        ),
        name: "Sammi",
        detail: "토론토, 캐나다",
        photo: "/photos/testimonial-sammi.png",
      },
    ];
  }

  // English (default)
  return [
    {
      quote: (
        <>
          When I first came to Korea I really struggled to speak the language because I was worried
          about making mistakes.{" "}
          <strong className="text-zinc-950">KND gave me the space to try</strong> and I&apos;ve
          become{" "}
          <strong className="text-zinc-950">bolder and more confident in my speaking</strong>, even
          if I do still make mistakes. I am thankful for this community of people.
        </>
      ),
      name: "Raychel",
      detail: "Chicago, USA",
      photo: "/photos/testimonial-raychel.png",
    },
    {
      quote: (
        <>
          I didn&apos;t expect to find a community like this, but{" "}
          <strong className="text-zinc-950">
            KND made settling into Seoul feel so much easier
          </strong>{" "}
          and helped me meet a bunch of new friends through fun activities and delicious meals!
          Everyone was genuinely kind, welcoming, and so easy to talk to, and{" "}
          <strong className="text-zinc-950">connections formed really organically</strong>. It&apos;s
          one of those spaces that quietly yet quickly{" "}
          <strong className="text-zinc-950">makes a new city feel like home</strong>.
        </>
      ),
      name: "Amy Izzati",
      detail: "Wellington, New Zealand",
      photo: "/photos/testimonial-amy.png",
    },
    {
      quote: (
        <>
          It was 6 months since I moved to Seoul from Canada, and I was longing for a sense of
          community. I saw a lot of other group events but they were all paid or seemed out of
          reach.{" "}
          <strong className="text-zinc-950">
            Took a chance at KND and although I&apos;m not Christian I felt welcomed
          </strong>{" "}
          and I love the diversity of their meetups! Everyone is so kind and{" "}
          <strong className="text-zinc-950">I met great people through KND</strong>.
        </>
      ),
      name: "Sammi",
      detail: "Toronto, Canada",
      photo: "/photos/testimonial-sammi.png",
    },
  ];
}

// ---------------------------------------------------------------------------
// FAQ JSX answers (contain <a> links) — keyed by FAQ item index
// ---------------------------------------------------------------------------

export function getJsxFaqAnswers(locale: Locale): Record<number, ReactNode> {
  if (locale === "ja") {
    return {
      0: (
        <>
          いいえ。でも私たちのコアメンバーは{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회（시광교회）</a>{" "}
          のメンバーで、イエスから受けた愛が溢れて隣人を愛することにつながると信じています。
          それを宗教的と言うなら、そうかもしれません！
          でも私たちのイベントは信仰・出身・バックグラウンドに関わらず、すべての人に開かれています。
        </>
      ),
      3: (
        <>
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">ルーマページ</a>
          で次のイベントを確認するか、最新情報をいち早く発信している{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalkオープンチャット</a>
          に参加してください。
        </>
      ),
    };
  }

  if (locale === "zh-CN") {
    return {
      0: (
        <>
          不是。但我们的核心成员来自{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회</a>
          ，我们相信所做的一切都源于从耶稣那里接受的爱，驱使我们去爱邻居。
          如果你认为这是宗教性的，那也没错！
          但无论如何，我们的活动对所有人开放，不分信仰、背景或来自哪里。
        </>
      ),
      3: (
        <>
          在我们的{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Luma页面</a>
          查看即将举行的活动，或者加入我们的{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalk群聊</a>
          ——我们通常在那里最先发布消息。
        </>
      ),
    };
  }

  if (locale === "zh-TW") {
    return {
      0: (
        <>
          不是。但我們的核心成員來自{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회</a>
          ，我們相信所做的一切都源於從耶穌那裡接受的愛，驅使我們去愛鄰居。
          如果你認為這是宗教性的，那也沒錯！
          但無論如何，我們的活動對所有人開放，不分信仰、背景或來自哪裡。
        </>
      ),
      3: (
        <>
          在我們的{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Luma頁面</a>
          查看即將舉行的活動，或者加入我們的{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalk群聊</a>
          ——我們通常在那裡最先發布消息。
        </>
      ),
    };
  }

  if (locale === "pt") {
    return {
      0: (
        <>
          Não. Mas nossos membros principais são da{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Sigwang Church</a>{" "}
          e acreditamos que tudo que fazemos é movido pelo amor que recebemos de Jesus,
          que nos leva a amar nossos vizinhos. Se você considera isso religioso, tudo bem!
          De qualquer forma, nossos eventos são abertos a todos, independente de fé, origem ou background.
        </>
      ),
      3: (
        <>
          Confira nossa{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">página no Luma</a>{" "}
          para os próximos eventos, ou entre no nosso{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">grupo do KakaoTalk</a>
          — onde geralmente postamos as novidades primeiro.
        </>
      ),
    };
  }

  if (locale === "es") {
    return {
      0: (
        <>
          No. Pero nuestros miembros principales son de{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Sigwang Church</a>{" "}
          y creemos que todo lo que hacemos está impulsado por el amor que recibimos de Jesús,
          lo que nos lleva a amar a nuestros vecinos. Si consideras eso religioso, ¡está bien!
          De todas formas, nuestros eventos están abiertos a todos, sin importar la fe, el origen o el trasfondo.
        </>
      ),
      3: (
        <>
          Revisa nuestra{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">página en Luma</a>{" "}
          para ver lo que se viene, o únete a nuestro{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">grupo de KakaoTalk</a>
          — donde solemos publicar las novedades primero.
        </>
      ),
    };
  }

  if (locale === "ko") {
    return {
      0: (
        <>
          아니요. 하지만 저희 핵심 멤버들은{" "}
          <a
            href="https://seetheglory.or.kr/aboutChurch"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-800"
          >
            시광교회
          </a>{" "}
          소속이고, 저희가 하는 모든 것은 예수님께 받은 사랑이 넘쳐서 이웃을 사랑하게 되는
          마음에서 비롯된다고 믿어요. 그게 종교적이라고 생각하신다면, 맞아요! 그래도 저희
          행사는 신앙, 배경, 출신에 관계없이 모두에게 열려 있어요. 사랑받은 사람들이 그
          사랑을 나누는 것뿐이에요.
        </>
      ),
      3: (
        <>
          다음 행사는{" "}
          <a
            href="https://lu.ma/koreansnextdoor"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-800"
          >
            루마 페이지
          </a>
          에서 확인하거나, 보통 소식을 먼저 올리는{" "}
          <a
            href="https://open.kakao.com/o/gWb1KOci"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-zinc-800"
          >
            카카오톡 오픈채팅방
          </a>
          에 참여하세요.
        </>
      ),
    };
  }

  // English (default)
  return {
    0: (
      <>
        No. But our core members are from{" "}
        <a
          href="https://seetheglory.or.kr/aboutChurch"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-800"
        >
          Sigwang Church
        </a>{" "}
        and we believe everything we do is driven by an overflow of this undeserved love we
        received from Jesus which leads us to love our neighbors as ourselves. So if you count
        that as religious, then yes! Either way, our events are open to everyone, regardless of
        faith, background, or where you&apos;re from. Just people who&apos;ve been loved, trying
        to pass it on.
      </>
    ),
    3: (
      <>
        Check our{" "}
        <a
          href="https://lu.ma/koreansnextdoor"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-800"
        >
          Luma page
        </a>{" "}
        for what&apos;s coming up, or join our{" "}
        <a
          href="https://open.kakao.com/o/gWb1KOci"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-zinc-800"
        >
          KakaoTalk open chat
        </a>{" "}
        where we usually post things first.
      </>
    ),
  };
}
