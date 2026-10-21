import { Player } from 'rpg-fight-encounter';
import { Inventory } from './Inventory.js';

export class Adventurer {
  #weapon;
  #fighter;
  #inventory

  constructor(name, weapon) {
    this.#weapon = weapon;
    this.#fighter = new Player(name, weapon.getAttackPower());
    this.#inventory = new Inventory(weapon.getHealthPotions())
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

  getInventory() {
    return this.#inventory
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