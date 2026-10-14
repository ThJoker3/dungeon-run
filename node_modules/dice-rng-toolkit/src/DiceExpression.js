import { Dice } from "./Dice.js";
import { RollResult } from "./RollResult.js";

/**
 * Parses standard dice notation (e.g. `"3d6"`, or `"d6"` as shorthand for `"1d6"`)
 * and rolls the corresponding number of dice.
 */
export class DiceExpression {
  #count;
  #sides;

  /**
   * @param {string} notation - Dice notation, e.g. `"3d6"` or `"d20"`.
   * @throws {Error} If `notation` does not match the expected `"NdM"` format.
   */
  constructor(notation) {
    const match = notation.match(/^(\d*)d(\d+)$/);
    if (!match) {
      throw new Error("Invalid dice notation.");
    }
    this.#count = Number(match[1]) ? Number (match[1]) : 1;
    this.#sides = Number(match[2]);
  }

  /**
   * Rolls all the dice described by this expression's notation.
   * @param {RandomGenerator} randomGenerator - The random generator to use for the rolls.
   * @returns {RollResult} The individual rolls and their total.
   */
  roll(randomGenerator) {
    const dice = new Dice(this.#sides);
    const rollsArray = [];
    for (let i = 0; i< this.#count; i++) {
      rollsArray.push(dice.roll(randomGenerator));
    }
    return new RollResult(rollsArray);
  }
}