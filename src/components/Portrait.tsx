import { useState } from 'react'
import { portraitOf } from '../data/portraits'

interface PortraitProps {
  id: string
  name: string
  size?: 'hero' | 'card' | 'thumb'
  eager?: boolean
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

export function Portrait({ id, name, size = 'card', eager = false }: PortraitProps) {
  const portrait = portraitOf(id)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`frame frame--${size}`}>
      <div className="frame__inner">
        {portrait && !failed ? (
          <img
            src={portrait.url}
            alt={`Portrait of ${name}`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="frame__monogram" aria-hidden="true">
            {initials(name)}
          </div>
        )}
      </div>
    </div>
  )
}
