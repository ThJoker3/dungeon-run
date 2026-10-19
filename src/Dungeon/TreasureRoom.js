export class TreasureRoom {
  enter(adventurer, ui) {
    ui.showMessage(`You found a treasure! ${adventurer.getName()} claims the loot.`);
  }
}