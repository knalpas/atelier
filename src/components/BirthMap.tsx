import { useEffect, useMemo, useState } from 'react'
import { geoConicConformal, geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo'
import type { GeoProjection } from 'd3-geo'
import type { FeatureCollection, Geometry } from 'geojson'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import { artists } from '../data/graph'
import type { GalleryArtist } from '../data/graph'
import { PersonLink } from './PersonLink'
import { Portrait } from './Portrait'
import { useNavigation } from '../lib/navigation'

type View = 'europe' | 'world'

const SIZE: Record<View, [number, number]> = { europe: [800, 620], world: [800, 420] }

interface Cluster {
  key: string
  place: string
  country: string
  lat: number
  lon: number
  artists: GalleryArtist[]
}

const clusters: Cluster[] = (() => {
  const map = new Map<string, Cluster>()
  for (const a of artists) {
    const key = `${a.lat.toFixed(1)},${a.lon.toFixed(1)}`
    const c = map.get(key)
    if (c) c.artists.push(a)
    else
      map.set(key, {
        key,
        place: a.birthplace.split(',')[0],
        country: a.country,
        lat: a.lat,
        lon: a.lon,
        artists: [a],
      })
  }
  return [...map.values()].sort((a, b) => b.artists.length - a.artists.length)
})()

const byCountry = (() => {
  const map = new Map<string, GalleryArtist[]>()
  for (const a of artists) map.set(a.country, [...(map.get(a.country) ?? []), a])
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
})()

function makeProjection(view: View): GeoProjection {
  const [w, h] = SIZE[view]
  if (view === 'world') {
    return geoNaturalEarth1().fitExtent(
      [
        [8, 8],
        [w - 8, h - 8],
      ],
      { type: 'Sphere' },
    )
  }
  return geoConicConformal()
    .parallels([40, 60])
    .rotate([-12, 0])
    .fitExtent(
      [
        [12, 12],
        [w - 12, h - 12],
      ],
      {
        type: 'MultiPoint',
        coordinates: [
          [-8, 36],
          [34, 35],
          [-6, 58],
          [36, 60],
        ],
      },
    )
}

export function BirthMap() {
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null)
  const [view, setView] = useState<View>('europe')
  const [selected, setSelected] = useState<string>(clusters[0].key)
  const { jumpTo } = useNavigation()

  useEffect(() => {
    let alive = true
    import('world-atlas/countries-50m.json').then((mod) => {
      const topo = (mod.default ?? mod) as unknown as Topology
      const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>
      if (alive) setLand(fc)
    })
    return () => {
      alive = false
    }
  }, [])

  const [w, h] = SIZE[view]
  const projection = useMemo(() => makeProjection(view), [view])
  const path = useMemo(() => geoPath(projection), [projection])
  const graticule = useMemo(() => path(geoGraticule10()) ?? '', [path])

  const points = clusters
    .map((c) => {
      const p = projection([c.lon, c.lat])
      return p ? { ...c, x: p[0], y: p[1] } : null
    })
    .filter((p): p is Cluster & { x: number; y: number } => !!p && p.x > 0 && p.x < w && p.y > 0 && p.y < h)

  const outside = view === 'europe' ? clusters.filter((c) => !points.some((p) => p.key === c.key)) : []
  const current = clusters.find((c) => c.key === selected) ?? clusters[0]

  return (
    <section className="section section--parchment" id="birthplaces">
      <div className="section__head">
        <p className="section__eyebrow">Origins</p>
        <h2 className="section__title">Where they were born</h2>
        <p className="section__lede">
          Most of these painters were born within a few hundred kilometres of each other. Tap a
          marker to see who came from there.
        </p>
      </div>

      <div className="atlas">
        <div className="atlas__mapwrap">
          <div className="atlas__toggle" role="tablist" aria-label="Map extent">
            {(['europe', 'world'] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                className={view === v ? 'is-active' : undefined}
                onClick={() => setView(v)}
              >
                {v === 'europe' ? 'Europe' : 'World'}
              </button>
            ))}
          </div>
          <svg className="atlas__map" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Map of artist birthplaces">
            <rect width={w} height={h} className="atlas__sea" />
            <path d={graticule} className="atlas__graticule" />
            {land?.features.map((f, i) => (
              <path key={i} d={path(f) ?? ''} className="atlas__land" />
            ))}
            {points.map((p) => {
              const r = 4.5 + Math.sqrt(p.artists.length - 1) * 3.2
              const isSel = p.key === current.key
              return (
                <g
                  key={p.key}
                  transform={`translate(${p.x},${p.y})`}
                  className={`pin${isSel ? ' is-selected' : ''}`}
                  onClick={() => setSelected(p.key)}
                  onMouseEnter={() => setSelected(p.key)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.place}: ${p.artists.map((a) => a.name).join(', ')}`}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(p.key)}
                >
                  <circle r={r + 9} className="pin__hit" />
                  <circle r={r} className="pin__dot" />
                  {(p.artists.length > 1 || isSel) && (
                    <text y={-r - 5} className="pin__label">
                      {p.place}
                      {p.artists.length > 1 ? ` · ${p.artists.length}` : ''}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
          {outside.length > 0 && (
            <p className="atlas__outside">
              Beyond Europe:{' '}
              {outside.map((c, i) => (
                <span key={c.key}>
                  <button type="button" onClick={() => setSelected(c.key)}>
                    {c.place}
                  </button>
                  {i < outside.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        <aside className="atlas__panel" aria-live="polite">
          <p className="atlas__place">
            {current.place}
            <span>{current.country}</span>
          </p>
          <ul>
            {current.artists.map((a) => (
              <li key={a.id}>
                <button type="button" onClick={() => jumpTo(a.id)}>
                  <Portrait id={a.id} name={a.name} size="thumb" />
                  <span>
                    <strong>{a.name}</strong>
                    <span>
                      {a.born}–{a.died} · {a.movement}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="countries">
        <h3>By country of birth</h3>
        <dl>
          {byCountry.map(([country, list]) => (
            <div key={country} className="countries__row">
              <dt>
                {country} <span>{list.length}</span>
              </dt>
              <dd>
                {list.map((a, i) => (
                  <span key={a.id}>
                    <PersonLink id={a.id} />
                    {i < list.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
