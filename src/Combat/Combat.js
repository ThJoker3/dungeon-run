import { Enemy, FightEncounterHandler } from "rpg-fight-encounter"

/**
 * Runs a turn-based fight. Wraps FightEncounterHandler from rpg-fight-encounter
 * so the rest of the game does not depend on that module directly.
 */
export class Combat {
  #ui

  /**
   * @param {ConsoleUI} ui - Used to show the fight status and ask for actions.
   */
  constructor(ui) {
    this.#ui = ui
  }

  /**
   * Fights one enemy until either the adventurer or the enemy is dead.
   *
   * @param {Adventurer} adventurer - The player's character.
   * @param {string} enemyName - The name of the enemy.
   * @param {number} enemyAttackPower - Number of sides on the enemy's damage die.
   * @returns {boolean} True if the adventurer survived the fight.
   */
  fight(adventurer, enemyName, enemyAttackPower) {
    const enemy = new Enemy(enemyName, enemyAttackPower)
    const handler = new FightEncounterHandler([adventurer.getFighter()], [enemy])
    handler.setupFight()
    handler.startFight((player, _allies, opponents) => this.#chooseAction(player, opponents[0]))
    return adventurer.getIsAlive()
  }

  /**
   * Called by the fight module every time it is the player's turn.
   *
   * @param {Player} player - The player's fighter.
   * @param {Enemy} enemy - The enemy being fought.
   * @returns {object} The action in the format rpg-fight-encounter expects.
   */
  #chooseAction(player, enemy) {
    this.#ui.showMessage(`${player.getName()} ${player.getCurrentHitPoints()}/${player.getMaxHitPoints()} HP vs ${enemy.getName()} ${enemy.getCurrentHitPoints()}/${enemy.getMaxHitPoints()} HP`)
    const actions = [
      { type: 'attack', target: enemy },
      { type: 'guard' },
      { type: 'heal', target: player },
      { type: 'skipTurn' }
    ]
    const index = this.#ui.askToChoose(['Attack', 'Guard', 'Heal', 'Skip Turn'], `What will you do ${player.getName()}? `)
    return actions[index]
  }
}
