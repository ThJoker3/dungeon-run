import readlinesync from 'readline-sync';

/**
 * Handles all input and output in the terminal. No other class writes to the console.
 */
export class ConsoleUI {

  /**
   * Prints a message to the terminal.
   *
   * @param {string} text - The message to print.
   */
  showMessage(text) {
    console.log(text);
  }

  /**
   * Asks the player a question and waits for a typed answer.
   *
   * @param {string} question - The question to show.
   * @returns {string} The text the player typed (empty string if they just pressed Enter).
   */
  askForText(question) {
    return readlinesync.question(question);
  }

  /**
   * Shows a numbered menu and waits for the player to pick one option.
   *
   * @param {string[]} options - The options to list.
   * @param {string} question - The question shown below the menu.
   * @returns {number} The index of the chosen option.
   */
  askToChoose(options, question) {
    return readlinesync.keyInSelect(options, question, { cancel: false });
  }

  /**
   * Asks a yes/no question and waits for the player to press y or n.
   *
   * @param {string} question - The question to show.
   * @returns {boolean} True if the player answered yes.
   */
  askYesNo(question) {
    return readlinesync.keyInYN(question)
  }
}
