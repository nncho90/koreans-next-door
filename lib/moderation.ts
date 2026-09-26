/**
 * Automatic screening for submitted reviews.
 *
 * One call to Claude Haiku with the text and, when there is one, the photo.
 * It fails closed: any error, timeout or missing API key returns allow=false,
 * which leaves the review waiting for a human instead of publishing it blind.
 */

const MODEL = "claude-haiku-4-5-20251001";
const TIMEOUT_MS = 8000;

export interface ScreeningResult {
  allow: boolean;
  reasons: string[];
  model: string;
}

const SYSTEM = `You screen short reviews submitted to the website of Koreans Next Door, a
community group in Seoul that runs free language exchanges, dinners and hikes for Korean
and international neighbours. Reviews are written by people who attended.

Allow a review when it is a genuine comment about the group, an event, the people, or the
experience of living in Seoul, even if it is critical, blunt, badly spelled or written in
a language other than English.

Do not allow it when it contains any of:
- harassment, insults aimed at a person, hate speech, or threats
- sexual content, or anything sexualising the people in the photo
- advertising, promotion, recruiting, referral codes, or anything selling something
- phone numbers, email addresses, or attempts to move people to another service
- personal information about someone else
- text that is meaningless, automated, or unrelated to the group

When there is a photo, also check it: it should be a person, a group of people, food, or
a place, consistent with a community event. Do not allow nudity, violence, memes with
text overlays selling something, screenshots, or anything that looks like stock imagery.

Reply with JSON only, no other text:
{"allow": true or false, "reasons": ["short reason", ...]}
Keep reasons empty when you allow it.`;

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };

export async function screenReview(input: {
  text: string;
  name: string;
  city: string;
  photo?: { bytes: Buffer; contentType: string };
}): Promise<ScreeningResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { allow: false, reasons: ["screening_unavailable"], model: "none" };
  }

  const content: ContentBlock[] = [];
  if (input.photo) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: input.photo.contentType,
        data: input.photo.bytes.toString("base64"),
      },
    });
  }
  content.push({
    type: "text",
    text: `Name: ${input.name}\nCity: ${input.city}\nReview: ${input.text}`,
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 200,
        system: SYSTEM,
        messages: [{ role: "user", content }],
      }),
    });

    if (!res.ok) {
      return { allow: false, reasons: [`screening_http_${res.status}`], model: MODEL };
    }

    const data = await res.json();
    const raw: string = data?.content?.[0]?.text ?? "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return { allow: false, reasons: ["screening_unparsable"], model: MODEL };

    const parsed = JSON.parse(match[0]);
    return {
      allow: parsed.allow === true,
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons.slice(0, 5).map(String) : [],
      model: MODEL,
    };
  } catch (err) {
    const reason = err instanceof Error && err.name === "AbortError" ? "screening_timeout" : "screening_error";
    return { allow: false, reasons: [reason], model: MODEL };
  } finally {
    clearTimeout(timer);
  }
}
