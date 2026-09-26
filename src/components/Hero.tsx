import { motion } from 'framer-motion'

interface HeroProps {
  onExplore: () => void
}

const NODES = [
  { x: 8, y: 28 },
  { x: 18, y: 52 },
  { x: 28, y: 22 },
  { x: 36, y: 62 },
  { x: 48, y: 34 },
  { x: 58, y: 18 },
  { x: 62, y: 55 },
  { x: 74, y: 30 },
  { x: 82, y: 48 },
  { x: 90, y: 24 },
  { x: 42, y: 78 },
  { x: 70, y: 72 },
]

const EDGES: [number, number][] = [
  [0, 2],
  [0, 1],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 7],
  [6, 8],
  [7, 9],
  [3, 10],
  [6, 11],
  [8, 11],
  [7, 8],
]

export function Hero({ onExplore }: HeroProps) {
  return (
    <header className="hero">
      <motion.div
        className="hero-stage"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroWash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(11,107,110,0.35)" />
              <stop offset="55%" stopColor="rgba(31,79,143,0.22)" />
              <stop offset="100%" stopColor="rgba(181,74,42,0.18)" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#heroWash)" opacity="0.45" />
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`${a}-${b}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#14181c"
              strokeWidth="0.18"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.04 }}
            />
          ))}
          {NODES.map((node, i) => (
            <motion.circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              fill={i === 4 ? '#b54a2a' : '#0b6b6e'}
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: i % 3 === 0 ? 1.1 : 0.75, opacity: 0.85 }}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.04 }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.p
        className="hero-brand"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        LINE<span>AGE</span>
      </motion.p>

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Who shaped whom across centuries of paint</h2>
        <p>
          Trace movements, birthplaces, lifespans, and the mentors, rivals, and
          friendships that stitched art history together.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={onExplore}>
            Explore the atlas
          </button>
          <a className="btn btn-ghost" href="#timeline">
            Browse by era
          </a>
        </div>
      </motion.div>
    </header>
  )
}
