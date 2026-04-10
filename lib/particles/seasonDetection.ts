export type ParticleEffect = "cherry-blossom" | "snow" | null;

// Cherry blossom season in Seoul: roughly March 25 – April 15
const CHERRY_START_MONTH = 3; // March (1-indexed)
const CHERRY_START_DAY = 25;
const CHERRY_END_MONTH = 4;   // April
const CHERRY_END_DAY = 15;

// WMO weather codes that indicate snow
const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86]);

export function isCherryBlossomSeason(): boolean {
  // Convert current time to KST (UTC+9)
  const kstStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  const kst = new Date(kstStr);
  const month = kst.getMonth() + 1; // 1-indexed
  const day = kst.getDate();

  const afterStart =
    month > CHERRY_START_MONTH ||
    (month === CHERRY_START_MONTH && day >= CHERRY_START_DAY);
  const beforeEnd =
    month < CHERRY_END_MONTH ||
    (month === CHERRY_END_MONTH && day <= CHERRY_END_DAY);

  return afterStart && beforeEnd;
}

export function isSnowWeatherCode(code: number): boolean {
  return SNOW_CODES.has(code);
}

export function determineEffect(
  cherryBlossom: boolean,
  weatherCode: number | null
): ParticleEffect {
  if (weatherCode !== null && isSnowWeatherCode(weatherCode)) return "snow";
  if (cherryBlossom) return "cherry-blossom";
  return null;
}
