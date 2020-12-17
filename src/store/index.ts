import { createStore } from 'vuex'
import hexagrams from './hexagrams'
import config from './config'

export const store = createStore({
  state() {
    return {
      count: 10,
    }
  },
  getters: {
    count: (state: any): number => state.count,
  },
  mutations: {
    increment(state: any) {
      state.count++
    },
  },

  modules: {
    hexagrams,
    config,
  },
})
