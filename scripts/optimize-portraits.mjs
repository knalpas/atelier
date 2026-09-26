// Resizes portraits to 480px wide WebP and rewrites portraits.json paths.
import sharp from 'sharp'
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const dir = path.join(root, 'public/portraits')
const jsonPath = path.join(root, 'src/data/portraits.json')
const meta = JSON.parse(await readFile(jsonPath, 'utf8'))

for (const file of await readdir(dir)) {
  if (file.endsWith('.webp')) continue
  const id = file.replace(/\.[^.]+$/, '')
  const src = path.join(dir, file)
  await sharp(src).resize({ width: 480, withoutEnlargement: true }).flatten({ background: '#e9dfc9' }).webp({ quality: 78 }).toFile(path.join(dir, `${id}.webp`))
  await unlink(src)
  if (meta[id]) meta[id].src = `portraits/${id}.webp`
}
await writeFile(jsonPath, JSON.stringify(meta, null, 2) + '\n')
console.log('optimized')
