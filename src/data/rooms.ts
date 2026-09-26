import type { Room } from '../types'

export const rooms: Room[] = [
  {
    id: 'renaissance',
    numeral: 'I',
    title: 'The Renaissance',
    span: 'c. 1300 – 1600',
    intro:
      'Florence, Venice and Flanders rediscover space, the body and oil paint. Workshops pass skills from master to apprentice.',
    movements: [
      'Proto-Renaissance',
      'Early Renaissance',
      'Northern Renaissance',
      'High Renaissance',
      'Venetian Renaissance',
      'Mannerism',
    ],
    wall: '#26362d',
    ink: '#f1e8d4',
    muted: 'rgba(241, 232, 212, 0.68)',
    accent: '#d2ae62',
    chart: '#3d5a47',
  },
  {
    id: 'baroque',
    numeral: 'II',
    title: 'Baroque & the Golden Age',
    span: 'c. 1590 – 1700',
    intro:
      'Caravaggio’s dramatic light spreads across Europe, from Rome to Madrid, Antwerp and the Dutch Republic.',
    movements: ['Baroque', 'Dutch Golden Age'],
    wall: '#4b1b1d',
    ink: '#f3e6d1',
    muted: 'rgba(243, 230, 209, 0.68)',
    accent: '#dcb065',
    chart: '#7d2b2e',
  },
  {
    id: 'revolution',
    numeral: 'III',
    title: 'Revolution & Romance',
    span: 'c. 1720 – 1860',
    intro:
      'Academies, revolutions and storms. Neoclassical line against Romantic colour, and the first Realists turn to ordinary life.',
    movements: ['Rococo', 'Neoclassicism', 'Romanticism', 'Ukiyo-e', 'Realism'],
    wall: '#1c2940',
    ink: '#ece4d4',
    muted: 'rgba(236, 228, 212, 0.68)',
    accent: '#cfae6c',
    chart: '#2f4668',
  },
  {
    id: 'modernlife',
    numeral: 'IV',
    title: 'Light & Modern Life',
    span: 'c. 1860 – 1905',
    intro:
      'In Paris, a close-knit band of friends paints outdoors and exhibits on its own terms. Their students push colour further still.',
    movements: ['Impressionism', 'Neo-Impressionism', 'Post-Impressionism'],
    wall: '#d3dbd5',
    ink: '#1e2926',
    muted: 'rgba(30, 41, 38, 0.66)',
    accent: '#8a5a1f',
    chart: '#5f8479',
  },
  {
    id: 'avantgarde',
    numeral: 'V',
    title: 'The Avant-Garde',
    span: 'c. 1900 – 1945',
    intro:
      'Vienna, Paris, Munich and Mexico City. Movements multiply, with manifestos, cafés and rivalries.',
    movements: [
      'Symbolism',
      'Expressionism',
      'Fauvism',
      'Cubism',
      'Der Blaue Reiter',
      'De Stijl',
      'Dada',
      'Surrealism',
      'School of Paris',
      'Mexican Modernism',
      'Kinetic Art',
    ],
    wall: '#efe9dc',
    ink: '#1d1a16',
    muted: 'rgba(29, 26, 22, 0.64)',
    accent: '#b3372b',
    chart: '#b3372b',
  },
  {
    id: 'american',
    numeral: 'VI',
    title: 'The American Century',
    span: 'c. 1920 – 1990',
    intro:
      'After the war the centre of gravity shifts to New York. Abstraction, then Pop, then the street.',
    movements: [
      'American Modernism',
      'American Realism',
      'Abstract Expressionism',
      'Pop Art',
      'Neo-Expressionism',
    ],
    wall: '#1b1b1e',
    ink: '#eeece6',
    muted: 'rgba(238, 236, 230, 0.66)',
    accent: '#e2b14c',
    chart: '#303036',
  },
]

const roomByMovement = new Map<string, Room>()
for (const room of rooms) {
  for (const movement of room.movements) roomByMovement.set(movement, room)
}

export function roomOf(movement: string): Room {
  const room = roomByMovement.get(movement)
  if (!room) throw new Error(`No room for movement "${movement}"`)
  return room
}
