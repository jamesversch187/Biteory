import { PostHog } from 'posthog-node/edge'

const posthog = new PostHog(import.meta.env.VITE_POSTHOG_KEY as string, {
  host: import.meta.env.VITE_POSTHOG_HOST as string,
})

export default posthog
