import { Combat } from "../Combat/Combat.js";
import { LootTable } from "../Combat/LootTable.js";

export class MonsterRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    ui.showMessage('A wild monster appears!') 
    const won = new Combat(ui).fight(adventurer, 'Goblin', 4);
    if (won) {
      this.#collectLoot(adventurer, ui)
    }
  }

  #collectLoot(adventurer, ui) {
    const lootTable = new LootTable(this.#rng)
    const coins = lootTable.rollCoins('2d6')
    adventurer.getInventory().addCoins(coins)
    ui.showMessage(`You found ${coins} coins!`)
    const item = lootTable.rollItem()
    if (item) {
      adventurer.getInventory().addItem(item)
      ui.showMessage(`You found a ${item}!`)
    }
  }
}