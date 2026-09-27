// Looks up each artist's French Wikipedia article through interlanguage links
// and writes src/data/wiki-fr.json ({ id: "French title" }).
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const source = await readFile(path.join(root, 'src/data/artists.ts'), 'utf8')
const entries = [...source.matchAll(/id: '([^']+)',[\s\S]*?wiki: (['"])(.+?)\2,/g)].map((m) => ({
  id: m[1],
  wiki: m[3],
}))

const UA = 'LineageArtAtlas/1.0 (https://github.com/knalpas/lineage)'
const result = {}

for (let i = 0; i < entries.length; i += 40) {
  const batch = entries.slice(i, i + 40)
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&lllang=fr&lllimit=max&redirects=1&titles=' +
    encodeURIComponent(batch.map((e) => e.wiki).join('|'))
  const data = await (await fetch(url, { headers: { 'User-Agent': UA } })).json()
  const resolve = new Map()
  for (const n of data.query.normalized ?? []) resolve.set(n.from, n.to)
  for (const r of data.query.redirects ?? []) resolve.set(r.from, r.to)
  const byTitle = new Map(Object.values(data.query.pages).map((p) => [p.title, p]))
  for (const { id, wiki } of batch) {
    let title = wiki
    while (resolve.has(title)) title = resolve.get(title)
    const fr = byTitle.get(title)?.langlinks?.[0]?.['*']
    if (fr) result[id] = fr
    else console.log(`✗ ${id}: no French article`)
  }
}

await writeFile(path.join(root, 'src/data/wiki-fr.json'), JSON.stringify(result, null, 2) + '\n')
console.log(`${Object.keys(result).length}/${entries.length} French titles`)
