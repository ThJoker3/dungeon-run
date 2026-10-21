import { ConsoleUI } from './ConsoleUI.js';
import { Weapon } from './Adventurer/Weapon.js';
import { Adventurer } from './Adventurer/Adventurer.js';
import { RandomGenerator } from 'dice-rng-toolkit';
import { Dungeon } from './Dungeon/Dungeon.js';

export class GameApplication {
  #ui;

  constructor() {
    this.#ui = new ConsoleUI();
  }

  
  #chooseWeapon() {
    const weapons = [
      new Weapon('Dagger', 6, 3),
      new Weapon('Sword', 8, 2),
      new Weapon('Axe', 10, 1),
      new Weapon('Staff', 8, 2)
    ]
    const descriptions = weapons.map(weapon => weapon.getDescription());
    const index = this.#ui.askToChoose(descriptions, 'Which weapon shall thou choose? ');
    return weapons[index];
  }

  #askForSeed() {
    this.#ui.showMessage('Welcome to Dungeon Run!');
    this.#ui.showMessage('Press Enter to use a random seed or enter a number to use as a seed. ');
    while (true) {
      const input = this.#ui.askForText('Enter a seed: ');
      if (input === '') {
        return Date.now();
      }
      const seed = Number(input);
      if (Number.isInteger(seed)) {
        return seed
      }
      this.#ui.showMessage('The seed must be a whole number. Try again')
    }
  }

  #showRoomMenu(adventurer) {
    const options = ['Continue', 'View inventory', 'Use health potion']
    while (true) {
      const choice = this.#ui.askToChoose(options, 'What next? ')
      if (choice === 0) {
        return
      }
      if (choice === 1) {
        this.#ui.showMessage(adventurer.getInventory().getDescription())
      }
      if (choice === 2) {
        this.#drinkHealthPotion(adventurer)
      }
    }
  }

  #drinkHealthPotion(adventurer) {
    const inventory = adventurer.getInventory()
    if (!inventory.hasHealthPotion()) {
      this.#ui.showMessage('You have no health potions left.')
      return
    }
    if (adventurer.getCurrentHitPoints() === adventurer.getMaxHitPoints()) {
      this.#ui.showMessage('You are already at full health.')
      return
    }
    inventory.useHealthPotion()
    adventurer.heal()
    this.#ui.showMessage(`You drink a potion. HP: ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()}`)
  }

  #playGame() {
    const seed = this.#askForSeed();
    const rng = new RandomGenerator(seed)
    const dungeon = new Dungeon(rng);
    const playerName = this.#ui.askForText('What is thy name, Adventurer? ');
    const weapon = this.#chooseWeapon();
    this.#ui.showMessage(`Welcome, ${playerName}! You have chosen the ${weapon.getName()}. Prepare for your adventure!`);
    const adventurer = new Adventurer(playerName, weapon);
    this.#ui.showMessage(`${adventurer.getName()} wields a ${adventurer.getWeapon().getName()} with ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()} HP.`);
    let roomsVisited = 0
    for (const room of dungeon.getRooms()) {
      roomsVisited++
      room.enter(adventurer, this.#ui)
      if (!adventurer.getIsAlive()) {
        break
      }
      this.#showRoomMenu(adventurer)
    }
    this.#showSummary(adventurer, roomsVisited, seed)
  }

  #showSummary(adventurer, roomsVisited, seed) {
    const result = adventurer.getIsAlive() ? 'Victory! You defeated the boss!' : `${adventurer.getName()} has fallen...`
    this.#ui.showMessage('--- Run Summary ---')
    this.#ui.showMessage(result)
    this.#ui.showMessage(`Rooms visited: ${roomsVisited}/10`)
    this.#ui.showMessage(adventurer.getInventory().getDescription())
    this.#ui.showMessage(`Seed: ${seed}`)
  }

  run() {
    do {
      this.#playGame()
    } while (this.#ui.askYesNo('Play again? '))
    this.#ui.showMessage('Farewell, Adventurer')
  }
}