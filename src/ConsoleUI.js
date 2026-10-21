import readlinesync from 'readline-sync';

export class ConsoleUI {

  showMessage(text) {
    console.log(text);
  }

  askForText(question) {
    return readlinesync.question(question);
  }

  askToChoose(options, question) {
    return readlinesync.keyInSelect(options, question, { cancel: false });
  }

  askYesNo(question) {
    return readlinesync.keyInYN(question)
  }
}