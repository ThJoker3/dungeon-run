import { Combat } from "../Combat/Combat.js";
import { LootTable } from "../Combat/LootTable.js";

/**
 * A room with an enemy to fight. Used for both regular monsters and the boss.
 */
export class MonsterRoom {
  #rng
  #enemyName
  #enemyAttackPower
  #coinDice

  /**
   * @param {RandomGenerator} rng - The seeded generator used to roll the loot.
   * @param {string} enemyName - The name of the enemy, e.g. 'Goblin'.
   * @param {number} enemyAttackPower - Number of sides on the enemy's damage die.
   * @param {string} coinDice - The dice rolled for coins when the enemy dies, e.g. '2d6'.
   */
  constructor(rng, enemyName, enemyAttackPower, coinDice) {
    this.#rng = rng
    this.#enemyName = enemyName
    this.#enemyAttackPower = enemyAttackPower
    this.#coinDice = coinDice
  }

  /**
   * Starts a fight with the enemy and gives loot if the adventurer wins.
   *
   * @param {Adventurer} adventurer - The player's character.
   * @param {ConsoleUI} ui - Used to show what happens.
   */
  enter(adventurer, ui) {
    ui.showMessage(`A ${this.#enemyName} appears!`)
    const won = new Combat(ui).fight(adventurer, this.#enemyName, this.#enemyAttackPower);
    if (won) {
      this.#collectLoot(adventurer, ui)
    }
  }

  /**
   * Rolls coins and a possible item, and adds them to the inventory.
   * A dropped health potion is added to the potion count instead of the item list.
   *
   * @param {Adventurer} adventurer - The player's character.
   * @param {ConsoleUI} ui - Used to show the loot.
   */
  #collectLoot(adventurer, ui) {
    const lootTable = new LootTable(this.#rng)
    const coins = lootTable.rollCoins(this.#coinDice)
    adventurer.getInventory().addCoins(coins)
    ui.showMessage(`You found ${coins} coins!`)
    const item = lootTable.rollItem()
    if (item === 'Health potion') {
      adventurer.getInventory().addHealthPotion()
    } else if (item) {
      adventurer.getInventory().addItem(item)
      ui.showMessage(`You found a ${item}!`)
    }
  }
}
