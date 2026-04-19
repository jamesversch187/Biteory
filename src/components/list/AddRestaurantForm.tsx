import { useState, useRef } from 'react'
import type { ListEntry, CuisineType } from '@/types'
import { useAddedRestaurantsStore } from '@/store/addedRestaurantsStore'

// ─── URL helpers ─────────────────────────────────────────────────────────────

function isGoogleMapsUrl(url: string): boolean {
  return (
    url.includes('google.com/maps') ||
    url.includes('maps.google.com') ||
    url.includes('goo.gl/maps') ||
    url.includes('maps.app.goo.gl')
  )
}

function isShortMapsUrl(url: string): boolean {
  return url.includes('goo.gl/maps') || url.includes('maps.app.goo.gl')
}

function parseNameFromMapsUrl(url: string): string {
  try {
    // Pattern 1: /maps/place/NAME/  or  /maps/search/NAME/
    const pathMatch = url.match(/maps\/(?:place|search)\/([^/@?&#]+)/)
    if (pathMatch?.[1]) {
      return decodeURIComponent(pathMatch[1].replace(/\+/g, ' ')).trim()
    }
    // Pattern 2: ?q=NAME or &q=NAME
    const qMatch = url.match(/[?&]q=([^&#]+)/)
    if (qMatch?.[1]) {
      return decodeURIComponent(qMatch[1].replace(/\+/g, ' ')).trim()
    }
  } catch {}
  return ''
}

// ─── Constants ────────────────────────────────────────────────────────────────

const cuisineOptions: { value: CuisineType; label: string }[] = [
  { value: 'burgers', label: 'Burgers' },
  { value: 'pizza', label: 'Pizza' },
  { value: 'brunch', label: 'Brunch' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'italian', label: 'Italian' },
  { value: 'steakhouse', label: 'Steakhouse' },
  { value: 'sushi', label: 'Sushi' },
  { value: 'ramen', label: 'Ramen' },
  { value: 'tacos', label: 'Tacos' },
  { value: 'bbq', label: 'BBQ' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'fast-casual', label: 'Fast Casual' },
]

// ─── Component ────────────────────────────────────────────────────────────────

interface AddRestaurantFormProps {
  listId: string
  staticEntries: ListEntry[]
}

export function AddRestaurantForm({ listId, staticEntries }: AddRestaurantFormProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [url, setUrl] = useState('')
  const [urlHint, setUrlHint] = useState<{ type: 'found' | 'short' | 'invalid'; text: string } | null>(null)
  const [name, setName] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [cuisine, setCuisine] = useState<CuisineType | ''>('')
  const [priceRange, setPriceRange] = useState<1 | 2 | 3 | 4 | null>(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { addRestaurant, hasMapsUrl } = useAddedRestaurantsStore()

  function reset() {
    setUrl('')
    setUrlHint(null)
    setName('')
    setNeighborhood('')
    setCuisine('')
    setPriceRange(null)
    setError('')
    setSubmitting(false)
    setSuccess(false)
  }

  function handleOpen() {
    setOpen(true)
    setTimeout(() => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function handleCancel() {
    reset()
    setOpen(false)
  }

  function handleUrlBlur() {
    const trimmed = url.trim()
    if (!trimmed) { setUrlHint(null); return }

    if (!isGoogleMapsUrl(trimmed)) {
      setUrlHint({ type: 'invalid', text: 'Paste a Google Maps link, or enter the name below.' })
      return
    }

    if (isShortMapsUrl(trimmed)) {
      setUrlHint({ type: 'short', text: 'Short link — enter the restaurant name below.' })
      return
    }

    const parsed = parseNameFromMapsUrl(trimmed)
    if (parsed) {
      setUrlHint({ type: 'found', text: `Found: ${parsed}` })
      if (!name) setName(parsed)
    } else {
      setUrlHint({ type: 'short', text: 'Could not extract name — enter it below.' })
    }
  }

  function handleUrlChange(val: string) {
    setUrl(val)
    setUrlHint(null)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Please enter a restaurant name.')
      return
    }

    const trimmedUrl = url.trim()
    if (trimmedUrl && (await hasMapsUrl(listId, trimmedUrl, staticEntries))) {
      setError('This restaurant is already on the list.')
      return
    }

    setSubmitting(true)
    const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    await addRestaurant(listId, {
      id,
      name: trimmedName,
      mapsUrl: trimmedUrl || undefined,
      neighborhood: neighborhood.trim() || undefined,
      cuisine: cuisine || undefined,
      priceRange: priceRange ?? undefined,
      tags: [],
    })

    setSuccess(true)
    setTimeout(() => {
      reset()
      setOpen(false)
    }, 1200)
  }

  // ─── Closed state ──────────────────────────────────────────────────────────

  if (!open) {
    return (
      <div className="mt-8 pt-6 border-t border-warm-border">
        <button onClick={handleOpen} className="text-sm font-body text-earth hover:underline">
          + Add a restaurant
        </button>
      </div>
    )
  }

  // ─── Success state ─────────────────────────────────────────────────────────

  if (success) {
    return (
      <div ref={containerRef} className="mt-8 pt-6 border-t border-warm-border">
        <p className="text-sm font-body text-earth">Added! Updating list…</p>
      </div>
    )
  }

  // ─── Form ──────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="mt-8 pt-6 border-t border-warm-border">
      <h3 className="font-display text-base font-bold text-ink mb-5">Add a restaurant</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL */}
        <div>
          <label className="block text-xs font-body font-medium text-sand uppercase tracking-wide mb-1.5">
            Google Maps URL <span className="normal-case font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="https://www.google.com/maps/place/..."
            className="w-full text-sm font-body border border-warm-border rounded-lg px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth transition-colors"
          />
          {urlHint && (
            <p className={`mt-1.5 text-xs font-body ${urlHint.type === 'found' ? 'text-earth font-medium' : urlHint.type === 'invalid' ? 'text-red-500' : 'text-sand'}`}>
              {urlHint.type === 'found' && '✓ '}{urlHint.text}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-body font-medium text-sand uppercase tracking-wide mb-1.5">
            Restaurant name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="e.g. Tavernetta"
            className="w-full text-sm font-body border border-warm-border rounded-lg px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth transition-colors"
          />
        </div>

        {/* Neighborhood + Cuisine */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-body font-medium text-sand uppercase tracking-wide mb-1.5">
              Neighborhood
            </label>
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="e.g. RiNo"
              className="w-full text-sm font-body border border-warm-border rounded-lg px-3 py-2 bg-white text-ink placeholder-sand focus:outline-none focus:border-earth transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-body font-medium text-sand uppercase tracking-wide mb-1.5">
              Cuisine
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value as CuisineType | '')}
              className="w-full text-sm font-body border border-warm-border rounded-lg px-3 py-2 bg-white text-ink focus:outline-none focus:border-earth transition-colors"
            >
              <option value="">— select —</option>
              {cuisineOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price range */}
        <div>
          <label className="block text-xs font-body font-medium text-sand uppercase tracking-wide mb-1.5">
            Price range
          </label>
          <div className="flex gap-2">
            {([1, 2, 3, 4] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriceRange(priceRange === p ? null : p)}
                className={`px-3 py-1 text-sm font-body rounded-full border transition-colors ${
                  priceRange === p
                    ? 'bg-earth text-white-warm border-earth'
                    : 'border-warm-border text-bark hover:border-earth hover:text-earth'
                }`}
              >
                {'$'.repeat(p)}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs font-body text-red-500">{error}</p>}

        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="text-sm font-body px-4 py-1.5 rounded-full bg-earth text-white-warm hover:bg-bark transition-colors disabled:opacity-50"
          >
            {submitting ? 'Adding…' : 'Add to list'}
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
    </div>
  )
}
