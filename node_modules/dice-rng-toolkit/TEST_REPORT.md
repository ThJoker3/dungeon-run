# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
-->

## Summary

The module was tested with automated unit tests using the [Vitest](https://vitest.dev) test
framework (a devDependency, no runtime dependency). Each of the five public classes
(`RandomGenerator`, `Dice`, `DiceExpression`, `RollResult`, `Randomizer`) has its own spec file
in `test/`, mirroring the class it tests.

To run all tests yourself:

```
npm install
npm test
```

`npm test` runs `vitest run`, which executes every spec file once and prints a pass/fail summary.
For a per-test breakdown (every individual test name with its own result, instead of just a count
per file), run:

```
npx vitest run --reporter=verbose
```

At the time of writing, all 27 tests across the 5 test files pass.

## Test Results

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
| `RandomGenerator`: `nextFloat()` produces the same sequence for the same seed | Automated unit test (Vitest): created two instances with the same seed, compared three `nextFloat()` results from each. | ✅ Passed |
| `RandomGenerator`: `nextFloat()` produces different sequences for different seeds | Automated unit test (Vitest): created two instances with different seeds, compared results with `.not.toEqual()`. | ✅ Passed |
| `RandomGenerator`: `reset(seed)` restores the original sequence | Automated unit test (Vitest): rolled a few values, called `reset()` with the same seed, compared the new results to the first run. | ✅ Passed |
| `RandomGenerator`: constructor and `reset()` throw for a non-integer seed | Automated unit test (Vitest): called both with a decimal seed (`123.45`), asserted `toThrow`. | ✅ Passed |
| `RandomGenerator`: `nextFloat()` always returns a value in `[0, 1)` | Automated unit test (Vitest): checked a single result was `>= 0` and `< 1`. | ✅ Passed |
| `RandomGenerator`: `nextInt(min, max)` always returns a value within the given range | Automated unit test (Vitest): ran `nextInt(1, 6)` 100 times in a loop, checked every result was `>= 1` and `<= 6`. | ✅ Passed |
| `RandomGenerator`: `nextInt(min, max)` throws when `min` is greater than `max` | Automated unit test (Vitest): called `nextInt(10, 1)`, asserted `toThrow`. | ✅ Passed |
| `RandomGenerator`: `nextInt(min, max)` throws when `min` or `max` is not an integer | Automated unit test (Vitest): called with a decimal `min` and, separately, a decimal `max`, asserted `toThrow` for both. | ✅ Passed |
| `Dice`: `roll(randomGenerator)` always returns a value within the die's range | Automated unit test (Vitest): rolled a `Dice(6)` 100 times in a loop, checked every result was `>= 1` and `<= 6`. | ✅ Passed |
| `Dice`: constructor throws for a non-positive-integer number of sides | Automated unit test (Vitest): called `new Dice(-3)`, asserted `toThrow`. | ✅ Passed |
| `DiceExpression`: parses valid notation (e.g. `"3d6"`) without throwing | Automated unit test (Vitest): asserted `new DiceExpression('3d6')` with `.not.toThrow()`. | ✅ Passed |
| `DiceExpression`: `"d6"` is treated as shorthand for `"1d6"` | Automated unit test (Vitest): rolled `"d6"` and checked the resulting `RollResult` had exactly 1 roll. | ✅ Passed |
| `DiceExpression`: throws for invalid notation | Automated unit test (Vitest): called `new DiceExpression('invalid')`, asserted `toThrow`. | ✅ Passed |
| `DiceExpression`: `roll()` returns a `RollResult` with the correct number of rolls | Automated unit test (Vitest): rolled `"3d6"`, checked the result was an instance of `RollResult` with 3 rolls. | ✅ Passed |
| `DiceExpression`: `roll()` produces rolls within the correct range for the given sides | Automated unit test (Vitest): rolled `"5d6"`, checked every individual roll was between 1 and 6. | ✅ Passed |
| `RollResult`: `getTotal()` calculates the correct sum of the rolls | Automated unit test (Vitest): created a `RollResult` with `[4, 2, 6]`, checked `getTotal()` returned 12. | ✅ Passed |
| `RollResult`: `getRolls()` returns the individual rolls | Automated unit test (Vitest): checked `getRolls()` matched the array passed to the constructor. | ✅ Passed |
| `RollResult`: `getRolls()` returns a copy, not the original array | Automated unit test (Vitest): mutated the array returned by `getRolls()`, then called `getRolls()` again and checked the internal state was unaffected. | ✅ Passed |
| `RollResult`: `toString()` returns a correctly formatted string | Automated unit test (Vitest): checked the exact string output against the expected format. | ✅ Passed |
| `Randomizer`: `pick(array, randomGenerator)` returns an element from the array | Automated unit test (Vitest): checked the picked value with `toContain`. | ✅ Passed |
| `Randomizer`: `pick()` throws for an empty array | Automated unit test (Vitest): called `pick([], rng)`, asserted `toThrow`. | ✅ Passed |
| `Randomizer`: `pick()` throws when the argument isn't an array | Automated unit test (Vitest): called `pick(rng)` (a non-array), asserted `toThrow`. | ✅ Passed |
| `Randomizer`: `shuffle(array, randomGenerator)` returns an array with the same elements | Automated unit test (Vitest): sorted and compared the shuffled result against the original. | ✅ Passed |
| `Randomizer`: `shuffle()` does not mutate the original array | Automated unit test (Vitest): saved a copy of the array before shuffling, compared it to the original afterwards. | ✅ Passed |
| `Randomizer`: `pickWeighted(items, weights, randomGenerator)` returns an item from the list | Automated unit test (Vitest): checked the result with `toContain`. | ✅ Passed |
| `Randomizer`: `pickWeighted()` throws when `items` and `weights` have different lengths | Automated unit test (Vitest): called with mismatched array lengths, asserted `toThrow`. | ✅ Passed |
| `Randomizer`: `pickWeighted()` throws when `items` or `weights` is not an array | Automated unit test (Vitest): called with a non-array `items` argument, asserted `toThrow`. | ✅ Passed |
