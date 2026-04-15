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
}

export function ListCard({ list }: ListCardProps) {
  return (
    <Link
      to={`/list/${list.slug}`}
      className="block bg-cream border border-warm-border rounded-lg p-5 hover:border-earth hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="font-display text-xl font-bold text-ink leading-snug group-hover:text-earth transition-colors">
          {list.title}
        </h2>
        <span className="text-xs font-body text-sand shrink-0 mt-1">
          {list.entryCount} places
        </span>
      </div>

      <p className="text-sm font-body text-bark leading-relaxed mb-4 line-clamp-2">
        {list.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {list.topRestaurantNames.map((name) => (
          <span key={name} className="text-xs font-body text-earth">
            {name}
            {list.topRestaurantNames.indexOf(name) < list.topRestaurantNames.length - 1 && (
              <span className="text-sand mx-1">·</span>
            )}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {list.cuisine && (
          <CategoryPill label={cuisineLabel[list.cuisine] ?? list.cuisine} />
        )}
        {list.city && <CategoryPill label={cityLabel[list.city] ?? list.city} />}
      </div>
    </Link>
  )
}
