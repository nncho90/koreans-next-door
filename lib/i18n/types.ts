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
    tabUpcoming: string;
    tabPast: string;
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
  worriesSection: {
    label: string;
    heading: string;
    subheading: string;
    bubbles: string[];
    tags: string[];
  };
  missionAbout: {
    whoWeAre: string;
    heading1: string;
    heading2: string;
    body: string;
  };
  seoulSkyline: {
    label: string;
    heading1: string;
    heading2: string;
    subheading: string;
    browseAll: string;
  };
  guideSection: {
    label: string;
    heading: string;
    desc: string;
    descHub: string;
    open: string;
    toolPhrasebookLabel: string;
    toolPhrasebookDesc: string;
    toolFormDecoderLabel: string;
    toolFormDecoderDesc: string;
  };
}
