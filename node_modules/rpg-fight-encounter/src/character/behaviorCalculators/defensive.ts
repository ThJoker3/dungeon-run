/**
 * Represents the defensive behavior of a character, including damage mitigation.
 */
export class Defensive {
  /**
   * Calculates the amount of damage taken after applying defensive mitigation (e.g., armor).
   *
   * @param damage - The incoming damage before mitigation.
   * @param armorClass - The armor class of the character, used to mitigate incoming damage.
   * @returns The amount of damage actually taken after applying defensive mitigation.
   */
  calculateDamageTaken(damage: number, armorClass: number): number {
    // Example implementation: reduce damage by a fixed amount (e.g., armor)
    const damageTaken = Math.max(0, damage - armorClass) // Assuming 2 is the armor value
    return damageTaken
  }
}
