import type { CuisineType, FilterState } from '@/types'
import { CategoryPill } from '@/components/shared/CategoryPill'

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

export function FilterBar({
  availableCuisines,
  filter,
  onFilterChange,
}: FilterBarProps) {
  const toggleCuisine = (cuisine: CuisineType) => {
    onFilterChange({
      ...filter,
      cuisine: filter.cuisine === cuisine ? null : cuisine,
    })
  }

  return (
    <div className="space-y-3">
      {availableCuisines.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-body font-medium text-sand uppercase tracking-wide w-12">
            Type
          </span>
          {availableCuisines.map((cuisine) => (
            <CategoryPill
              key={cuisine}
              label={cuisineLabels[cuisine]}
              active={filter.cuisine === cuisine}
              onClick={() => toggleCuisine(cuisine)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
