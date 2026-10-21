/**
 * A starting weapon. Stronger weapons come with fewer health potions.
 */
export class Weapon {
  #name;
  #attackPower;
  #healthPotions;

  /**
   * @param {string} name - The name of the weapon, e.g. 'Sword'.
   * @param {number} attackPower - Number of sides on the damage die (8 means d8).
   * @param {number} healthPotions - Number of health potions the adventurer starts with.
   */
  constructor(name, attackPower, healthPotions) {
    this.#name = name;
    this.#attackPower = attackPower;
    this.#healthPotions = healthPotions;
  }

  /**
   * @returns {string} The name of the weapon.
   */
  getName() {
    return this.#name;
  }

  /**
   * @returns {number} Number of sides on the damage die.
   */
  getAttackPower() {
    return this.#attackPower;
  }

  /**
   * @returns {number} Number of starting health potions.
   */
  getHealthPotions() {
    return this.#healthPotions;
  }

  /**
   * @returns {string} A short text describing the weapon, used in the weapon menu.
   */
  getDescription() {
    return `${this.#name} d${this.#attackPower} ${this.#healthPotions} health potions!`;
  }
}
