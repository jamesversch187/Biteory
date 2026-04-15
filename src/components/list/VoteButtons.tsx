import type { VoteDirection } from '@/types'

interface VoteButtonsProps {
  upvotes: number
  downvotes: number
  userVote: VoteDirection | null
  onVote: (direction: VoteDirection) => void
}

export function VoteButtons({ upvotes, downvotes, userVote, onVote }: VoteButtonsProps) {
  const netScore = upvotes - downvotes

  return (
    <div className="flex flex-col items-center gap-1 min-w-[52px]">
      <button
        onClick={() => onVote('up')}
        aria-label="Upvote"
        className={`
          w-9 h-9 rounded-full flex items-center justify-center border transition-all
          ${
            userVote === 'up'
              ? 'bg-upvote border-upvote text-white-warm'
              : 'border-warm-border text-sand hover:border-upvote hover:text-upvote'
          }
        `}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3l5 6H3l5-6z" />
        </svg>
      </button>

      <span
        className={`text-sm font-body font-semibold tabular-nums ${
          netScore > 0 ? 'text-upvote' : netScore < 0 ? 'text-downvote' : 'text-sand'
        }`}
      >
        {netScore > 0 ? '+' : ''}
        {netScore}
      </span>

      <button
        onClick={() => onVote('down')}
        aria-label="Downvote"
        className={`
          w-9 h-9 rounded-full flex items-center justify-center border transition-all
          ${
            userVote === 'down'
              ? 'bg-downvote border-downvote text-white-warm'
              : 'border-warm-border text-sand hover:border-downvote hover:text-downvote'
          }
        `}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 13l-5-6h10l-5 6z" />
        </svg>
      </button>
    </div>
  )
}
