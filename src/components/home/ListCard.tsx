import { Link } from 'react-router-dom'
import type { ListSummary } from '@/types'
import { CategoryPill } from '@/components/shared/CategoryPill'

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
  chinese: 'Chinese',
  'fast-casual': 'Fast Casual',
}

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

interface ListCardProps {
  list: ListSummary
  rank?: number
}

export function ListCard({ list, rank }: ListCardProps) {
  return (
    <Link
      to={`/list/${list.slug}`}
      className="flex flex-col bg-cream border border-warm-border rounded-xl p-5 hover:border-earth hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative overflow-hidden"
    >
      {/* Decorative rank watermark */}
      {rank !== undefined && (
        <span className="absolute -right-1 -top-2 font-display text-7xl font-bold text-warm-border/30 select-none pointer-events-none leading-none group-hover:text-warm-border/50 transition-colors duration-200">
          {rank}
        </span>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-earth transition-colors duration-200">
          {list.title}
        </h2>
      </div>

      <p className="text-sm font-body text-bark leading-relaxed mb-4 line-clamp-2 flex-1">
        {list.description}
      </p>

      {/* Top restaurants */}
      <div className="flex flex-col gap-1 mb-4">
        {list.topRestaurantNames.slice(0, 3).map((name, i) => (
          <div key={name} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-earth w-4 shrink-0">{i + 1}</span>
            <span className="text-xs font-body text-bark truncate">{name}</span>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-warm-border">
        <div className="flex flex-wrap gap-1.5">
          {list.cuisine && (
            <CategoryPill label={cuisineLabel[list.cuisine] ?? list.cuisine} />
          )}
          {list.city && <CategoryPill label={cityLabel[list.city] ?? list.city} />}
        </div>
        <span className="text-xs font-body text-sand shrink-0">{list.entryCount} places</span>
      </div>
    </Link>
  )
}
