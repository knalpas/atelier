import { useDeferredValue, useMemo, useState } from 'react'
import { artists as allArtists, countries, movements } from './data/artists'
import type { Artist } from './types'
import { Hero } from './components/Hero'
import { ArtistGraph } from './components/ArtistGraph'
import { ArtistDetail } from './components/ArtistDetail'
import { Timeline } from './components/Timeline'

const ERA_PRESETS = [
  { id: 'all', label: 'All eras', min: 0, max: 3000 },
  { id: 'renaissance', label: 'Renaissance', min: 1260, max: 1565 },
  { id: 'baroque', label: 'Baroque', min: 1565, max: 1750 },
  { id: 'modern', label: 'Modern turn', min: 1780, max: 1920 },
  { id: '20c', label: '20th century', min: 1880, max: 2000 },
] as const

function matchesQuery(artist: Artist, query: string) {
  if (!query) return true
  const hay = [
    artist.name,
    artist.movement,
    artist.country,
    artist.birthplace,
    artist.summary,
  ]
    .join(' ')
    .toLowerCase()
  return hay.includes(query)
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>('van-gogh')
  const [query, setQuery] = useState('')
  const [movement, setMovement] = useState('all')
  const [country, setCountry] = useState('all')
  const [era, setEra] = useState<(typeof ERA_PRESETS)[number]['id']>('all')
  const deferredQuery = useDeferredValue(query)

  const artistsById = useMemo(
    () => new Map(allArtists.map((a) => [a.id, a])),
    [],
  )

  const filtered = useMemo(() => {
    const preset = ERA_PRESETS.find((e) => e.id === era) ?? ERA_PRESETS[0]
    const q = deferredQuery.trim().toLowerCase()

    return allArtists.filter((artist) => {
      if (movement !== 'all' && artist.movement !== movement) return false
      if (country !== 'all' && artist.country !== country) return false
      const mid = (artist.years[0] + artist.years[1]) / 2
      if (mid < preset.min || mid > preset.max) return false
      return matchesQuery(artist, q)
    })
  }, [deferredQuery, movement, country, era])

  const selected =
    (selectedId && filtered.find((a) => a.id === selectedId)) ||
    (selectedId ? artistsById.get(selectedId) ?? null : null)

  const scrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Hero onExplore={scrollToExplorer} />

      <main className="explorer" id="explorer">
        <div className="explorer-header">
          <h2>The atlas</h2>
          <p>
            {filtered.length} artists in view. Filter by era, movement, or place —
            then follow the threads between them.
          </p>
        </div>

        <div className="toolbar">
          <div className="chip-row" role="tablist" aria-label="Era filters">
            {ERA_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`chip${era === preset.id ? ' active' : ''}`}
                onClick={() => setEra(preset.id)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="search-row">
            <div className="field">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="search"
                placeholder="Name, movement, city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="movement">Movement</label>
              <select
                id="movement"
                value={movement}
                onChange={(e) => setMovement(e.target.value)}
              >
                <option value="all">All movements</option>
                {movements.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="country">Origin</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="all">All origins</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="layout">
          <ArtistGraph
            artists={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <ArtistDetail
            artist={selected}
            artistsById={artistsById}
            onSelect={setSelectedId}
          />
        </div>

        <Timeline
          artists={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </main>

      <footer className="footer">
        <span>LINEAGE · historical relationships among painters &amp; modernists</span>
        <span>{allArtists.length} figures curated for exploration</span>
      </footer>
    </div>
  )
}
