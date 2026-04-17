import { create } from 'zustand'
import type { MenuItem } from '@/types'
import { getMenuItems, addMenuItem as addMenuItemService, getMenuRatings, getMenuAverageRatings, setMenuRating } from '@/services'
import posthog from '@/lib/posthog'

interface MenuState {
  items: Record<string, MenuItem[]>
  ratings: Record<string, number>
  averageRatings: Record<string, number>
  loadForRestaurant(restaurantId: string): Promise<void>
  addItem(restaurantId: string, name: string): Promise<void>
  getItems(restaurantId: string): MenuItem[]
  setRating(restaurantId: string, menuItemId: string, rating: number): Promise<void>
  getRating(menuItemId: string): number | null
  getAverageRating(menuItemId: string): number | null
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  items: {},
  ratings: {},
  averageRatings: {},

  async loadForRestaurant(restaurantId) {
    const [items, ratings, averageRatings] = await Promise.all([
      getMenuItems(restaurantId),
      getMenuRatings(restaurantId),
      getMenuAverageRatings(restaurantId),
    ])
    set((state) => ({
      items: { ...state.items, [restaurantId]: items },
      ratings: { ...state.ratings, ...ratings },
      averageRatings: { ...state.averageRatings, ...averageRatings },
    }))
  },

  async addItem(restaurantId, name) {
    const item = await addMenuItemService(restaurantId, name)
    posthog.capture('menu_item_added', {
      restaurant_id: restaurantId,
      item_name: name,
    })
    set((state) => {
      const existing = state.items[restaurantId] ?? []
      return { items: { ...state.items, [restaurantId]: [...existing, item] } }
    })
  },

  getItems(restaurantId) {
    return get().items[restaurantId] ?? []
  },

  async setRating(restaurantId, menuItemId, rating) {
    set((state) => ({ ratings: { ...state.ratings, [menuItemId]: rating } }))
    await setMenuRating(menuItemId, rating)
    posthog.capture('menu_item_rated', {
      item_id: menuItemId,
      rating,
    })
    const updatedAverages = await getMenuAverageRatings(restaurantId)
    set((state) => ({ averageRatings: { ...state.averageRatings, ...updatedAverages } }))
  },

  getRating(menuItemId) {
    return get().ratings[menuItemId] ?? null
  },

  getAverageRating(menuItemId) {
    return get().averageRatings[menuItemId] ?? null
  },
}))
