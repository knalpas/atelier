import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Always open at the top of the page (with the language switch in view), even on refresh.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
window.scrollTo({ top: 0, behavior: 'instant' })

// In-page links scroll without writing #section into the address bar.
document.addEventListener('click', (e) => {
  const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
  if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return
  const id = link.getAttribute('href')!.slice(1)
  e.preventDefault()
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
