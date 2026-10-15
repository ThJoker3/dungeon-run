import { readline-sync } from 'readline-sync';

export class ConsoleUI {
  
  constructor() {
    this.#ui = this;
  }

  showMessage(text) {
    console.log(text);
  }

  askForText(question) {
    return readline-sync.question(question);
  }
}