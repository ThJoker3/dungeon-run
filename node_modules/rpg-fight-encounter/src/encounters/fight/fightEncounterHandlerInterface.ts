import type { ChoosePlayerAction } from './fightAction.js'
import { Character } from '../../character/Character.js'

export interface FightEncounterHandlerInterface {
  setupFight(): void
  startFight(_choosePlayerAction: ChoosePlayerAction): void
  getFightMembers(): readonly Character[]
}
