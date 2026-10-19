export class CampfireRoom {
  enter(adventurer, ui) {
    ui.showMessage(`You approach a warm campfire! ${adventurer.getName()} rests and recovers some health.`);
  }
}