import { useState } from 'react'
import { byId, noteBetween } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { Portrait } from './Portrait'
import { useI18n } from '../lib/i18n'

interface PersonLinkProps {
  id: string
  from?: string
}

export function PersonLink({ id, from }: PersonLinkProps) {
  const { jumpTo } = useNavigation()
  const [open, setOpen] = useState(false)
  const { tx } = useI18n()
  const artist = byId.get(id)
  if (!artist) return null
  const note = from ? noteBetween(from, id) : undefined

  return (
    <span
      className="person"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`person__link${note ? ' person__link--story' : ''}`}
        onClick={() => {
          setOpen(false)
          jumpTo(id, from)
        }}
      >
        {tx.short(artist)}
      </button>
      {open && (
        <span className="peek" role="tooltip">
          <Portrait id={artist.id} name={tx.name(artist)} size="thumb" />
          <span className="peek__text">
            <strong>{tx.name(artist)}</strong>
            <span>
              {artist.born}–{artist.died} · {tx.movement(artist.movement)}
            </span>
            <span>
              {tx.place(artist.birthplace)}, {tx.country(artist.country)}
            </span>
          </span>
        </span>
      )}
    </span>
  )
}
