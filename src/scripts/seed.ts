/**
 * One-time seed script — populates Supabase with the curated restaurant/list data.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<key> VITE_SUPABASE_URL=<url> npx tsx src/scripts/seed.ts
 *
 * Uses the service role key to bypass RLS. Never expose this key in client code.
 */
import { createClient } from '@supabase/supabase-js'
import { restaurants } from '../data/restaurants'
import { lists } from '../data/lists'
import type { Restaurant } from '../types'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

function toRow(r: Restaurant) {
  return {
    id: r.id,
    name: r.name,
    cuisine: r.cuisine ?? null,
    city: r.city ?? null,
    neighborhood: r.neighborhood ?? null,
    price_range: r.priceRange ?? null,
    description: r.description ?? null,
    image_url: r.imageUrl ?? null,
    maps_url: r.mapsUrl ?? null,
    tags: r.tags ?? [],
    source: 'curated',
  }
}

async function seed() {
  console.log('Seeding restaurants…')
  const allRestaurants = Object.values(restaurants)
  const { error: rError } = await supabase
    .from('restaurants')
    .upsert(allRestaurants.map(toRow), { onConflict: 'id' })
  if (rError) throw rError
  console.log(`  ${allRestaurants.length} restaurants upserted.`)

  console.log('Seeding lists…')
  const listRows = lists.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    description: l.description,
    cuisine: l.cuisine ?? null,
    city: l.city ?? null,
    cover_image_url: l.coverImageUrl ?? null,
    created_at: l.createdAt,
  }))
  const { error: lError } = await supabase
    .from('lists')
    .upsert(listRows, { onConflict: 'id' })
  if (lError) throw lError
  console.log(`  ${lists.length} lists upserted.`)

  console.log('Seeding list entries…')
  const entryRows = lists.flatMap((l) =>
    l.entries.map((entry, idx) => ({
      list_id: l.id,
      restaurant_id: entry.restaurant.id,
      upvotes: entry.initialUpvotes,
      downvotes: entry.initialDownvotes,
      sort_order: idx,
    })),
  )
  const { error: eError } = await supabase
    .from('list_entries')
    .upsert(entryRows, { onConflict: 'list_id,restaurant_id' })
  if (eError) throw eError
  console.log(`  ${entryRows.length} list entries upserted.`)

  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
