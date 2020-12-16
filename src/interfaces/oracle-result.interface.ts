import { Hexagram } from '../models/hexagram'

export interface OracleResult {
  /** Id of the result. */
  readonly id: string

  /** Question asked. */
  readonly question: string

  /** Obtained hexagram. */
  readonly hexagram: Hexagram

  /** Date when it was created. */
  readonly createdAt: Date
}
