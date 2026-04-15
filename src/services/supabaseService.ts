import { supabase } from '@/lib/supabaseClient'
import { getSessionId } from '@/lib/session'
import type {
  ListSummary,
  RestaurantList,
  ListEntry,
  Restaurant,
  MenuItem,
  VoteDirection,
  VoteTally,
} from '@/types'

// ─── Shared DB row shapes ─────────────────────────────────────────────────────

interface DbRestaurant {
  id: string
  name: string
  cuisine: string | null
  city: string | null
  neighborhood: string | null
  price_range: number | null
  description: string | null
  image_url: string | null
  maps_url: string | null
  tags: string[]
  source?: string
}

interface DbListEntryWithName {
  upvotes: number
  downvotes: number
  restaurants: { name: string } | null
}

interface DbListEntryFull {
  upvotes: number
  downvotes: number
  sort_order: number
  restaurants: DbRestaurant | null
}

interface DbListEntryAdded {
  upvotes: number
  downvotes: number
  restaurants: DbRestaurant
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toRestaurant(r: DbRestaurant): Restaurant {
  return {
    id: r.id,
    name: r.name,
    cuisine: r.cuisine as Restaurant['cuisine'] ?? undefined,
    city: r.city as Restaurant['city'] ?? undefined,
    neighborhood: r.neighborhood ?? undefined,
    priceRange: (r.price_range as 1 | 2 | 3 | 4) ?? undefined,
    description: r.description ?? undefined,
    imageUrl: r.image_url ?? undefined,
    mapsUrl: r.maps_url ?? undefined,
    tags: r.tags ?? [],
  }
}

// ─── Lists ────────────────────────────────────────────────────────────────────

export async function getLists(): Promise<ListSummary[]> {
  const { data, error } = await supabase
    .from('lists')
    .select(`
      id, slug, title, description, cuisine, city, cover_image_url,
      list_entries (
        upvotes, downvotes,
        restaurants ( name )
      )
    `)

  if (error) throw error

  return (data ?? []).map((row) => {
    const entries = (row.list_entries ?? []) as unknown as DbListEntryWithName[]

    const sorted = [...entries].sort(
      (a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes),
    )

    const topRestaurantNames = sorted
      .slice(0, 3)
      .map((e) => e.restaurants?.name ?? '')
      .filter(Boolean)

    return {
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      description: row.description as string,
      cuisine: (row.cuisine as Restaurant['cuisine']) ?? undefined,
      city: (row.city as Restaurant['city']) ?? undefined,
      coverImageUrl: (row.cover_image_url as string | null) ?? undefined,
      entryCount: entries.length,
      topRestaurantNames,
    } satisfies ListSummary
  })
}

export async function getListById(idOrSlug: string): Promise<RestaurantList | null> {
  const { data, error } = await supabase
    .from('lists')
    .select(`
      id, slug, title, description, cuisine, city, cover_image_url, created_at,
      list_entries (
        upvotes, downvotes, sort_order,
        restaurants (
          id, name, cuisine, city, neighborhood, price_range,
          description, image_url, maps_url, tags
        )
      )
    `)
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  const rawEntries = (data.list_entries ?? []) as unknown as DbListEntryFull[]

  const entries: ListEntry[] = rawEntries
    .filter((e) => e.restaurants !== null)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((e) => ({
      initialUpvotes: e.upvotes,
      initialDownvotes: e.downvotes,
      restaurant: toRestaurant(e.restaurants!),
    }))

  return {
    id: data.id as string,
    slug: data.slug as string,
    title: data.title as string,
    description: data.description as string,
    cuisine: (data.cuisine as RestaurantList['cuisine']) ?? undefined,
    city: (data.city as RestaurantList['city']) ?? undefined,
    coverImageUrl: (data.cover_image_url as string | null) ?? undefined,
    createdAt: data.created_at as string,
    entries,
  }
}

// ─── Voting ───────────────────────────────────────────────────────────────────

export async function vote(
  listId: string,
  restaurantId: string,
  direction: VoteDirection,
): Promise<VoteTally> {
  const { data, error } = await supabase.rpc('cast_vote', {
    p_session_id: getSessionId(),
    p_list_id: listId,
    p_restaurant_id: restaurantId,
    p_direction: direction,
  })
  if (error) throw error
  return data as VoteTally
}

export async function getSessionVotes(
  listId: string,
): Promise<Record<string, VoteDirection>> {
  const { data, error } = await supabase
    .from('session_votes')
    .select('restaurant_id, direction')
    .eq('session_id', getSessionId())
    .eq('list_id', listId)

  if (error) throw error

  return Object.fromEntries(
    (data ?? []).map((row) => [
      `${listId}::${row.restaurant_id as string}`,
      row.direction as VoteDirection,
    ]),
  )
}

// ─── User-added restaurants ───────────────────────────────────────────────────

export async function addRestaurantToList(
  listId: string,
  restaurant: Restaurant,
): Promise<void> {
  const { error: upsertError } = await supabase.from('restaurants').upsert(
    {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine ?? null,
      city: restaurant.city ?? null,
      neighborhood: restaurant.neighborhood ?? null,
      price_range: restaurant.priceRange ?? null,
      description: restaurant.description ?? null,
      image_url: restaurant.imageUrl ?? null,
      maps_url: restaurant.mapsUrl ?? null,
      tags: restaurant.tags ?? [],
      source: 'user_added',
    },
    { onConflict: 'id' },
  )
  if (upsertError) throw upsertError

  const { error: entryError } = await supabase.from('list_entries').insert({
    list_id: listId,
    restaurant_id: restaurant.id,
    upvotes: 1,
    downvotes: 0,
  })
  if (entryError) throw entryError
}

export async function getAddedEntries(listId: string): Promise<ListEntry[]> {
  const { data, error } = await supabase
    .from('list_entries')
    .select(`
      upvotes, downvotes,
      restaurants!inner (
        id, name, cuisine, city, neighborhood, price_range,
        description, image_url, maps_url, tags, source
      )
    `)
    .eq('list_id', listId)
    .eq('restaurants.source', 'user_added')

  if (error) throw error

  return ((data ?? []) as unknown as DbListEntryAdded[]).map((row) => ({
    initialUpvotes: row.upvotes,
    initialDownvotes: row.downvotes,
    restaurant: toRestaurant(row.restaurants),
  }))
}

export async function checkMapsUrlExists(
  listId: string,
  mapsUrl: string,
): Promise<boolean> {
  const norm = mapsUrl.trim().toLowerCase()
  const { count, error } = await supabase
    .from('list_entries')
    .select('restaurants!inner(maps_url)', { count: 'exact', head: true })
    .eq('list_id', listId)
    .eq('restaurants.maps_url', norm)

  if (error) throw error
  return (count ?? 0) > 0
}

// ─── Menu items ───────────────────────────────────────────────────────────────

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name')
    .eq('restaurant_id', restaurantId)

  if (error) throw error
  return (data ?? []) as unknown as MenuItem[]
}

export async function addMenuItem(
  restaurantId: string,
  name: string,
): Promise<MenuItem> {
  const id = `dish-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const { data, error } = await supabase
    .from('menu_items')
    .insert({ id, restaurant_id: restaurantId, name })
    .select('id, name')
    .single()

  if (error) throw error
  return data as unknown as MenuItem
}

export async function getMenuRatings(
  restaurantId: string,
): Promise<Record<string, number>> {
  const items = await getMenuItems(restaurantId)
  if (items.length === 0) return {}

  const { data, error } = await supabase
    .from('menu_ratings')
    .select('item_id, rating')
    .eq('session_id', getSessionId())
    .in('item_id', items.map((i) => i.id))

  if (error) throw error

  return Object.fromEntries(
    (data ?? []).map((r) => [r.item_id as string, r.rating as number]),
  )
}

export async function setMenuRating(
  itemId: string,
  rating: number,
): Promise<void> {
  const { error } = await supabase.from('menu_ratings').upsert(
    {
      session_id: getSessionId(),
      item_id: itemId,
      rating,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'session_id,item_id' },
  )
  if (error) throw error
}
