import { createI18n } from 'vue-i18n'
import en from './en'

export const locales = {
  en,
}

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales,
})
