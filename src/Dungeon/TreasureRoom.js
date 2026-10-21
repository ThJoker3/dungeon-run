export class TreasureRoom {
  #rng

  constructor(rng) {
    this.#rng = rng
  }
  
  enter(adventurer, ui) {
    ui.showMessage(`You found a treasure! ${adventurer.getName()} claims the loot.`);
  }
}