export type ConnectionType =
  | 'mentor'
  | 'influence'
  | 'collaborator'
  | 'rival'
  | 'friend'
  | 'circle'

export interface Connection {
  to: string
  type: ConnectionType
  note?: string
}

export interface Artist {
  id: string
  name: string
  years: [number, number]
  birthplace: string
  country: string
  movement: string
  summary: string
  connections: Connection[]
}

export const CONNECTION_LABELS: Record<ConnectionType, string> = {
  mentor: 'Mentorship',
  influence: 'Influence',
  collaborator: 'Collaboration',
  rival: 'Rivalry',
  friend: 'Friendship',
  circle: 'Shared circle',
}
