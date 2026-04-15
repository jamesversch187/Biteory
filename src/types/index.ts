import type { ReactNode } from 'react'

export type CuisineType =
  | 'pizza'
  | 'sushi'
  | 'brunch'
  | 'italian'
  | 'mexican'
  | 'bbq'
  | 'seafood'
  | 'burgers'
  | 'ramen'
  | 'tacos'
  | 'steakhouse'
  | 'vegan'
  | 'bakery'
  | 'chinese'
  | 'fast-casual'

export type City =
  | 'new-york'
  | 'los-angeles'
  | 'chicago'
  | 'san-francisco'
  | 'miami'
  | 'austin'
  | 'nashville'
  | 'seattle'
  | 'denver'

export type VoteDirection = 'up' | 'down'
export type VoteKey = string // "${listId}::${restaurantId}"

export interface Restaurant {
  id: string
  name: string
  cuisine?: CuisineType
  city?: City
  neighborhood?: string
  priceRange?: 1 | 2 | 3 | 4
  description?: string
  imageUrl?: string
  mapsUrl?: string
  tags?: string[]
}

export interface ListEntry {
  restaurant: Restaurant
  initialUpvotes: number
  initialDownvotes: number
}

export interface RestaurantList {
  id: string
  slug: string
  title: string
  description: string
  cuisine?: CuisineType
  city?: City
  coverImageUrl?: string
  createdAt: string
  entries: ListEntry[]
}

export interface ListSummary {
  id: string
  slug: string
  title: string
  description: string
  cuisine?: CuisineType
  city?: City
  coverImageUrl?: string
  entryCount: number
  topRestaurantNames: string[]
}

export interface VoteTally {
  upvotes: number
  downvotes: number
  userVote: VoteDirection | null
}

export interface MenuItem {
  id: string
  name: string
}

export interface FilterState {
  cuisine: CuisineType | null
}

export interface BlogPost {
  slug: string
  date: string        // display format: "April 12, 2026"
  isoDate: string     // ISO 8601: "2026-04-12"
  title: string
  subtitle: string
  coverImageUrl: string
  coverImageAlt: string
  body: ReactNode
}
