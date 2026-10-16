export class Weapon {
  #name;
  #attackPower;
  #healthPotions;

  constructor(name, attackPower, healthPotions) {
    this.#name = name;
    this.#attackPower = attackPower;
    this.#healthPotions = healthPotions;
  }

  getName() {
    return this.#name;
  }

  getAttackPower() {
    return this.#attackPower;
  }

  getHealthPotions() {
    return this.#healthPotions; 
  }

  getDescription() {
    return `${this.#name} d${this.#attackPower} ${this.#healthPotions} health potions!`;
  }
}