import { Coin } from './coin'

export enum HexagramLineValue {
  MutableYin = 'mutable-yin',
  Yang = 'yang',
  Yin = 'yin',
  MutableYang = 'mutable-yang',
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
    return this.primaryLines.map(line => (line.value === HexagramLineValue.Yin ? '¦' : '|')).join('')
  }

  get primaryCode(): string {
    return this.code
  }

  get secondaryCode(): string {
    return this.secondaryLines.map(line => (line.value === HexagramLineValue.Yin ? '¦' : '|')).join('')
  }
}
