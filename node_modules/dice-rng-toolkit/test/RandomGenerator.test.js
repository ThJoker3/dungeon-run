import {describe, it, expect} from 'vitest';
import {RandomGenerator} from '../src/RandomGenerator.js';

describe('RandomGenerator', () => {
  it('should generate the same sequence of numbers for the same seed', () => {
    const seed = 12345;
    const rng1 = new RandomGenerator(seed);
    const rng2 = new RandomGenerator(seed);
    const results1 = [rng1.nextFloat(), rng1.nextFloat(), rng1.nextFloat()];
    const results2 = [rng2.nextFloat(), rng2.nextFloat(), rng2.nextFloat()];
    expect(results1).toEqual(results2);
  })

  it('should generate different sequences of numbers for different seeds', () => {
    const seedA = 12345;
    const seedB = 67890;
    const rng1 = new RandomGenerator(seedA);
    const rng2 = new RandomGenerator(seedB);
    const results1 = [rng1.nextFloat(), rng1.nextFloat(), rng1.nextFloat()];
    const results2 = [rng2.nextFloat(), rng2.nextFloat(), rng2.nextFloat()];
    expect(results1).not.toEqual(results2);
  })

  it('should generate the same sequence after reset with the same seed', () => {
    const seed = 12345;
    const rng = new RandomGenerator(seed);
    const resultsBeforeReset = [rng.nextFloat(), rng.nextFloat(), rng.nextFloat()];
    rng.reset(seed);
    const resultsAfterReset = [rng.nextFloat(), rng.nextFloat(), rng.nextFloat()];
    expect(resultsBeforeReset).toEqual(resultsAfterReset);
  })

  it('should throw an error if the seed is not an integer', () => {
    const seed = 123.45;
    expect(() => new RandomGenerator(seed)).toThrow("Seed must be an integer");

    const rng = new RandomGenerator(42);
    expect(() => rng.reset(123.45)).toThrow("Seed must be an integer");
  })

  it('should generate numbers in the range [0, 1)', () => {
    const rng = new RandomGenerator();
    const value = rng.nextFloat();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(1);
  })

  it('should generate integers in the specified range', () => {
    const rng = new RandomGenerator();
    const min = 1;
    const max = 6;
    for (let i = 0; i < 100; i++) {
      const value = rng.nextInt(min, max);
      expect(value).toBeGreaterThanOrEqual(min);
      expect(value).toBeLessThanOrEqual(max);
    }
  })

  it("Should throw an error if min is greater than max in nextInt", () => {
    const rng = new RandomGenerator();
    expect(() => rng.nextInt(10, 1)).toThrow("Min must not be greater than Max");
  })

  it("Should throw an error if min or max is not an integer in nextInt", () => {
    const rng = new RandomGenerator();
    expect(() => rng.nextInt(1.5, 10)).toThrow("Min must be an integer");
    expect(() => rng.nextInt(1, 10.5)).toThrow("Max must be an integer");
  })
})