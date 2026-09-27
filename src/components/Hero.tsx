import { motion } from 'framer-motion'
import { artists, pairCount } from '../data/graph'
import { Portrait } from './Portrait'
import { LangToggle } from './LangToggle'
import { useI18n } from '../lib/i18n'

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
  'valadon',
  'courbet',
  'friedrich',
  'holbein',
  'seurat',
]

export function Hero() {
  const { tx } = useI18n()
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
            <Portrait id={a.id} name={tx.name(a)} size="hero" eager={i < 10} />
          </motion.div>
        ))}
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <LangToggle className="lang--hero" />

      <motion.div
        className="hero__plaque"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero__eyebrow">{tx.t('eyebrow')}</p>
        <h1 className="hero__title">Lineage</h1>
        <p className="hero__lede">{tx.t('lede')}</p>
        <p className="hero__stats">
          <span>
            <strong>{artists.length}</strong> {tx.t('stat_artists')}
          </span>
          <span>
            <strong>6</strong> {tx.t('stat_rooms')}
          </span>
          <span>
            <strong>{pairCount}</strong> {tx.t('stat_links')}
          </span>
        </p>
        <a className="hero__cta" href="#room-renaissance">
          {tx.t('cta')}
        </a>
        <p className="hero__hint">{tx.t('hint')}</p>
      </motion.div>
    </header>
  )
}
