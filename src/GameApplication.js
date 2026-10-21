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
    const input = this.#ui.askForText('Enter a seed: ');
    if (input === '') {
      return Date.now();
    }
    return Number(input);
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
    inventory.useHealthPotion()
    adventurer.heal()
    this.#ui.showMessage(`You drink a potion. HP: ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()}`)
  }

  run() {
    const seed = this.#askForSeed();
    const rng = new RandomGenerator(seed)
    const dungeon = new Dungeon(rng);
    const playerName = this.#ui.askForText('What is thy name, Adventurer? ');
    const weapon = this.#chooseWeapon();
    this.#ui.showMessage(`Welcome, ${playerName}! You have chosen the ${weapon.getName()}. Prepare for your adventure!`);
    const adventurer = new Adventurer(playerName, weapon);
    this.#ui.showMessage(`${adventurer.getName()} wields a ${adventurer.getWeapon().getName()} with ${adventurer.getCurrentHitPoints()}/${adventurer.getMaxHitPoints()} HP.`);
    for (const room of dungeon.getRooms()) {
      room.enter(adventurer, this.#ui);
      if (!adventurer.getIsAlive()) {
        break
      }
      this.#showRoomMenu(adventurer)
    }
    if (adventurer.getIsAlive()) {
      this.#ui.showMessage('Victory! You defeated the boss!')
    } else {
      this.#ui.showMessage(`${adventurer.getName()} has fallen...`)
    }
  }
}