import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Artist, ConnectionType } from '../types'
import { CONNECTION_LABELS } from '../types'

const EDGE_COLORS: Record<ConnectionType, string> = {
  mentor: '#0b6b6e',
  influence: '#1f4f8f',
  collaborator: '#2f6b3a',
  rival: '#9b3b2e',
  friend: '#6b4f8f',
  circle: '#6a5a3a',
}

interface PositionedArtist extends Artist {
  x: number
  y: number
}

interface ArtistGraphProps {
  artists: Artist[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function layoutArtists(artists: Artist[]): PositionedArtist[] {
  if (artists.length === 0) return []

  const minYear = Math.min(...artists.map((a) => a.years[0]))
  const maxYear = Math.max(...artists.map((a) => a.years[1]))
  const span = Math.max(maxYear - minYear, 1)

  const byMovement = new Map<string, Artist[]>()
  for (const artist of artists) {
    const list = byMovement.get(artist.movement) ?? []
    list.push(artist)
    byMovement.set(artist.movement, list)
  }

  const movements = [...byMovement.keys()].sort()
  const movementIndex = new Map(movements.map((m, i) => [m, i]))

  const width = 1000
  const height = 620
  const padX = 70
  const padY = 56

  return artists.map((artist) => {
    const mid = (artist.years[0] + artist.years[1]) / 2
    const t = (mid - minYear) / span
    const mIndex = movementIndex.get(artist.movement) ?? 0
    const band = movements.length <= 1 ? 0.5 : mIndex / (movements.length - 1)
    const jitter = ((hash(artist.id) % 100) / 100 - 0.5) * 36
    const x = padX + t * (width - padX * 2) + jitter * 0.35
    const y = padY + band * (height - padY * 2) + jitter
    return { ...artist, x, y }
  })
}

export function ArtistGraph({ artists, selectedId, onSelect }: ArtistGraphProps) {
  const positioned = useMemo(() => layoutArtists(artists), [artists])
  const byId = useMemo(
    () => new Map(positioned.map((a) => [a.id, a])),
    [positioned],
  )

  const edges = useMemo(() => {
    const seen = new Set<string>()
    const result: {
      key: string
      x1: number
      y1: number
      x2: number
      y2: number
      type: ConnectionType
      active: boolean
    }[] = []

    for (const artist of positioned) {
      for (const connection of artist.connections) {
        const other = byId.get(connection.to)
        if (!other) continue
        const key = [artist.id, connection.to].sort().join('::') + '::' + connection.type
        if (seen.has(key)) continue
        seen.add(key)
        const active =
          !selectedId || selectedId === artist.id || selectedId === connection.to
        result.push({
          key,
          x1: artist.x,
          y1: artist.y,
          x2: other.x,
          y2: other.y,
          type: connection.type,
          active,
        })
      }
    }
    return result
  }, [positioned, byId, selectedId])

  const selected = selectedId ? byId.get(selectedId) : null
  const connectedIds = useMemo(() => {
    if (!selected) return new Set<string>()
    const ids = new Set<string>([selected.id])
    for (const c of selected.connections) {
      if (byId.has(c.to)) ids.add(c.to)
    }
    for (const artist of positioned) {
      if (artist.connections.some((c) => c.to === selected.id)) ids.add(artist.id)
    }
    return ids
  }, [selected, byId, positioned])

  return (
    <div className="graph-panel panel">
      <div className="graph-wrap">
        <svg
          className="graph-svg"
          viewBox="0 0 1000 620"
          role="img"
          aria-label="Network of artists arranged by era and movement"
        >
          <defs>
            <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge) => (
            <motion.line
              key={edge.key}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke={EDGE_COLORS[edge.type]}
              strokeWidth={edge.active ? 1.6 : 0.7}
              strokeOpacity={selectedId ? (edge.active ? 0.75 : 0.08) : 0.28}
              initial={false}
              animate={{
                strokeOpacity: selectedId ? (edge.active ? 0.75 : 0.08) : 0.28,
              }}
              transition={{ duration: 0.35 }}
            />
          ))}

          {positioned.map((artist) => {
            const isSelected = artist.id === selectedId
            const isDimmed = Boolean(selectedId && !connectedIds.has(artist.id))
            const radius = isSelected ? 11 : 7.5
            return (
              <g
                key={artist.id}
                transform={`translate(${artist.x}, ${artist.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelect(artist.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(artist.id)
                }}
                tabIndex={0}
                role="button"
                aria-label={`${artist.name}, ${artist.movement}`}
              >
                <motion.circle
                  r={radius + 10}
                  fill="transparent"
                />
                <motion.circle
                  r={radius}
                  fill={isSelected ? '#b54a2a' : '#0b6b6e'}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={isSelected ? 'url(#nodeGlow)' : undefined}
                  initial={false}
                  animate={{
                    opacity: isDimmed ? 0.18 : 1,
                    r: radius,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  fontSize={isSelected ? 12 : 10}
                  fontWeight={isSelected ? 700 : 600}
                  fill="#14181c"
                  opacity={isDimmed ? 0.2 : 0.9}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {artist.name.split(' ').slice(-1)[0]}
                </text>
              </g>
            )
          })}
        </svg>
        <div className="graph-hint">Tap a name · time runs left → right</div>
      </div>

      <div className="legend">
        {(Object.keys(CONNECTION_LABELS) as ConnectionType[]).map((type) => (
          <span key={type}>
            <i className="swatch" style={{ background: EDGE_COLORS[type] }} />
            {CONNECTION_LABELS[type]}
          </span>
        ))}
      </div>
    </div>
  )
}
