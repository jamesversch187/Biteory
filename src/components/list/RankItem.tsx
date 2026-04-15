import { Link } from 'react-router-dom'
import type { ListEntry, VoteDirection } from '@/types'
import { VoteButtons } from './VoteButtons'

const priceLabel = (range: 1 | 2 | 3 | 4 | undefined) => range ? '$'.repeat(range) : null

interface RankItemProps {
  rank: number
  entry: ListEntry
  listId: string
  listSlug: string
  upvotes: number
  downvotes: number
  userVote: VoteDirection | null
  onVote: (direction: VoteDirection) => void
}

export function RankItem({ rank, entry, listSlug, upvotes, downvotes, userVote, onVote }: RankItemProps) {
  const { restaurant } = entry

  return (
    <li className="flex items-start gap-4 py-5 border-b border-warm-border last:border-0 group">
      {/* Rank number */}
      <span className="w-8 shrink-0 text-right font-display text-2xl font-bold text-sand leading-none mt-1">
        {rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="font-display text-lg font-bold text-ink leading-snug">
            {restaurant.mapsUrl ? (
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-earth transition-colors"
              >
                {restaurant.name}
              </a>
            ) : (
              restaurant.name
            )}
          </h3>
          {restaurant.priceRange && (
            <span className="text-xs font-body text-sand">{priceLabel(restaurant.priceRange)}</span>
          )}
        </div>
        {restaurant.description && (
          <p className="text-sm font-body text-bark mt-0.5 mb-1 leading-relaxed">
            {restaurant.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <Link
            to={`/list/${listSlug}/restaurant/${restaurant.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-earth text-earth text-xs font-body font-medium hover:bg-earth hover:text-white-warm transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h8M2 6h5M2 9h3" />
            </svg>
            What to order
          </Link>
          {restaurant.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body px-2 py-0.5 rounded bg-cream text-earth border border-warm-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Vote buttons */}
      <div className="shrink-0">
        <VoteButtons
          upvotes={upvotes}
          downvotes={downvotes}
          userVote={userVote}
          onVote={onVote}
        />
      </div>
    </li>
  )
}
