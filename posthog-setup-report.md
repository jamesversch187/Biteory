<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Food Ranker. The `posthog-node` SDK (edge entrypoint) was installed and a shared client was created at `src/lib/posthog.ts`. Seven events were instrumented across four files — stores and pages — using the session ID from `src/lib/session.ts` as the distinct ID. The `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` environment variables were written to `.env.local` and are referenced via `import.meta.env` in the client module. The build was verified clean after switching to the `posthog-node/edge` entrypoint to avoid Node.js-only path APIs that are unavailable in Vite browser builds.

| Event | Description | File |
|-------|-------------|------|
| `list_viewed` | User opened a ranked restaurant list page | `src/pages/ListDetailPage.tsx` |
| `restaurant_voted` | User cast an upvote or downvote on a restaurant | `src/store/voteStore.ts` |
| `restaurant_added_to_list` | User added a new restaurant to a ranked list | `src/store/addedRestaurantsStore.ts` |
| `cuisine_filter_applied` | User filtered the home-page list grid by cuisine type | `src/pages/HomePage.tsx` |
| `price_filter_applied` | User filtered restaurants on a list page by price range | `src/pages/ListDetailPage.tsx` |
| `menu_item_added` | User added a new dish to a restaurant's menu page | `src/store/menuStore.ts` |
| `menu_item_rated` | User rated a dish on a restaurant's menu page | `src/store/menuStore.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/380954/dashboard/1463231
- **Engagement Funnel: Browse → Vote → Add:** https://us.posthog.com/project/380954/insights/kPMPDEXL
- **Daily Voting & Additions:** https://us.posthog.com/project/380954/insights/jLe5cxSd
- **Daily Active List Viewers:** https://us.posthog.com/project/380954/insights/RzNKf0T1
- **Menu Engagement: Dishes Added & Rated:** https://us.posthog.com/project/380954/insights/iPJMJn9y
- **Cuisine Filter Popularity:** https://us.posthog.com/project/380954/insights/DaZysepr

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
