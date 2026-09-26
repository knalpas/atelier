import { useCallback, useState } from 'react'
import { artists } from './data/graph'
import { rooms } from './data/rooms'
import { NavigationProvider } from './lib/navigation'
import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'
import { RoomSection } from './components/RoomSection'
import { LifespanChart } from './components/LifespanChart'
import { BirthMap } from './components/BirthMap'
import { SearchOverlay } from './components/SearchOverlay'
import { BackPill } from './components/BackPill'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  return (
    <NavigationProvider>
      <NavBar onSearch={() => setSearchOpen(true)} />
      <Hero />

      <main>
        {rooms.map((room) => (
          <RoomSection
            key={room.id}
            room={room}
            artists={artists.filter((a) => a.room.id === room.id)}
          />
        ))}
        <LifespanChart />
        <BirthMap />
      </main>

      <footer className="footer">
        <p className="footer__title">Lineage</p>
        <p>
          A personal atlas of connections between painters. Relationships are simplified;
          “inspired by” marks documented admiration or clear stylistic debt.
        </p>
        <p>
          Portraits courtesy of{' '}
          <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>{' '}
          (public domain and Creative Commons licences; see each artist’s Wikipedia page for
          details).
        </p>
      </footer>

      <BackPill />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </NavigationProvider>
  )
}
