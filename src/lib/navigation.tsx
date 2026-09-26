import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface NavState {
  highlighted: string | null
  backTo: string | null
  jumpTo: (id: string, from?: string) => void
  goBack: () => void
  dismissBack: () => void
}

const NavContext = createContext<NavState | null>(null)

function scrollToCard(id: string) {
  const el = document.getElementById(`artist-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const [backTo, setBackTo] = useState<string | null>(null)
  const highlightTimer = useRef<number | undefined>(undefined)
  const backTimer = useRef<number | undefined>(undefined)

  const flash = useCallback((id: string) => {
    window.clearTimeout(highlightTimer.current)
    setHighlighted(id)
    highlightTimer.current = window.setTimeout(() => setHighlighted(null), 2400)
  }, [])

  const jumpTo = useCallback(
    (id: string, from?: string) => {
      scrollToCard(id)
      flash(id)
      window.clearTimeout(backTimer.current)
      if (from && from !== id) {
        setBackTo(from)
        backTimer.current = window.setTimeout(() => setBackTo(null), 12000)
      } else {
        setBackTo(null)
      }
    },
    [flash],
  )

  const goBack = useCallback(() => {
    if (!backTo) return
    scrollToCard(backTo)
    flash(backTo)
    setBackTo(null)
  }, [backTo, flash])

  const dismissBack = useCallback(() => setBackTo(null), [])

  const value = useMemo(
    () => ({ highlighted, backTo, jumpTo, goBack, dismissBack }),
    [highlighted, backTo, jumpTo, goBack, dismissBack],
  )

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

export function useNavigation() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNavigation must be used inside NavigationProvider')
  return ctx
}
