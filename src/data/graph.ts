import type { Artist, Room } from '../types'
import { artists as rawArtists } from './artists'
import { roomOf } from './rooms'

export type RelKind =
  | 'teachers'
  | 'students'
  | 'partners'
  | 'collaborators'
  | 'modelled'
  | 'models'
  | 'rivals'
  | 'friends'
  | 'influences'
  | 'influenced'

export interface GalleryArtist extends Artist {
  room: Room
}

export const artists: GalleryArtist[] = rawArtists
  .map((a) => ({ ...a, room: roomOf(a.movement) }))
  .sort((a, b) => a.born - b.born || a.name.localeCompare(b.name))

export const byId = new Map(artists.map((a) => [a.id, a]))

const SYMMETRIC: RelKind[] = ['partners', 'collaborators']
const SYMMETRIC_LATE: RelKind[] = ['rivals', 'friends']

function listed(a: Artist, key: keyof Artist): string[] {
  return ((a[key] as string[] | undefined) ?? []).filter((id) => byId.has(id))
}

export interface Relation {
  kind: RelKind
  ids: string[]
}

const relationCache = new Map<string, Relation[]>()

export function relationsOf(id: string): Relation[] {
  const cached = relationCache.get(id)
  if (cached) return cached
  const me = byId.get(id)
  if (!me) return []

  const used = new Set<string>()
  const take = (ids: string[]) => {
    const out = [...new Set(ids)].filter((x) => x !== id && !used.has(x))
    out.forEach((x) => used.add(x))
    return out.sort((a, b) => byId.get(a)!.born - byId.get(b)!.born)
  }

  const others = artists.filter((a) => a.id !== id)
  const result: Relation[] = []

  result.push({ kind: 'teachers', ids: take(listed(me, 'teachers')) })
  result.push({
    kind: 'students',
    ids: take(others.filter((o) => listed(o, 'teachers').includes(id)).map((o) => o.id)),
  })
  const pushSymmetric = (kinds: RelKind[]) => {
    for (const kind of kinds) {
      const key = kind as keyof Artist
      result.push({
        kind,
        ids: take([
          ...listed(me, key),
          ...others.filter((o) => listed(o, key).includes(id)).map((o) => o.id),
        ]),
      })
    }
  }
  pushSymmetric(SYMMETRIC)
  result.push({ kind: 'modelled', ids: take(listed(me, 'modelled')) })
  result.push({
    kind: 'models',
    ids: take(others.filter((o) => listed(o, 'modelled').includes(id)).map((o) => o.id)),
  })
  pushSymmetric(SYMMETRIC_LATE)
  result.push({ kind: 'influences', ids: take(listed(me, 'influences')) })
  result.push({
    kind: 'influenced',
    ids: take(others.filter((o) => listed(o, 'influences').includes(id)).map((o) => o.id)),
  })

  const filtered = result.filter((r) => r.ids.length > 0)
  relationCache.set(id, filtered)
  return filtered
}

export function connectedIds(id: string): Set<string> {
  return new Set(relationsOf(id).flatMap((r) => r.ids))
}

export function noteBetween(a: string, b: string): string | undefined {
  return byId.get(a)?.notes?.[b] ?? byId.get(b)?.notes?.[a]
}

export interface Story {
  other: string
  owner: string
  about: string
  text: string
}

export function storiesOf(id: string): Story[] {
  const me = byId.get(id)
  if (!me) return []
  const seen = new Set<string>()
  const stories: Story[] = []
  for (const [other, text] of Object.entries(me.notes ?? {})) {
    if (!byId.has(other)) continue
    seen.add(other)
    stories.push({ other, owner: id, about: other, text })
  }
  for (const a of artists) {
    if (a.id === id || seen.has(a.id)) continue
    const text = a.notes?.[id]
    if (text) stories.push({ other: a.id, owner: a.id, about: id, text })
  }
  return stories
}

export const pairCount = (() => {
  const pairs = new Set<string>()
  for (const a of artists) {
    for (const r of relationsOf(a.id)) {
      for (const b of r.ids) pairs.add([a.id, b].sort().join('|'))
    }
  }
  return pairs.size
})()

export const YEAR_MIN = Math.floor(Math.min(...artists.map((a) => a.born)) / 50) * 50
/** Last year of a life. Living artists run up to the current year, not a stored death date. */
export function lifeEnd(a: { died: number; living?: boolean }): number {
  return a.living ? new Date().getFullYear() : a.died
}

export const YEAR_MAX = Math.ceil(Math.max(...artists.map((a) => lifeEnd(a))) / 50) * 50

if (import.meta.env?.DEV) {
  const keys: (keyof Artist)[] = [
    'teachers',
    'influences',
    'friends',
    'rivals',
    'collaborators',
    'partners',
    'modelled',
  ]
  for (const a of rawArtists) {
    for (const key of keys) {
      for (const ref of (a[key] as string[] | undefined) ?? []) {
        if (!byId.has(ref)) console.warn(`[atelier] ${a.id}.${key} → unknown "${ref}"`)
      }
    }
    for (const ref of Object.keys(a.notes ?? {})) {
      if (!byId.has(ref)) console.warn(`[atelier] ${a.id}.notes → unknown "${ref}"`)
    }
  }
}
