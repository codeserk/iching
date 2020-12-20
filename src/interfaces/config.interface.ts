export interface Config {
  readonly introduction: {
    readonly seen: boolean
  }

  readonly display: {
    readonly name: {
      readonly chinese: boolean
      readonly pinyin: boolean
      readonly description: boolean
    }

    readonly trigrams: boolean

    readonly judgement: {
      readonly quote: boolean
      readonly description: boolean
    }

    readonly images: {
      readonly quote: boolean
      readonly description: boolean
    }

    readonly mutations: {
      readonly quote: boolean
      readonly description: boolean
    }
  }

  readonly journal: {
    readonly confirmDeletion: boolean
  }
}

export const DEFAULT_CONFIG: Config = {
  introduction: {
    seen: false,
  },

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
