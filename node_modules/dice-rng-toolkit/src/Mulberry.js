export class Mulberry {
  #state;
  #FIRST_SHIFT = 15;
  #SECOND_SHIFT = 7;
  #THIRD_SHIFT = 14;
  #MIX_MASK = 61;
  #INCREMENT = 0x6D2B79F5;
  #ODD_MASK = 1;

  constructor(seed) {
    this.reset(seed);
  }

  reset(seed) {
    this.#state = seed | 0;
  }

  nextUint32() {
    this.#state = (this.#state + this.#INCREMENT) | 0;
    let t = this.#state;
    t = Math.imul(t ^ (t >>> this.#FIRST_SHIFT), t | this.#ODD_MASK);
    t = (t ^ (t + Math.imul(t ^ (t >>> this.#SECOND_SHIFT), t | this.#MIX_MASK)));
    return (t ^ (t >>> this.#THIRD_SHIFT)) >>> 0;
  }
}