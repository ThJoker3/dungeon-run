#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Player } from './character/Player.js'
import { Enemy } from './character/Enemy.js'
import { FightEncounterHandler } from './encounters/fight/FightEncounterHandler.js'
import type { PlayerFightActions } from './encounters/fight/fightAction.js'

/**
 * Extracts the name argument from the command line.
 *
 * @example
 * parseArgs(['Ada Lovelace']) // Returns 'Ada Lovelace'
 * parseArgs([]) // Returns undefined
 * @param argv - Command-line arguments, excluding the node executable and
 *   script path (i.e. `process.argv.slice(2)`).
 * @returns The first positional argument, if any.
 */
export function parseArgs(argv: string[]): string | undefined {
  return argv[0]
}

/**
 * Asks the player to choose an action during their turn in the fight encounter.
 *
 * @param player - The player character whose action is being chosen.
 * @param livingAllies - The list of living allies of the player.
 * @param livingOpponents - The list of living opponents of the player.
 * @returns The action chosen by the player.
 */
function askPlayerAction(player: Player, livingAllies: Player[], livingOpponents: Enemy[]): PlayerFightActions {
  console.log(`${player.getName()}, Choose an action:`)
  console.log('1. Attack')
  console.log('2. Guard')
  console.log('3. Heal')
  console.log('4. Skip turn')
  const answer = readlineSync.question('> ')

  switch (answer) {
    case '1':
      return { type: 'attack', target: livingOpponents[0] }
    case '2':
      return { type: 'guard' }
    case '3':
      return { type: 'heal', target: livingAllies[0] }
    case '4':
      return { type: 'skipTurn' }
    default:
      console.log('Ogiltigt val, du hoppar över din tur.')
      return { type: 'skipTurn' }
  }
}
/**
 * Execution entry point.
 */
function main(): void {
  try {
    const player1 = new Player('Krulle', 10)
    console.log(player1)
    const enemy1 = new Enemy('Goblin', 8)
    const enemy2 = new Enemy('Orc', 12)
    console.log(enemy1)
    console.log('Starting fight...')
    const playerFighters = [player1]
    const enemyFighters = [enemy1, enemy2]
    const fight = new FightEncounterHandler(playerFighters, enemyFighters)
    fight.setupFight()
    fight.startFight(askPlayerAction)
    console.log(fight.getFightMembers())
    for (const member of fight.getFightMembers()) {
      console.log(`${member.getName()} HP: ${member.getCurrentHitPoints()}`)
    }
  } catch (error) {
    console.error('An unexpected error occurred during execution:', (error as Error).message)
    process.exitCode = 1
  }
}

main()
