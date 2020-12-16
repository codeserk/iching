import { getRandomInt } from '../util/random'

export enum CoinPosition {
  Heads = 'heads',
  Tails = 'tails',
}

/**
 * Represents a coin, that has a position (heads or tails)
 */
export class Coin {
  /**
   * Constructor.
   *
   * @param position
   */
  constructor(readonly position: CoinPosition) {}

  /**
   * Gets the value of the coin:
   * - Heads = 3
   * - Tails = 2
   */
  get value(): number {
    return this.position === CoinPosition.Heads ? 3 : 2
  }

  /**
   * Tosses the coin and sets the position.
   */
  static fromToss(): Coin {
    const position = getRandomInt(0, 1)

    if (position === 0) {
      return new Coin(CoinPosition.Heads)
    }

    return new Coin(CoinPosition.Tails)
  }
}
