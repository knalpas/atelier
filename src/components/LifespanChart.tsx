import { useEffect, useMemo, useRef, useState } from 'react'
import { YEAR_MAX, YEAR_MIN, artists, byId, connectedIds, relationsOf, REL_LABEL } from '../data/graph'
import { rooms } from '../data/rooms'
import { useNavigation } from '../lib/navigation'

const LANE_H = 26
const TOP = 30
const CHAR_W = 6.7

interface Placed {
  id: string
  x: number
  w: number
  lane: number
  labelInside: boolean
}

function pack(ppy: number): { placed: Placed[]; lanes: number } {
  const laneEnds: number[] = []
  const placed: Placed[] = []
  for (const a of artists) {
    const x = (a.born - YEAR_MIN) * ppy
    const w = Math.max((a.died - a.born) * ppy, 4)
    const labelW = a.short.length * CHAR_W + 14
    const labelInside = labelW <= w
    const end = (labelInside ? x + w : x + w + labelW) + 6
    let lane = laneEnds.findIndex((e) => e <= x)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(end)
    } else {
      laneEnds[lane] = end
    }
    placed.push({ id: a.id, x, w, lane, labelInside })
  }
  return { placed, lanes: laneEnds.length }
}

export function LifespanChart() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1000)
  const [focus, setFocus] = useState<string | null>(null)
  const { jumpTo } = useNavigation()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const span = YEAR_MAX - YEAR_MIN
  const ppy = Math.max(1.4, (width - 8) / span)
  const { placed, lanes } = useMemo(() => pack(ppy), [ppy])
  const linked = useMemo(() => (focus ? connectedIds(focus) : new Set<string>()), [focus])
  const height = TOP + lanes * LANE_H + 8
  const innerW = span * ppy

  const centuries = []
  for (let y = Math.ceil(YEAR_MIN / 100) * 100; y <= YEAR_MAX; y += 100) centuries.push(y)

  const focused = focus ? byId.get(focus) : null

  return (
    <section className="section section--parchment" id="lifespans">
      <div className="section__head">
        <p className="section__eyebrow">At a glance</p>
        <h2 className="section__title">Who lived when</h2>
        <p className="section__lede">
          Each bar is a lifetime. Hover or tap one to light up everyone that artist was
          connected to.
        </p>
      </div>

      <div className="chart" ref={wrapRef}>
        <div className="chart__scroll">
          <div
            className="chart__canvas"
            style={{ width: innerW + 90, height }}
            onMouseLeave={() => setFocus(null)}
          >
            {centuries.map((y) => (
              <div
                key={y}
                className="chart__century"
                style={{ left: (y - YEAR_MIN) * ppy }}
              >
                <span>{y}</span>
              </div>
            ))}
            {placed.map((p) => {
              const a = byId.get(p.id)!
              const state =
                !focus ? '' : p.id === focus ? ' is-focus' : linked.has(p.id) ? ' is-linked' : ' is-dim'
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`bar${state}`}
                  style={{
                    left: p.x,
                    top: TOP + p.lane * LANE_H,
                    width: p.w,
                    background: a.room.chart,
                  }}
                  onMouseEnter={() => setFocus(p.id)}
                  onFocus={() => setFocus(p.id)}
                  onClick={() => setFocus(p.id)}
                  aria-label={`${a.name}, ${a.born}–${a.died}`}
                >
                  <span className={`bar__label${p.labelInside ? '' : ' bar__label--out'}`}>
                    {a.short}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <ul className="chart__legend">
          {rooms.map((r) => (
            <li key={r.id}>
              <i style={{ background: r.chart }} />
              {r.title}
            </li>
          ))}
        </ul>

        <div className="chart__info" aria-live="polite">
          {focused ? (
            <>
              <div>
                <strong>{focused.name}</strong>
                <span>
                  {' '}
                  · {focused.born}–{focused.died} · {focused.movement} · {focused.birthplace},{' '}
                  {focused.country}
                </span>
                <p className="chart__rels">
                  {relationsOf(focused.id)
                    .map((r) => `${REL_LABEL[r.kind]} ${r.ids.map((id) => byId.get(id)!.short).join(', ')}`)
                    .join(' · ')}
                </p>
              </div>
              <button type="button" onClick={() => jumpTo(focused.id)}>
                See in gallery →
              </button>
            </>
          ) : (
            <span>Hover or tap a bar.</span>
          )}
        </div>
      </div>
    </section>
  )
}
