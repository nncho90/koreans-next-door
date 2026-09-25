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
  { kind: "reel", shortcode: "DdRcq7SToQX", caption: "If you were looking for a reason to come", date: "Sep 2026" },
  { kind: "photo", src: "/photos/knd-10.jpeg", alt: "Huge KND language exchange group of around sixty neighbors waving together" },
  { kind: "reel", shortcode: "Dc0QLoTzg3u", caption: "Study session, dinner, then the Han River", date: "Sep 2026" },
  { kind: "photo", src: "/photos/knd-13.jpeg", alt: "KND neighbors laughing together at a balloon party in Seoul" },
  { kind: "reel", shortcode: "DdEmoDyzTnN", caption: "When a study session turns into a city tour", date: "Sep 2026" },
  { kind: "photo", src: "/photos/knd-15.jpeg", alt: "KND neighbors posing with paddles on an indoor pickleball court in Seoul" },
  { kind: "photo", src: "/photos/knd-16.jpeg", alt: "KND hikers gathered on a rocky peak above Seoul in September 2026" },
  { kind: "reel", shortcode: "DcY8h-2zKjg", caption: "A language exchange that stays wholesome", date: "Aug 2026" },
  { kind: "photo", src: "/photos/knd-14.jpeg", alt: "KND friends holding up board games at a board game cafe in Seoul" },
  { kind: "reel", shortcode: "DcJiNw7zc16", caption: "Aquarium day, photo wall included", date: "Aug 2026" },
  { kind: "photo", src: "/photos/knd-11.jpeg", alt: "KND neighbors sharing a Korean BBQ dinner and flashing peace signs around the table" },
  { kind: "reel", shortcode: "Db_EMPoTApp", caption: "When the group chat says wear whatever", date: "Aug 2026" },
  { kind: "photo", src: "/photos/knd-05.jpeg", alt: "Language exchange event with Korean and international participants" },
  { kind: "reel", shortcode: "DblZO7ezyct", caption: "Snacks, games and peace signs", date: "Aug 2026" },
  { kind: "photo", src: "/photos/knd-08.jpeg", alt: "KND members on a night hike up Gwanaksan mountain in Seoul" },
  { kind: "photo", src: "/photos/knd-19.jpeg", alt: "KND members around a table holding plush toys at a June 2026 gathering" },
  { kind: "reel", shortcode: "DadMLWkTdKo", caption: "POV: you found your community in Seoul", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-02.jpeg", alt: "Community members making dumplings at KND Seollal tteokguk party" },
  { kind: "photo", src: "/photos/knd-17.jpeg", alt: "KND neighbors sitting in a circle on the grass at sunset outside the Seoul Museum of History" },
  { kind: "reel", shortcode: "DbdFEPHzx30", caption: "Monday night dinner", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-04.jpeg", alt: "KND members playing Yut Nori together at Seollal celebration" },
  { kind: "reel", shortcode: "Dah8tW4TA-Q", caption: "Wednesday work and study session", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-06.jpeg", alt: "KND neighbors enjoying food and conversation together in Seoul" },
  { kind: "reel", shortcode: "DbBKEs-TeYS", caption: "Monday dinner at Chakraa in Hannam", date: "Jul 2026" },
  { kind: "photo", src: "/photos/knd-03.jpeg", alt: "International community gathering at Koreans Next Door Seoul" },
  { kind: "reel", shortcode: "DZnHl12TWny", caption: "A reason to look forward to Mondays", date: "Jun 2026" },
  { kind: "photo", src: "/photos/knd-07.jpeg", alt: "Group photo of Koreans Next Door community members" },
  { kind: "photo", src: "/photos/knd-09.jpeg", alt: "KND group photo outside 天下一麵 restaurant in Seoul" },
];

export const photosOnly = proofMedia.filter(
  (m): m is Extract<ProofItem, { kind: "photo" }> => m.kind === "photo"
);
