# FindMyCar

**Preview:** https://car-app-six-chi.vercel.app/

A modern car research and recommendation web app built with **Next.js 16 + React 19**, designed to help Indian buyers discover, compare, and shortlist cars tailored to their budget and lifestyle.

---

## What did I build, and why?

The Indian car market is genuinely hard to navigate — dozens of makes, overlapping body types, wildly different safety records, and prices that vary by fuel type and variant. Most comparison sites are cluttered with ads and lead-gen forms. I wanted a clean, fast tool that puts the actual data front and centre.

**Core features:**

- **Browse & Filter** — filter by make, body type, fuel type, transmission, price range, seating capacity, and safety rating
- **Car Detail Pages** — full specs, NCAP safety rating card, similar car suggestions, review scores
- **Side-by-Side Compare** — up to 3 cars simultaneously; best values highlighted in green per row
- **Personalised Quiz** — 6 questions scored across budget, usage, family size, fuel preference, body style, and priorities; returns top matches with plain-English reasons
- **Shortlist** — save favourites with localStorage persistence across sessions
- **Instant Search** — debounced search by make, model, or variant (kicks in after 2 characters)

**What I deliberately cut:**

- **No database.** All car data lives in a static JSON file. This eliminated infra complexity entirely and made deployment a single `git push`. The tradeoff is a hardcoded dataset of ~40 cars — fine for a prototype, a real product would need a CMS or database.
- **No authentication.** Compare lists and shortlists live in localStorage. No accounts, no backend, no session management.
- **No real images.** Cars are represented with emoji and brand-coloured backgrounds. Sourcing and hosting 40+ car images wasn't the point.
- **No dealer pricing or lead-gen.** Prices are static ex-showroom figures from the JSON. Real-world on-road prices vary by city, RTO, and insurance.
- **No user reviews.** Review scores in the dataset are illustrative, not aggregated from real users.

---

## Tech stack — and why

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16.2.6 (App Router) | SSG for car detail pages (`generateStaticParams`) means 40 pages pre-built at deploy time — zero server cost for the most-visited pages. API routes handle filters and search without a separate backend. |
| UI | React 19.2.4 | Concurrent features + server components |
| Language | TypeScript 5 | A shared `Car` interface across API routes, components, and the quiz algorithm meant type errors caught at compile time rather than runtime |
| Styling | Tailwind CSS v4 | Fastest way to build a consistent UI without writing a design system from scratch |
| Icons | lucide-react | Consistent, tree-shakeable |
| Utilities | clsx + tailwind-merge | Clean conditional class logic |
| Font | Geist | Ships with Next.js, zero config |
| Data | Static JSON | No database = no migrations, no connection pooling, trivial deployment |
| State | React Context + localStorage | Compare/shortlist state needed to survive page navigation but not a server round-trip; Context + localStorage is the right fit at this scale |

---

## What I delegated to AI, and where it helped most

I built this with **Claude Code** as a coding assistant throughout.

**Where it helped most:**

- **Boilerplate and scaffolding** — generating the initial component tree, TypeScript interfaces, and API route signatures. Getting from zero to a working skeleton took minutes instead of hours.
- **The quiz scoring algorithm** — translating "budget match should be worth more than body type preference" into a weighted points system across 6 dimensions. The algorithm came out clean on the first pass.
- **The cars dataset** — populating `cars.json` with realistic Indian market specs, prices, mileage figures, and NCAP ratings for ~40 cars across all body types and fuel categories. Doing this by hand would have been tedious and error-prone.
- **Filter and sort logic** — chaining multiple filter conditions with correct type narrowing and edge-case handling (e.g. mileage sort correctly excluding EVs from kmpl comparison).
- **ESLint fixes** — surfaced and fixed four lint errors (`setState` in effect bodies, `<a>` vs `<Link>`) that would have caused subtle runtime issues.

**Where I did the work manually:**

- All product decisions — what questions the quiz asks, what the scoring weights are, what gets cut
- UX structure — how the comparison table highlights winners, how the quiz flows, how breadcrumbs work on detail pages
- The Cloudflare deployment debugging — the `WORKER_SELF_REFERENCE` error required understanding the difference between Cloudflare Pages and Workers at a product level, not just a code level

---

## Where AI tools got in the way

**Cloudflare deployment.** The tooling (`@cloudflare/next-on-pages` vs `@opennextjs/cloudflare` vs Cloudflare Pages vs Workers) is genuinely confusing, and the AI's suggestions were confident but initially wrong — it set up `@opennextjs/cloudflare` correctly at a code level but didn't immediately flag that Cloudflare Pages would ignore our `wrangler.toml` entirely and keep injecting `WORKER_SELF_REFERENCE` through its own framework preset. Diagnosing that required reading Cloudflare's actual error logs and understanding which product was running which command. Ended up switching to Vercel for now, with the Cloudflare setup preserved for later.

**Over-eager comments and docstrings.** Early generated code had comments explaining what every function did. Had to strip these back — good names make most comments redundant.

---

## If I had another 4 hours

1. **More cars in the dataset** — 40 cars covers the popular segments but misses luxury, EVs, and niche variants. Would expand to 100+ with a structured data pipeline.
2. **EMI calculator on the detail page** — price in INR is abstract; monthly instalments at a given down payment and interest rate are what buyers actually think in.
3. **Comparison table on mobile** — the horizontal scroll works but a swipe-based card layout would be better on small screens.
4. **Real NCAP data links** — link each safety rating back to the actual Global NCAP test report.
5. **Persistent compare/shortlist across devices** — either a lightweight backend or a shareable URL that encodes the compare list, so you can hand it to someone else.
6. **City-specific on-road price estimates** — ex-showroom + average RTO + insurance by city, since that's what buyers actually pay.

---

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

**Vercel (current):** connect the repo — framework auto-detected, no config needed.

**Cloudflare Workers (future):** setup is already in place.
```bash
# requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
npm run cf:deploy
```
