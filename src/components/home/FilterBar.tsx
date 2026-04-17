import { useState, useEffect, useRef } from 'react'
import type { CuisineType, FilterState } from '@/types'

const cuisineLabels: Record<CuisineType, string> = {
  pizza: 'Pizza',
  sushi: 'Sushi',
  brunch: 'Brunch',
  italian: 'Italian',
  mexican: 'Mexican',
  bbq: 'BBQ',
  seafood: 'Seafood',
  burgers: 'Burgers',
  ramen: 'Ramen',
  tacos: 'Tacos',
  steakhouse: 'Steakhouse',
  vegan: 'Vegan',
  bakery: 'Bakery',
  chinese: 'Chinese',
  'fast-casual': 'Fast Casual',
}

interface FilterBarProps {
  availableCuisines: CuisineType[]
  filter: FilterState
  onFilterChange: (filter: FilterState) => void
}

export function FilterBar({ availableCuisines, filter, onFilterChange }: FilterBarProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const count = filter.cuisines.length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggle(cuisine: CuisineType) {
    const next = filter.cuisines.includes(cuisine)
      ? filter.cuisines.filter((c) => c !== cuisine)
      : [...filter.cuisines, cuisine]
    onFilterChange({ cuisines: next })
  }

  if (availableCuisines.length === 0) return null

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-body transition-colors ${
          count > 0
            ? 'border-earth bg-earth text-white-warm'
            : 'border-warm-border bg-white text-ink hover:border-earth'
        }`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
        </svg>
        {count > 0 ? `Cuisine (${count})` : 'Cuisine'}
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-warm-border rounded-xl shadow-lg z-50 overflow-hidden">
          {count > 0 && (
            <div className="px-3 pt-2 pb-1 border-b border-warm-border">
              <button
                onClick={() => onFilterChange({ cuisines: [] })}
                className="text-xs font-body text-earth hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
          <div className="py-1 max-h-64 overflow-y-auto">
            {availableCuisines.map((cuisine) => {
              const checked = filter.cuisines.includes(cuisine)
              return (
                <button
                  key={cuisine}
                  onClick={() => toggle(cuisine)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-body text-ink hover:bg-cream transition-colors text-left"
                >
                  <span
                    className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                      checked ? 'bg-earth border-earth' : 'border-warm-border'
                    }`}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                  </span>
                  {cuisineLabels[cuisine]}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
