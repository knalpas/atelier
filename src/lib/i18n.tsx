import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Artist, Room } from '../types'
import type { RelKind } from '../data/graph'
import {
  FR_ARTISTS,
  FR_COUNTRIES,
  FR_FEMALE,
  FR_MOVEMENTS,
  FR_PLACES,
  FR_ROOMS,
} from '../data/fr'
import wikiFr from '../data/wiki-fr.json'

export type Lang = 'en' | 'fr'

const UI = {
  en: {
    doc_title: 'Atelier · A family tree of painting',
    lang_label: 'Language',
    eyebrow: 'A family tree of painting',
    lede: 'Seven centuries of painters: who taught whom, who inspired whom, and who couldn’t stand each other.',
    stat_artists: 'artists',
    stat_rooms: 'rooms',
    stat_links: 'connections',
    cta: 'Enter the gallery',
    hint: 'Tap any name to jump to that artist.',
    nav_label: 'Gallery rooms',
    find: 'Find',
    find_label: 'Find an artist',
    timeline_short: 'Timeline',
    timeline_long: 'Who lived when',
    map_short: 'Map',
    map_long: 'Where they were born',
    room_numeral: 'Room {n}',
    room_movements: 'Movements in this room',
    room_swipe: '{n} artists · swipe',
    known_for: 'Known for',
    more_wiki: 'Read more on Wikipedia ↗',
    story_with: 'With {name}:',
    back_to: '← Back to {name}',
    dismiss: 'Dismiss',
    portrait_alt: 'Portrait of {name}',
    search_placeholder: 'Name, movement, country or painting…',
    close: 'Close',
    no_match: 'No artist matches “{q}”.',
    chart_eyebrow: 'At a glance',
    chart_lede:
      'Each bar is a lifetime. Hover or tap one to light up everyone that artist was connected to.',
    chart_hint: 'Swipe sideways to travel through time',
    see_in_gallery: 'See in gallery →',
    chart_idle: 'Hover or tap a bar.',
    map_eyebrow: 'Origins',
    map_lede:
      'Most of these painters were born within a few hundred kilometres of each other. Tap a marker to see who came from there.',
    europe: 'Europe',
    world: 'World',
    beyond_europe: 'Beyond Europe:',
    map_label: 'Map of artist birthplaces',
    map_extent: 'Map extent',
    by_country: 'By country of birth',
    area: '{place} area',
    footer_about:
      'A personal atlas of connections between painters. Relationships are simplified; “inspired by” marks documented admiration or clear stylistic debt.',
    footer_portraits_before: 'Portraits courtesy of',
    footer_portraits_after:
      '(public domain and Creative Commons licences; see each artist’s Wikipedia page for details).',
  },
  fr: {
    doc_title: 'Atelier · Un arbre généalogique de la peinture',
    lang_label: 'Langue',
    eyebrow: 'Un arbre généalogique de la peinture',
    lede: 'Sept siècles de peintres : qui a formé qui, qui a inspiré qui, et qui ne pouvait pas supporter qui.',
    stat_artists: 'artistes',
    stat_rooms: 'salles',
    stat_links: 'liens',
    cta: 'Entrer dans la galerie',
    hint: 'Touchez un nom pour rejoindre cet artiste.',
    nav_label: 'Salles de la galerie',
    find: 'Chercher',
    find_label: 'Trouver un artiste',
    timeline_short: 'Chronologie',
    timeline_long: 'Qui a vécu quand',
    map_short: 'Carte',
    map_long: 'Où ils sont nés',
    room_numeral: 'Salle {n}',
    room_movements: 'Mouvements de cette salle',
    room_swipe: '{n} artistes · faites glisser',
    known_for: 'Œuvre phare',
    more_wiki: 'En savoir plus sur Wikipédia ↗',
    story_with: 'Avec {name} :',
    back_to: '← Retour à {name}',
    dismiss: 'Fermer',
    portrait_alt: 'Portrait de {name}',
    search_placeholder: 'Nom, mouvement, pays ou tableau…',
    close: 'Fermer',
    no_match: 'Aucun artiste ne correspond à « {q} ».',
    chart_eyebrow: 'En un coup d’œil',
    chart_lede:
      'Chaque barre est une vie. Survolez ou touchez-en une pour éclairer tous les artistes qui lui sont liés.',
    chart_hint: 'Faites glisser pour voyager dans le temps',
    see_in_gallery: 'Voir dans la galerie →',
    chart_idle: 'Survolez ou touchez une barre.',
    map_eyebrow: 'Origines',
    map_lede:
      'La plupart de ces peintres sont nés à quelques centaines de kilomètres les uns des autres. Touchez un repère pour voir qui en venait.',
    europe: 'Europe',
    world: 'Monde',
    beyond_europe: 'Hors d’Europe :',
    map_label: 'Carte des lieux de naissance des artistes',
    map_extent: 'Étendue de la carte',
    by_country: 'Par pays de naissance',
    area: 'Région de {place}',
    footer_about:
      'Un atlas personnel des liens entre peintres. Les relations sont simplifiées ; « inspiré par » signale une admiration documentée ou une dette stylistique évidente.',
    footer_portraits_before: 'Portraits issus de',
    footer_portraits_after:
      '(domaine public et licences Creative Commons ; voir la page Wikipédia de chaque artiste pour le détail).',
  },
} as const

export type UiKey = keyof (typeof UI)['en']

const REL_EN: Record<RelKind, string> = {
  teachers: 'Trained by',
  students: 'Mentor to',
  partners: 'Partner of',
  collaborators: 'Worked with',
  modelled: 'Posed for',
  models: 'Painted',
  rivals: 'Rival of',
  friends: 'Friends with',
  influences: 'Inspired by',
  influenced: 'Inspired',
}

