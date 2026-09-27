import type { CSSProperties } from 'react'
import type { Room } from '../types'
import type { GalleryArtist } from '../data/graph'
import { ArtistCard } from './ArtistCard'
import { useI18n } from '../lib/i18n'

interface RoomSectionProps {
  room: Room
  artists: GalleryArtist[]
}

export function RoomSection({ room, artists }: RoomSectionProps) {
  const { tx } = useI18n()
  const text = tx.room(room)
  const style = {
    '--wall': room.wall,
    '--room-ink': room.ink,
    '--room-muted': room.muted,
    '--room-accent': room.accent,
  } as CSSProperties

  const movements = room.movements.filter((m) => artists.some((a) => a.movement === m))

  return (
    <section id={`room-${room.id}`} className="room" style={style} data-room={room.id}>
      <header className="room__header">
        <p className="room__numeral">{tx.t('room_numeral', { n: room.numeral })}</p>
        <h2 className="room__title">{text.title}</h2>
        <p className="room__span">{text.span}</p>
        <p className="room__intro">{text.intro}</p>
        <ul className="room__movements" aria-label={tx.t('room_movements')}>
          {movements.map((m) => (
            <li key={m}>{tx.movement(m)}</li>
          ))}
        </ul>
      </header>

      <p className="room__swipe" aria-hidden="true">
        {tx.t('room_swipe', { n: artists.length })} <span>→</span>
      </p>
      <div className="room__track">
        {artists.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} index={i} total={artists.length} />
        ))}
      </div>
    </section>
  )
}
