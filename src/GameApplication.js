import { ConsoleUI } from './ConsoleUI.js';
import { Weapon } from './Adventurer/Weapon.js';

export class GameApplication {
  #ui;

  constructor() {
    this.#ui = new ConsoleUI();
  }

  run() {
    this.#ui.showMessage('Welcome to Dungeon Run!');
    const playerName = this.#ui.askForText('What is thy name, Adventurer? ');
    this.#ui.showMessage(`Welcome, ${playerName}! Prepare for your adventure!`);
    const dagger = new Weapon('Dagger', 6, 3);
    this.#ui.showMessage(`${dagger.getName()} d${dagger.getAttackPower()} ${dagger.getHealthPotions()} health potions!`);
  }
}