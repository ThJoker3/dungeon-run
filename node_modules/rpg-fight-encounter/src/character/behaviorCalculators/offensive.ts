import { Dice } from '../../dice/Dice.js'

/**
 * Represents the offensive behavior of a character, including attack and damage calculation.
 */
export class Offensive {
  /**
   * Checks if the attack hits based on a random chance.
   *
   * @returns true if the attack hits, false otherwise.
   */
  public checkIfHit() {
    const dice = new Dice()
    return dice.rollDice(1, 20)[0] > 10 // Example: hit if roll is greater than 10
  }

  /**
   * Calculates the total damage from an array of individual damage values.
   *
   * @param damage - An array of individual damage values.
   * @returns The total damage calculated from the array.
   */
  public calculateDamage(damage: Array<number>): number {
    let totalDamage = 0
    for (const dmg of damage) {
      totalDamage += dmg
    }
    return totalDamage
  }
}
