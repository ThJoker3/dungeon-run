import { ConsoleUI } from './ConsoleUI.js';
import { Weapon } from './Adventurer/Weapon.js';

export class GameApplication {
  #ui;

  constructor() {
    this.#ui = new ConsoleUI();
  }

  
  #chooseWeapon() {
    const weapons = [
      new Weapon('Dagger', 6, 3),
      new Weapon('Sword', 8, 2),
      new Weapon('Axe', 10, 1)
    ]
    const descriptions = weapons.map(weapon => weapon.getDescription());
    const index = this.#ui.askToChoose(descriptions, 'Which weapon shall thou choose? ');
    return weapons[index];
  }

  run() {
    this.#ui.showMessage('Welcome to Dungeon Run!');
    const playerName = this.#ui.askForText('What is thy name, Adventurer? ');
    const weapon = this.#chooseWeapon();
    this.#ui.showMessage(`Welcome, ${playerName}! You have chosen the ${weapon.getName()}. Prepare for your adventure!`);
  }
}