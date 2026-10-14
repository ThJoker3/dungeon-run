import { Character } from './Character.js'
/**
 * Represents a player character in the game, extending the base Character class.
 */
export class Player extends Character {
  /**
   * Creates a new player character with the specified attributes.
   *
   * @param name - The name of the player character.
   * @param attackPower - The attack power of the player character.
   */
  constructor(name: string, attackPower: number) {
    super(name, attackPower, 4, 6)
  }
}