const REL_FR: Record<RelKind, [string, string]> = {
  teachers: ['Formé par', 'Formée par'],
  students: ['Mentor de', 'Mentor de'],
  partners: ['Compagnon de', 'Compagne de'],
  collaborators: ['A travaillé avec', 'A travaillé avec'],
  modelled: ['A posé pour', 'A posé pour'],
  models: ['A peint', 'A peint'],
  rivals: ['Rival de', 'Rivale de'],
  friends: ['Ami de', 'Amie de'],
  influences: ['Inspiré par', 'Inspirée par'],
  influenced: ['A inspiré', 'A inspiré'],
}

// French spacing: no-break space inside guillemets, narrow no-break space before : ; ? !
function frTypo(s: string) {
  return s
    .replace(/« /g, '«\u00a0')
    .replace(/ »/g, '\u00a0»')
    .replace(/ ([:;?!])/g, '\u202f$1')
}

function fill(s: string, vars?: Record<string, string | number>) {
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? '')) : s
}

export interface Text {
  lang: Lang
  t: (key: UiKey, vars?: Record<string, string | number>) => string
  name: (a: Artist) => string
  short: (a: Artist) => string
  blurb: (a: Artist) => string
  knownFor: (a: Artist) => string
  place: (birthplace: string) => string
  country: (country: string) => string
  movement: (movement: string) => string
  room: (r: Room) => { title: string; short: string; span: string; intro: string }
  rel: (kind: RelKind, a: Artist) => string
  story: (owner: string, about: string, fallback: string) => string
  wiki: (a: Artist) => string
  searchable: (a: Artist) => string
}

const ROOM_SHORT_EN: Record<string, string> = {
  renaissance: 'Renaissance',
  baroque: 'Baroque',
  revolution: 'Romanticism',
  modernlife: 'Impressionism',
  avantgarde: 'Avant-Garde',
  american: 'America',
}

const en: Text = {
  lang: 'en',
  t: (key, vars) => fill(UI.en[key], vars),
  name: (a) => a.name,
  short: (a) => a.short,
  blurb: (a) => a.blurb,
  knownFor: (a) => a.knownFor,
  place: (p) => p,
  country: (c) => c,
  movement: (m) => m,
  room: (r) => ({ title: r.title, short: ROOM_SHORT_EN[r.id], span: r.span, intro: r.intro }),
  rel: (kind) => REL_EN[kind],
  story: (_owner, _about, fallback) => fallback,
  wiki: (a) => `https://en.wikipedia.org/wiki/${encodeURIComponent(a.wiki.replace(/ /g, '_'))}`,
  searchable: (a) => [a.name, a.short, a.movement, a.country, a.birthplace, a.knownFor].join(' '),
}

const WIKI_FR = wikiFr as Record<string, string>

const fr: Text = {
  lang: 'fr',
  t: (key, vars) => frTypo(fill(UI.fr[key], vars)),
  name: (a) => FR_ARTISTS[a.id]?.name ?? a.name,
  short: (a) => FR_ARTISTS[a.id]?.short ?? a.short,
  blurb: (a) => frTypo(FR_ARTISTS[a.id]?.blurb ?? a.blurb),
  knownFor: (a) => frTypo(FR_ARTISTS[a.id]?.knownFor ?? a.knownFor),
  place: (p) => FR_PLACES[p] ?? p,
  country: (c) => FR_COUNTRIES[c] ?? c,
  movement: (m) => FR_MOVEMENTS[m] ?? m,
  room: (r) => FR_ROOMS[r.id],
  rel: (kind, a) => REL_FR[kind][FR_FEMALE.has(a.id) ? 1 : 0],
  story: (owner, about, fallback) => frTypo(FR_ARTISTS[owner]?.notes?.[about] ?? fallback),
  wiki: (a) =>
    WIKI_FR[a.id]
      ? `https://fr.wikipedia.org/wiki/${encodeURIComponent(WIKI_FR[a.id].replace(/ /g, '_'))}`
      : en.wiki(a),
  searchable: (a) =>
    [
      en.searchable(a),
      fr.name(a),
      fr.short(a),
      fr.movement(a.movement),
      fr.country(a.country),
      fr.place(a.birthplace),
      fr.knownFor(a),
    ].join(' '),
}

const TEXTS: Record<Lang, Text> = { en, fr }
const STORAGE_KEY = 'atelier-lang'

function initialLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param === 'en' || param === 'fr') return param
  try {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('lineage-lang')
    if (saved === 'en' || saved === 'fr') return saved
  } catch {
    // storage can be unavailable in private mode
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  tx: Text
}

const I18nContext = createContext<I18nValue>({ lang: 'en', setLang: () => {}, tx: en })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next)
      window.history.replaceState(null, '', url)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = TEXTS[lang].t('doc_title')
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, tx: TEXTS[lang] }), [lang, setLang])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

if (import.meta.env?.DEV) {
  void import('../data/artists').then(({ artists }) => {
    for (const a of artists) {
      const f = FR_ARTISTS[a.id]
      if (!f) console.warn(`[atelier] missing French text for ${a.id}`)
      for (const other of Object.keys(a.notes ?? {})) {
        if (!f?.notes?.[other]) console.warn(`[atelier] missing French note ${a.id} → ${other}`)
      }
      if (!FR_MOVEMENTS[a.movement]) console.warn(`[atelier] missing French movement ${a.movement}`)
      if (!FR_COUNTRIES[a.country]) console.warn(`[atelier] missing French country ${a.country}`)
    }
  })
}
