import { useState } from 'react'
import { byId, noteBetween } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { Portrait } from './Portrait'

interface PersonLinkProps {
  id: string
  from?: string
}

const canHover =
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

export function PersonLink({ id, from }: PersonLinkProps) {
  const { jumpTo } = useNavigation()
  const [open, setOpen] = useState(false)
  const artist = byId.get(id)
  if (!artist) return null
  const note = from ? noteBetween(from, id) : undefined

  return (
    <span
      className="person"
      onMouseEnter={canHover ? () => setOpen(true) : undefined}
      onMouseLeave={canHover ? () => setOpen(false) : undefined}
    >
      <button
        type="button"
        className={`person__link${note ? ' person__link--story' : ''}`}
        onClick={() => {
          setOpen(false)
          jumpTo(id, from)
        }}
      >
        {artist.short}
      </button>
      {open && (
        <span className="peek" role="tooltip">
          <Portrait id={artist.id} name={artist.name} size="thumb" />
          <span className="peek__text">
            <strong>{artist.name}</strong>
            <span>
              {artist.born}–{artist.died} · {artist.movement}
            </span>
            <span>
              {artist.birthplace}, {artist.country}
            </span>
          </span>
        </span>
      )}
    </span>
  )
}
