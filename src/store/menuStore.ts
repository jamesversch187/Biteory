import { create } from 'zustand'
import type { MenuItem } from '@/types'
import { getMenuItems, addMenuItem as addMenuItemService, getMenuRatings, setMenuRating } from '@/services'
import posthog from '@/lib/posthog'

interface MenuState {
  items: Record<string, MenuItem[]>
  ratings: Record<string, number>
  loadForRestaurant(restaurantId: string): Promise<void>
  addItem(restaurantId: string, name: string): Promise<void>
  getItems(restaurantId: string): MenuItem[]
  setRating(menuItemId: string, rating: number): Promise<void>
  getRating(menuItemId: string): number | null
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  items: {},
  ratings: {},

  async loadForRestaurant(restaurantId) {
    const [items, ratings] = await Promise.all([
      getMenuItems(restaurantId),
      getMenuRatings(restaurantId),
    ])
    set((state) => ({
      items: { ...state.items, [restaurantId]: items },
      ratings: { ...state.ratings, ...ratings },
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

  async setRating(menuItemId, rating) {
    set((state) => ({ ratings: { ...state.ratings, [menuItemId]: rating } }))
    await setMenuRating(menuItemId, rating)
    posthog.capture('menu_item_rated', {
      item_id: menuItemId,
      rating,
    })
  },

  getRating(menuItemId) {
    return get().ratings[menuItemId] ?? null
  },
}))
