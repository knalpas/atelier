import { AnimatePresence, motion } from 'framer-motion'
import { byId } from '../data/graph'
import { useNavigation } from '../lib/navigation'
import { useI18n } from '../lib/i18n'

export function BackPill() {
  const { backTo, goBack, dismissBack } = useNavigation()
  const { tx } = useI18n()
  const artist = backTo ? byId.get(backTo) : null

  return (
    <AnimatePresence>
      {artist && (
        <motion.div
          className="backpill"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button type="button" className="backpill__go" onClick={goBack}>
            {tx.t('back_to', { name: tx.short(artist) })}
          </button>
          <button type="button" className="backpill__x" onClick={dismissBack} aria-label={tx.t('dismiss')}>
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
