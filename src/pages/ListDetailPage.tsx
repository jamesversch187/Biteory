import { useEffect, useState, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { RestaurantList, ListEntry } from '@/types'
import { getListById } from '@/services'
import { useVoteStore } from '@/store/voteStore'
import { useAddedRestaurantsStore } from '@/store/addedRestaurantsStore'
import { RankItem } from '@/components/list/RankItem'
import { AddRestaurantForm } from '@/components/list/AddRestaurantForm'
import posthog from '@/lib/posthog'

const cityLabel: Record<string, string> = {
  'new-york': 'New York',
  'los-angeles': 'Los Angeles',
  chicago: 'Chicago',
  'san-francisco': 'San Francisco',
  miami: 'Miami',
  austin: 'Austin',
  nashville: 'Nashville',
  seattle: 'Seattle',
  denver: 'Denver',
}

const cuisineLabel: Record<string, string> = {
  pizza: 'Pizza',
  sushi: 'Sushi',
  brunch: 'Brunch',
  bbq: 'BBQ',
  ramen: 'Ramen',
  tacos: 'Tacos',
  burgers: 'Burgers',
  steakhouse: 'Steakhouse',
  italian: 'Italian',
  mexican: 'Mexican',
  seafood: 'Seafood',
  vegan: 'Vegan',
  bakery: 'Bakery',
}

export default function ListDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [list, setList] = useState<RestaurantList | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [priceFilter, setPriceFilter] = useState<1 | 2 | 3 | 4 | null>(null)
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false)
  const priceDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!priceDropdownOpen) return
    function handleClick(e: MouseEvent) {
      if (!priceDropdownRef.current?.contains(e.target as Node)) {
        setPriceDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [priceDropdownOpen])

  const { sessionVotes, castVote, getTally, hydrateForList } = useVoteStore()
  const { getEntries: getAddedEntries, loadForList } = useAddedRestaurantsStore()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getListById(slug).then((data) => {
      if (!data) {
        setNotFound(true)
        setLoading(false)
      } else {
        setList(data)
        setLoading(false)
        hydrateForList(data.id)
        loadForList(data.id)
        posthog.capture('list_viewed', {
          list_id: data.id,
          list_slug: data.slug,
          list_title: data.title,
          cuisine: data.cuisine ?? null,
          city: data.city ?? null,
        })
      }
    })
  }, [slug])

  // Re-sort live as tallies change, then apply price filter
  const rankedEntries = useMemo(() => {
    if (!list) return []
    const allEntries = [...list.entries, ...getAddedEntries(list.id)]
    const sorted = [...allEntries].sort((a, b) => {
      const aNet =
        getTally(list.id, a.restaurant.id, a.initialUpvotes, a.initialDownvotes).upvotes -
        getTally(list.id, a.restaurant.id, a.initialUpvotes, a.initialDownvotes).downvotes
      const bNet =
        getTally(list.id, b.restaurant.id, b.initialUpvotes, b.initialDownvotes).upvotes -
        getTally(list.id, b.restaurant.id, b.initialUpvotes, b.initialDownvotes).downvotes
      return bNet - aNet
    })
    if (!priceFilter) return sorted
    return sorted.filter((e) => e.restaurant.priceRange === priceFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, sessionVotes, getAddedEntries, priceFilter])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <p className="font-body text-sand animate-pulse">Loading list…</p>
      </div>
    )
  }

  if (notFound || !list) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="font-display text-2xl text-ink mb-4">List not found</p>
        <Link to="/" className="text-earth font-body hover:underline">
          ← Back to all lists
        </Link>
      </div>
    )
  }

  const canonicalUrl = `https://foodranker.com/list/${list.slug}`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Helmet>
        <title>{list.title} — Biteory</title>
        <meta name="description" content={list.description} />
        <meta property="og:title" content={`${list.title} — Biteory`} />
        <meta property="og:description" content={list.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={`${list.title} — Biteory`} />
        <meta name="twitter:description" content={list.description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      {/* Breadcrumb */}
      <Link to="/" className="text-sm font-body text-sand hover:text-earth transition-colors">
        ← All Lists
      </Link>

      {/* List header */}
      <header className="mt-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center mb-3 text-xs font-body text-sand uppercase tracking-wide">
          {list.cuisine && <span>{cuisineLabel[list.cuisine] ?? list.cuisine}</span>}
          {list.cuisine && list.city && <span>·</span>}
          {list.city && <span>{cityLabel[list.city] ?? list.city}</span>}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3">
          {list.title}
        </h1>
        <p className="font-body text-bark text-base leading-relaxed">{list.description}</p>
      </header>

      {/* Vote hint + price filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-warm-border pb-4">
        <p className="text-xs font-body text-sand">
          Vote to reorder the rankings. Your votes persist across sessions.
        </p>
        <div ref={priceDropdownRef} className="relative">
          <button
            onClick={() => setPriceDropdownOpen((o) => !o)}
            className={`flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full border transition-colors ${
              priceFilter
                ? 'bg-earth text-white-warm border-earth'
                : 'bg-white text-sand border-warm-border hover:border-earth hover:text-earth'
            }`}
          >
            {priceFilter ? '$'.repeat(priceFilter) : 'Price'}
            <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {priceDropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-warm-border rounded shadow-md z-10 py-1">
              {([1, 2, 3, 4] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPriceFilter(p)
                    setPriceDropdownOpen(false)
                    posthog.capture('price_filter_applied', {
                      list_id: list.id,
                      price_range: p,
                    })
                  }}
                  className={`w-full text-left text-xs font-body px-3 py-1.5 hover:bg-cream transition-colors ${
                    priceFilter === p ? 'text-earth font-semibold' : 'text-ink'
                  }`}
                >
                  {'$'.repeat(p)}
                </button>
              ))}
              {priceFilter && (
                <button
                  onClick={() => { setPriceFilter(null); setPriceDropdownOpen(false) }}
                  className="w-full text-left text-xs font-body px-3 py-1.5 text-sand hover:bg-cream border-t border-warm-border transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {rankedEntries.length === 0 && (
        <p className="text-sm font-body text-sand py-8 text-center">
          No restaurants match this price filter.
        </p>
      )}
      <ol className="list-none">
        {rankedEntries.map((entry: ListEntry, idx: number) => {
          const tally = getTally(
            list.id,
            entry.restaurant.id,
            entry.initialUpvotes,
            entry.initialDownvotes,
          )
          return (
            <RankItem
              key={entry.restaurant.id}
              rank={idx + 1}
              entry={entry}
              listId={list.id}
              listSlug={slug!}
              upvotes={tally.upvotes}
              downvotes={tally.downvotes}
              userVote={tally.userVote}
              onVote={(dir) => castVote(list.id, entry.restaurant.id, dir)}
            />
          )
        })}
      </ol>

      <AddRestaurantForm listId={list.id} staticEntries={list.entries} />
    </div>
  )
}
