import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { artists } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { Portrait } from './Portrait'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

function normalize(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { jumpTo } = useNavigation()

  useEffect(() => {
    if (!open) return
    setQuery('')
    const t = window.setTimeout(() => inputRef.current?.focus(), 60)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return artists
    return artists.filter((a) =>
      normalize(
        [a.name, a.short, a.movement, a.country, a.birthplace, a.knownFor].join(' '),
      ).includes(q),
    )
  }, [query])

  const choose = (id: string) => {
    onClose()
    window.setTimeout(() => jumpTo(id), 120)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search"
          role="dialog"
          aria-modal="true"
          aria-label="Find an artist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="search__panel"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search__bar">
              <input
                ref={inputRef}
                type="search"
                placeholder="Name, movement, country or painting…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) choose(results[0].id)
                }}
              />
              <button type="button" onClick={onClose} className="search__close">
                Close
              </button>
            </div>
            <ul className="search__results">
              {results.map((a) => (
                <li key={a.id}>
                  <button type="button" onClick={() => choose(a.id)}>
                    <Portrait id={a.id} name={a.name} size="thumb" />
                    <span className="search__text">
                      <strong>{a.name}</strong>
                      <span>
                        {a.born}–{a.died} · {a.movement} · {a.country}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className="search__empty">No artist matches “{query}”.</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
