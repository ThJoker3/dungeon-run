export class BossRoom {
  enter(adventurer, ui) {
    ui.showMessage(`A wild boss appears! ${adventurer.getName()} must fight!`);
  }
}