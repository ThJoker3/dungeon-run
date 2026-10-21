# Dungeon Run

A text-based dungeon adventure for the terminal. Create a adventurer, pick a weapon and fight your way through ten rooms to the dragon at the end. Every dungeon is built from a seed, so you can replay the same adventure or share it with a friend.

## Vision

Dungeon Run is a text-based adventure game for the terminal. The player creates a adventurer, makes their way through a randomly generated dungeon room by room, and fights monsters along the way. Defeated enemies drop coins and sometimes items. By entering a seed, the player can replay the same adventure or share it with a friend.

## Requirements

| ID  | Requirement |
| --- | ----------- |
| R1  | The player can enter a name for their adventurer. |
| R2  | The player chooses a starting weapon, where stronger weapons come with fewer health potions (dagger d6 + 3 potions, sword d8 + 2 potions, staff d8 + 2 potions, axe d10 + 1 potion). |
| R3  | The player can enter a seed; the same seed produces the same dungeon and the same monsters. (Dice rolls during combat are handled by the other module and are not affected by the seed.) |
| R4  | The dungeon always consists of 10 rooms, and the final room contains a boss. |
| R5  | Each of the first 9 rooms contains either a monster, a treasure or a campfire, chosen by a weighted random selection. |
| R6  | When the player encounters a monster, a turn-based fight starts where the player chooses to attack, guard, heal or skip their turn. |
| R7  | Every defeated enemy drops coins, and the amount is rolled using dice notation (2d6, or 4d10 for the boss). |
| R8  | Defeated enemies also have a chance to drop an item, where rarer items have a lower chance. |
| R9  | At a campfire, the player can rest to restore health. |
| R10 | The player has an inventory showing coins and items, which can be viewed between rooms. |
| R11 | The player can use a health potion from the inventory between rooms. |
| R12 | The game ends when the adventurer dies or defeats the boss, and a summary of the run is shown. |
| R13 | The player can start a new game without restarting the program. |

How each requirement was tested is described in [TEST_REPORT.md](TEST_REPORT.md).

## Getting started

You need [Node.js](https://nodejs.org/) **24.12 or later** (required by the fight module) and Git.

```bash
git clone https://github.com/ThJoker3/dungeon-run.git
cd dungeon-run
npm install
npm start
```

## How to play

1. **Seed** – press Enter for a random dungeon, or type a whole number to replay a specific one.
2. **Name** – type your adventurer's name.
3. **Weapon** – pick a weapon with the number keys. A bigger die hits harder but gives fewer potions.
4. **Rooms** – each room is a monster (fight), a campfire (heal 5 HP) or a treasure (coins). Room 10 is always the dragon.
5. **Fights** – choose Attack, Guard, Heal or Skip Turn each round. Your and the enemy's HP are shown before every choice.
6. **Between rooms** – continue, view your inventory or drink a health potion (heals 5 HP, never above max).
7. **End** – when you die or beat the dragon you get a summary with rooms visited, loot and the seed. Answer `y` to play again or `n` to quit.

## Modules used

| Module | Role in the game |
| ------ | ---------------- |
| [dice-rng-toolkit](https://github.com/ThJoker3/Dice-RNG-Toolkit) (my own, [npm](https://www.npmjs.com/package/dice-rng-toolkit)) | The seeded `RandomGenerator` drives everything that should be repeatable: which rooms are created (`Randomizer.pickWeighted`), coin rolls (`DiceExpression`, e.g. `2d6`) and item drops (`nextBoolean` + `pickWeighted`). |
| [rpg-fight-encounter](https://github.com/MrNegnar/DnDModule) (another student's) | Runs the turn-based fights (`FightEncounterHandler`) and keeps track of HP (`Player`, `Enemy`). It is only used inside `Adventurer` and `Combat`, so the rest of the game does not depend on it. |
| [readline-sync](https://www.npmjs.com/package/readline-sync) | Synchronous keyboard input in the terminal. |

## Known limitations

These come from rpg-fight-encounter and are documented rather than worked around:

- **Combat is not affected by the seed.** The module uses `Math.random()` internally, so the same seed gives the same rooms, monsters and loot, but hits and HP can differ between runs.
- **HP cannot be set.** The adventurer always gets 4d6 HP and every enemy 4d4, including the dragon. The boss is dangerous because of its d10 damage, not its HP.
- **Healing is always 5 HP.** This applies to campfires, potions and the Heal action in combat. Heal in combat is not limited by potions.
- **The fight shows no messages.** The module does not report hits or damage, so the game shows both fighters' HP before each turn instead.

## Project structure

```
src/
  app.js                 Starts the game (only startup code)
  GameApplication.js     Game loop, setup, room menu, summary, play again
  ConsoleUI.js           All terminal input and output
  Adventurer/            Adventurer (wraps Player), Weapon, Inventory
  Dungeon/               Dungeon (builds the 10 rooms), MonsterRoom, CampfireRoom, TreasureRoom
  Combat/                Combat (wraps FightEncounterHandler), LootTable
```

Every room has the same `enter(adventurer, ui)` method, so the game loop does not need to know which kind of room it is in. Only `ConsoleUI` writes to the console.
