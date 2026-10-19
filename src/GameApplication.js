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

  #createRoom(type) {
    if (type === 'monster') return new MonsterRoom();
    if (type === 'campfire') return new CampfireRoom();
    if (type === 'treasure') return new TreasureRoom();
    if (type === 'boss') return new BossRoom();
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
    }
  }
}