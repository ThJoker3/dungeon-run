import { ConsoleUI } from './ConsoleUI.js';

export class GameApplication {
  #ui;

  constructor() {
    this.#ui = new ConsoleUI();
  }

  run() {
    this.#ui.showMessage('Welcome to Dungeon Run! \nWhat is thy name, adventurer?');
  }
}