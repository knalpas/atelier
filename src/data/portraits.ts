import raw from './portraits.json'

interface PortraitMeta {
  src: string
  file: string
  title: string
  license: string
}

const portraits = raw as Record<string, PortraitMeta>

export function portraitOf(id: string) {
  const meta = portraits[id]
  if (!meta) return null
  return { ...meta, url: `${import.meta.env.BASE_URL}${meta.src}` }
}
