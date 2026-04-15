import { create } from 'zustand'
import type { ListEntry, Restaurant } from '@/types'
import { addRestaurantToList, getAddedEntries as fetchAddedEntries, checkMapsUrlExists } from '@/services'
import posthog from '@/lib/posthog'
import { getSessionId } from '@/lib/session'

interface AddedRestaurantsState {
  entries: Record<string, ListEntry[]>
  loadForList(listId: string): Promise<void>
  addRestaurant(listId: string, restaurant: Restaurant): Promise<void>
  getEntries(listId: string): ListEntry[]
  hasMapsUrl(listId: string, mapsUrl: string, staticEntries: ListEntry[]): Promise<boolean>
}

export const useAddedRestaurantsStore = create<AddedRestaurantsState>()((set, get) => ({
  entries: {},

  async loadForList(listId) {
    const added = await fetchAddedEntries(listId)
    set((state) => ({ entries: { ...state.entries, [listId]: added } }))
  },

  async addRestaurant(listId, restaurant) {
    await addRestaurantToList(listId, restaurant)
    posthog.capture({
      distinctId: getSessionId(),
      event: 'restaurant_added_to_list',
      properties: {
        list_id: listId,
        restaurant_id: restaurant.id,
        restaurant_name: restaurant.name,
        has_maps_url: !!restaurant.mapsUrl,
      },
    })
    const newEntry: ListEntry = { restaurant, initialUpvotes: 1, initialDownvotes: 0 }
    set((state) => {
      const existing = state.entries[listId] ?? []
      return { entries: { ...state.entries, [listId]: [...existing, newEntry] } }
    })
  },

  getEntries(listId) {
    return get().entries[listId] ?? []
  },

  async hasMapsUrl(listId, mapsUrl, staticEntries) {
    const norm = mapsUrl.trim().toLowerCase()
    const inStatic = staticEntries.some(
      (e) => e.restaurant.mapsUrl?.trim().toLowerCase() === norm,
    )
    if (inStatic) return true
    return checkMapsUrlExists(listId, norm)
  },
}))
