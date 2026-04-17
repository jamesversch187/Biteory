import { useEffect, useState, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { RestaurantList, MenuItem } from '@/types'
import { getListById } from '@/services'
import { useAddedRestaurantsStore } from '@/store/addedRestaurantsStore'
import { useMenuStore } from '@/store/menuStore'

function ScoreButtons({
  rating,
  onRate,
}: {
  rating: number | null
  onRate: (r: number) => void
}) {
  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onRate(n)}
          className={`w-7 h-7 text-xs font-body rounded-full border transition-colors ${
            rating === n
              ? 'bg-earth text-white-warm border-earth'
              : 'bg-white text-sand border-warm-border hover:border-earth hover:text-earth'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

export default function MenuPage() {
  const { slug, restaurantId } = useParams<{ slug: string; restaurantId: string }>()
  const [list, setList] = useState<RestaurantList | null>(null)
  const [loading, setLoading] = useState(true)
  const [newDish, setNewDish] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const getAddedEntries = useAddedRestaurantsStore((s) => s.getEntries)
  const { items: allItems, ratings, addItem, setRating, getRating, getAverageRating, loadForRestaurant } = useMenuStore()

  useEffect(() => {
    if (!slug) return
    getListById(slug).then((data) => {
      setList(data)
      setLoading(false)
    })
  }, [slug])

  useEffect(() => {
    if (!restaurantId) return
    loadForRestaurant(restaurantId)
  }, [restaurantId])

  const restaurant = useMemo(() => {
    if (!list || !restaurantId) return null
    const addedEntries = getAddedEntries(list.id)
    const all = [...list.entries, ...addedEntries]
    return all.find((e) => e.restaurant.id === restaurantId)?.restaurant ?? null
  }, [list, restaurantId, getAddedEntries])

  const rankedItems = useMemo(() => {
    if (!restaurantId) return []
    const items = allItems[restaurantId] ?? []
    return [...items].sort((a, b) => {
      const ra = ratings[a.id] ?? -1
      const rb = ratings[b.id] ?? -1
      return rb - ra
    })
  }, [restaurantId, allItems, ratings])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const name = newDish.trim()
    if (!name || !restaurantId) return
    setNewDish('')
    await addItem(restaurantId, name)
    inputRef.current?.focus()
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <p className="font-body text-sand animate-pulse">Loading…</p>
      </div>
    )
  }

  if (!list || !restaurant) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-display text-2xl text-ink mb-4">Restaurant not found</p>
        <Link to={`/list/${slug}`} className="text-earth font-body hover:underline">
          ← Back to list
        </Link>
      </div>
    )
  }

  const canonicalUrl = `https://foodranker.com/list/${slug}/restaurant/${restaurantId}`
  const pageTitle = `${restaurant.name} — ${list.title} — Biteory`
  const pageDescription = restaurant.description ?? `Dishes and menu highlights for ${restaurant.name}.`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Link
        to={`/list/${slug}`}
        className="text-sm font-body text-sand hover:text-earth transition-colors"
      >
        ← {list.title}
      </Link>

      <header className="mt-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mb-1">
          {restaurant.name}
        </h1>
        <p className="font-body text-sand text-sm">What to order</p>
      </header>

      {rankedItems.length === 0 ? (
        <p className="text-sm font-body text-sand py-6">
          No dishes yet. Add the first one below.
        </p>
      ) : (
        <ol className="list-none space-y-5 mb-10">
          {rankedItems.map((item: MenuItem, idx: number) => {
            const rating = getRating(item.id)
            const avg = getAverageRating(item.id)
            return (
              <li key={item.id} className="flex flex-col gap-2 py-4 border-b border-warm-border last:border-0">
                <div className="flex items-baseline gap-3">
                  <span className="w-6 shrink-0 text-right font-display text-lg font-bold text-sand leading-none">
                    {rating !== null ? idx + 1 : '—'}
                  </span>
                  <span className="font-body text-base text-ink">{item.name}</span>
                  <div className="ml-auto flex items-baseline gap-3 shrink-0">
                    {avg !== null && (
                      <span className="text-xs font-body text-sand">
                        avg {avg.toFixed(1)}
                      </span>
                    )}
                    {rating !== null && (
                      <span className="text-sm font-body font-semibold text-earth">
                        {rating}/10
                      </span>
                    )}
                  </div>
                </div>
                <div className="pl-9">
                  <ScoreButtons rating={rating} onRate={(r) => setRating(restaurantId!, item.id, r)} />
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <div className="border-t border-warm-border pt-6">
        <h3 className="font-display text-base font-bold text-ink mb-4">Add a dish</h3>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newDish}
            onChange={(e) => setNewDish(e.target.value)}
            placeholder="e.g. Truffle pasta"
            className="flex-1 text-sm font-body border border-warm-border rounded px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth"
          />
          <button
            type="submit"
            className="text-sm font-body px-4 py-2 rounded bg-earth text-white-warm hover:bg-bark transition-colors shrink-0"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
