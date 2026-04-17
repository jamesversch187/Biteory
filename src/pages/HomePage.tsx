import { useEffect, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import type { ListSummary, CuisineType, FilterState } from '@/types'
import { getLists } from '@/services'
import { FeaturedHero } from '@/components/home/FeaturedHero'
import { ListCard } from '@/components/home/ListCard'
import { FilterBar } from '@/components/home/FilterBar'
import { SearchBar } from '@/components/home/SearchBar'
import posthog from '@/lib/posthog'

export default function HomePage() {
  const [lists, setLists] = useState<ListSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterState>({ cuisines: [] })

  useEffect(() => {
    getLists().then((data) => {
      setLists(data)
      setLoading(false)
    })
  }, [])

  const availableCuisines = useMemo(
    () => [...new Set(lists.flatMap((l) => (l.cuisine ? [l.cuisine] : [])))] as CuisineType[],
    [lists],
  )

  const filteredLists = useMemo(() => {
    if (filter.cuisines.length === 0) return lists
    return lists.filter((l) => l.cuisine && filter.cuisines.includes(l.cuisine))
  }, [lists, filter])

  const featured = filteredLists[0] ?? null
  const rest = filteredLists.slice(1)

  const description = 'Community-ranked restaurant lists for cities across the US. Find the best pizza, sushi, tacos, brunch, and more — ranked by people who actually eat there.'

  return (
    <>
      <Helmet>
        <title>Biteory — Community Restaurant Rankings</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Biteory — Community Restaurant Rankings" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.biteory.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Biteory — Community Restaurant Rankings" />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://www.biteory.com/" />
      </Helmet>

      {/* Page intro */}
      <div className="bg-gradient-to-b from-parchment to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <p className="font-body text-sm text-sand uppercase tracking-widest font-semibold mb-2">Community rankings</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight mb-3">
            The best restaurants,<br className="hidden sm:block" /> ranked by locals.
          </h1>
          <p className="font-body text-bark text-base max-w-lg">
            Curated lists across cities and cuisines — voted on by people who actually eat there.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 space-y-8">
        {loading ? (
          <div className="flex items-center gap-3 py-8">
            <div className="h-2 w-2 rounded-full bg-sand animate-bounce [animation-delay:0ms]" />
            <div className="h-2 w-2 rounded-full bg-sand animate-bounce [animation-delay:150ms]" />
            <div className="h-2 w-2 rounded-full bg-sand animate-bounce [animation-delay:300ms]" />
          </div>
        ) : (
          <>
            {featured && <FeaturedHero list={featured} />}

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar />
              </div>
              <FilterBar
                availableCuisines={availableCuisines}
                filter={filter}
                onFilterChange={(next) => {
                  setFilter(next)
                  next.cuisines.forEach((cuisine) => {
                    posthog.capture('cuisine_filter_applied', { cuisine })
                  })
                }}
              />
            </div>

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((list, i) => (
                  <ListCard key={list.id} list={list} rank={i + 2} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
