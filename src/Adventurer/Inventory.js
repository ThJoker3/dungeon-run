export class Inventory {
  #coins
  #healthPotions
  #items

  constructor(healthPotions) {
    this.#coins = 0
    this.#healthPotions = healthPotions
    this.#items = []
  }

  addCoins(amount) {
    this.#coins += amount
  }

  addItem(itemName) {
    this.#items.push(itemName)
  }

  hasHealthPotion() {
    return this.#healthPotions > 0
  }

  useHealthPotion() {
    if (!this.hasHealthPotion()) {
      throw new Error('No health potions left')
    }
    this.#healthPotions--
  }

  getCoins() {
    return this.#coins
  }

  getDescription() {
    const items = this.#items.length > 0 ? this.#items.join(', ') : 'none'
    return `Coins: ${this.#coins} | Health potions: ${this.#healthPotions} | Items: ${items}`
  }
}