export class MonsterRoom {
  enter(adventurer, ui) {
    ui.showMessage(`A wild monster appears! ${adventurer.getName()} must fight!`);
  }
}