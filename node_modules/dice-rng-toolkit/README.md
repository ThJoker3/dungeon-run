# Dice-RNG-Toolkit

A dependency-free JavaScript toolkit for seedable random number generation and dice-notation
rolling. Pure ES modules, no runtime dependencies.

## Installation

```
npm install dice-rng-toolkit
```

## Quick start

```js
import { RandomGenerator, Dice, DiceExpression, RollResult, Randomizer } from 'dice-rng-toolkit';
```

### `RandomGenerator`

A seedable pseudo-random number generator. Given the same seed, it always produces the same
sequence of values — useful for reproducible tests and gameplay.

```js
const rng = new RandomGenerator(42); // seed is optional, defaults to Date.now()

rng.nextFloat();          // a float in [0, 1)
rng.nextInt(1, 6);        // an integer in [1, 6]
rng.nextBoolean(0.3);     // true ~30% of the time (defaults to 0.5)

rng.reset(42);             // restarts the sequence from the given seed
```

### `Dice`

A single die with a fixed number of sides.

```js
const d6 = new Dice(); // defaults to 6 sides
d6.roll(rng); // a value between 1 and 6
```

### `DiceExpression`

Parses standard dice notation (e.g. `"3d6"`, or `"d6"` as shorthand for `"1d6"`) and rolls the
corresponding number of dice.

```js
const expr = new DiceExpression('3d6');
const result = expr.roll(rng); // a RollResult
```

### `RollResult`

An immutable value object holding the outcome of a dice roll.

```js
result.getRolls();  // e.g. [4, 2, 6]
result.getTotal();  // e.g. 12
result.toString();  // e.g. "Rolls: [4, 2, 6], Total: 12"
```

### `Randomizer`

RNG-driven utilities for working with arrays.

```js
const randomizer = new Randomizer();

randomizer.pick(['a', 'b', 'c'], rng);                    // a random element
randomizer.shuffle([1, 2, 3, 4, 5], rng);                 // a new, shuffled array
randomizer.pickWeighted(['a', 'b', 'c'], [1, 3, 6], rng); // weighted random pick
```

## Testing

Automated unit tests are written with [Vitest](https://vitest.dev).

```
npm install
npm test
```

See [`TEST_REPORT.md`](./TEST_REPORT.md) for a full summary of what's tested and how.

## License

MIT
