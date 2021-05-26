import { OracleResult } from '../interfaces/oracle-result.interface'

/**
 * Filters oracle results
 * @param results
 * @param search
 * @param tag
 * @param showAll
 * @returns filtered results
 */
export function filterResults(results: OracleResult[], search?: string, tag?: string, showAll?: boolean) {
  if (search) {
    search = search.toLowerCase()
    results = results.filter(result => result.question.toLowerCase().includes(search!))
  }
  if (tag) {
    results = results.filter(result => result.tags.includes(tag))
  }

  if (!showAll && !search) {
    results = results.slice(0, 10)
  }

  return results
}
