import { HexagramDetails, HexagramDictionary } from '../../interfaces/hexagram-details.interface'
import { Storage } from '@capacitor/core'

import hexagrams from './hexagrams'
import { OracleResult } from '../../interfaces/oracle-result.interface'
import { Hexagram, HexagramLine, HexagramLineValue } from '../../models/hexagram'

interface State {
  dictionary: HexagramDictionary
  results: Record<string, OracleResult>
}

export default {
  state: (): State => ({
    dictionary: hexagrams,
    results: {},
  }),

  getters: {
    getHexagramDetails: (state: State) => (num: number): HexagramDetails => {
      return state.dictionary[num]
    },

    results: (state: State) =>
      Object.values(state.results).sort(
        (resultA, resultB) => resultB.createdAt.getTime() - resultA.createdAt.getTime(),
      ),
    resultById: (state: State) => (id: string): OracleResult | undefined => state.results[id],
  },

  mutations: {
    addResult(state: State, { id, question, hexagram, createdAt }: any) {
      const date = createdAt ? new Date(createdAt) : new Date()
      if (!id) {
        id = date.getTime().toString()
      }
      if (!question) {
        question = `Question from ${date.toLocaleString()}`
      }
      const newResult = {
        id,
        question,
        hexagram,
        createdAt: date,
      }

      state.results[id] = newResult

      return newResult
    },

    removeResult(state: State, id: string) {
      delete state.results[id]
    },
  },

  actions: {
    async init({ commit }: any) {
      try {
        const resultsJson = await Storage.get({ key: 'oracle_results' })
        const results = JSON.parse(resultsJson.value)

        if (results) {
          for (const result of results) {
            commit('addResult', {
              id: result.id,
              question: result.question,
              hexagram: Hexagram.fromValues(result.values),
              createdAt: result.createdAt,
            })
          }
        }
      } catch (error) {
        console.error(error)
      }
    },

    async addResult({ getters, commit, dispatch }: any, { question, hexagram, createdAt }: any) {
      const id = createdAt.getTime().toString()
      commit('addResult', { id, question, hexagram, createdAt })

      await dispatch('save')

      return getters.resultById(id)
    },

    async removeResult({ commit, dispatch }: any, id: string): Promise<void> {
      commit('removeResult', id)

      await dispatch('save')
    },

    async save({ getters }: any): Promise<void> {
      const results = getters.results.map((result: OracleResult) => ({
        id: result.id,
        question: result.question,
        values: result.hexagram.lines.map((line: HexagramLine): HexagramLineValue => line.value),
        createdAt: result.createdAt.toISOString(),
      }))

      await Storage.set({ key: 'oracle_results', value: JSON.stringify(results) })
    },
  },
}
