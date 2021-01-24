import { HEXAGRAM_CODE_TO_HEXAGRAM_NUMBER } from './hexagram-code-to-number'
import { Coin } from './coin'

export enum HexagramLineValue {
  MutableYin = 'mutable-yin',
  Yang = 'yang',
  Yin = 'yin',
  MutableYang = 'mutable-yang',
}

export enum HexagramLineCode {
  Yin = '¦',
  Yang = '|',
}

export const COINS_VALUE_TO_HEXAGRAM_LINE_VALUE: Record<number, HexagramLineValue> = {
  6: HexagramLineValue.MutableYin,
  7: HexagramLineValue.Yang,
  8: HexagramLineValue.Yin,
  9: HexagramLineValue.MutableYang,
}

export const HEXAGRAM_LINE_VALUE_TO_COINS_VALUE: Record<HexagramLineValue, number> = {
  [HexagramLineValue.MutableYin]: 6,
  [HexagramLineValue.Yang]: 7,
  [HexagramLineValue.Yin]: 8,
  [HexagramLineValue.MutableYang]: 9,
}

export const HEXAGRAM_LINE_CODE_TO_VALUE: Record<HexagramLineCode, HexagramLineValue> = {
  [HexagramLineCode.Yin]: HexagramLineValue.Yin,
  [HexagramLineCode.Yang]: HexagramLineValue.Yang,
}

export class HexagramLine {
  /**
   * Constructor.
   *
   * @param value
   */
  constructor(readonly value: HexagramLineValue) {}

  /**
   * Gets the primary line value.
   */
  get primary(): HexagramLineValue.Yin | HexagramLineValue.Yang {
    if (this.value === HexagramLineValue.MutableYin || this.value === HexagramLineValue.Yin) {
      return HexagramLineValue.Yin
    }

    return HexagramLineValue.Yang
  }

  /**
   * Gets the secondary line value.
   * The mutations get the opposite value.
   */
  get secondary(): HexagramLineValue.Yin | HexagramLineValue.Yang {
    if (this.value === HexagramLineValue.MutableYin) {
      return HexagramLineValue.Yang
    }
    if (this.value === HexagramLineValue.MutableYang) {
      return HexagramLineValue.Yin
    }

    return this.value
  }

  /**
   * Whether the line is a mutation.
   */
  get isMutation(): boolean {
    return this.value === HexagramLineValue.MutableYang || this.value === HexagramLineValue.MutableYin
  }

  /**
   * Creates a line from 3 coins.
   *
   * @param coinA
   * @param coinB
   * @param coinC
   */
  static fromCoins(coinA: Coin, coinB: Coin, coinC: Coin) {
    const coinsValue = coinA.value + coinB.value + coinC.value

    return new HexagramLine(COINS_VALUE_TO_HEXAGRAM_LINE_VALUE[coinsValue])
  }
}

export type ThreeHexagramLines = [HexagramLine, HexagramLine, HexagramLine]
export type SixHexagramLines = [HexagramLine, HexagramLine, HexagramLine, HexagramLine, HexagramLine, HexagramLine]
export type SixHexagramLineValues = [
  HexagramLineValue,
  HexagramLineValue,
  HexagramLineValue,
  HexagramLineValue,
  HexagramLineValue,
  HexagramLineValue,
]

export class Hexagram {
  /**
   * Constructor.
   *
   * @param lines
   */
  constructor(readonly lines: SixHexagramLines) {}

  get trigramAbove(): ThreeHexagramLines {
    return [this.lines[3], this.lines[4], this.lines[5]]
  }

  get trigramBelow(): ThreeHexagramLines {
    return [this.lines[0], this.lines[1], this.lines[2]]
  }

  get primaryLines(): SixHexagramLines {
    return this.lines.map(line => new HexagramLine(line.primary)) as SixHexagramLines
  }

  get secondaryLines(): SixHexagramLines {
    return this.lines.map(line => new HexagramLine(line.secondary)) as SixHexagramLines
  }

  get uri(): string {
    return this.lines.map(line => HEXAGRAM_LINE_VALUE_TO_COINS_VALUE[line.value]).join('')
  }

  get code(): string {
    return this.primaryLines
      .map(line => (line.value === HexagramLineValue.Yin ? HexagramLineCode.Yin : HexagramLineCode.Yang))
      .join('')
  }

  get primaryCode(): string {
    return this.code
  }

  get secondaryCode(): string {
    return this.secondaryLines
      .map(line => (line.value === HexagramLineValue.Yin ? HexagramLineCode.Yin : HexagramLineCode.Yang))
      .join('')
  }

  get number(): number {
    return HEXAGRAM_CODE_TO_HEXAGRAM_NUMBER[this.code]
  }

  get primaryNumber(): number {
    return this.number
  }

  get secondaryNumber(): number {
    return HEXAGRAM_CODE_TO_HEXAGRAM_NUMBER[this.secondaryCode]
  }

  get hasSecondary(): boolean {
    return this.primaryNumber !== this.secondaryNumber
  }

  get mutatedLines(): number[] {
    return this.lines.reduce((result, line, index) => {
      if (line.isMutation) {
        result.push(index + 1)
      }

      return result
    }, [] as number[])
  }

  get hasMutations(): boolean {
    return this.mutatedLines.length > 0
  }

  static fromValues(values: SixHexagramLineValues): Hexagram {
    const lines = values.map(value => new HexagramLine(value)) as SixHexagramLines

    return new Hexagram(lines)
  }

  static fromCode(code: string): Hexagram {
    const lines = code
      .trim()
      .split('')
      .map((code: string) => new HexagramLine(HEXAGRAM_LINE_CODE_TO_VALUE[code as HexagramLineCode]))

    return new Hexagram(lines as SixHexagramLines)
  }

  static fromUri(uri: string): Hexagram {
    const lines = uri
      .trim()
      .split('')
      .map((value: string) => new HexagramLine(COINS_VALUE_TO_HEXAGRAM_LINE_VALUE[parseInt(value, 10)]))

    return new Hexagram(lines as SixHexagramLines)
  }

  static fromNumber(num: number): Hexagram {
    const entry = Object.entries(HEXAGRAM_CODE_TO_HEXAGRAM_NUMBER).find(([itemCode, itemNumber]) => itemNumber === num)

    return Hexagram.fromCode(entry![0] as string)
  }
}
