import { Question } from "./feedbackTypes";

export const FEEDBACK_QUESTIONS: Question[] = [
  {
    id: "overall",
    type: "stars",
    label: {
      en: "How would you rate your overall experience?",
      ko: "전반적인 경험은 어떠셨나요?",
    },
    required: true,
  },
  {
    id: "language_exchange",
    type: "stars",
    label: {
      en: "How satisfied were you with the language exchange session?",
      ko: "언어 교환 세션은 어떠셨나요?",
    },
    required: true,
  },
  {
    id: "cultural_presentation",
    type: "stars",
    label: {
      en: "How satisfied were you with the cultural presentation?",
      ko: "문화 발표 세션은 어떠셨나요?",
    },
    required: true,
  },
  {
    id: "games",
    type: "stars",
    label: {
      en: "How satisfied were you with the games?",
      ko: "게임 세션은 어떠셨나요?",
    },
    required: true,
  },
  {
    id: "flag_making",
    type: "stars",
    label: {
      en: "How satisfied were you with the flag making activity?",
      ko: "국기 만들기 활동은 어떠셨나요?",
    },
    required: true,
  },
  {
    id: "highlight",
    type: "longtext",
    label: {
      en: "What did you like most about the event?",
      ko: "이벤트에서 가장 좋았던 점은 무엇인가요?",
    },
    subtitle: {
      en: "Share your favorite moment or activity",
      ko: "가장 좋았던 순간이나 활동을 알려주세요",
    },
    required: false,
  },
  {
    id: "improvement",
    type: "longtext",
    label: {
      en: "What could we improve for next time?",
      ko: "다음 이벤트에서 개선하면 좋을 점이 있나요?",
    },
    subtitle: {
      en: "Honest feedback helps us make it better",
      ko: "솔직한 피드백이 큰 도움이 됩니다",
    },
    required: false,
  },
  {
    id: "pace",
    type: "multiplechoice",
    label: {
      en: "How was the overall pace of the event?",
      ko: "이벤트 전반적인 진행 속도는 어떠셨나요?",
    },
    required: true,
    options: [
      { value: "too_rushed", en: "Too rushed", ko: "너무 빨랐어요" },
      { value: "good", en: "Just right", ko: "딱 좋았어요" },
      { value: "too_slow", en: "Too slow", ko: "너무 느렸어요" },
    ],
    allowOther: true,
  },
  {
    id: "nps",
    type: "nps",
    label: {
      en: "How likely are you to recommend this event to a friend?",
      ko: "이 이벤트를 친구에게 추천할 의향이 있으신가요?",
    },
    required: true,
  },
];
