import { RandomGenerator, DiceExpression } from 'dice-rng-toolkit';
import { Player, Enemy } from 'rpg-fight-encounter';

const rng = new RandomGenerator(42);
const coins = new DiceExpression('2d6').roll(rng);
console.log(coins.toString());

const player = new Player('Draxten', 8)
const enemy = new Enemy('goblin', 4)
console.log(`${player.getName()}: ${player.getCurrentHitPoints()} HP`);
console.log(`${enemy.getName()}: ${enemy.getCurrentHitPoints()} HP`);