import { DiceExpression, Randomizer } from "dice-rng-toolkit"

/**
 * Rolls coins and item drops using the seeded random generator.
 */
export class LootTable {
  #rng
  #randomizer

  /**
   * @param {RandomGenerator} rng - The seeded generator, so loot follows the seed.
   */
  constructor(rng) {
    this.#rng = rng
    this.#randomizer = new Randomizer()
  }

  /**
   * @param {string} diceNotation - The dice to roll, e.g. '2d6'.
   * @returns {number} The number of coins rolled.
   */
  rollCoins(diceNotation) {
    return new DiceExpression(diceNotation).roll(this.#rng).getTotal()
  }

  /**
   * Rolls whether an item drops, and if so which one. Rarer items have a lower chance.
   *
   * @returns {string|null} The name of the dropped item, or null if nothing dropped.
   */
  rollItem() {
    if (!this.#rng.nextBoolean(0.5)) {
      return null
    }
    return this.#randomizer.pickWeighted(['Rusty Key', 'Silver Ring', 'Health potion', 'Dragon Scale'], [60, 20, 15, 5], this.#rng)
  }
}
