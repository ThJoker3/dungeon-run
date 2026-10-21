import { Combat } from "../Combat/Combat.js";
import { LootTable } from "../Combat/LootTable.js";

export class MonsterRoom {
  #rng
  #enemyName
  #enemyAttackPower
  #coinDice

  constructor(rng, enemyName, enemyAttackPower, coinDice) {
    this.#rng = rng
    this.#enemyName = enemyName
    this.#enemyAttackPower = enemyAttackPower
    this.#coinDice = coinDice
  }
  
  enter(adventurer, ui) {
    ui.showMessage(`A ${this.#enemyName} appears!`) 
    const won = new Combat(ui).fight(adventurer, this.#enemyName, this.#enemyAttackPower);
    if (won) {
      this.#collectLoot(adventurer, ui)
    }
  }

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