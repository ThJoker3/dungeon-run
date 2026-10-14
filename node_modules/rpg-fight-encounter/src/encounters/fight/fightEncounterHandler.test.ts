import { afterEach, describe, expect, it, vi } from 'vitest'
import { Player } from '../../character/Player.js'
import { Enemy } from '../../character/Enemy.js'
import { FightEncounterHandler } from './FightEncounterHandler.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('FightEncounterHandler', () => {
  describe('check for living participants before the fight starts', () => {
    it('Fight encounter starts with all participants alive', () => {
      const player = new Player('Krulle', 10)
      const player2 = new Player('Ally', 10)
      const enemy = new Enemy('Goblin', 6)
      const enemy2 = new Enemy('Orc', 8)
      const fight = new FightEncounterHandler([player, player2], [enemy, enemy2])

      expect(fight.getFightMembers()).toEqual([player, player2, enemy, enemy2])

      expect(player.getIsAlive()).toBe(true)
      expect(enemy.getIsAlive()).toBe(true)
    })

    it('Fight encounter start with all players alive', () => {
      const player = new Player('Krulle', 10)
      const player2 = new Player('Ally', 10)
      const enemy = new Enemy('Goblin', 6)
      const enemy2 = new Enemy('Orc', 8)
      const fight = new FightEncounterHandler([player, player2], [enemy, enemy2])

      expect(fight.getLivingAllies(player)).toEqual([player, player2])

      expect(player.getIsAlive()).toBe(true)
    })

    it('Fight encounter start with all enemies alive', () => {
      const player = new Player('Krulle', 10)
      const player2 = new Player('Ally', 10)
      const enemy = new Enemy('Goblin', 6)
      const enemy2 = new Enemy('Orc', 8)
      const fight = new FightEncounterHandler([player, player2], [enemy, enemy2])

      expect(fight.getLivingOpponents(player)).toEqual([enemy, enemy2])

      expect(enemy.getIsAlive()).toBe(true)
    })
  })

  it("Fight encounter ends when enemy 'team' is defeated", () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const player = new Player('Krulle', 30)
    const enemy = new Enemy('Goblin', 6)
    const fight = new FightEncounterHandler([player], [enemy])

    fight.startFight(() => ({ type: 'attack', target: enemy }))

    expect(player.getIsAlive()).toBe(true)
    expect(enemy.getIsAlive()).toBe(false)
  })

  it("Fight encounter ends when player 'team' is defeated", () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const player = new Player('Krulle', 3)
    const enemy = new Enemy('Goblin', 30)
    const fight = new FightEncounterHandler([player], [enemy])

    fight.startFight(() => ({ type: 'skipTurn' }))

    expect(player.getIsAlive()).toBe(false)
    expect(enemy.getIsAlive()).toBe(true)
  })

  it('player starts fight when having a higher speed attribute than the enemy', () => {
    const player = new Player('Krulle', 10)
    const enemy = new Enemy('Goblin', 6)

    vi.spyOn(player, 'getSpeed').mockReturnValue(2)
    vi.spyOn(enemy, 'getSpeed').mockReturnValue(1)

    const fight = new FightEncounterHandler([player], [enemy])
    fight.setupFight()

    expect(fight.getFightMembers()[0]).toBe(player)
  })

  it('enemy starts fight when having a higher speed attribute than the player', () => {
    const player = new Player('Krulle', 10)
    const enemy = new Enemy('Goblin', 6)

    vi.spyOn(player, 'getSpeed').mockReturnValue(1)
    vi.spyOn(enemy, 'getSpeed').mockReturnValue(2)

    const fight = new FightEncounterHandler([player], [enemy])
    fight.setupFight()

    expect(fight.getFightMembers()[0]).toBe(enemy)
  })
})
