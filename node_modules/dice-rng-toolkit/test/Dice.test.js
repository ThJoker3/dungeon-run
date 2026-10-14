import { describe, it, expect } from 'vitest';
import { Dice } from '../src/Dice.js'
import { RandomGenerator } from '../src/RandomGenerator.js';

describe('Dice', () => {
  it('should always roll a value within the die range', () => {
    const dice = new Dice(6);
    const rng = new RandomGenerator(1);
    for (let i = 0; i < 100; i++) {
      const value = dice.roll(rng);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  })

  it('should throw an error if sides is not a positive integer', () => {
    expect(() => new Dice(-3)).toThrow("Number of sides must be a positive integer");
  })
})