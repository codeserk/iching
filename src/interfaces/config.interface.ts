export interface Config {
  readonly display: {
    readonly name: {
      chinese: boolean
      pinyin: boolean
      description: boolean
    }

    trigrams: boolean

    readonly judgement: {
      quote: boolean
      description: boolean
    }

    readonly images: {
      quote: boolean
      description: boolean
    }

    readonly mutations: {
      quote: boolean
      description: boolean
    }
  }

  readonly journal: {
    confirmDeletion: boolean
  }
}

export const DEFAULT_CONFIG: Config = {
  display: {
    name: {
      chinese: true,
      pinyin: true,
      description: true,
    },

    trigrams: true,

    judgement: {
      quote: true,
      description: true,
    },

    images: {
      quote: true,
      description: true,
    },

    mutations: {
      quote: true,
      description: true,
    },
  },

  journal: {
    confirmDeletion: true,
  },
}
