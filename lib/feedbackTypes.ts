export type QuestionType = "stars" | "nps" | "longtext" | "multiplechoice";

export interface BilingualText {
  en: string;
  ko: string;
}

export interface ChoiceOption {
  value: string;
  en: string;
  ko: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: BilingualText;
  subtitle?: BilingualText;
  required: boolean;
  options?: ChoiceOption[];
  allowOther?: boolean;
}

export interface FeedbackSubmission {
  id: string;
  event: string;
  submittedAt: string;
  answers: Record<string, string | number>;
}
