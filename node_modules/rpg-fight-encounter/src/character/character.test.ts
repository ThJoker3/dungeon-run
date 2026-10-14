import { afterEach, describe, it, expect, vi } from 'vitest'
import { Player } from './Player.js'
import { Enemy } from './Enemy.js'

afterEach(() => {
  vi.restoreAllMocks()
})

it.each([
  { randomValue: 0, expectedHp: 4 },
  { randomValue: 0.9, expectedHp: 24 },
])('rolls $randomValue to get a total of $expectedHp initial HP', ({ randomValue, expectedHp }) => {
  vi.spyOn(Math, 'random').mockReturnValue(randomValue)

  const player = new Player('Krulle', 10)

  expect(player.getMaxHitPoints()).toBe(expectedHp)
})

it('starts with current HP equal to maximum HP', () => {
  const player = new Player('Krulle', 10)

  expect(player.getCurrentHitPoints()).toBe(player.getMaxHitPoints())
})

describe('Player taking damage', () => {
  it('reduces current HP when taking damage', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const player = new Player('Krulle', 10)

    player.defend(4)

    expect(player.getCurrentHitPoints()).toBe(1)
    expect(player.getIsAlive()).toBe(true)
  })

  it('Sets characters as not alive when current HP reaches 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const player = new Player('Krulle', 10)

    player.defend(5)

    expect(player.getCurrentHitPoints()).toBe(0)
    expect(player.getIsAlive()).toBe(false)
  })
})

it('Armorclass gets higher after guarding', () => {
  const player = new Player('Krulle', 10)
  const initialArmorClass = player.getArmorClass()

  player.guard()

  expect(player.getArmorClass()).toBe(initialArmorClass + 1)
})

describe('Player healing', () => {
  it("Player heals itself when healing 'action' is used", () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    const player = new Player('Krulle', 10)

    player.defend(7)
    player.heal(player)

    expect(player.getCurrentHitPoints()).toBe(player.getMaxHitPoints() - 1)
  })

  it('Player cannot heal beyond maximum HP', () => {
    const player = new Player('Krulle', 10)

    player.heal(player)

    expect(player.getCurrentHitPoints()).toBe(player.getMaxHitPoints())
  })

  it('Character cannot heal a dead Allie', () => {
    const player = new Player('Krulle', 10)
    const ally = new Player('Ally', 10)
    ally.defend(200)

    player.heal(ally)

    expect(ally.getCurrentHitPoints()).toBe(0)
    expect(ally.getIsAlive()).toBe(false)
  })

  it('heals a living ally', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const player = new Player('Krulle', 10)
    const ally = new Player('Ally', 10)

    ally.defend(7) // 16 HP → 10 HP
    player.heal(ally)

    expect(ally.getCurrentHitPoints()).toBe(15) // Uses atm. heal as magic number (5)
  })
})

describe('Character attacking', () => {
  it('does not damage the target when the attack misses', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const attacker = new Player('Krulle', 10)
    const target = new Enemy('Goblin', 10)
    const targetHp = target.getCurrentHitPoints()

    attacker.attack(target)

    expect(target.getCurrentHitPoints()).toBe(targetHp)
  })
})
