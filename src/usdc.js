const MICRO_USDC = 1_000_000n

/**
 * Convert a decimal USDC string into an integer count of micro USDC.
 *
 * @param {string} input
 * @returns {bigint}
 */
export function parseUsdc(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Amount must be a decimal string')
  }

  const match = /^(0|[1-9]\d*)(?:\.(\d{1,6}))?$/.exec(input)
  if (!match) {
    throw new TypeError('Amount must be nonnegative and use at most six decimal places')
  }

  const whole = BigInt(match[1])
  const fraction = BigInt((match[2] ?? '').padEnd(6, '0') || '0')
  return whole * MICRO_USDC + fraction
}

/**
 * Format an integer count of micro USDC as a decimal string.
 *
 * @param {bigint | string} amount
 * @returns {string}
 */
export function formatUsdc(amount) {
  if (typeof amount !== 'bigint' && (typeof amount !== 'string' || !/^-?\d+$/.test(amount))) {
    throw new TypeError('Amount must be an integer string or bigint')
  }

  const raw = BigInt(amount)
  if (raw < 0n) throw new RangeError('Amount must not be negative')

  const whole = raw / MICRO_USDC
  const fraction = (raw % MICRO_USDC).toString().padStart(6, '0').replace(/0+$/, '')
  return fraction.length === 0 ? whole.toString() : `${whole}.${fraction}`
}
