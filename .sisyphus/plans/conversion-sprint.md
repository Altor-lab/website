# Conversion Sprint Plan — altorlab.com
**Version**: 2 (post-Momus review)
**Goal**: Convert VP Eng / CTO visitors from "close tab" to "send email or book call" without hurting SEO engine.
**Constraint**: Static site, solo dev, 1-2 days, no invented proof — all claims must exist in codebase already.
**ICP**: Series A-C VP Engineering / CTO, $14K-30K signing authority, deeply skeptical, 80% research done before contact.

---

## Fix 1 — Separate commercial and SEO journeys on homepage
**Priority**: P0

### What
Remove the `{/* ━━━ FREE INTELLIGENCE TOOLS ━━━ */}` section from Home.jsx body. Replace with a `<TrustBar />` component (see Fix 3). Preserve tool discoverability via:
- Footer: add "Free Tools" column with links to /mcp-servers, /ai-stack, /automate
- Nav: "Tools" link already exists in Header.jsx pageLinks — keep it, rename to "Resources"

### Where
- `react-app/src/pages/Home.jsx` — remove tools section
- `react-app/src/components/Header.jsx` — rename "Tools" → "Resources"
- `react-app/src/components/Footer.jsx` (or equivalent footer component) — add tool links

### Why it works
VP Eng landing on a commercial homepage who sees an MCP server directory mid-page pattern-matches "unfocused startup." Removing resolves positioning confusion. Tools remain crawlable via footer/nav.

### Risk
SEO: tools section provided internal links. Mitigation: footer + nav links preserve crawlability. Sitemap unchanged.

### QA Scenario
**Tool**: Playwright / browser
**Steps**:
1. `curl -s https://altorlab.com/ | grep -c "AI Stack Tracker"` → must return 0
2. Navigate to `altorlab.com` in browser → search DOM for "MCP Server Directory" in body (not nav/footer) → must not be present as a card heading
3. Navigate to `altorlab.com` → click footer "Free Tools" or "Resources" nav → confirm reaches `/mcp-servers` (200 OK)
4. `curl -s https://altorlab.com/sitemap-pages.xml | grep mcp-servers` → must still return entries
**Expected**: Tools section gone from page body; tools reachable within 2 clicks; sitemap unchanged.

### Effort: M (2-3 hrs)

---

## Fix 2 — Make Portkey proof card do more work
**Priority**: P0

### What
Replace the homepage Portkey pull-quote section with a structured proof card showing:
- Company context: "Portkey is an AI gateway platform handling billions of API requests"
- Stack: "ClickHouse · Linear · Stripe · GitHub · 6 systems total"
- Before: "45 min per ticket — 6 browser tabs — manual"
- After: "2 min per ticket — 200+ tickets — 2 weeks to live"
- The quote: "Nobody else could even attempt to answer them automatically." — Engineering Lead, Portkey
- Two links: "Read the full case study →" (/work/support-investigation) + "Your stack looks like Portkey's →" (mailto)

All claims sourced from `WorkSupportInvestigation.jsx`: 45min, 2min, 200+, 2 weeks, ClickHouse/Linear/Stripe/GitHub.

### Where
- `react-app/src/pages/Home.jsx` — update `{/* ━━━ QUOTE ━━━ */}` section

### Why it works
ICP needs to pattern-match "is this company like mine?" Stack details (ClickHouse, Linear, Stripe) answer that faster than any copy.

### Risk
Longer section pushes CTA down. Mitigation: cap at 6 lines, no verbose prose.

### QA Scenario
**Tool**: Browser + DOM check
**Steps**:
1. Navigate to `altorlab.com` → search page for "ClickHouse" → must appear in proof section
2. Search page for "45 min" AND "2 min" → both must be present in same section
3. Search page for "200+" → must be present
4. Confirm link to `/work/support-investigation` exists in that section (href check)
5. Verify all numbers match `WorkSupportInvestigation.jsx` source (no new claims)
**Expected**: All 5 checks pass. Zero invented numbers.

### Effort: S (1 hr)

---

## Fix 3 — TrustBar component (security signal)
**Priority**: P1

### What
Create `react-app/src/components/TrustBar.jsx` with 5 signals — all sourced from existing `/security` page and `Pricing.jsx`:
1. "Read-only by default" (Security.jsx: "Every Altor deployment starts with read-only access")
2. "No model training on your data" (Security.jsx: implied by data handling section)
3. "Encrypted in transit" (Security.jsx: standard claim)
4. "DPA available for regulated engagements" (Pricing.jsx Production tier includes: "DPA and security documentation")
5. "Code you own, always" (engagement model — verify against Security.jsx or Pricing.jsx before including; if not sourced, drop this one)

Each signal links to `/security`. Add TrustBar to: homepage (after hero), Pricing.jsx (above tiers), NYC.jsx (near CTA card).

