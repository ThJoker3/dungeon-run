import { LootTable } from "../Combat/LootTable.js";

/**
 * A room with a treasure chest full of coins.
 */
export class TreasureRoom {
  #rng

  /**
   * @param {RandomGenerator} rng - The seeded generator used to roll the coins.
   */
  constructor(rng) {
    this.#rng = rng
  }

  /**
   * Gives the adventurer coins.
   *
   * @param {Adventurer} adventurer - The player's character.
   * @param {ConsoleUI} ui - Used to show what happens.
   */
  enter(adventurer, ui) {
    const coins = new LootTable(this.#rng).rollCoins('3d6')
    adventurer.getInventory().addCoins(coins)
    ui.showMessage(`You found a treasure! ${adventurer.getName()} got ${coins} coins.`);
  }
}
