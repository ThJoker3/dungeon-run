export class CampfireRoom {
  enter(adventurer, ui) {
    const hpBefore = adventurer.getCurrentHitPoints()
    adventurer.heal()
    ui.showMessage(`You rest by the campfire! HP: ${hpBefore} => ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()}`);
  }
}