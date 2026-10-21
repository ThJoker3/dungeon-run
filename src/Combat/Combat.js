import { Enemy, FightEncounterHandler } from "rpg-fight-encounter"

export class Combat {
  #ui

  constructor(ui) {
    this.#ui = ui
  }

  fight(adventurer, enemyName, enemyAttackPower) {
    const enemy = new Enemy(enemyName, enemyAttackPower)
    const handler = new FightEncounterHandler([adventurer.getFighter()], [enemy])
    handler.setupFight()
    handler.startFight((player, allies, opponents) => this.#chooseAction(player, opponents[0]))
    return adventurer.getIsAlive()
  }

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