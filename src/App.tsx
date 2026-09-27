import { useCallback, useState } from 'react'
import { artists } from './data/graph'
import { rooms } from './data/rooms'
import { NavigationProvider } from './lib/navigation'
import { I18nProvider, useI18n } from './lib/i18n'
import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'
import { RoomSection } from './components/RoomSection'
import { LifespanChart } from './components/LifespanChart'
import { BirthMap } from './components/BirthMap'
import { SearchOverlay } from './components/SearchOverlay'
import { BackPill } from './components/BackPill'

export default function App() {
  return (
    <I18nProvider>
      <Gallery />
    </I18nProvider>
  )
}

function Gallery() {
  const { tx } = useI18n()
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
        <p className="footer__title">Atelier</p>
        <p>{tx.t('footer_about')}</p>
        <p>
          {tx.t('footer_portraits_before')}{' '}
          <a href="https://commons.wikimedia.org" target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>{' '}
          {tx.t('footer_portraits_after')}
        </p>
      </footer>

      <BackPill />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </NavigationProvider>
  )
}