### Where
- `react-app/src/components/TrustBar.jsx` — new component
- `react-app/src/pages/Home.jsx` — import after hero section
- `react-app/src/pages/Pricing.jsx` — import above tiers
- `react-app/src/pages/NYC.jsx` — import near CTA card

### Why it works
75% of enterprise buyers require security signal before evaluating. `/security` exists with real content — surfacing it costs nothing and resolves a silent dealbreaker.

### Risk
"DPA available" implies ready to send. Only include if Anshul can actually produce a DPA on request. If uncertain: change to "DPA on request" or drop signal 4.

### QA Scenario
**Tool**: Browser + curl
**Steps**:
1. Navigate to `altorlab.com` → confirm "Read-only by default" visible without scrolling (or within first scroll)
2. Navigate to `altorlab.com/pricing` → confirm TrustBar renders above tier cards
3. Navigate to `altorlab.com/nyc` → confirm TrustBar renders near CTA section
4. Click any TrustBar signal → confirm navigates to `/security` (200 OK)
5. `grep -n "DPA" react-app/src/pages/Pricing.jsx` → confirm DPA claim exists in source before including it in TrustBar
**Expected**: TrustBar present on all 3 pages; all claims trace to existing codebase source; /security link works.

### Effort: S (1-2 hrs)

---

## Fix 4 — CTA hierarchy: two paths, not three
**Priority**: P1

### What
Change homepage hero CTAs from current "Email your workflow → (primary) + Book a call (secondary)" to exactly **two** CTAs:

1. **Primary** (lower commitment, proof-first): "See how we diagnosed Portkey →" → `/work/support-investigation`
2. **Secondary** (ready to engage): "Email your workflow →" → mailto

Remove or relocate the Calendly "Book a call" link from the hero — it can remain on the case study page and pricing page. Two CTAs only in the hero section.

**Guardrail (corrected)**: No section should have more than **2** CTAs. (Previous version said "3+" — resolved here.)

### Where
- `react-app/src/pages/Home.jsx` — hero CTA block only

### Why it works
"Email your workflow" asks for sensitive info before trust is established. Offering the case study first as no-commitment step lets ICP self-qualify. The case study page already has strong CTAs at the bottom — this is a funnel, not a detour.

### Risk
Reducing raw email volume (intentional — fewer, more qualified contacts). Calendly not removed from site, just de-emphasized from hero.

### QA Scenario
**Tool**: Browser + DOM
**Steps**:
1. Navigate to `altorlab.com` → count CTA buttons/links in hero section → must be exactly 2
2. First CTA href must be `/work/support-investigation`
3. Second CTA href must be `mailto:anshul@altorlab.com` (or equivalent)
4. Calendly link must NOT appear in hero section (may appear elsewhere on page)
5. Navigate to `/work/support-investigation` → confirm it loads (200 OK) and has its own CTA at bottom
**Expected**: Exactly 2 CTAs in hero; case study link is primary; Calendly absent from hero.

### Effort: S (1 hr)

---

## Fix 5 — Pricing: visible anchor
**Priority**: P1

### What
Add to Pricing.jsx Pilot tier card, visible above fold or in first scroll:

```
Pilot engagements from $14K.

Includes:
- 3-week forward-deployed engagement
- Up to 3 system integrations
- 500 investigations in pilot window
- Investigation playbooks for your top 5 ticket types
- Full investigation log access
- You own everything at handover

At Portkey: 45 min per ticket became 2 min. 200+ tickets. 2 weeks.
```

All claims sourced: $14K from NYC.jsx line ~492; Portkey stats from WorkSupportInvestigation.jsx; pilot tier includes from existing Pricing.jsx `tiers` array (already contains these items — just make them visible alongside the price).

Do NOT add ROI calculator. Do NOT add "~40 engineer-hours/week" (not sourced).

### Where
- `react-app/src/pages/Pricing.jsx` — Pilot tier card, add price anchor and Portkey stat

### Why it works
"Scoped on call" = functional equivalent of "contact us for pricing." Showing $14K answers "can I approve this without CFO?" (yes, under $30K threshold) and gives a reference point.

### Risk
$14K may attract wrong-fit buyers. Mitigation: already on NYC page — consistency reduces risk, doesn't add it.

### QA Scenario
**Tool**: Browser + curl
**Steps**:
1. Navigate to `altorlab.com/pricing` → search page for "$14K" or "14,000" → must be present
2. Confirm "$14K" visible without scrolling (above fold) or within first scroll on 1440px desktop viewport
3. Confirm "45 min" and "2 min" present on pricing page (Portkey stat)
4. `grep "14K\|14,000" react-app/src/pages/Pricing.jsx` → verify source contains the number
5. Confirm "Scoped on call" still present for Production tier (should not be changed)
**Expected**: $14K visible on pricing page; Portkey stat present; Production tier unchanged.

