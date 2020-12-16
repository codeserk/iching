import { HexagramDetails, HexagramDictionary } from '../../interfaces/hexagram-details.interface'

import hexagrams from './hexagrams'

interface State {
  dictionary: HexagramDictionary
}

export default {
  state: (): State => ({
    dictionary: hexagrams,
  }),

  getters: {
    getHexagramDetails: (state: State) => (num: number): HexagramDetails => {
      return state.dictionary[num]
    },
  },
}
