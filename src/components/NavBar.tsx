import { useEffect, useRef, useState } from 'react'
import { rooms } from '../data/rooms'

interface NavBarProps {
  onSearch: () => void
}

const SHORT: Record<string, string> = {
  renaissance: 'Renaissance',
  baroque: 'Baroque',
  revolution: 'Romanticism',
  modernlife: 'Impressionism',
  avantgarde: 'Avant-Garde',
  american: 'America',
}

const LINKS = [
  ...rooms.map((r) => ({ id: `room-${r.id}`, label: r.title, short: SHORT[r.id] })),
  { id: 'lifespans', label: 'Who lived when', short: 'Timeline' },
  { id: 'birthplaces', label: 'Where they were born', short: 'Map' },
]

export function NavBar({ onSearch }: NavBarProps) {
  const [active, setActive] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const hero = document.getElementById('top')
    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-60px 0px 0px 0px' },
    )
    if (hero) heroObserver.observe(hero)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const link of LINKS) {
      const el = document.getElementById(link.id)
      if (el) sectionObserver.observe(el)
    }
    return () => {
      heroObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-target="${active}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  return (
    <nav className={`nav${visible ? ' nav--visible' : ''}`} aria-label="Gallery rooms">
      <a className="nav__brand" href="#top">
        Lineage
      </a>
      <ul className="nav__links" ref={listRef}>
        {LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              data-target={link.id}
              className={active === link.id ? 'is-active' : undefined}
              title={link.label}
            >
              <span className="nav__short">{link.short}</span>
              <span className="nav__long">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="nav__search" onClick={onSearch} aria-label="Find an artist">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>Find</span>
      </button>
    </nav>
  )
}
