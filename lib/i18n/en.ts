import type { Dictionary } from "./types";

export const en: Dictionary = {
  navbar: {
    joinUs: "Join us",
    langToggle: "한국어",
  },
  hero: {
    tagline: "Walking alongside you so we can all feel at home in a foreign land.",
    learnMore: "Learn more",
  },
  mission: {
    phase1: "You just moved to Seoul.",
    knockKnock: "Knock knock.",
    hiNeighbors: "Hi, we\u2019re your neighbors.",
    worries: [
      "\u201cI ordered food and had no idea what arrived.\u201d",
      "\u201cI haven\u2019t had a real conversation in weeks.\u201d",
      "\u201cEveryone stares at me on the subway.\u201d",
      "\u201cMy coworkers eat lunch together and I just sit alone.\u201d",
      "\u201cI can\u2019t even read the signs.\u201d",
      "\u201cI called my mom crying last night.\u201d",
      "\u201cNobody warned me it would be this lonely.\u201d",
      "\u201cI don\u2019t know how to make Korean friends.\u201d",
      "\u201cI spend every weekend alone.\u201d",
      "\u201cI feel invisible here.\u201d",
      "\u201cI got lost and couldn\u2019t ask anyone for help.\u201d",
      "\u201cIs it always going to feel like this?\u201d",
      "\u201cI ate dinner alone. Again.\u201d",
      "\u201cI thought it would get easier.\u201d",
      "\u201cSome days I wonder why I came.\u201d",
      "\u201cThe silence in my apartment is deafening.\u201d",
      "\u201cI miss having people who just get it.\u201d",
      "\u201cMy Korean is still terrible after a year.\u201d",
    ],
    pillars: [
      {
        icon: "\u{1F3D8}\uFE0F",
        title: "Just neighbors",
        body: "Not a formal organization or a tour agency. Just a group of friends who believe hospitality turns an unfamiliar city into a familiar home.",
      },
      {
        icon: "\u{1F30D}",
        title: "Open to everyone",
        body: "Our core members are from Sigwang Church, but our events are not religious. All faiths, backgrounds, and walks of life are warmly welcomed.",
      },
      {
        icon: "\u{1F49B}",
        title: "No hidden agendas",
        body: "We haven\u2019t forgotten how it feels to be welcomed in a foreign country. We just want to be those neighbors to you.",
      },
    ],
  },
  events: {
    label: "What we do",
    heading: "Things we\u2019ve done together",
    subheading:
      "We\u2019re still figuring it out as we go \u2014 and that\u2019s part of the fun. Here\u2019s a taste of what you can expect.",
    cards: [
      {
        emoji: "\uD83E\uDD62",
        type: "Cultural Exchange",
        title: "Seollal 떡국 Party",
        date: "January 2026",
        description:
          "We made dumplings together, shared a bowl of tteokguk, and played Yut Nori \u2014 celebrating Korean New Year with new friends.",
      },
      {
        emoji: "\u26F0\uFE0F",
        type: "Nature & Adventure",
        title: "Night Hike to Gwanaksan",
        date: "February 2026",
        description:
          "We laced up our shoes and headed up \uad00\uc545\uc0b0 after dark \u2014 Seoul sparkling below us and good company all around.",
      },
      {
        emoji: "\uD83D\uDDE3\uFE0F",
        type: "Language Exchange",
        title: "Language Exchange Nights",
        date: "Last Saturday of every month",
        description:
          "Practicing Korean and English over group games, laughs, and the occasional awkward grammar mistake. Everyone\u2019s welcome, no fluency required.",
      },
      {
        emoji: "\u2615",
        type: "Casual Hangouts",
        title: "Coffee & Conversation",
        date: "Ongoing",
        description:
          "Sometimes it\u2019s just grabbing coffee, good food, and having real conversations. No agenda \u2014 just people getting to know each other.",
      },
    ],
  },
  impact: {
    metrics: [
      { label: "countries represented" },
      { label: "neighbors welcomed" },
      { label: "events hosted" },
      { label: "big family" },
    ],
  },
  upcoming: {
    label: "What\u2019s next",
    heading: "Upcoming events",
    subheading: "All events are free and open to everyone. Just show up.",
  },
  gallery: {
    label: "Moments together",
    heading: "A glimpse into our neighborhood",
    subheading: "Real people, real moments, real connections.",
  },
  testimonials: {
    label: "From our neighbors",
    heading: "What people say",
  },
  globe: {
    label: "Our community",
    heading: "From all over the world",
    subheading: "Our neighbors come from every corner of the globe.",
    addPin: "+ Add your pin",
    beFirst: "Be the first to add your pin!",
    modalTitle: "Add your pin",
    modalSubtitle: "You\u2019ll appear on the globe right away.",
    formName: "Name",
    formNamePlaceholder: "Your first name",
    formCity: "City",
    formCityPlaceholder: "Search any city in the world...",
    formNote: "One-liner about you",
    formNotePlaceholder: "e.g. Came for work, staying for the food",
    formInstagram: "Instagram",
    formInstagramOptional: "(optional)",
    formSubmit: "Add my pin",
    formSubmitting: "Sending...",
    formError: "Something went wrong. Try again!",
    successTitle: "You\u2019re on the map!",
    successSubtitle: "You\u2019re on the globe. Welcome, neighbor.",
    noCitiesFound: "No cities found \u2014 try another name",
    neighborCount: "{count} neighbors from all over the world",
  },
  survivalKit: {
    label: "Seoul survival kit",
    heading: "Things worth knowing",
    subheading: "Things your neighbors wish they\u2019d known when they first came to Korea.",
    categories: [
      {
        title: "Getting around",
        items: [
          { note: "Subway routes and real-time arrivals" },
          { note: "Navigation \u2014 better than Google Maps here" },
          { note: "Tap-and-go transit card, buy at any convenience store" },
        ],
      },
      {
        title: "Food & daily life",
        items: [
          { note: "Most popular food delivery app" },
          { note: "Fast delivery, often has promotions" },
          { note: "Everything you need for under \u20a95,000" },
        ],
      },
      {
        title: "Communication",
        items: [
          { note: "How everyone in Korea communicates" },
          { note: "Best Korean \u2194 English translation app" },
          { note: "Deep vocabulary and example sentences" },
        ],
      },
      {
        title: "Useful apps",
        items: [
          { note: "Korea\u2019s main search engine and maps" },
          { note: "Local marketplace and neighborhood app" },
          { note: "Online shopping with next-day delivery" },
        ],
      },
      {
        title: "Healthcare",
        items: [
          { note: "Find the nearest pharmacy" },
          { note: "English-speaking doctor search" },
          { note: "Register within 6 months of arrival" },
        ],
      },
      {
        title: "Emergency numbers",
        items: [
          { note: "Police" },
          { note: "Fire & ambulance" },
          { note: "Korea Tourism Helpline (English)" },
        ],
      },
    ],
  },
  faq: {
    label: "Questions",
    heading: "Things people ask",
    items: [
      { q: "Are these events religious?" },
      {
        q: "Do I need to speak Korean to join?",
        a: "Nope. A lot of us are still learning too. Events are bilingual \u2014 English and Korean \u2014 and our language exchange nights are open to total beginners. We also have Korean members who speak Spanish, Portuguese, Japanese, and Mandarin, so don\u2019t hesitate even if English or Korean isn\u2019t your thing. No pressure at all.",
      },
      {
        q: "Are there any fees or membership requirements?",
        a: "There are no membership fees \u2014 ever. Our regular language exchange events and some special events may have a small participation fee (under \u20a910,000) which goes entirely to snacks and supplies. For dinner meetups or activities, there\u2019s no extra fee \u2014 just bring enough to cover your own meal or activity. Just show up and see if you vibe with it.",
      },
      { q: "How do I find out about upcoming events?" },
      {
        q: "Who organizes KND?",
        a: "A small group of friends from Sigwang Church in Seoul. A lot of us have lived abroad \u2014 and as people of faith, we\u2019ve always understood ourselves as sojourners in this world, never quite fully at home anywhere. There\u2019s a particular solidarity that comes from that. We just want to be the neighbors who help make the unfamiliar feel a little more like home.",
      },
      { q: "Can I bring a friend?", a: "Please do. The more the merrier." },
    ],
  },
  contact: {
    heading: "Join the neighborhood",
    subheading:
      "Come as a guest, stay as a neighbor.\u00a0 Follow us on Instagram or join our KakaoTalk group to find out what\u2019s up.",
    instagram: "Instagram",
    kakao: "KakaoTalk Open Chat",
  },
  phraseOfDay: {
    label: "Daily Korean",
    phrases: [
      { english: "Thank you", context: "The most useful word in Korea" },
      { english: "This one please", context: "Point at menu and say this" },
      { english: "How much is it?", context: "Essential for markets and street food" },
      { english: "Where\u2019s the bathroom?", context: "You will need this \u2014 trust us" },
      { english: "It\u2019s okay", context: "Also means \u2018Are you okay?\u2019" },
      { english: "Hello", context: "Use this greeting everywhere you go" },
      { english: "I\u2019m sorry", context: "Polite apology for any situation" },
      { english: "I\u2019d like to order", context: "Say this to get the server\u2019s attention" },
      { english: "It\u2019s delicious!", context: "Compliment the chef \u2014 they\u2019ll love it" },
      { english: "Check please", context: "Wave and say this when you\u2019re done eating" },
      { english: "Yes", context: "Also pronounced \u2018de\u2019 \u2014 both are fine" },
      { english: "No", context: "Polite way to decline" },
      { english: "Just a moment", context: "Buys you time in any situation" },
      { english: "Excuse me! (Over here!)", context: "Call staff at restaurants \u2014 totally normal" },
      { english: "Water please", context: "Water is usually free at restaurants" },
      { english: "One more please", context: "Works for refills, extra sides, anything" },
      { english: "Can I pay by card?", context: "Almost everywhere accepts cards in Korea" },
      { english: "What\u2019s the Wi-Fi password?", context: "Usually on a sign or the receipt" },
      { english: "Please take my photo", context: "Hand over your phone and ask" },
      { english: "What is this?", context: "Point at something and ask" },
      { english: "Please recommend something", context: "Great at restaurants when overwhelmed by the menu" },
      { english: "To go please", context: "Pack it up to take with you" },
      { english: "Please help me", context: "Koreans are incredibly helpful to new neighbors" },
      { english: "Please speak slowly", context: "A lifesaver when they talk too fast" },
      { english: "I can\u2019t speak Korean", context: "Ironically, saying this in Korean impresses people" },
      {
        english: "Is there a convenience store nearby?",
        context: "There\u2019s one every 50 meters \u2014 but just in case",
      },
      { english: "Where do I board?", context: "For buses, subways, and trains" },
      { english: "One bottle of soju please", context: "Unlock the full Korean dining experience" },
      { english: "Really?", context: "React like a local \u2014 works in any convo" },
      { english: "It\u2019s fun / interesting", context: "Great reaction to anything entertaining" },
    ],
  },
  footer: {
    copyright: "Koreans Next Door \u00b7 Seoul, Korea",
  },
};
