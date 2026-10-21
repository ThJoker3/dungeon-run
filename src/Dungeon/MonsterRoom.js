import { Combat } from "../Combat/Combat.js";

export class MonsterRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    ui.showMessage('A wild monster appears!') 
    new Combat(ui).fight(adventurer, 'Goblin', 4);
  }
}