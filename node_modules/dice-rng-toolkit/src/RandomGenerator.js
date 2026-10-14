import { Mulberry } from "./Mulberry.js";

/**
 * A seedable pseudo-random number generator (PRNG). Given the same seed, an instance
 * always produces the same sequence of values, which makes it possible to write
 * deterministic, reproducible tests and gameplay.
 *
 * The actual number-generation algorithm is not built into this class — it is delegated
 * to an injectable algorithm class (see the `Algorithm` constructor parameter), so the
 * underlying algorithm can be swapped without changing this class. Defaults to `Mulberry`.
 */
export class RandomGenerator {
  #algorithm;
  #Algorithm;

  /**
   * @param {number} [seed=Date.now()] - The seed to initialize the generator with.
   * @param {new (seed: number) => { nextUint32(): number }} [Algorithm=Mulberry] - The algorithm class to use internally.
   * @throws {Error} If `seed` is not an integer.
   */
  constructor(seed = Date.now(), Algorithm = Mulberry) {
    this.#Algorithm = Algorithm
    this.reset(seed);
  }

  #assertInteger(value, name) {
    if (!Number.isInteger(value)) {
      throw new Error(`${name || 'Value'} must be an integer`);
    }
   }

  /**
   * Re-seeds the generator, restarting its sequence from the beginning.
   * @param {number} seed - The new seed. Must be an integer.
   * @throws {Error} If `seed` is not an integer.
   */
  reset(seed) {
    this.#assertInteger(seed, "Seed");
    this.#algorithm = new this.#Algorithm(seed);
  }

  /**
   * @returns {number} The next pseudo-random floating-point number in the range [0, 1).
   */
  nextFloat() {
    return this.#algorithm.nextUint32() / 4294967296; // 2^32
  }

  /**
   * @param {number} min - The lower bound (inclusive).
   * @param {number} max - The upper bound (inclusive).
   * @returns {number} The next pseudo-random integer in the range [min, max].
   * @throws {Error} If `min`/`max` are not integers, or if `min` is greater than `max`.
   */
  nextInt(min, max) {
    this.#assertInteger(min, "Min");
    this.#assertInteger(max, "Max");
    if (min > max) {
      throw new Error("Min must not be greater than Max");
    }
    return Math.floor(this.nextFloat() * (max - min + 1)) + min;
  }

  /**
   * @param {number} [probability=0.5] - The probability of returning `true`, between 0 and 1 (inclusive).
   * @returns {boolean} `true` with the given probability, otherwise `false`.
   * @throws {Error} If `probability` is outside the range [0, 1].
   */
  nextBoolean(probability = 0.5) {
    if (probability < 0 || probability > 1) {
      throw new Error("Probability must be between 0 and 1");
    }
    return this.nextFloat() < probability;
  }
}
