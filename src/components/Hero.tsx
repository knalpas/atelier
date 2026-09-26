import { motion } from 'framer-motion'

interface HeroProps {
  onExplore: () => void
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <header className="hero">
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

      <motion.div
        className="hero-visual"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="hero-orb hero-orb-a"
          animate={{ x: [0, 12, -6, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb hero-orb-b"
          animate={{ x: [0, -14, 8, 0], y: [0, 12, -8, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb hero-orb-c"
          animate={{ scale: [1, 1.12, 0.94, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </header>
  )
}
