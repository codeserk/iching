/**
 * Gets a random number. Uses current time to generate it.
 * 10% => Time
 * 90% => Math.random()
 *
 * @param min
 * @param max
 */
export function getRandomNumber(min: number, max: number): number {
  const time = new Date().getTime()
  const x = Math.sin(time) * 10000
  const timeRandom = x - Math.floor(x)
  const regularRandom = Math.random()
  const random = 0.1 * timeRandom + 0.9 * regularRandom
  const result = random * (max - min) + min

  return result
}

/**
 * Gets a random integer.
 *
 * @param min
 * @param max
 */
export function getRandomInt(min: number, max: number): number {
  return Math.round(getRandomNumber(min, max))
}
