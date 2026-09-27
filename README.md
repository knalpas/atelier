# Lineage

A museum-style family tree of painting: 94 artists from Giotto to Basquiat, arranged in six gallery rooms, each with its own wall colour.

**Live site:** https://knalpas.github.io/lineage/

Every artist card shows:

- their **movement**, **lifespan** and **birthplace**
- a small timeline bar placing their life across seven centuries
- who **trained** them, whom they **mentored**, their **partners**, **collaborators**, **friends** and **rivals**, and who they **inspired** or were **inspired by**
- short stories behind the key relationships

Tap any name to jump to that artist. A "Back to…" button returns you to where you were.

Two overview sections follow the rooms:

- **Who lived when**: every lifetime on one chart. Hover or tap a bar to light up that artist's connections.
- **Where they were born**: a map of Europe and the world, plus a list by country.

On phones, each room becomes a swipeable carousel.

The whole site is available in **English and French**. Use the EN/FR switch; the choice is remembered, and `?lang=fr` links straight to the French version.

## Develop

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch.

## Data

- Artists and relationships: `src/data/artists.ts` (relationships are stored one way; the reverse links are derived automatically)
- Rooms and palettes: `src/data/rooms.ts`
- French text (names, blurbs, stories, movements, places): `src/data/fr.ts`. Every artist and story needs a French entry; the dev server warns about gaps
- French Wikipedia titles: `node scripts/fetch-fr-titles.mjs` writes `src/data/wiki-fr.json`
- Portraits: `npm run portraits` downloads each artist's lead image from Wikimedia Commons (public domain or Creative Commons) and converts it to WebP
