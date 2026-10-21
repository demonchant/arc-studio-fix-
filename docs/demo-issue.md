## Description

`parseUsdc` currently converts the input through JavaScript `Number` and rounds
the result. That changes user supplied token amounts instead of rejecting
precision the token cannot represent.

For example, `parseUsdc('0.0000009')` currently returns `1n`. A caller who
expects exact token units can therefore receive a different amount from the
one they entered.

Please make parsing exact. Accept decimal strings with zero through six digits
after the decimal point, reject greater precision, and add regression tests for
both a value below one micro USDC and a value with a whole number part.

## Acceptance criteria

- `parseUsdc('0.000001')` returns `1n`.
- `parseUsdc('0.0000009')` throws instead of rounding.
- `parseUsdc('1.0000009')` throws instead of changing the amount.
- Existing valid parsing and formatting tests continue to pass.
