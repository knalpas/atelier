import { useI18n } from '../lib/i18n'
import type { Lang } from '../lib/i18n'

const OPTIONS: { lang: Lang; label: string; title: string }[] = [
  { lang: 'en', label: 'EN', title: 'English' },
  { lang: 'fr', label: 'FR', title: 'Français' },
]

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, tx } = useI18n()
  return (
    <div className={`lang ${className}`} role="group" aria-label={tx.t('lang_label')}>
      {OPTIONS.map((o) => (
        <button
          key={o.lang}
          type="button"
          lang={o.lang}
          title={o.title}
          aria-pressed={lang === o.lang}
          className={lang === o.lang ? 'is-active' : undefined}
          onClick={() => setLang(o.lang)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
