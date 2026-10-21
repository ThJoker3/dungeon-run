import { Combat } from "../Combat/Combat.js";

export class BossRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    ui.showMessage(`A fearsome Dragon awakens! ${adventurer.getName()} must fight!`);
    new Combat(ui).fight(adventurer, 'Dragon', 10)
  }
}