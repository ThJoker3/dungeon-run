/**
 * A single die with a fixed number of sides.
 */
export class Dice {
  #sides;

  /**
   * @param {number} [sides=6] - The number of sides the die has.
   * @throws {Error} If `sides` is not a positive integer.
   */
  constructor(sides = 6) {
    if (!Number.isInteger(sides) || sides <= 0) {
      throw new Error("Number of sides must be a positive integer");
    }
    this.#sides = sides;
  }

  /**
   * Rolls the die once.
   * @param {RandomGenerator} randomGenerator - The random generator to use for the roll.
   * @returns {number} A value between 1 and the die's number of sides, inclusive.
   */
  roll(randomGenerator) {
    return randomGenerator.nextInt(1, this.#sides);
  }
}