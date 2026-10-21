import { Player } from 'rpg-fight-encounter';
import { Inventory } from './Inventory.js';

/**
 * The player's character. Wraps the Player class from rpg-fight-encounter
 * so the rest of the game does not depend on that module directly.
 */
export class Adventurer {
  #weapon;
  #fighter;
  #inventory

  /**
   * @param {string} name - The name of the adventurer.
   * @param {Weapon} weapon - The chosen starting weapon.
   */
  constructor(name, weapon) {
    this.#weapon = weapon;
    this.#fighter = new Player(name, weapon.getAttackPower());
    this.#inventory = new Inventory(weapon.getHealthPotions())
  }

  /**
   * @returns {string} The name of the adventurer.
   */
  getName() {
    return this.#fighter.getName();
  }

  /**
   * @returns {Weapon} The adventurer's weapon.
   */
  getWeapon() {
    return this.#weapon;
  }

  /**
   * Returns the underlying fighter from rpg-fight-encounter.
   * Only meant to be used by Combat, which also wraps that module.
   *
   * @returns {Player} The wrapped Player object.
   */
  getFighter() {
    return this.#fighter
  }

  /**
   * @returns {Inventory} The adventurer's inventory.
   */
  getInventory() {
    return this.#inventory
  }

  /**
   * @returns {number} Current hit points.
   */
  getCurrentHitPoints() {
    return this.#fighter.getCurrentHitPoints();
  }

  /**
   * @returns {number} Maximum hit points.
   */
  getMaxHitPoints() {
    return this.#fighter.getMaxHitPoints();
  }

  /**
   * Heals the adventurer by 5 HP, but never above max HP.
   */
  heal() {
    this.#fighter.heal(this.#fighter)
  }

  /**
   * @returns {boolean} True if the adventurer has more than 0 HP.
   */
  getIsAlive() {
    return this.#fighter.getIsAlive();
  }
}
