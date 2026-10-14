import { Character } from './Character.js'

/**
 * Represents a Enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {
  /**
   * Creates a new enemy character with the specified attributes.
   *
   * @param name - The name of the enemy character.
   * @param attackPower - The attack power of the enemy character.
   */
  constructor(name: string, attackPower: number) {
    super(name, attackPower, 4, 4)
  }
}
