import { AnimatePresence, motion } from 'framer-motion'
import type { Artist } from '../types'
import { CONNECTION_LABELS } from '../types'

interface ArtistDetailProps {
  artist: Artist | null
  artistsById: Map<string, Artist>
  onSelect: (id: string) => void
}

export function ArtistDetail({ artist, artistsById, onSelect }: ArtistDetailProps) {
  return (
    <section className="panel detail" aria-live="polite">
      <AnimatePresence mode="wait">
        {!artist ? (
          <motion.div
            key="empty"
            className="detail-empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <h3>Select an artist</h3>
            <p>
              The atlas lights their movement, origin, lifespan, and every
              recorded link to mentors, rivals, and friends.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'grid', gap: '1rem' }}
          >
            <div>
              <div className="detail-kicker">{artist.movement}</div>
              <h3>{artist.name}</h3>
            </div>

            <dl className="meta-grid">
              <div className="meta">
                <dt>Lived</dt>
                <dd>
                  {artist.years[0]}–{artist.years[1]}
                </dd>
              </div>
              <div className="meta">
                <dt>From</dt>
                <dd>
                  {artist.birthplace}, {artist.country}
                </dd>
              </div>
              <div className="meta">
                <dt>Movement</dt>
                <dd>{artist.movement}</dd>
              </div>
              <div className="meta">
                <dt>Links</dt>
                <dd>
                  {
                    artist.connections.filter((c) => artistsById.has(c.to))
                      .length
                  }{' '}
                  in atlas
                </dd>
              </div>
            </dl>

            <p>{artist.summary}</p>

            <div className="connections">
              <h4>Connected to</h4>
              <ul className="connection-list">
                {artist.connections
                  .filter((c) => artistsById.has(c.to))
                  .map((connection) => {
                    const other = artistsById.get(connection.to)!
                    return (
                      <li key={`${connection.to}-${connection.type}`}>
                        <button
                          type="button"
                          className="connection-item"
                          onClick={() => onSelect(other.id)}
                        >
                          <strong>{other.name}</strong>
                          <span>
                            {CONNECTION_LABELS[connection.type]}
                            {connection.note ? ` · ${connection.note}` : ''}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                {artist.connections.filter((c) => artistsById.has(c.to))
                  .length === 0 && (
                  <li>
                    <span style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                      No linked artists match the current filters.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
