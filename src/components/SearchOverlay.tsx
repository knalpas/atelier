import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { artists } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { Portrait } from './Portrait'
import { useI18n } from '../lib/i18n'

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
  const { tx } = useI18n()

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
    return artists.filter((a) => normalize(tx.searchable(a)).includes(q))
  }, [query, tx])

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
          aria-label={tx.t('find_label')}
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
                placeholder={tx.t('search_placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) choose(results[0].id)
                }}
              />
              <button type="button" onClick={onClose} className="search__close">
                {tx.t('close')}
              </button>
            </div>
            <ul className="search__results">
              {results.map((a) => (
                <li key={a.id}>
                  <button type="button" onClick={() => choose(a.id)}>
                    <Portrait id={a.id} name={tx.name(a)} size="thumb" />
                    <span className="search__text">
                      <strong>{tx.name(a)}</strong>
                      <span>
                        {tx.lifespan(a)} · {tx.movement(a.movement)} · {tx.country(a.country)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="search__empty">{tx.t('no_match', { q: query })}</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
