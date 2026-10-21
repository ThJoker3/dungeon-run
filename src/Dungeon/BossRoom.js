import { Combat } from "../Combat/Combat.js";
import { LootTable } from "../Combat/LootTable.js";

export class BossRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    ui.showMessage(`A fearsome Dragon awakens! ${adventurer.getName()} must fight!`);
    const won = new Combat(ui).fight(adventurer, 'Dragon', 10)
    if (won) {
      this.#collectLoot(adventurer, ui)
    }
  }

  #collectLoot(adventurer, ui) {
    const lootTable = new LootTable(this.#rng)
    const coins = lootTable.rollCoins('4d10')
    adventurer.getInventory().addCoins(coins)
    ui.showMessage(`You found ${coins} coins!`)
    const item = lootTable.rollItem()
    if (item) {
      adventurer.getInventory().addItem(item)
      ui.showMessage(`You found a ${item}!`)
    }
  }
}