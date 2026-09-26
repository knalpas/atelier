import type { Artist } from '../types'

interface TimelineProps {
  artists: Artist[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function Timeline({ artists, selectedId, onSelect }: TimelineProps) {
  if (artists.length === 0) return null

  const min = Math.min(...artists.map((a) => a.years[0]))
  const max = Math.max(...artists.map((a) => a.years[1]))
  const span = Math.max(max - min, 1)

  const sorted = [...artists].sort((a, b) => a.years[0] - b.years[0])
  // Keep timeline readable: sample denser eras
  const marks =
    sorted.length > 18
      ? sorted.filter((_, i) => i % Math.ceil(sorted.length / 16) === 0)
      : sorted

  return (
    <section className="timeline" id="timeline">
      <h3>Across time</h3>
      <div className="timeline-track">
        <div className="timeline-inner">
          <div className="timeline-line" />
          {marks.map((artist) => {
            const mid = (artist.years[0] + artist.years[1]) / 2
            const left = ((mid - min) / span) * 100
            return (
              <button
                key={artist.id}
                type="button"
                className={`timeline-mark${selectedId === artist.id ? ' active' : ''}`}
                style={{ left: `${left}%` }}
                onClick={() => onSelect(artist.id)}
                title={`${artist.name} (${artist.years[0]}–${artist.years[1]})`}
              >
                <span className="label">
                  {artist.name.split(' ').slice(-1)[0]}
                  <br />
                  {artist.years[0]}
                </span>
                <span className="dot" />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
