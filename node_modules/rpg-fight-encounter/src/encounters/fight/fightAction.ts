import type { Player } from '../../character/Player.js'
import type { Enemy } from '../../character/Enemy.js'

export type PlayerFightActions =
  { type: 'attack'; target: Enemy } | { type: 'guard' } | { type: 'heal'; target: Player } | { type: 'skipTurn' }

export type ChoosePlayerAction = (
  _player: Player,
  _livingAllies: Player[],
  _livingOpponents: Enemy[]
) => PlayerFightActions
