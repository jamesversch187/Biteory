import { create } from 'zustand'
import type { VoteDirection, VoteTally } from '@/types'
import { vote as voteService, getSessionVotes } from '@/services'
import posthog from '@/lib/posthog'
import { getSessionId } from '@/lib/session'

interface VoteState {
  // Current session's vote directions, keyed by "${listId}::${restaurantId}"
  sessionVotes: Record<string, VoteDirection>
  // Server-authoritative counts, keyed by "${listId}::${restaurantId}"
  serverTallies: Record<string, { upvotes: number; downvotes: number }>

  hydrateForList(listId: string): Promise<void>
  castVote(listId: string, restaurantId: string, direction: VoteDirection): Promise<void>
  getTally(
    listId: string,
    restaurantId: string,
    initialUpvotes: number,
    initialDownvotes: number,
  ): VoteTally
}

export const useVoteStore = create<VoteState>()((set, get) => ({
  sessionVotes: {},
  serverTallies: {},

  async hydrateForList(listId) {
    const votes = await getSessionVotes(listId)
    set((state) => ({
      sessionVotes: { ...state.sessionVotes, ...votes },
    }))
  },

  async castVote(listId, restaurantId, direction) {
    const key = `${listId}::${restaurantId}`

    // Optimistic: flip local vote state immediately
    set((state) => {
      const current = state.sessionVotes[key]
      const next = { ...state.sessionVotes }
      if (current === direction) {
        delete next[key]
      } else {
        next[key] = direction
      }
      return { sessionVotes: next }
    })

    // Persist to server and update with authoritative counts
    const tally = await voteService(listId, restaurantId, direction)
    posthog.capture({
      distinctId: getSessionId(),
      event: 'restaurant_voted',
      properties: {
        list_id: listId,
        restaurant_id: restaurantId,
        direction,
        resulting_vote: tally.userVote ?? null,
      },
    })
    set((state) => ({
      sessionVotes: tally.userVote
        ? { ...state.sessionVotes, [key]: tally.userVote }
        : (() => { const s = { ...state.sessionVotes }; delete s[key]; return s })(),
      serverTallies: {
        ...state.serverTallies,
        [key]: { upvotes: tally.upvotes, downvotes: tally.downvotes },
      },
    }))
  },

  getTally(listId, restaurantId, initialUpvotes, initialDownvotes) {
    const key = `${listId}::${restaurantId}`
    const userVote = get().sessionVotes[key] ?? null
    const server = get().serverTallies[key]

    if (server) {
      return { upvotes: server.upvotes, downvotes: server.downvotes, userVote }
    }

    // Fallback while server tallies haven't loaded yet
    const upvotes = initialUpvotes + (userVote === 'up' ? 1 : 0)
    const downvotes = initialDownvotes + (userVote === 'down' ? 1 : 0)
    return { upvotes, downvotes, userVote }
  },
}))
