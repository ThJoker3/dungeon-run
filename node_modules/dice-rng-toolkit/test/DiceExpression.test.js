import { describe, it, expect } from 'vitest';
import { DiceExpression } from '../src/DiceExpression.js';
import { RollResult } from '../src/RollResult.js';
import { RandomGenerator } from '../src/RandomGenerator.js';

describe('DiceExpression', () => {
  it('should parse valid dice notation like "3d6"', () => {
    expect(() => new DiceExpression('3d6')).not.toThrow();
  })

  it('should treat "d6" as a shorthand for "1d6"', () => {
    const expr = new DiceExpression('d6');
    const rng = new RandomGenerator(1);
    const result = expr.roll(rng);
    expect(result.getRolls().length).toBe(1)
  })

  it('should throw an error for invalid dice notation', () => {
    expect(() => new DiceExpression('invalid')).toThrow('Invalid dice notation.');
  })

  it('should return a RollResult with the correct number of rolls', () => {
    const expr = new DiceExpression('3d6');
    const rng = new RandomGenerator(1);
    const result = expr.roll(rng);
    expect(result).toBeInstanceOf(RollResult);
    expect(result.getRolls().length).toBe(3);
  })

  it('should return rolls within the correct range for the given sides', () => {
    const expr = new DiceExpression('5d6');
    const rng = new RandomGenerator(1);
    const result = expr.roll(rng);
    for (const roll of result.getRolls()) {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(6);
    }
  })
})