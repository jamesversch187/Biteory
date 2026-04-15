import { Link } from 'react-router-dom'
import type { ListSummary } from '@/types'

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

interface FeaturedHeroProps {
  list: ListSummary
}

export function FeaturedHero({ list }: FeaturedHeroProps) {
  return (
    <Link
      to={`/list/${list.slug}`}
      className="block bg-cream border border-warm-border rounded-xl overflow-hidden hover:border-earth transition-all group"
    >
      {/* Decorative header bar */}
      <div className="h-2 bg-gradient-to-r from-earth via-sand to-warm-border" />

      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-body font-semibold text-earth uppercase tracking-widest">
            Featured List
          </span>
          {list.city && (
            <>
              <span className="text-warm-border">·</span>
              <span className="text-xs font-body text-sand">{cityLabel[list.city] ?? list.city}</span>
            </>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3 group-hover:text-earth transition-colors">
          {list.title}
        </h1>

        <p className="font-body text-bark text-base leading-relaxed mb-6 max-w-xl">
          {list.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-body font-medium text-sand uppercase tracking-wide">
              Top picks
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {list.topRestaurantNames.map((name, i) => (
                <span key={name} className="font-display text-sm text-bark">
                  {i + 1}. {name}
                </span>
              ))}
            </div>
          </div>

          <span className="flex items-center gap-1.5 text-sm font-body font-medium text-earth group-hover:gap-2.5 transition-all">
            See rankings
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