### Effort: S (1 hr)

---

## Fix 6 — Social proof: make one case study feel definitive
**Priority**: P1

### What
Two copy additions — no invented claims:

1. In the Portkey proof card (Fix 2): add company description sourced from WorkSupportInvestigation.jsx: "Portkey is an AI gateway platform handling billions of API requests from AI-first engineering teams."

2. Add "Who we work best with" section below the proof card — framed as problem profile, not client count:
```
We work best with:
✓ B2B SaaS engineering teams with production support queues
✓ Tickets that require live system queries (not just knowledge base lookup)
✓ Stacks with APIs: ClickHouse, Linear, Stripe, GitHub, Pylon, Zendesk, or similar
✓ Recurring investigation patterns (the same 5-10 ticket types, over and over)
```
This is a problem-qualification checklist — not a claim of multiple clients.

Do NOT include "15-200 engineers" or "200+ tickets/month" — not sourced.

### Where
- `react-app/src/pages/Home.jsx` — proof card section (same location as Fix 2)

### Why it works
"Who we work best with" signals expertise without requiring multiple case studies. The stack list (ClickHouse, Linear, Stripe) helps the ICP pattern-match.

### Risk
Could read as exclusionary. Mitigation: frame as "works best with" not "only works for."

### QA Scenario
**Tool**: Browser + DOM
**Steps**:
1. Navigate to `altorlab.com` → search page for "AI gateway" → must be present in proof section
2. Search page for "ClickHouse" in "who we work best with" context → must be present
3. Search page for "15-200 engineers" or "200+ tickets/month" → must NOT be present (unsourced)
4. Verify "AI gateway platform handling billions" matches WorkSupportInvestigation.jsx description text
**Expected**: Company context present; stack checklist present; unsourced claims absent.

### Effort: S (30 min — mostly copy)

---

## Fix 7 — NYC page: meeting deliverable clarity
**Priority**: P2

### What
Add one line to NYC.jsx sticky offer card, below the two CTA buttons:

> "In NYC: 30 minutes in person → you walk away knowing exactly what to build and whether Altor is the right fit. Not a deck."

### Where
- `react-app/src/pages/NYC.jsx` — sticky offer card, below CTA buttons, above "Available in Flatiron..." line

### Why it works
The ICP who typed `altorlab.com/nyc` from a business card wants to know what the meeting actually is. One line resolves the ambiguity.

### Risk
If this overpromises what a 30-min intro meeting delivers, soften to "you leave with a clear picture of whether Altor fits your workflow." Do not promise a "system design" if that's not realistic in 30 min.

### QA Scenario
**Tool**: Browser
**Steps**:
1. Navigate to `altorlab.com/nyc` on mobile (390px viewport) → scroll to offer card → confirm meeting deliverable line is visible
2. Confirm line is below the CTA buttons (not above)
3. Confirm "Not a deck" or equivalent language present
4. Confirm no promise of "system design" (too specific for a 30-min intro) — use "clear picture of fit" instead
**Expected**: One line present, below buttons, honest framing.

### Effort: XS (15 min)

---

## Sequencing

```
Session 1 (~4 hrs):
  1. Fix 7 — NYC one-liner              (15 min — easiest, highest urgency for trip)
  2. Fix 5 — Pricing anchor             (1 hr)
  3. Fix 3 — TrustBar component         (2 hrs)

Session 2 (~4 hrs):
  4. Fix 2 + 6 — Portkey proof card     (1.5 hrs combined — same section)
  5. Fix 4 — CTA hierarchy              (1 hr)
  6. Fix 1 — Homepage tools removal     (2 hrs — most complex, do last)

Session 3 (~1 hr):
  7. Full QA walkthrough (all 7 QA scenarios above, in order)
  8. Commit + push
```

**Total: ~9 hrs (1.5 days solo dev)**

---

## What NOT to Do

- ❌ Do NOT invent case studies, client logos, or claims not in codebase
- ❌ Do NOT claim SOC 2 — say "DPA available on request" and link to /security
- ❌ Do NOT build an ROI calculator
- ❌ Do NOT orphan tool pages — footer + nav links must preserve crawlability
- ❌ Do NOT add more than 2 CTAs to any single section
- ❌ Do NOT include "~40 engineer-hours/week", "15-200 engineers", "200+ tickets/month" — unsourced
- ❌ Do NOT remove the Calendly link from the site — only move it out of the hero

---

## Success Metric

**Three-question test** — a VP Eng reading the homepage for 90 seconds should answer:
1. "What exactly does Altor build?" → hero headline
2. "Has this worked for a company like mine?" → Portkey proof card with stack details
3. "What does this roughly cost?" → $14K anchor on pricing page (one click away)

**Measurable proxy**: Plausible Analytics click-through rate on `/work/support-investigation` from homepage. If this increases post-sprint: proof card is working. Baseline it before implementation.
