import { Player } from 'rpg-fight-encounter';

export class Adventurer {
  #weapon;
  #fighter;

  constructor(name, weapon) {
    this.#weapon = weapon;
    this.#fighter = new Player(name, weapon.getAttackPower());
  }

  getName() {
    return this.#fighter.getName();
  }

  getWeapon() {
    return this.#weapon;
  }

  getFighter() {
    return this.#fighter
  }

  getCurrentHitPoints() {
    return this.#fighter.getCurrentHitPoints();
  }

  getMaxHitPoints() {
    return this.#fighter.getMaxHitPoints();
  }

  heal() {
    this.#fighter.heal(this.#fighter)
  }

  getIsAlive() {
    return this.#fighter.getIsAlive();
  }
}