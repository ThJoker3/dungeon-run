import { Player } from '../../character/Player.js'
import { Enemy } from '../../character/Enemy.js'
import { Character } from '../../character/Character.js'
import type { ChoosePlayerAction, PlayerFightActions } from './fightAction.js'
import type { FightEncounterHandlerInterface } from './fightEncounterHandlerInterface.js'

/**
 * Handles the logic for managing fight encounters in the game.
 */
export class FightEncounterHandler implements FightEncounterHandlerInterface {
  private playerFighters: Player[] = []
  private enemyFighters: Enemy[] = []
  private fightParticipants: Character[] = []

  /**
   * Initializes the fight encounter handler by combining players and enemies into the fight members list.
   *
   * @param playerFighters - An array of player characters participating in the fight.
   * @param enemyFighters - An array of enemy characters participating in the fight.
   */
  constructor(playerFighters: Player[], enemyFighters: Enemy[]) {
    this.playerFighters = playerFighters
    this.enemyFighters = enemyFighters
    this.fightParticipants = [...playerFighters, ...enemyFighters]
  }

  /**
   * Gets the list of all fight members, including both players and enemies.
   *
   * @returns an array of all fight members in the encounter.
   */
  public getFightMembers(): readonly Character[] {
    return [...this.fightParticipants]
  }

  /**
   * Gets the list of living team members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the player's or enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose allies are being retrieved. (used to determine the team they belong to)
   * @returns List of team members that are alive
   */
  public getLivingAllies(currentCharacter: Character): Character[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.playerFighters.filter((playerFighter) => playerFighter.getIsAlive())
    } else if (this.enemyFighters.includes(currentCharacter)) {
      return this.enemyFighters.filter((enemyFighter) => enemyFighter.getIsAlive())
    } else {
      throw new Error('Character does not belong to any team in this encounter.')
    }
  }

  /**
   * Gets the list of living enemy members that are still alive in the fight encounter.
   * Filters the fight participants to include only those who are part of the enemy's team and are still alive.
   *
   * @param currentCharacter - The character whose opponents are being retrieved. (used to determine the team they belong to)
   * @returns List of enemy members that are alive
   */
  public getLivingOpponents(currentCharacter: Character): Character[] {
    if (this.playerFighters.includes(currentCharacter)) {
      return this.enemyFighters.filter((enemyFighter) => enemyFighter.getIsAlive())
    } else if (this.enemyFighters.includes(currentCharacter)) {
      return this.playerFighters.filter((playerFighter) => playerFighter.getIsAlive())
    } else {
      throw new Error('Character does not belong to any team in this encounter.')
    }
  }

  /**
   * Sets up the fight encounter by determining the initial fight order based on the participants' speed attributes.
   */
  public setupFight() {
    this.setFightOrder()
  }

  /**
   * Starts the fight encounter by initiating the turn-based sequence of actions for each participant.
   *
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  public startFight(choosePlayerAction: ChoosePlayerAction) {
    this.startTurn(choosePlayerAction)
  }

  /**
   * Determines the order in which players and enemies will take their turns in the fight encounter.
   */
  private setFightOrder() {
    this.fightParticipants.sort((a, b) => b.getSpeed() - a.getSpeed())
  }

  /**
   * Starts a new turn for each fight participant in the encounter until one side has no living participants.
   *
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  private startTurn(choosePlayerAction: ChoosePlayerAction) {
    while (this.shouldFightContinue()) {
      for (let i = 0; i < this.fightParticipants.length; i++) {
        if (!this.shouldFightContinue()) {
          break
        }
        const currentParticipant = this.fightParticipants[i]
        if (currentParticipant.getIsAlive() === false) {
          continue
        }
        if (currentParticipant instanceof Player) {
          this.handlePlayerTurn(currentParticipant, choosePlayerAction)
        } else {
          this.handleEnemyTurn(currentParticipant)
        }
      }
    }
  }

  /**
   * Handles the logic for a player's turn during the fight encounter.
   *
   * @param player - The player character whose turn is being handled.
   * @param choosePlayerAction - The function used to determine the player's actions during their turn.
   */
  private handlePlayerTurn(player: Player, choosePlayerAction: ChoosePlayerAction) {
    const livingAllies = this.playerFighters.filter((member) => member.getIsAlive())
    const livingOpponents = this.enemyFighters.filter((member) => member.getIsAlive())
    const action = choosePlayerAction(player, livingAllies, livingOpponents)
    const target = this.enemyFighters.find((member) => member.getIsAlive())
    if (target) {
      this.executePlayerAction(player, action)
    }
  }

  /**
   * Executes the specified action for the given player during their turn.
   *
   * @param player - The player character performing the action.
   * @param action - The action to be executed by the player.
   */
  private executePlayerAction(player: Player, action: PlayerFightActions): void {
    switch (action.type) {
      case 'attack':
        player.attack(action.target)
        return
      case 'guard':
        player.guard()
        return
      case 'heal':
        player.heal(action.target)
        return
      case 'skipTurn':
        return
    }
  }

  /**
   * Handles the logic for an enemy's turn during the fight encounter.
   *
   * @param enemy the current enemy which action will be choosen.
   */
  private handleEnemyTurn(enemy: Enemy) {
    const target = this.playerFighters.find((member) => member.getIsAlive())
    if (target) {
      enemy.attack(target)
    }
  }

  /**
   * Checks if the fight is still ongoing based on the alive status of player and enemy fighters.
   *
   * @returns boolean - True if both player and enemy fighters are still alive, indicating the fight is ongoing; otherwise, false.
   */
  private shouldFightContinue(): boolean {
    return (
      this.playerFighters.some((player) => player.getIsAlive()) &&
      this.enemyFighters.some((enemy) => enemy.getIsAlive())
    )
  }
}
