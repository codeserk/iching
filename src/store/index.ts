import { createStore } from 'vuex'

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
})
