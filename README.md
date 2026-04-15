# Food Ranker

Community-voted restaurant rankings. Browse curated lists by cuisine and city, upvote or downvote restaurants, and watch the rankings shift in real time.

---

## What it does

- **Browse lists** — 8 curated lists covering pizza in NYC, sushi in LA, BBQ in Austin, ramen in LA, tacos in San Francisco, brunch in Chicago, burgers in NYC, and steakhouses in Chicago
- **Vote** — upvote or downvote any restaurant; click the same direction again to remove your vote
- **Live rankings** — the list re-sorts instantly based on net score (upvotes minus downvotes)
- **Persistent votes** — your votes are saved to localStorage and survive page refreshes

---

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Other commands

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Routing | React Router v6 (slug-based) |
| State | Zustand with localStorage persistence |
| Styling | Tailwind CSS v3 with custom design tokens |
| Fonts | Playfair Display (headings) + Inter (body) |

No UI component libraries — fully custom components.

---

## Project structure

```
src/
├── types/          # TypeScript interfaces
├── data/           # Mock restaurant and list data
├── services/       # Async service layer (swap internals for a real API)
├── store/          # Zustand vote store
├── router/         # React Router config
├── pages/          # HomePage, ListDetailPage
└── components/
    ├── layout/     # Header
    ├── home/       # FeaturedHero, ListCard, FilterBar
    ├── list/       # RankItem, VoteButtons
    └── shared/     # CategoryPill
```

---

## Adding a backend

The service layer in `src/services/listService.ts` is a mock with simulated network delay. To connect a real API:

1. Replace the internals of `getLists()`, `getListById()`, and `vote()` with `fetch` or axios calls
2. Remove the `persist` middleware from `src/store/voteStore.ts` (the server becomes source of truth)
3. Add auth to the `vote()` call as needed

No component changes required.
