export interface HexagramDetails {
  readonly name: {
    readonly chinese: string
    readonly pinyin: string
    readonly translated: string
    readonly description: string
  }

  readonly trigram: {
    readonly above: number
    readonly below: number
  }

  readonly judgement: {
    readonly quote: string
    readonly description: string
  }

  readonly images: {
    readonly quote: string
    readonly description: string
  }

  readonly mutations: Record<
    number,
    {
      readonly quote: string
      readonly description: string
    }
  >
}

export type HexagramDictionary = Record<number, HexagramDetails>
