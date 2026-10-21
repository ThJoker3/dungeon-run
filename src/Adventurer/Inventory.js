/**
 * Keeps track of the adventurer's coins, health potions and items.
 */
export class Inventory {
  #coins
  #healthPotions
  #items

  /**
   * @param {number} healthPotions - Number of health potions to start with.
   */
  constructor(healthPotions) {
    this.#coins = 0
    this.#healthPotions = healthPotions
    this.#items = []
  }

  /**
   * @param {number} amount - Number of coins to add.
   */
  addCoins(amount) {
    this.#coins += amount
  }

  /**
   * @param {string} itemName - The name of the item to add.
   */
  addItem(itemName) {
    this.#items.push(itemName)
  }

  /**
   * Adds one health potion.
   */
  addHealthPotion() {
    this.#healthPotions++
  }

  /**
   * @returns {boolean} True if there is at least one health potion left.
   */
  hasHealthPotion() {
    return this.#healthPotions > 0
  }

  /**
   * Removes one health potion. Does not heal, that is done by the adventurer.
   *
   * @throws {Error} If there are no health potions left.
   */
  useHealthPotion() {
    if (!this.hasHealthPotion()) {
      throw new Error('No health potions left')
    }
    this.#healthPotions--
  }

  /**
   * @returns {number} The number of coins.
   */
  getCoins() {
    return this.#coins
  }

  /**
   * @returns {string} A one-line summary of coins, potions and items.
   */
  getDescription() {
    const items = this.#items.length > 0 ? this.#items.join(', ') : 'none'
    return `Coins: ${this.#coins} | Health potions: ${this.#healthPotions} | Items: ${items}`
  }
}
