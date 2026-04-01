# Feedback Results Redesign — Question-First Layout

**Date:** 2026-04-02
**Status:** Approved

## Problem

The current results page aggregates quantitative data (stars, NPS, pace) but buries longtext answers (`highlight`, `improvement`) inside individual response accordions. There is no way to read all "best moment" or "improvement suggestions" answers in one place.

## Goal

Redesign `ResultsClient.tsx` so every question has its own card showing all aggregated answers, in question order. The user should be able to scan each question top-to-bottom and see the full picture without expanding individual responses.

## Layout (top to bottom)

1. **Header** — title ("Feedback Results") + Export CSV button (unchanged)
2. **Event filter** — dropdown (unchanged)
3. **Response count** — subtle pill showing total responses, e.g. `12 responses`
4. **Question cards** — one card per question, rendered in `FEEDBACK_QUESTIONS` order
5. **Individual responses** — existing accordion at the bottom, unchanged

## Question Card Designs

### Stars (`type: "stars"`)
- Question label (English)
- Average score — large bold number (e.g. `4.3`) with filled star icons
- Distribution bars — one row per star value (5 → 1), showing count + filled bar proportional to share

### NPS (`type: "nps"`)
- Question label
- Big score number, color-coded: green ≥ 50, yellow 0–49, red < 0
- Breakdown bar: Promoters (9–10) / Passives (7–8) / Detractors (0–6) with counts and percentages

### Multiple choice (`type: "multiplechoice"`)
- Question label
- One row per option: label, horizontal progress bar, count + percentage
- "Other" responses listed below if any exist

### Longtext (`type: "longtext"`)
- Question label + response count badge (e.g. `8 responses`)
- Scrollable list of quoted response cards — one card per non-empty answer
- No author attribution; just the text
- Empty state: "No responses yet" if all blank

## Files Changed

- `app/feedback/results/ResultsClient.tsx` — primary change: restructure JSX, add distribution/NPS breakdown logic
- `app/feedback/results/page.tsx` — add two new computed props passed to `ResultsClient`:
  - `starDistributions: Record<string, number[]>` — per star-question ID, array of counts indexed [1..5]
  - `npsBreakdown: { promoters: number; passives: number; detractors: number }` — counts for NPS groups

## What Stays the Same

- Event filter logic and URL param handling
- Export CSV
- Individual response accordions (bottom of page)
- Overall page styling (`bg-[#fafaf8]`, white cards, rounded-2xl)

## Out of Scope

- No new API calls
- No changes to `feedbackQuestions.ts` or `feedbackTypes.ts`
- No auth changes
