import { Defensive } from './behaviorCalculators/defensive.js'
import { Offensive } from './behaviorCalculators/offensive.js'
import { Dice } from '../dice/Dice.js'
import type { CharacterInterface } from './CharacterInterface.js'
/**
 * Represents a character in the game with basic attributes like name and hit points.
 */
export abstract class Character implements CharacterInterface {
  private name!: string
  private maxHitPoints!: number
  private currentHitPoints!: number
  private attackPower: number
  private numberOfAttacks: number
  private speed: number
  private armorClass: number
  private healAmount: number

  /**
   * Creates a new character with the specified name and hit points.
   *
   * @param name - The name of the character.
   * @param attackPower - The attack power of the character.
   * @param startHpNumberOfDice - The number of dice to roll for determining initial hit points.
   * @param startHpSidesPerDie - The number of sides on each die for determining initial hit points.
   */
  constructor(name: string, attackPower: number, startHpNumberOfDice: number, startHpSidesPerDie: number) {
    this.setName(name)
    this.setInitialHitPoints(startHpNumberOfDice, startHpSidesPerDie)
    this.attackPower = attackPower
    this.numberOfAttacks = 1
    this.speed = 1
    this.armorClass = 1
    this.healAmount = 5
  }

  /**
   * Gets the speed of the character.
   *
   * @returns the speed of the given character.
   */
  public getSpeed(): number {
    return this.speed
  }

  /**
   * Gets the name of the character.
   *
   * @returns the name of the given character
   */
  public getName(): string {
    return this.name
  }

  /**
   * Gets the maximum hit points of the character.
   *
   * @returns the maximum hit points of the given character
   */
  public getMaxHitPoints(): number {
    return this.maxHitPoints
  }

  /**
   * Gets the current hit points of the character.
   *
   * @returns the current hit points of the given character
   */
  public getCurrentHitPoints(): number {
    return this.currentHitPoints
  }

  /**
   * Gets the attack power of the character.
   *
   * @returns the attack power of the given character.
   */
  public getAttackPower(): number {
    return this.attackPower
  }

  /**
   * Gets the armor class of the character.
   *
   * @returns the armor class of the given character.
   */
  public getArmorClass(): number {
    return this.armorClass
  }

  /**
   * Checks if the character is alive based on current hit points.
   *
   * @returns true if the characters health is above 0, false otherwise.
   */
  public getIsAlive(): boolean {
    return this.currentHitPoints > 0
  }

  /**
   * Sets the name of the character.
   *
   * @param name - The new name of the character.
   */
  private setName(name: string): void {
    if (!name || name.trim() === '') {
      this.name = 'Unknown'
    } else {
      this.name = name
    }
  }

  /**
   * Setting the total amount of hp for a character when created.
   *
   * @param numberOfDice - The number of dice to roll for determining initial hit points.
   * @param sidesPerDie - The number of sides on each die.
   */
  private setInitialHitPoints(numberOfDice: number, sidesPerDie: number): void {
    const startingHitPoints: number[] = new Dice().rollDice(numberOfDice, sidesPerDie) // Example: roll 4 six-sided dice to determine starting hit points
    let totalStartingHitPoints = 0
    for (const healthPoints of startingHitPoints) {
      totalStartingHitPoints += healthPoints
    }
    this.maxHitPoints = totalStartingHitPoints
    this.currentHitPoints = this.maxHitPoints
  }

  /**
   * lowers the current hit points of the character by the specified damage amount.
   *
   * @param damage - The amount of damage to apply to the character.
   */
  private takeDamage(damage: number): void {
    this.currentHitPoints -= damage
    if (this.currentHitPoints < 0) {
      this.currentHitPoints = 0
    }
  }

  /**
   * Heals a target character by the heal of current character's heal amount.
   *
   * @param targetToHeal - The character to be healed.
   */
  public heal(targetToHeal: Character): void {
    if (targetToHeal.getIsAlive()) {
      targetToHeal.currentHitPoints += this.healAmount
      if (targetToHeal.currentHitPoints > targetToHeal.maxHitPoints) {
        targetToHeal.currentHitPoints = targetToHeal.maxHitPoints
      }
    }
  }

  /**
   * Attacks the specified target character.
   * Performs an attack on the target character if the attack hits.
   *
   * @param target - the target to be attacked.
   */
  public attack(target: Character): void {
    let dieResult: number[]
    const attackHit = new Offensive().checkIfHit()
    if (attackHit) {
      dieResult = new Dice().rollDice(this.numberOfAttacks, this.attackPower)
      const totalDamage = new Offensive().calculateDamage(dieResult)
      target.defend(totalDamage)
    } else {
      return
    }
  }

  /**
   * The defensive part of an attack.
   * Sums up total damage and calls the take damage method to change targets health.
   *
   * @param damage - the incoming damage to be processed by the character's defense.
   */
  public defend(damage: number): void {
    const damageToTake = new Defensive().calculateDamageTaken(damage, this.armorClass)
    this.takeDamage(damageToTake)
  }

  /**
   * Performs a guard action to raise the character's defense and lower the incoming damage.
   */
  public guard(): void {
    this.armorClass += 1
  }
}
