import { Hexagram } from '../models/hexagram'

export interface OracleResult {
  /** Id of the result. */
  readonly id: string

  /** Question asked. */
  readonly question: string

  /** Obtained hexagram. */
  readonly hexagram: Hexagram

  /** Tags attached to the result */
  readonly tags: string[]

  /** Result personal notes */
  readonly notes: string

  /** Date when it was created. */
  readonly createdAt: Date
}
