import { Randomizer } from 'dice-rng-toolkit';

export class Dungeon {
  #rng;
  #rooms;
  #randomizer;

  constructor(rng) {
    this.#randomizer = new Randomizer();
    this.#rng = rng;
    this.#rooms = this.#createRooms();
  }

  #createRooms() {
    const rooms = [];
    for (let i = 0; i < 9; i++) {
      rooms.push(this.#randomizer.pickWeighted(['monster', 'campfire', 'treasure'], [60, 25, 15], this.#rng));
    }
    rooms.push('boss');
    return rooms;
  }

  getRooms() {
    return this.#rooms;
  }
}