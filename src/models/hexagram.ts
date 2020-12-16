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

export class Hexagram {
  /**
   * Constructor.
   *
   * @param lines
   */
  constructor(protected lines: SixHexagramLines) {}

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
}
