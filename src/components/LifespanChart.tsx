import { useEffect, useMemo, useRef, useState } from 'react'
import { YEAR_MAX, YEAR_MIN, artists, byId, connectedIds, relationsOf } from '../data/graph'
import { rooms } from '../data/rooms'
import { useNavigation } from '../lib/navigation'
import { useI18n } from '../lib/i18n'
import type { Text } from '../lib/i18n'

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

function pack(ppy: number, tx: Text): { placed: Placed[]; lanes: number } {
  const laneEnds: number[] = []
  const placed: Placed[] = []
  for (const a of artists) {
    const x = (a.born - YEAR_MIN) * ppy
    const w = Math.max((a.died - a.born) * ppy, 4)
    const labelW = tx.short(a).length * CHAR_W + 14
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
  const [atEnd, setAtEnd] = useState(false)
  const { jumpTo } = useNavigation()
  const { tx } = useI18n()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const span = YEAR_MAX - YEAR_MIN
  const ppy = Math.max(1.4, (width - 8) / span)
  const { placed, lanes } = useMemo(() => pack(ppy, tx), [ppy, tx])
  const linked = useMemo(() => (focus ? connectedIds(focus) : new Set<string>()), [focus])
  const height = TOP + lanes * LANE_H + 8
  const innerW = span * ppy

  const centuries = []
  for (let y = Math.ceil(YEAR_MIN / 100) * 100; y <= YEAR_MAX; y += 100) centuries.push(y)

  const focused = focus ? byId.get(focus) : null

  return (
    <section className="section section--parchment" id="lifespans">
      <div className="section__head">
        <p className="section__eyebrow">{tx.t('chart_eyebrow')}</p>
        <h2 className="section__title">{tx.t('timeline_long')}</h2>
        <p className="section__lede">{tx.t('chart_lede')}</p>
      </div>

      <div className="chart" ref={wrapRef}>
        {innerW + 90 > width && (
          <p className="chart__hint" aria-hidden="true">
            {tx.t('chart_hint')} <span>→</span>
          </p>
        )}
        <div
          className={`chart__scroll${innerW + 90 > width && !atEnd ? ' chart__scroll--wide' : ''}`}
          onScroll={(e) => {
            const el = e.currentTarget
            setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
          }}
        >
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
                  aria-label={`${tx.name(a)}, ${tx.lifespan(a)}`}
                >
                  <span className={`bar__label${p.labelInside ? '' : ' bar__label--out'}`}>
                    {tx.short(a)}
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
              {tx.room(r).title}
            </li>
          ))}
        </ul>

        <div className="chart__info" aria-live="polite">
          {focused ? (
            <>
              <div>
                <strong>{tx.name(focused)}</strong>
                <span>
                  {' '}
                  · {tx.lifespan(focused)} · {tx.movement(focused.movement)} ·{' '}
                  {tx.place(focused.birthplace)}, {tx.country(focused.country)}
                </span>
                <p className="chart__rels">
                  {relationsOf(focused.id)
                    .map(
                      (r) =>
                        `${tx.rel(r.kind, focused)} ${r.ids.map((id) => tx.short(byId.get(id)!)).join(', ')}`,
                    )
                    .join(' · ')}
                </p>
              </div>
              <button type="button" onClick={() => jumpTo(focused.id)}>
                {tx.t('see_in_gallery')}
              </button>
            </>
          ) : (
            <span>{tx.t('chart_idle')}</span>
          )}
        </div>
      </div>
    </section>
  )
}
