import { RandomGenerator, DiceExpression } from 'dice-rng-toolkit';
import { Player, Enemy } from 'rpg-fight-encounter';

const rng = new RandomGenerator(42);
const coins = new DiceExpression('2d6').roll(rng);
console.log(coins.toString());