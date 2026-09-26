import { motion } from 'framer-motion'
import { artists, pairCount } from '../data/graph'
import { Portrait } from './Portrait'

const SALON = [
  'rembrandt',
  'leonardo',
  'kahlo',
  'van-gogh',
  'durer',
  'artemisia',
  'monet',
  'velazquez',
  'raphael',
  'cassatt',
  'goya',
  'titian',
  'morisot',
  'caravaggio',
  'picasso',
  'vermeer',
  'degas',
  'rubens',
  'hokusai',
  'schiele',
  'cezanne',
  'turner',
  'klimt',
  'botticelli',
  'manet',
  'van-dyck',
  'gauguin',
  'michelangelo',
  'renoir',
  'ingres',
  'munch',
  'el-greco',
  'toulouse',
  'delacroix',
  'modigliani',
  'reynolds',
  'courbet',
  'friedrich',
  'bosch',
  'seurat',
]

export function Hero() {
  const hang = SALON.map((id) => artists.find((a) => a.id === id)!).filter(Boolean)

  return (
    <header className="hero" id="top">
      <div className="hero__wall" aria-hidden="true">
        {hang.map((a, i) => (
          <motion.div
            key={a.id}
            className={`hero__piece hero__piece--${i % 5}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            <Portrait id={a.id} name={a.name} size="hero" eager={i < 10} />
          </motion.div>
        ))}
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <motion.div
        className="hero__plaque"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero__eyebrow">A family tree of painting</p>
        <h1 className="hero__title">Lineage</h1>
        <p className="hero__lede">
          Seven centuries of painters: who taught whom, who inspired whom, and who
          couldn’t stand each other.
        </p>
        <p className="hero__stats">
          <span>
            <strong>{artists.length}</strong> artists
          </span>
          <span>
            <strong>6</strong> rooms
          </span>
          <span>
            <strong>{pairCount}</strong> connections
          </span>
        </p>
        <a className="hero__cta" href="#room-renaissance">
          Enter the gallery
        </a>
        <p className="hero__hint">Tap any name to jump to that artist.</p>
      </motion.div>
    </header>
  )
}
