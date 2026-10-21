import { LootTable } from "../Combat/LootTable";

export class TreasureRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    const coins = new LootTable(this.#rng).rollCoins('3d6')
    adventurer.getInventory().addCoins(coins)
    ui.showMessage(`You found a treasure! ${adventurer.getName()} got ${coins} coins.`);
  }
}