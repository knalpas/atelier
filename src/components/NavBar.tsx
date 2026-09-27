import { useEffect, useRef, useState } from 'react'
import { rooms } from '../data/rooms'
import { useI18n } from '../lib/i18n'
import { LangToggle } from './LangToggle'

interface NavBarProps {
  onSearch: () => void
}

const LINK_IDS = [...rooms.map((r) => `room-${r.id}`), 'lifespans', 'birthplaces']

export function NavBar({ onSearch }: NavBarProps) {
  const [active, setActive] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const { tx } = useI18n()
  const links = [
    ...rooms.map((r) => ({ id: `room-${r.id}`, label: tx.room(r).title, short: tx.room(r).short })),
    { id: 'lifespans', label: tx.t('timeline_long'), short: tx.t('timeline_short') },
    { id: 'birthplaces', label: tx.t('map_long'), short: tx.t('map_short') },
  ]

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
    for (const id of LINK_IDS) {
      const el = document.getElementById(id)
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
    <nav className={`nav${visible ? ' nav--visible' : ''}`} aria-label={tx.t('nav_label')}>
      <a className="nav__brand" href="#top">
        Atelier
      </a>
      <ul className="nav__links" ref={listRef}>
        {links.map((link) => (
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
      <LangToggle className="lang--nav" />
      <button
        type="button"
        className="nav__search"
        onClick={onSearch}
        aria-label={tx.t('find_label')}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>{tx.t('find')}</span>
      </button>
    </nav>
  )
}
