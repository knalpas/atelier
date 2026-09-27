// Downloads each artist's lead image from Wikipedia (Commons-hosted files only)
// into public/portraits and writes src/data/portraits.json with attribution links.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const source = await readFile(path.join(root, 'src/data/artists.ts'), 'utf8')
const overrides = JSON.parse(
  await readFile(path.join(root, 'scripts/portrait-overrides.json'), 'utf8').catch(() => '{}'),
)

const entries = [...source.matchAll(/id: '([^']+)',[\s\S]*?wiki: (['"])(.+?)\2,/g)].map((m) => ({
  id: m[1],
  wiki: m[3],
}))

const UA = 'AtelierArtAtlas/1.0 (https://github.com/knalpas/atelier)'
const outDir = path.join(root, 'public/portraits')
await mkdir(outDir, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function get(url, as = 'json') {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) return as === 'json' ? res.json() : Buffer.from(await res.arrayBuffer())
    if (res.status === 429 || res.status >= 500) {
      await sleep(1500 * (attempt + 1))
      continue
    }
    throw new Error(`${res.status} ${url}`)
  }
  throw new Error(`gave up ${url}`)
}

async function commonsThumb(fileTitle, width) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    'File:' + fileTitle,
  )}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}&format=json&origin=*`
  const data = await get(api)
  const page = Object.values(data.query.pages)[0]
  const info = page?.imageinfo?.[0]
  if (!info) return null
  const meta = info.extmetadata ?? {}
  return {
    url: info.thumburl ?? info.url,
    file: info.descriptionurl,
    license: meta.LicenseShortName?.value ?? '',
    artist: (meta.Artist?.value ?? '').replace(/<[^>]+>/g, '').trim(),
  }
}

const portraitsJson = path.join(root, 'src/data/portraits.json')
const existing = JSON.parse(await readFile(portraitsJson, 'utf8').catch(() => '{}'))

const result = {}
for (const { id, wiki } of entries) {
  if (existing[id] && existsSync(path.join(root, 'public', existing[id].src))) {
    result[id] = existing[id]
    continue
  }
  try {
    let fileTitle = overrides[id]
    if (!fileTitle) {
      const summary = await get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki.replace(/ /g, '_'))}`,
      )
      const original = summary.originalimage?.source ?? ''
      if (!original.includes('/wikipedia/commons/')) {
        console.log(`✗ ${id}: no Commons lead image`)
        continue
      }
      const parts = original.split('?')[0].split('/')
      const thumbIdx = parts.indexOf('thumb')
      fileTitle = decodeURIComponent(thumbIdx >= 0 ? parts[thumbIdx + 3] : parts.at(-1))
    }
    const thumb = await commonsThumb(fileTitle, 500)
    if (!thumb) {
      console.log(`✗ ${id}: no imageinfo for ${fileTitle}`)
      continue
    }
    const ext = (thumb.url.split('?')[0].split('.').pop() || 'jpg').toLowerCase()
    const name = `${id}.${ext === 'jpeg' ? 'jpg' : ext}`
    const dest = path.join(outDir, name)
    if (!existsSync(dest)) {
      const buf = await get(thumb.url, 'buffer')
      await writeFile(dest, buf)
    }
    result[id] = {
      src: `portraits/${name}`,
      file: thumb.file,
      title: fileTitle,
      license: thumb.license,
    }
    console.log(`✓ ${id}: ${fileTitle} [${thumb.license}]`)
    await sleep(250)
  } catch (err) {
    console.log(`✗ ${id}: ${err.message}`)
  }
}

await writeFile(portraitsJson, JSON.stringify(result, null, 2) + '\n')
console.log(`\n${Object.keys(result).length}/${entries.length} portraits saved`)
