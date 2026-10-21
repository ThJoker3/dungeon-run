# Test Report

## Summary

The application was tested in two ways:

1. **Manually through the interface.** Start the game with `npm start` and follow the input column in the table below. Inputs are what you type or which menu option you pick (menus are chosen with the number keys).
2. **With short Node scripts** for the tests that need many runs (room weights, coin ranges, item rarity). These call the game's classes directly with a seeded `RandomGenerator`, for example:

```js
import { RandomGenerator } from 'dice-rng-toolkit'
import { LootTable } from './src/Combat/LootTable.js'

const lootTable = new LootTable(new RandomGenerator(2))
const counts = {}
for (let i = 0; i < 10000; i++) {
  const item = lootTable.rollItem()
  counts[item] = (counts[item] || 0) + 1
}
console.log(counts)
```

Save a script like this as `test.mjs` in the project root and run it with `node test.mjs`.

The hardest part to test was combat. The fight module uses `Math.random()`, so the same seed does not give the same fight, and HP is rolled inside the module. Tests that depend on a fight (loot, dying, winning) therefore describe the expected *behaviour* rather than exact numbers, and some had to be repeated until the wanted situation came up (for example winning against the dragon).

Tested with Node.js 24.19.0 and dice-rng-toolkit 1.0.0.

## Test Results

| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --------- | ----------- | ----- | ---------------- | -------------- |
| Enter a hero name | R1 | Seed: Enter. Name: `Tester`. | The game greets the hero: "Welcome, Tester!". | ✅ As expected. |
| Empty hero name | R1 | Seed: Enter. Name: just press Enter. | The game does not crash and uses a default name. | ❌ No crash and the hero is called "Unknown" (rpg-fight-encounter sets it), but the greeting before that says "Welcome, !" because it uses the typed name instead of the hero's name. |
| Weapon menu | R2 | Start a game and enter a name. | A menu lists Dagger d6 / 3 potions, Sword d8 / 2, Axe d10 / 1, Staff d8 / 2. | ✅ As expected. |
| Starting potions follow the weapon | R2 | Pick Sword, then choose "View inventory" after the first room. | Inventory shows 2 health potions. | ✅ "Coins: 0 \| Health potions: 2 \| Items: none". |
| Same seed gives the same dungeon | R3 | Play with seed `42`, note the rooms. Play again with seed `42`. | Both runs have exactly the same rooms in the same order. | ✅ Both: Campfire, Goblin, Treasure, Campfire, Goblin, Goblin, Goblin, Campfire, Treasure, Dragon. |
| Different seed gives a different dungeon | R3 | Play with seed `7`. | Another room order than seed 42. | ✅ Goblin, Goblin, Treasure, Campfire, Goblin ×5, Dragon. |
| Same seed gives the same loot | R3 | Seed `42` twice, pick Attack in every fight. | Coins and items after each won fight are the same in both runs (as long as the hero survives the same fights). | ✅ Both runs: goblin 5 coins, treasure 9 coins, goblin 9 coins, then the hero fell in room 6. |
| Random seed is shown so it can be replayed | R3 | Seed: press Enter. Play until the summary. Start a new game and type the shown seed. | The summary shows the seed; typing it gives the same rooms. | ✅ Summary showed "Seed: 1792586057412"; replaying it gave the same rooms (Goblin ×3, Campfire, Goblin ×3, Campfire, Goblin, Dragon). |
| Invalid seed | R3 | Seed: `abc`, then `4.5`, then `42`. | A message after each invalid value and a new question; `42` is accepted. | ✅ "The seed must be a whole number. Try again" twice, then the game starts. Before the fix the game crashed with "Seed must be an integer". |
| Combat is not seeded (known limitation) | R3 | Seed `42` twice, compare the hero's HP at the start. | HP may differ, since the fight module uses `Math.random()`. | ✅ 12/12 HP in one run, 13/13 in the other. Documented in README. |
| Always ten rooms with a boss last | R4 | Script: build dungeons for seeds 0–999. | Every dungeon has 10 rooms and room 10 is the dragon. | ✅ All 1000 dungeons have 10 rooms ending with the dragon. |
| Weighted room selection | R5 | Script: count the first 9 rooms for seeds 0–999 (weights 60/25/15). | About 60 % monster, 25 % campfire, 15 % treasure. | ✅ 60.3 % monster, 25.2 % campfire, 14.5 % treasure (9000 rooms). |
| Fight menu | R6 | Enter a room with a goblin. | HP for both fighters is shown and the menu offers Attack, Guard, Heal, Skip Turn. | ✅ "Tester 19/19 HP vs Goblin 9/9 HP" and the four options. |
| Fight ends when someone dies | R6 | Pick Attack every turn. | The fight continues until the goblin or the hero reaches 0 HP, then the game moves on. | ✅ As expected. |
| Goblin coins use 2d6 | R7 | Win a goblin fight. Script: roll `2d6` 10 000 times. | Coins are shown after the fight and are always 2–12. | ✅ "You found 5 coins!"; script range 2–12. |
| Dragon coins use 4d10 | R7 | Beat the dragon. Script: roll `4d10` 10 000 times. | Coins are always 4–40. | ✅ Script range 4–40; a winning run ended with 81 coins in total. |
| Rarer items drop less often | R8 | Script: `rollItem()` 10 000 times (50 % drop chance, weights 60/20/15/5). | About 50 % nothing, 30 % Rusty Key, 10 % Silver Ring, 7.5 % Health potion, 2.5 % Dragon Scale. | ✅ 49.6 % nothing, 30.2 % Rusty Key, 10.4 % Silver Ring, 7.4 % Health potion, 2.4 % Dragon Scale. |
| Dropped potion can be used | R8, R11 | Seed `9`, Axe (1 potion), win the first goblin fight that drops a potion, view inventory. | Potion count goes up (not listed as an item). | ✅ Health potions: 1 → 2. |
| Campfire heals | R9 | Take damage, then enter a campfire. | HP goes up by 5 and the change is shown. | ✅ "You rest by the campfire! HP: 6 => 11/13". |
| Campfire never heals above max | R9 | Enter a campfire at 11/13 HP. | HP becomes 13/13, not 16/13. | ✅ "HP: 11 => 13/13". |
| View inventory between rooms | R10 | After a won fight, choose "View inventory". | Coins, potions and items are listed. | ✅ "Coins: 7 \| Health potions: 2 \| Items: Silver Ring". |
| Drink a potion when hurt | R11 | Take 10 damage (4/14 HP), choose "Use health potion" twice. | +5 HP each time and one potion less each time. | ✅ 4 → 9 → 14/14 HP, potions 3 → 2 → 1. |
| Drink at full health | R11 | Choose "Use health potion" at full HP. | A message; no potion is used. | ✅ "You are already at full health.", potion count unchanged. |
| No potions left | R11 | Use all potions, then choose "Use health potion" again. | A message; the game does not crash. | ✅ "You have no health potions left." |
| Game ends when the hero dies | R12 | Pick Skip Turn in every fight until the hero dies. | No more rooms; the summary shows defeat, rooms visited, inventory and seed. | ✅ Seed `42`: "Tester has fallen... / Rooms visited: 2/10 / Coins: 0 \| Health potions: 3 \| Items: none / Seed: 42". |
| Game ends when the boss is defeated | R12 | Win all fights including the dragon. | Victory summary; no room menu after the final room. | ✅ "Victory! You defeated the boss! / Rooms visited: 10/10 / …". Before the fix the room menu was shown after the dragon. |
| Play again | R13 | At "Play again?" press `y`, finish the next game, press `n`. | `y` starts a new game from the seed question; `n` ends the program. | ✅ New game starts with "Welcome to Dungeon Run!"; `n` prints "Farewell, Adventurer" and exits. |

## Known Issues in Third-Party Modules

Found in [rpg-fight-encounter](https://github.com/MrNegnar/DnDModule):

- **The README gives the wrong package name**, so following it does not install the module. I installed it from GitHub (`github:MrNegnar/DnDModule`) and filed an issue in the module's repository(FIXED).
- **`Math.random()` is used internally**, so fights cannot be seeded. My seed controls rooms, monsters and loot, but not hits or HP. Documented in README under *Known limitations*.
- **HP is always 4d6 for players and 4d4 for enemies** and cannot be set, so the boss has the same HP range as a goblin. I made the boss dangerous with a bigger damage die (d10) instead.
- **The fight prints nothing.** Hits and misses are not reported, so my `Combat` class shows both fighters' HP before each turn as a workaround.
- **Heal in combat is unlimited** (always 5 HP) and does not use potions. Accepted as part of the module's rules.
