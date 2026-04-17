import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { lists } from '@/data/lists'
import { restaurants } from '@/data/restaurants'
import { searchMenuItems } from '@/services'

// Build restaurant → first list mapping once at module load
const restaurantListMap: Record<string, { slug: string; title: string }> = {}
for (const list of lists) {
  for (const entry of list.entries) {
    if (!restaurantListMap[entry.restaurant.id]) {
      restaurantListMap[entry.restaurant.id] = { slug: list.slug, title: list.title }
    }
  }
}

// Flat list of all unique restaurants with their list context
const allRestaurants = Object.values(restaurants)
  .map((r) => ({ ...r, list: restaurantListMap[r.id] }))
  .filter((r) => r.list != null)

type ListResult = {
  type: 'list'
  slug: string
  title: string
  subtitle: string
}
type RestaurantResult = {
  type: 'restaurant'
  id: string
  name: string
  listSlug: string
  subtitle: string
}
type DishResult = {
  type: 'dish'
  id: string
  name: string
  restaurantId: string
  restaurantName: string
  listSlug: string
}
type SearchResult = ListResult | RestaurantResult | DishResult

function resultUrl(r: SearchResult): string {
  if (r.type === 'list') return `/list/${r.slug}`
  if (r.type === 'restaurant') return `/list/${r.listSlug}`
  return `/list/${r.listSlug}/restaurant/${r.restaurantId}`
}

function ResultRow({
  result,
  active,
  onSelect,
}: {
  result: SearchResult
  active: boolean
  onSelect: () => void
}) {
  const title =
    result.type === 'list' ? result.title :
    result.type === 'restaurant' ? result.name : result.name

  const subtitle =
    result.type === 'list' ? result.subtitle :
    result.type === 'restaurant' ? result.subtitle :
    result.restaurantName

  return (
    <button
      onMouseDown={onSelect}
      className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
        active ? 'bg-cream' : 'hover:bg-cream'
      }`}
    >
      <span className="flex flex-col min-w-0">
        <span className="font-body text-sm text-ink truncate">{title}</span>
        {subtitle && (
          <span className="font-body text-xs text-sand capitalize truncate">{subtitle.replace(/-/g, ' ')}</span>
        )}
      </span>
    </button>
  )
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [dishResults, setDishResults] = useState<DishResult[]>([])
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const listResults = useMemo((): ListResult[] => {
    if (query.length < 2) return []
    const q = query.toLowerCase()
    return lists
      .filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.cuisine?.includes(q) ||
          l.city?.includes(q),
      )
      .slice(0, 3)
      .map((l) => ({
        type: 'list',
        slug: l.slug,
        title: l.title,
        subtitle: l.city ?? '',
      }))
  }, [query])

  const restaurantResults = useMemo((): RestaurantResult[] => {
    if (query.length < 2) return []
    const q = query.toLowerCase()
    return allRestaurants
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.neighborhood?.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q)) ||
          r.description?.toLowerCase().includes(q),
      )
      .slice(0, 3)
      .map((r) => ({
        type: 'restaurant',
        id: r.id,
        name: r.name,
        listSlug: r.list!.slug,
        subtitle: r.neighborhood ?? '',
      }))
  }, [query])

  // Debounced dish search via Supabase
  useEffect(() => {
    if (query.length < 2) {
      setDishResults([])
      return
    }
    const timer = setTimeout(async () => {
      try {
        const items = await searchMenuItems(query)
        const results: DishResult[] = items.flatMap((item) => {
          const restaurant = restaurants[item.restaurant_id]
          const list = restaurantListMap[item.restaurant_id]
          if (!restaurant || !list) return []
          return [
            {
              type: 'dish',
              id: item.id,
              name: item.name,
              restaurantId: item.restaurant_id,
              restaurantName: restaurant.name,
              listSlug: list.slug,
            },
          ]
        })
        setDishResults(results.slice(0, 3))
      } catch {
        setDishResults([])
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  const allResults: SearchResult[] = [...listResults, ...restaurantResults, ...dishResults]

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(result: SearchResult) {
    setQuery('')
    setOpen(false)
    navigate(resultUrl(result))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); return }
    if (!open || allResults.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, allResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      handleSelect(allResults[activeIdx])
    }
  }

  const showDropdown = open && query.length >= 2

  // Flat index offset per group for active highlighting
  const listOffset = 0
  const restaurantOffset = listResults.length
  const dishOffset = listResults.length + restaurantResults.length

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIdx(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search lists, restaurants, dishes…"
          className="w-full font-body text-sm bg-white border border-warm-border rounded-full px-4 py-2 pr-9 text-ink placeholder-sand focus:outline-none focus:border-earth transition-colors"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sand pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-warm-border rounded-xl shadow-lg z-50 overflow-hidden">
          {allResults.length === 0 ? (
            <p className="font-body text-sm text-sand px-5 py-4">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="divide-y divide-warm-border">
              {listResults.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[10px] font-body font-semibold uppercase tracking-wider text-sand">
                    Lists
                  </p>
                  {listResults.map((r, i) => (
                    <ResultRow
                      key={r.slug}
                      result={r}
                      active={activeIdx === listOffset + i}
                      onSelect={() => handleSelect(r)}
                    />
                  ))}
                </div>
              )}
              {restaurantResults.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[10px] font-body font-semibold uppercase tracking-wider text-sand">
                    Restaurants
                  </p>
                  {restaurantResults.map((r, i) => (
                    <ResultRow
                      key={r.id}
                      result={r}
                      active={activeIdx === restaurantOffset + i}
                      onSelect={() => handleSelect(r)}
                    />
                  ))}
                </div>
              )}
              {dishResults.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[10px] font-body font-semibold uppercase tracking-wider text-sand">
                    Dishes
                  </p>
                  {dishResults.map((r, i) => (
                    <ResultRow
                      key={r.id}
                      result={r}
                      active={activeIdx === dishOffset + i}
                      onSelect={() => handleSelect(r)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
