import { ConsoleUI } from '../ConsoleUI.js';
import { Weapon } from './Weapon.js';

export class GameApplication {
  #ui;

  constructor() {
    this.#ui = new ConsoleUI();
  }

  run() {
    this.#ui.showMessage('Welcome to Dungeon Run!');
    const playerName = this.#ui.askForText('What is thy name, Adventurer? ');
    this.#ui.showMessage(`Welcome, ${playerName}! Prepare for your adventure!`);
  }
}