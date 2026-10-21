import { DiceExpression, Randomizer } from "dice-rng-toolkit"

export class LootTable {
  #rng
  #randomizer
  
  constructor(rng) {
    this.#rng = rng
    this.#randomizer = new Randomizer()
  }

  rollCoins(diceNotation) {
    return new DiceExpression(diceNotation).roll(this.#rng).getTotal()
  }

  rollItem() {
    if (!this.#rng.nextBoolean(0.5)) {
      return null
    }
    return this.#randomizer.pickWeighted(['Rusty Key', 'Silver Ring', 'Health potion', 'Dragon Scale'], [60, 20, 15, 5], this.#rng)
  }
}