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
      className="block relative bg-cream border border-warm-border rounded-2xl overflow-hidden hover:border-earth hover:shadow-lg transition-all duration-300 group"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-bark via-earth to-sand" />

      {/* Large decorative rank number */}
      <span className="absolute right-8 top-6 font-display text-[9rem] font-bold leading-none text-warm-border/40 select-none pointer-events-none group-hover:text-warm-border/60 transition-colors duration-300">
        1
      </span>

      <div className="relative p-8 sm:p-10">
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 bg-earth/10 text-earth border border-earth/20 rounded-full px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.2 8.1,10 5,7.6 1.9,10 3.1,6.2 0,3.8 3.8,3.8" />
            </svg>
            Featured
          </span>
          {list.city && (
            <span className="text-xs font-body text-sand">
              {cityLabel[list.city] ?? list.city}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mb-3 group-hover:text-earth transition-colors duration-200 max-w-lg">
          {list.title}
        </h1>

        <p className="font-body text-bark text-base leading-relaxed mb-8 max-w-md">
          {list.description}
        </p>

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="block text-xs font-body font-semibold text-sand uppercase tracking-widest mb-2">
              Top picks
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {list.topRestaurantNames.map((name, i) => (
                <span key={name} className="flex items-center gap-1.5 font-body text-sm text-bark">
                  <span className="font-semibold text-earth text-xs">{i + 1}</span>
                  {name}
                </span>
              ))}
            </div>
          </div>

          <span className="inline-flex items-center gap-2 bg-earth text-white-warm text-sm font-body font-semibold px-4 py-2 rounded-full group-hover:bg-bark transition-colors duration-200 shrink-0">
            See rankings
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
