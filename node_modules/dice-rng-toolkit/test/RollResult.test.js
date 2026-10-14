import { describe, it, expect } from 'vitest';
import { RollResult } from '../src/RollResult.js';

describe('RollResult', () => {
  it('should calculate the correct total from the rolls', () => {
    const result = new RollResult([4, 2, 6]);
    expect(result.getTotal()).toBe(12);
  })

  it('should return the individual rolls', () => {
    const result = new RollResult([1, 1]);
    expect(result.getRolls()).toEqual([1, 1]);
  })

  it('should return a copy of the rolls array, not the original', () => {
    const result = new RollResult([2, 4, 6]);
    const firstCopy = result.getRolls();
    firstCopy.push(99);
    expect(result.getRolls()).toEqual([2, 4, 6]);
  })

  it('should return a correctly formatted string from toString', () => {
    const result = new RollResult([4, 2, 6]);
    expect(result.toString()).toBe('Rolls: [4, 2, 6], Total: 12');
  })
})
