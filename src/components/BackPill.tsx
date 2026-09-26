import { AnimatePresence, motion } from 'framer-motion'
import { byId } from '../data/graph'
import { useNavigation } from '../lib/navigation'

export function BackPill() {
  const { backTo, goBack, dismissBack } = useNavigation()
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
            ← Back to {artist.short}
          </button>
          <button type="button" className="backpill__x" onClick={dismissBack} aria-label="Dismiss">
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
