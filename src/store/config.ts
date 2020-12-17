import { Storage } from '@capacitor/core'
import { Config } from '../interfaces/config.interface'

export interface State {
  configKeys: Record<string, any>
}

export default {
  state: (): State => ({
    configKeys: {
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
    },
  }),

  getters: {
    configKey: (state: State) => (key: string): any => state.configKeys[key],

    config: (state: State, getters: any): Config => ({
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
    }),
  },

  mutations: {
    updateKey(state: State, { key, value }: any) {
      state.configKeys[key] = value
    },
  },

  actions: {
    async loadConfig({ commit }: any) {
      try {
        const resultsJson = await Storage.get({ key: 'config' })
        console.log(resultsJson)
        const config = JSON.parse(resultsJson.value)
        console.log(config)

        if (config) {
          for (const key in config) {
            commit('updateKey', { key, value: config[key] })
          }
        }
      } catch (error) {
        console.error(error)
      }
    },

    updateKey({ commit, dispatch }: any, { key, value }: any) {
      commit('updateKey', { key, value })

      dispatch('saveConfig')
    },

    async saveConfig({ state }: any) {
      await Storage.set({ key: 'config', value: JSON.stringify(state.configKeys) })
    },
  },
}
