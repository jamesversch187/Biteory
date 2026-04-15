import type { RestaurantList, ListSummary } from '@/types'
import { lists } from '@/data/lists'

const delay = () => new Promise((res) => setTimeout(res, 80 + Math.random() * 40))

function toSummary(list: RestaurantList): ListSummary {
  return {
    id: list.id,
    slug: list.slug,
    title: list.title,
    description: list.description,
    cuisine: list.cuisine,
    city: list.city,
    coverImageUrl: list.coverImageUrl,
    entryCount: list.entries.length,
    topRestaurantNames: list.entries.slice(0, 3).map((e) => e.restaurant.name),
  }
}

export async function getLists(): Promise<ListSummary[]> {
  await delay()
  return lists.map(toSummary)
}

export async function getListById(idOrSlug: string): Promise<RestaurantList | null> {
  await delay()
  return lists.find((l) => l.id === idOrSlug || l.slug === idOrSlug) ?? null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function vote(_listId: string, _restaurantId: string, _direction: 'up' | 'down'): Promise<void> {
  await delay()
  // no-op in mock — store handles optimistic updates
}
