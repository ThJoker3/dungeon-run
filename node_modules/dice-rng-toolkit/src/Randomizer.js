/**
 * RNG-driven utilities for working with arrays: picking a random element, shuffling,
 * and weighted random selection.
 */
export class Randomizer {
  #assertArray(value, name) {
  if (!Array.isArray(value)) {
    throw new Error(`${name} must be an array`);
  }
}

  /**
   * @param {Array} array - The array to pick from.
   * @param {RandomGenerator} randomGenerator - The random generator to use.
   * @returns {*} A randomly chosen element from `array`.
   * @throws {Error} If `array` is not an array, or is empty.
   */
  pick(array, randomGenerator) {
    this.#assertArray(array, "Argument");
    if (array.length === 0) {
      throw new Error("Array must not be empty");
    }
    const index = randomGenerator.nextInt(0, array.length - 1);
    return array[index];
  }

  /**
   * @param {Array} array - The array to shuffle. Not mutated.
   * @param {RandomGenerator} randomGenerator - The random generator to use.
   * @returns {Array} A new array containing the same elements as `array`, in random order.
   * @throws {Error} If `array` is not an array.
   */
  shuffle(array, randomGenerator) {
    this.#assertArray(array, "Argument");
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = randomGenerator.nextInt(0, i);
      let temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  /**
   * Picks a random element from `items`, where each element's chance of being picked
   * is proportional to its corresponding value in `weights`.
   * @param {Array} items - The candidate items.
   * @param {number[]} weights - The relative weight of each item, same length as `items`.
   * @param {RandomGenerator} randomGenerator - The random generator to use.
   * @returns {*} A randomly chosen element from `items`.
   * @throws {Error} If `items`/`weights` are not arrays, or their lengths differ.
   */
  pickWeighted(items, weights, randomGenerator) {
    this.#assertArray(items, "Items");
    this.#assertArray(weights, "Weights");
    if (items.length !== weights.length) {
      throw new Error("Items and weights must have the same length");
    }
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const threshold = randomGenerator.nextFloat() * totalWeight;
    let running = 0;
    for (let i = 0; i < items.length; i++) {
      running += weights[i];
      if (running > threshold) {
        return items[i];
      }
    }
  }
}