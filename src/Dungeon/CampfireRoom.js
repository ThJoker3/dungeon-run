/**
 * A room where the adventurer rests and heals.
 */
export class CampfireRoom {
  /**
   * Heals the adventurer and shows the HP before and after.
   *
   * @param {Adventurer} adventurer - The player's character.
   * @param {ConsoleUI} ui - Used to show what happens.
   */
  enter(adventurer, ui) {
    const hpBefore = adventurer.getCurrentHitPoints()
    adventurer.heal()
    ui.showMessage(`You rest by the campfire! HP: ${hpBefore} => ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()}`);
  }
}
