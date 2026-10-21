import test from 'node:test'
import assert from 'node:assert/strict'
import { formatUsdc, parseUsdc } from '../src/usdc.js'

test('parses whole USDC amounts', () => {
  assert.equal(parseUsdc('12'), 12_000_000n)
})

test('parses up to six decimal places exactly', () => {
  assert.equal(parseUsdc('12.340001'), 12_340_001n)
  assert.equal(parseUsdc('0.000001'), 1n)
  assert.equal(parseUsdc('9007199254.740993'), 9_007_199_254_740_993n)
})

test('rejects precision the token cannot represent instead of rounding', () => {
  assert.throws(() => parseUsdc('0.0000009'), TypeError)
  assert.throws(() => parseUsdc('1.0000009'), TypeError)
})

test('formats integer micro USDC without unnecessary zeroes', () => {
  assert.equal(formatUsdc(12_340_000n), '12.34')
  assert.equal(formatUsdc(12_000_001n), '12.000001')
  assert.equal(formatUsdc(0n), '0')
})

test('rejects malformed and negative input', () => {
  assert.throws(() => parseUsdc(''), TypeError)
  assert.throws(() => parseUsdc('not an amount'), TypeError)
  assert.throws(() => parseUsdc('-0.1'), TypeError)
  assert.throws(() => parseUsdc('1e3'), TypeError)
  assert.throws(() => formatUsdc('not an integer'), TypeError)
  assert.throws(() => formatUsdc(-1n), RangeError)
})
