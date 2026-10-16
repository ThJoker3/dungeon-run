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

  getCurrentHitPoints() {
    return this.#fighter.getCurrentHitPoints();
  }

  getMaxHitPoints() {
    return this.#fighter.getMaxHitPoints();
  }

  getIsAlive() {
    return this.#fighter.getIsAlive();
  }
}