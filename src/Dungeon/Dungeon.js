import { Randomizer } from 'dice-rng-toolkit';
import { BossRoom } from './BossRoom.js';
import { CampfireRoom } from './CampfireRoom.js';
import { MonsterRoom } from './MonsterRoom.js';
import { TreasureRoom } from './TreasureRoom.js';

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
      const type = this.#randomizer.pickWeighted(['monster', 'campfire', 'treasure'], [60, 25, 15], this.#rng);
      rooms.push(this.#createRoom(type))
    }
    rooms.push(new BossRoom(this.#rng));
    return rooms;
  }

  #createRoom(type) {
    if (type === 'monster') return new MonsterRoom(this.#rng);
    if (type === 'campfire') return new CampfireRoom();
    if (type === 'treasure') return new TreasureRoom(this.#rng);
  }
  
  getRooms() {
    return this.#rooms;
  }
}