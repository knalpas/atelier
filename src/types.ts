export type RoomId =
  | 'renaissance'
  | 'baroque'
  | 'revolution'
  | 'modernlife'
  | 'avantgarde'
  | 'american'

export interface Artist {
  id: string
  name: string
  short: string
  wiki: string
  born: number
  died: number
  birthplace: string
  country: string
  lat: number
  lon: number
  movement: string
  knownFor: string
  blurb: string
  teachers?: string[]
  influences?: string[]
  friends?: string[]
  rivals?: string[]
  collaborators?: string[]
  partners?: string[]
  modelled?: string[]
  notes?: Record<string, string>
}

export interface Room {
  id: RoomId
  numeral: string
  title: string
  span: string
  intro: string
  movements: string[]
  wall: string
  ink: string
  muted: string
  accent: string
  chart: string
}
