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
            <strong className="text-zinc-950">KNDは私に安心して挑戦できる場所を作ってくれました</strong>。
            今でも間違えることはあるけど、{" "}
            <strong className="text-zinc-950">前より自信を持って話せるようになりました</strong>。
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
            楽しいイベントやおいしい食事を通じてたくさんの友達ができました！
            みんな本当に親切で、{" "}
            <strong className="text-zinc-950">自然と繋がりが生まれていきました</strong>。
            新しい街を、そっと、でも確かに{" "}
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
            刚来韩国的时候，怕犯错，话都不敢开口说。{" "}
            <strong className="text-zinc-950">KND给了我一个可以大胆尝试的地方</strong>，
            现在就算还是会犯错，{" "}
            <strong className="text-zinc-950">说话也比以前更自信了</strong>。
            真的很感谢这个社群。
          </>
        ),
        name: "Raychel",
        detail: "来自芝加哥，美国",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            没想到能遇到这样的社群，{" "}
            <strong className="text-zinc-950">KND让我在首尔安顿下来轻松了很多</strong>，
            还通过各种好玩的活动和美食认识了一堆新朋友！
            大家都很真诚、热情，特别好聊，{" "}
            <strong className="text-zinc-950">关系就这样自然而然地建立起来了</strong>。
            这里会悄悄地{" "}
            <strong className="text-zinc-950">让一座陌生的城市变成家</strong>。
          </>
        ),
        name: "Amy Izzati",
        detail: "来自惠灵顿，新西兰",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            从加拿大搬到首尔已经六个月了，特别想找到一种归属感。
            看了不少其他活动，要么收费要么感觉遥不可及。{" "}
            <strong className="text-zinc-950">抱着试试看的心态去了KND，虽然我不是基督徒，但真的感觉很受欢迎</strong>，
            活动种类也很丰富！大家都很友善，{" "}
            <strong className="text-zinc-950">通过KND认识了很多很好的人</strong>。
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
            剛來韓國的時候，因為怕犯錯，話都不敢開口說。{" "}
            <strong className="text-zinc-950">KND給了我一個可以大膽嘗試的地方</strong>，
            現在就算還是會犯錯，{" "}
            <strong className="text-zinc-950">說話也比以前更有自信了</strong>。
            真的很感謝這個社群。
          </>
        ),
        name: "Raychel",
        detail: "來自芝加哥，美國",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            沒想到能遇到這樣的社群，{" "}
            <strong className="text-zinc-950">KND讓我在首爾安頓下來輕鬆了很多</strong>，
            還透過各種好玩的活動和美食認識了一堆新朋友！
            大家都很真誠、熱情，特別好聊，{" "}
            <strong className="text-zinc-950">關係就這樣自然而然地建立起來了</strong>。
            這裡會在不知不覺中，{" "}
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
            從加拿大搬到首爾已經六個月了，特別想找到一種歸屬感。
            看了不少其他活動，要麼收費要麼感覺遙不可及。{" "}
            <strong className="text-zinc-950">抱著試試看的心態去了KND，雖然我不是基督徒，但真的感覺很受歡迎</strong>，
            活動種類也很豐富！大家都很友善，{" "}
            <strong className="text-zinc-950">透過KND認識了很多很好的人</strong>。
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
            Quando eu cheguei na Coreia, eu tinha muito medo de errar e isso me travava na hora de falar.{" "}
            <strong className="text-zinc-950">O KND me deu um espaço seguro pra tentar</strong>, e hoje{" "}
            <strong className="text-zinc-950">eu falo com muito mais coragem e confiança</strong>, mesmo ainda errando às vezes.
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
            Eu não esperava encontrar uma comunidade assim, mas{" "}
            <strong className="text-zinc-950">o KND tornou a adaptação em Seul muito mais fácil</strong>{" "}
            e me ajudou a fazer um monte de amigos através de atividades divertidas e comidas deliciosas!
            Todo mundo era muito acolhedor e fácil de conversar, e{" "}
            <strong className="text-zinc-950">as conexões foram surgindo de um jeito muito natural</strong>.
            É um espaço que, quietinha mas rapidamente,{" "}
            <strong className="text-zinc-950">transforma uma cidade nova num lar</strong>.
          </>
        ),
        name: "Amy Izzati",
        detail: "Wellington, Nova Zelândia",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            Já fazia 6 meses que eu tinha me mudado do Canadá pra Seul, e eu tava com saudade de ter uma comunidade.
            Vi vários outros eventos, mas eram todos pagos ou pareciam inacessíveis.{" "}
            <strong className="text-zinc-950">Resolvi arriscar no KND e, mesmo não sendo cristã, me senti super bem-vinda</strong>{" "}
            — adoro a diversidade dos encontros! Todo mundo é muito gente boa e{" "}
            <strong className="text-zinc-950">eu conheci pessoas incríveis pelo KND</strong>.
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
            Cuando llegué a Corea, el miedo a cometer errores me paralizaba — casi no podía hablar.{" "}
            <strong className="text-zinc-950">KND me dio el espacio para intentarlo</strong>, y hoy{" "}
            <strong className="text-zinc-950">hablo con mucha más valentía y confianza</strong>, aunque sigo equivocándome.
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
            y conocí un montón de amigos nuevos entre actividades divertidas y comidas deliciosas.
            Todos eran increíblemente amables y fáciles de tratar —{" "}
            <strong className="text-zinc-950">las conexiones se dieron solas</strong>.
            Es de esos lugares que, sin que te des cuenta,{" "}
            <strong className="text-zinc-950">hacen que una ciudad nueva se sienta como casa</strong>.
          </>
        ),
        name: "Amy Izzati",
        detail: "Wellington, Nueva Zelanda",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            Llevaba 6 meses viviendo en Seúl y me hacía mucha falta una comunidad.
            Vi otros eventos, pero todos eran de pago o se sentían lejanos.{" "}
            <strong className="text-zinc-950">Me animé a ir a KND y, aunque no soy cristiana, me recibieron con los brazos abiertos</strong>{" "}
            — me encanta lo diverso que es. Todos son muy amables y{" "}
            <strong className="text-zinc-950">conocí gente increíble</strong>.
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
            처음 한국에 왔을 때 실수가 너무 걱정돼서 말을 잘 못 했어요.{" "}
            <strong className="text-zinc-950">KND가 마음 놓고 시도해볼 수 있는 공간을 만들어줬어요</strong>. 지금도 실수하지만,{" "}
            <strong className="text-zinc-950">전보다 훨씬 자신 있게 말하게 됐어요</strong>. 이
            커뮤니티 덕분이에요.
          </>
        ),
        name: "Raychel",
        detail: "시카고, 미국",
        photo: "/photos/testimonial-raychel.png",
      },
      {
        quote: (
          <>
            이런 커뮤니티가 있을 거라고는 생각도 못 했어요.{" "}
            <strong className="text-zinc-950">KND 덕분에 서울 정착이 훨씬 쉬워졌고</strong>, 재미있는
            활동이랑 맛있는 음식을 통해 친구들도 많이 생겼어요! 모두 진심으로 따뜻하고
            말 붙이기가 편했어요.{" "}
            <strong className="text-zinc-950">어느새 낯선 도시가 집처럼 느껴지는</strong> 공간이에요.
          </>
        ),
        name: "Amy Izzati",
        detail: "웰링턴, 뉴질랜드",
        photo: "/photos/testimonial-amy.png",
      },
      {
        quote: (
          <>
            캐나다에서 서울로 온 지 6개월이 됐는데도 커뮤니티가 없었어요. 다른 행사들도
            알아봤는데 다 돈을 내야 하거나 어딘가 멀게 느껴졌어요.{" "}
            <strong className="text-zinc-950">KND에 처음 갔을 때 기독교인이 아닌데도 정말 환영받는 느낌이었고</strong>{" "}
            이렇게 다양한 사람들이 모인다는 게 좋았어요! 모두 친절했고,{" "}
            <strong className="text-zinc-950">KND 덕분에 좋은 사람들을 만날 수 있었어요</strong>.
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
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회（Sigwang Church）</a>{" "}
          のメンバーで、イエスから受けた愛が溢れ出て、隣人を愛したいという気持ちにつながっていると信じています。
          宗教的だと思われるかもしれませんが、私たちのイベントは信仰・出身・バックグラウンドに関わらず、どなたにも開かれています！
        </>
      ),
      3: (
        <>
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">ルーマページ</a>
          で次のイベントを確認するか、最新情報をいち早く発信している{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalkオープンチャット</a>
          に参加してみてください。
        </>
      ),
    };
  }

  if (locale === "zh-CN") {
    return {
      0: (
        <>
          不是。我们的核心成员来自{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회</a>
          ，我们相信我们所做的一切，都是因为从耶稣那里得到了爱，让我们想去爱身边的人。
          如果你觉得这算宗教性的，也没错！
          但不管怎样，我们的活动对所有人开放，不分信仰、背景，不管你从哪里来。
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
          不是。我們的核心成員來自{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">시광교회</a>
          ，我們相信我們所做的一切，都是因為從耶穌那裡得到了愛，讓我們想去愛身邊的人。
          如果你覺得這算宗教性的，也沒錯！
          但不管怎樣，我們的活動對所有人開放，不分信仰、背景，不管你從哪裡來。
        </>
      ),
      3: (
        <>
          在我們的{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Luma頁面</a>
          查看即將舉行的活動，或者加入我們的{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">KakaoTalk群聊</a>
          ——我們通常會在那裡最先發布消息。
        </>
      ),
    };
  }

  if (locale === "pt") {
    return {
      0: (
        <>
          Não. A galera do núcleo é da{" "}
          <a href="https://seetheglory.or.kr/aboutChurch" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">Sigwang Church</a>
          , e a gente acredita que tudo que faz vem do amor que recebeu de Jesus, que leva a gente a amar os vizinhos.
          Se você acha isso religioso, tudo bem!
          De qualquer forma, os eventos são abertos pra todo mundo, independente da fé, de onde vem ou do background.
        </>
      ),
      3: (
        <>
          Dá uma olhada na nossa{" "}
          <a href="https://lu.ma/koreansnextdoor" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">página no Luma</a>{" "}
          pra ver os próximos eventos, ou entra no nosso{" "}
          <a href="https://open.kakao.com/o/gWb1KOci" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">grupo do KakaoTalk</a>
          — a gente geralmente posta as novidades lá primeiro.
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
          행사는 신앙이나 배경, 어디서 왔든 상관없이 누구나 올 수 있어요. 그냥 사랑받은 사람들이 그
          사랑을 나누는 거예요.
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
