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
import { useI18n } from '../lib/i18n'

type View = 'europe' | 'world'

const SIZE: Record<View, [number, number]> = { europe: [800, 620], world: [800, 420] }
// Markers closer than this (in viewBox units) merge into one, so none hides another.
const MERGE_DISTANCE: Record<View, number> = { europe: 16, world: 12 }

interface Place {
  key: string
  place: string
  country: string
  lat: number
  lon: number
  artists: GalleryArtist[]
}

interface Cluster {
  key: string
  place: string
  country: string
  x: number
  y: number
  artists: GalleryArtist[]
}

const places: Place[] = (() => {
  const map = new Map<string, Place>()
  for (const a of artists) {
    const key = `${a.birthplace}|${a.country}`
    const p = map.get(key)
    if (p) p.artists.push(a)
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
  return [...map.entries()]
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

function clusterPlaces(view: View, projection: GeoProjection) {
  const [w, h] = SIZE[view]
  const clusters: Cluster[] = []
  const outside: Place[] = []
  for (const p of places) {
    const xy = projection([p.lon, p.lat])
    if (!xy || xy[0] < 0 || xy[0] > w || xy[1] < 0 || xy[1] > h) {
      outside.push(p)
      continue
    }
    const near = clusters.find(
      (c) => Math.hypot(c.x - xy[0], c.y - xy[1]) < MERGE_DISTANCE[view],
    )
    if (near) near.artists.push(...p.artists)
    else
      clusters.push({
        key: p.key,
        place: p.place,
        country: p.country,
        x: xy[0],
        y: xy[1],
        artists: [...p.artists],
      })
  }
  for (const c of clusters) c.artists.sort((a, b) => a.born - b.born)
  return { clusters, outside }
}

export function BirthMap() {
  const [land, setLand] = useState<FeatureCollection<Geometry> | null>(null)
  const [view, setView] = useState<View>('europe')
  const [selected, setSelected] = useState<string>(places[0].key)
  const { jumpTo } = useNavigation()
  const { tx } = useI18n()
  const countries = useMemo(
    () =>
      [...byCountry].sort(
        (a, b) =>
          b[1].length - a[1].length ||
          tx.country(a[0]).localeCompare(tx.country(b[0]), tx.lang),
      ),
    [tx],
  )

  useEffect(() => {
    let alive = true
    const section = document.getElementById('birthplaces')
    const load = () =>
      import('world-atlas/countries-50m.json').then((mod) => {
        const topo = (mod.default ?? mod) as unknown as Topology
        const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>
        if (alive) setLand(fc)
      })
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          load()
        }
      },
      { rootMargin: '1200px 0px' },
    )
    if (section) io.observe(section)
    return () => {
      alive = false
      io.disconnect()
    }
  }, [])

  const [w, h] = SIZE[view]
  const projection = useMemo(() => makeProjection(view), [view])
  const path = useMemo(() => geoPath(projection), [projection])
  const graticule = useMemo(() => path(geoGraticule10()) ?? '', [path])
  const { clusters, outside } = useMemo(() => clusterPlaces(view, projection), [view, projection])

  const outsideClusters: Cluster[] = outside.map((p) => ({
    key: p.key,
    place: p.place,
    country: p.country,
    x: 0,
    y: 0,
    artists: p.artists,
  }))
  const current =
    clusters.find((c) => c.key === selected) ??
    outsideClusters.find((c) => c.key === selected) ??
    clusters.find((c) => c.artists.some((a) => `${a.birthplace}|${a.country}` === selected)) ??
    clusters[0]
  const mixed = new Set(current.artists.map((a) => a.birthplace)).size > 1

  return (
    <section className="section section--parchment" id="birthplaces">
      <div className="section__head">
        <p className="section__eyebrow">{tx.t('map_eyebrow')}</p>
        <h2 className="section__title">{tx.t('map_long')}</h2>
        <p className="section__lede">{tx.t('map_lede')}</p>
      </div>

      <div className="atlas">
        <div className="atlas__mapwrap">
          <div className="atlas__toggle" role="tablist" aria-label={tx.t('map_extent')}>
            {(['europe', 'world'] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                className={view === v ? 'is-active' : undefined}
                onClick={() => setView(v)}
              >
                {tx.t(v)}
              </button>
            ))}
          </div>
          <svg
            className="atlas__map"
            viewBox={`0 0 ${w} ${h}`}
            role="img"
            aria-label={tx.t('map_label')}
          >
            <rect width={w} height={h} className="atlas__sea" />
            <path d={graticule} className="atlas__graticule" />
            {land?.features.map((f, i) => (
              <path key={i} d={path(f) ?? ''} className="atlas__land" />
            ))}
            {[...clusters]
              .sort((a, b) => (a.key === current.key ? 1 : b.key === current.key ? -1 : 0))
              .map((c) => {
                const r = 4.5 + Math.sqrt(c.artists.length - 1) * 3.2
                const isSel = c.key === current.key
                return (
                  <g
                    key={c.key}
                    transform={`translate(${c.x},${c.y})`}
                    className={`pin${isSel ? ' is-selected' : ''}`}
                    onClick={() => setSelected(c.key)}
                    onMouseEnter={() => setSelected(c.key)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${tx.place(c.place)}: ${c.artists.map((a) => tx.name(a)).join(', ')}`}
                    onKeyDown={(e) => e.key === 'Enter' && setSelected(c.key)}
                  >
                    <circle r={r + 8} className="pin__hit" />
                    <circle r={r} className="pin__dot" />
                    {(c.artists.length > 1 || isSel) && (
                      <text y={-r - 5} className="pin__label">
                        {tx.place(c.place)}
                        {c.artists.length > 1 ? ` · ${c.artists.length}` : ''}
                      </text>
                    )}
                  </g>
                )
              })}
          </svg>
          {view === 'europe' && outside.length > 0 && (
            <p className="atlas__outside">
              {tx.t('beyond_europe')}{' '}
              {outside.map((p, i) => (
                <span key={p.key}>
                  <button type="button" onClick={() => setSelected(p.key)}>
                    {tx.place(p.place)}
                  </button>
                  {i < outside.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        <aside className="atlas__panel" aria-live="polite">
          <p className="atlas__place">
            {mixed ? tx.t('area', { place: tx.place(current.place) }) : tx.place(current.place)}
            <span>{tx.country(current.country)}</span>
          </p>
          <ul>
            {current.artists.map((a) => (
              <li key={a.id}>
                <button type="button" onClick={() => jumpTo(a.id)}>
                  <Portrait id={a.id} name={tx.name(a)} size="thumb" />
                  <span>
                    <strong>{tx.name(a)}</strong>
                    <span>
                      {a.born}–{a.died} · {tx.movement(a.movement)}
                      {mixed ? ` · ${tx.place(a.birthplace)}` : ''}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="countries">
        <h3>{tx.t('by_country')}</h3>
        <dl>
          {countries.map(([country, list]) => (
            <div key={country} className="countries__row">
              <dt>
                {tx.country(country)} <span>{list.length}</span>
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
