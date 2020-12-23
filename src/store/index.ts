import { createStore } from 'vuex'
import hexagrams from './hexagrams'
import config from './config'

export const store = createStore({
  modules: {
    hexagrams,
    config,
  },
})
