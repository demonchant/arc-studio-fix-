const MICRO_USDC = 1_000_000n

/**
 * Convert a decimal USDC string into an integer count of micro USDC.
 *
 * @param {string} input
 * @returns {bigint}
 */
export function parseUsdc(input) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new TypeError('Amount must be a nonempty decimal string')
  }

  const value = Number(input)
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError('Amount must be a nonnegative number')
  }

  // Bug for the demo issue: floating point rounding accepts and changes
  // amounts with more than six decimal places instead of rejecting them.
  return BigInt(Math.round(value * Number(MICRO_USDC)))
}

/**
 * Format an integer count of micro USDC as a decimal string.
 *
 * @param {bigint | string | number} amount
 * @returns {string}
 */
export function formatUsdc(amount) {
  const raw = BigInt(amount)
  if (raw < 0n) throw new RangeError('Amount must not be negative')

  const whole = raw / MICRO_USDC
  const fraction = (raw % MICRO_USDC).toString().padStart(6, '0').replace(/0+$/, '')
  return fraction.length === 0 ? whole.toString() : `${whole}.${fraction}`
}
