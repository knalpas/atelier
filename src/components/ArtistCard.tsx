import { memo } from 'react'
import type { GalleryArtist } from '../data/graph'
import { REL_LABEL, YEAR_MAX, YEAR_MIN, byId, relationsOf, storiesOf } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { PersonLink } from './PersonLink'
import { Portrait } from './Portrait'

interface ArtistCardProps {
  artist: GalleryArtist
  index: number
  total: number
}

function LifeLine({ born, died }: { born: number; died: number }) {
  const span = YEAR_MAX - YEAR_MIN
  const left = ((born - YEAR_MIN) / span) * 100
  const width = Math.max(((died - born) / span) * 100, 1.2)
  return (
    <div className="lifeline" aria-hidden="true">
      <div className="lifeline__track">
        {[1400, 1500, 1600, 1700, 1800, 1900].map((y) => (
          <span
            key={y}
            className="lifeline__tick"
            style={{ left: `${((y - YEAR_MIN) / span) * 100}%` }}
          />
        ))}
        <span className="lifeline__bar" style={{ left: `${left}%`, width: `${width}%` }} />
      </div>
      <div className="lifeline__scale">
        <span>{YEAR_MIN}</span>
        <span>{YEAR_MAX}</span>
      </div>
    </div>
  )
}

function ArtistCardImpl({ artist, index, total }: ArtistCardProps) {
  const { highlighted } = useNavigation()
  const relations = relationsOf(artist.id)
  const stories = storiesOf(artist.id)
  const isLit = highlighted === artist.id

  return (
    <article
      id={`artist-${artist.id}`}
      className={`card${isLit ? ' card--lit' : ''}`}
      aria-label={artist.name}
    >
      <div className="card__count" aria-hidden="true">
        {index + 1} / {total}
      </div>
      <Portrait id={artist.id} name={artist.name} />

      <div className="label">
        <p className="label__movement">{artist.movement}</p>
        <h3 className="label__name">{artist.name}</h3>
        <p className="label__facts">
          <span>
            {artist.born}–{artist.died}
          </span>
          <span className="label__dot">·</span>
          <span>
            {artist.birthplace}, {artist.country}
          </span>
        </p>
        <LifeLine born={artist.born} died={artist.died} />
        <p className="label__known">
          <span>Known for</span> <em>{artist.knownFor}</em>
        </p>
        <p className="label__blurb">{artist.blurb}</p>

        {relations.length > 0 && (
          <dl className="ties">
            {relations.map((rel) => (
              <div key={rel.kind} className={`ties__row ties__row--${rel.kind}`}>
                <dt>{REL_LABEL[rel.kind]}</dt>
                <dd>
                  {rel.ids.map((id, i) => (
                    <span key={id}>
                      <PersonLink id={id} from={artist.id} />
                      {i < rel.ids.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {stories.length > 0 && (
          <div className="stories">
            {stories.map((story) => (
              <p key={story.other}>
                <span className="stories__who">With {byId.get(story.other)?.short}:</span>{' '}
                {story.text}
              </p>
            ))}
          </div>
        )}

        <a
          className="label__more"
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(artist.wiki.replace(/ /g, '_'))}`}
          target="_blank"
          rel="noreferrer"
        >
          Read more on Wikipedia ↗
        </a>
      </div>
    </article>
  )
}

export const ArtistCard = memo(ArtistCardImpl)
