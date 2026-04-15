import { useEffect, useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import type { ListSummary, CuisineType, FilterState } from '@/types'
import { getLists } from '@/services'
import { FeaturedHero } from '@/components/home/FeaturedHero'
import { ListCard } from '@/components/home/ListCard'
import { FilterBar } from '@/components/home/FilterBar'
import posthog from '@/lib/posthog'
import { getSessionId } from '@/lib/session'

export default function HomePage() {
  const [lists, setLists] = useState<ListSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterState>({ cuisine: null })

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
    return lists.filter((l) => {
      if (filter.cuisine && l.cuisine !== filter.cuisine) return false
      return true
    })
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
        <meta property="og:url" content="https://foodranker.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Biteory — Community Restaurant Rankings" />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href="https://foodranker.com/" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {loading ? (
          <p className="font-body text-sand animate-pulse">Loading…</p>
        ) : (
          <>
            {featured && <FeaturedHero list={featured} />}

            <FilterBar
              availableCuisines={availableCuisines}
              filter={filter}
              onFilterChange={(next) => {
                setFilter(next)
                if (next.cuisine) {
                  posthog.capture({
                    distinctId: getSessionId(),
                    event: 'cuisine_filter_applied',
                    properties: { cuisine: next.cuisine },
                  })
                }
              }}
            />

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((list) => (
                  <ListCard key={list.id} list={list} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
