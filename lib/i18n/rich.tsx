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
