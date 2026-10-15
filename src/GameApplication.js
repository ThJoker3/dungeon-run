export class GameApplication {

  constructor() {
    this.#ui = null;
  }

  run() {
    const ui = new ConsoleUI();
    ui.showMessage('Welcome to Dungeon Run! \n What is thy name, adventurer?');
  }
}