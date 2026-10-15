import readlinesync from 'readline-sync';

export class ConsoleUI {

  showMessage(text) {
    console.log(text);
  }

  askForText(question) {
    return readlinesync.question(question);
  }
}