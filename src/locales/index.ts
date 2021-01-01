import { createI18n } from 'vue-i18n'
import en from './en'
import es from './es'

export const locales = {
  en,
  es,
}

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales,
})
