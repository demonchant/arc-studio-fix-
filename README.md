# Arc USDC Amount Demo

A small JavaScript utility for parsing and formatting USDC amounts without
losing precision. USDC uses six decimal places.

This repository is also used to demonstrate a real maintainer workflow for
MergePay: an issue describes a reproducible amount parsing bug, a contributor
fixes it in a pull request, and the maintainer reviews and merges that pull
request. The repository and its issue are a demonstration project. They do not
represent a contribution to an unrelated open source project.

## Run the tests

Requires Node.js 20 or newer. There are no third party dependencies.

```sh
npm test
```

## API

```js
import { formatUsdc, parseUsdc } from './src/usdc.js'

parseUsdc('12.340001') // 12340001n
formatUsdc(12340001n) // '12.340001'
```

`parseUsdc` accepts a nonnegative decimal string with at most six digits after
the decimal point and returns an integer count of micro USDC. It never rounds.
`formatUsdc` accepts a nonnegative integer count of micro USDC and returns a
decimal string with unnecessary trailing zeroes removed.

## Scope

This package only converts decimal strings and integer amounts. It does not
connect to a wallet, make transactions, or verify a token contract.
