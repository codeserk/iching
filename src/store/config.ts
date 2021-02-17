import { Storage } from '@capacitor/core'
import { AVAILABLE_LANGUAGES, Config } from '../interfaces/config.interface'
import { Plugins } from '@capacitor/core'
import { i18n } from '../locales'

const { Device } = Plugins

export interface State {
  configKeys: Record<string, any>
}

export default {
  state: (): State => ({
    configKeys: {
      // Introduction
      'introduction.seen': false,
      'rate.asked': false,

      // Language
      'language;': 'en',

      // Display
      'display.name.chinese': true,
      'display.name.pinyin': true,
      'display.name.description': true,

      'display.trigrams': true,

      'display.judgement.quote': true,
      'display.judgement.description': true,

      'display.images.quote': true,
      'display.images.description': true,

      'display.mutations.quote': true,
      'display.mutations.description': true,

      // Journal
      'journal.confirm-deletion': true,
    },
  }),

  getters: {
    /**
     * Gets a config value by its key.
     */
    configKey: (state: State) => (key: string): any => state.configKeys[key],

    /**
     * Gets the whole config.
     */
    config: (state: State, getters: any): Config => ({
      introduction: {
        seen: getters.configKey('introduction.seen'),
      },

      language: getters.configKey('language'),

      display: {
        name: {
          chinese: getters.configKey('display.name.chinese'),
          pinyin: getters.configKey('display.name.pinyin'),
          description: getters.configKey('display.name.description'),
        },

        trigrams: getters.configKey('display.trigrams'),

        judgement: {
          quote: getters.configKey('display.judgement.quote'),
          description: getters.configKey('display.judgement.description'),
        },

        images: {
          quote: getters.configKey('display.images.quote'),
          description: getters.configKey('display.images.description'),
        },

        mutations: {
          quote: getters.configKey('display.mutations.quote'),
          description: getters.configKey('display.mutations.description'),
        },
      },

      journal: {
        confirmDeletion: getters.configKey('journal.confirm-deletion'),
      },
    }),
  },

  mutations: {
    /**
     * Updates a config value
     *
     * @param state
     * @param param1
     */
    updateKey(state: State, { key, value }: any) {
      state.configKeys[key] = value
    },
  },

  actions: {
    /**
     * Loads the saved configuration.
     *
     * @param param0
     */
    async loadConfig({ commit, dispatch }: any) {
      try {
        const resultsJson = await Storage.get({ key: 'config' })
        const config = JSON.parse(resultsJson.value)

        if (config) {
          for (const key in config) {
            commit('updateKey', { key, value: config[key] })
          }
        }

        // Get device lang
        if (!config?.language) {
          const { value: language } = await Device.getLanguageCode()
          if (AVAILABLE_LANGUAGES.includes(language)) {
            await dispatch('updateLanguage', language)
          } else {
            await dispatch('updateLanguage', 'en')
          }
        } else {
          i18n.global.locale = config.language
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * Updates a config value
     *
     * @param param0
     * @param param1
     */
    async updateKey({ commit, dispatch }: any, { key, value }: any) {
      commit('updateKey', { key, value })

      await dispatch('saveConfig')
    },

    async updateLanguage({ dispatch }: any, language: string) {
      i18n.global.locale = language

      await dispatch('updateKey', { key: 'language', value: language })
    },

    /**
     * Saves the configuration.
     *
     * @param param0
     */
    async saveConfig({ state }: any) {
      await Storage.set({ key: 'config', value: JSON.stringify(state.configKeys) })
    },
  },
}
