/**
 * The photos and reels that used to live in Gallery.tsx and VideoWall.tsx,
 * merged into one list so the home page shows a single band of proof instead
 * of three sections repeating the same four events.
 *
 * Order is roughly newest first. `kind` decides how a tile renders: a photo
 * opens the lightbox, a reel opens Instagram.
 */
export type ProofItem =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "reel"; shortcode: string; caption: string; date: string };

export const proofMedia: ProofItem[] = [
  { kind: "reel", shortcode: "DadMLWkTdKo", caption: "POV: you found your community in Seoul", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-10.jpeg", alt: "Huge KND language exchange group of around sixty neighbors waving together" },
  { kind: "photo", src: "/photos/knd-13.jpeg", alt: "KND neighbors laughing together at a balloon party in Seoul" },
  { kind: "reel", shortcode: "Dah8tW4TA-Q", caption: "Wednesday work and study session", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-15.jpeg", alt: "KND neighbors posing with paddles on an indoor pickleball court in Seoul" },
  { kind: "photo", src: "/photos/knd-14.jpeg", alt: "KND friends holding up board games at a board game cafe in Seoul" },
  { kind: "reel", shortcode: "DZnHl12TWny", caption: "A reason to look forward to Mondays", date: "Jun 2026" },
  { kind: "photo", src: "/photos/knd-11.jpeg", alt: "KND neighbors sharing a Korean BBQ dinner and flashing peace signs around the table" },
  { kind: "photo", src: "/photos/knd-05.jpeg", alt: "Language exchange event with Korean and international participants" },
  { kind: "reel", shortcode: "DYxIckNTbD-", caption: "Suwon day trip, hanok group photo", date: "May 2026" },
  { kind: "photo", src: "/photos/knd-08.jpeg", alt: "KND members on a night hike up Gwanaksan mountain in Seoul" },
  { kind: "photo", src: "/photos/knd-02.jpeg", alt: "Community members making dumplings at KND Seollal tteokguk party" },
  { kind: "reel", shortcode: "DYfbiwLz5Il", caption: "Han River night, these moments are happiness", date: "May 2026" },
  { kind: "photo", src: "/photos/knd-04.jpeg", alt: "KND members playing Yut Nori together at Seollal celebration" },
  { kind: "photo", src: "/photos/knd-06.jpeg", alt: "KND neighbors enjoying food and conversation together in Seoul" },
  { kind: "reel", shortcode: "DVBmat4EnpR", caption: "Gwanaksan night hike over the Seoul skyline", date: "Feb 2026" },
  { kind: "photo", src: "/photos/knd-03.jpeg", alt: "International community gathering at Koreans Next Door Seoul" },
  { kind: "photo", src: "/photos/knd-07.jpeg", alt: "Group photo of Koreans Next Door community members" },
  { kind: "photo", src: "/photos/knd-09.jpeg", alt: "KND group photo outside 天下一麵 restaurant in Seoul" },
];

export const photosOnly = proofMedia.filter(
  (m): m is Extract<ProofItem, { kind: "photo" }> => m.kind === "photo"
);
