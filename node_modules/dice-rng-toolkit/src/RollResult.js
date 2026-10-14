/**
 * An immutable value object representing the outcome of a dice roll: the individual
 * rolls and their total.
 */
export class RollResult {
  #rolls;

  /**
   * @param {number[]} rolls - The individual roll results.
   */
  constructor(rolls) {
    this.#rolls = rolls;
  }

  /**
   * @returns {number[]} A copy of the individual roll results. Mutating the returned
   * array does not affect this `RollResult`.
   */
  getRolls() {
    return [...this.#rolls];
  }

  /**
   * @returns {number} The sum of all the individual rolls.
   */
  getTotal() {
    return this.#rolls.reduce((total, roll) => total + roll, 0);
  }

  /**
   * @returns {string} A human-readable representation, e.g. `"Rolls: [4, 2, 6], Total: 12"`.
   */
  toString() {
    return `Rolls: [${this.#rolls.join(", ")}], Total: ${this.getTotal()}`;
  }
}