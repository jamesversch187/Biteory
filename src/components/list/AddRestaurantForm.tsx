import { useState, useRef } from 'react'
import type { ListEntry } from '@/types'
import { useAddedRestaurantsStore } from '@/store/addedRestaurantsStore'

function parseNameFromMapsUrl(url: string): string {
  try {
    const match = url.match(/maps\/place\/([^/@?]+)/)
    if (match?.[1]) return decodeURIComponent(match[1].replace(/\+/g, ' '))
  } catch {}
  return ''
}

interface AddRestaurantFormProps {
  listId: string
  staticEntries: ListEntry[]
}

export function AddRestaurantForm({ listId, staticEntries }: AddRestaurantFormProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [url, setUrl] = useState('')
  const [manualName, setManualName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { addRestaurant, hasMapsUrl } = useAddedRestaurantsStore()

  const parsedName = parseNameFromMapsUrl(url)
  const needsManualName = url.trim().length > 0 && parsedName === ''
  const effectiveName = parsedName || manualName.trim()

  function reset() {
    setUrl('')
    setManualName('')
    setError('')
    setSuccess(false)
  }

  function handleCancel() {
    reset()
    setOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!effectiveName) {
      setError('Please enter a restaurant name.')
      return
    }

    const trimmedUrl = url.trim()
    if (trimmedUrl && (await hasMapsUrl(listId, trimmedUrl, staticEntries))) {
      setError('This restaurant is already on the list.')
      return
    }

    const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    await addRestaurant(listId, {
      id,
      name: effectiveName,
      mapsUrl: trimmedUrl || undefined,
      tags: [],
    })

    setSuccess(true)
    setTimeout(() => {
      reset()
      setOpen(false)
    }, 1200)
  }

  function handleOpen() {
    setOpen(true)
    setTimeout(() => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  if (!open) {
    return (
      <div className="mt-8 pt-6 border-t border-warm-border">
        <button
          onClick={handleOpen}
          className="text-sm font-body text-earth hover:underline"
        >
          + Add a restaurant
        </button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="mt-8 pt-6 border-t border-warm-border">
      <h3 className="font-display text-base font-bold text-ink mb-4">Add a restaurant</h3>

      {success ? (
        <p className="text-sm font-body text-earth">Added! Updating list…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-body text-sand mb-1">
              Google Maps URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError('') }}
              placeholder="https://www.google.com/maps/place/..."
              className="w-full text-sm font-body border border-warm-border rounded px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth"
            />
            {parsedName && (
              <p className="mt-1 text-xs font-body text-earth">
                Parsed: <span className="font-semibold">{parsedName}</span>
              </p>
            )}
          </div>

          {needsManualName && (
            <div>
              <label className="block text-xs font-body text-sand mb-1">
                Restaurant name
              </label>
              <input
                type="text"
                value={manualName}
                onChange={(e) => { setManualName(e.target.value); setError('') }}
                placeholder="Enter restaurant name"
                className="w-full text-sm font-body border border-warm-border rounded px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth"
              />
            </div>
          )}

          {error && (
            <p className="text-xs font-body text-red-600">{error}</p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="text-sm font-body px-4 py-1.5 rounded bg-earth text-white-warm hover:bg-bark transition-colors"
            >
              Add to list
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-body text-sand hover:text-ink transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
