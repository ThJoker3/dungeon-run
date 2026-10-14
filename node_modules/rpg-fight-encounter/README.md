# DnD Fight Module

A small TypeScript module for running turn-based D&D-style fight encounters: characters players can attack, guard, heal and take damage until one side is defeated (enemies can only attack and take damage atm.). Built with strict TypeScript, Vitest for testing, and no game UI baked in — any consumer (CLI, tests, or another app) supplies its own way of letting a player choose an action.

## ✨ Features

- **Characters**: `Player` and `Enemy` extend a shared `Character` base class with hit points, attack power, speed, armor class and healing.
- **Dice rolling**: a small `Dice` utility rolls arbitrary dice pools (e.g. `4d6` for starting HP) and resolves attack rolls.
- **Defense**: a separate `Defensive` behavior reduces incoming damage based on a character's armor class.
- **Fight encounters**: `FightEncounterHandler` manages turn order (by speed), living allies/opponents per side, and runs a fight until one team has no living members left.
- **Player actions**: a `PlayerFightActions` type (`attack`, `guard`, `heal`, `skipTurn`) lets any caller — a terminal prompt, a test, or a future UI — decide what a player does on their turn, without the fight logic needing to know how that choice was made.

## 🛠️ Getting Started

### Prerequisites

Ensure you have **Node.js** (version 24.12.0 or later, per `engines` in `package.json`) and **Git** installed on your machine.

### Setup

1. Clone the repository and move into it:

   ```bash
   git clone https://github.com/MrNegnar/DnDModule
   cd DnDModule
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running a Fight

The demo entry point (`src/app.ts`) sets up a player and a couple of enemies, then runs an interactive fight in the terminal:

```bash
npm start
```

During the player's turn you'll be prompted to choose an action, example:

```text
Krulle, Choose an action:
1. Attack
2. Guard
3. Heal
4. Skip turn
>
```

Enemies act automatically. The fight continues until either all players or all enemies are defeated.

### Using the Module in Your Own Code

Import the public classes, interfaces, and action types from the package entry point. The package name in this repository is `ts-cli-template`; use the package name configured for your installation.

```typescript
import {
  Enemy,
  FightEncounterHandler,
  Player,
  type CharacterInterface,
  type ChoosePlayerAction,
  type FightEncounterHandlerInterface,
} from 'ts-cli-template'

const player = new Player('Krulle', 10)
const goblin = new Enemy('Goblin', 8)
const orc = new Enemy('Orc', 12)

// CharacterInterface exposes character information through getters.
const character: CharacterInterface = player
console.log(`${character.getName()} has ${character.getCurrentHitPoints()} HP`)

// The constructor receives the participants. setupFight() orders them by speed.
const fight: FightEncounterHandlerInterface = new FightEncounterHandler(
  [player],
  [goblin, orc]
)

fight.setupFight()

// This callback is called each time a player gets a turn.
// Enemies take their turns automatically and attack the first living player.
const chooseAction: ChoosePlayerAction = (_currentPlayer, _livingAllies, livingOpponents) => ({
  type: 'attack',
  target: livingOpponents[0],
})

// The call runs the fight until one team has no living members.
fight.startFight(chooseAction)

console.log(`${player.getName()} is alive: ${player.getIsAlive()}`)
console.log(`${goblin.getName()} HP: ${goblin.getCurrentHitPoints()}`)
console.log(`${orc.getName()} HP: ${orc.getCurrentHitPoints()}`)
```

`CharacterInterface` contains the getters for reading character information. The concrete `Player` and `Enemy` classes also provide their character methods, such as `attack()`, `heal()`, and `guard()`.

A player action is a `PlayerFightActions` value. Its available options are:

- `{ type: 'attack', target: enemy }`
- `{ type: 'guard' }`
- `{ type: 'heal', target: player }`
- `{ type: 'skipTurn' }`

The `ChoosePlayerAction` callback receives the current player, living allies, and living opponents, then returns one of these actions. It can make a different choice on each player turn. The callback runs inside `startFight()`, so the fight handler continues the whole encounter until it ends.

`FightEncounterHandlerInterface` describes the public fight methods: `setupFight()`, `startFight(...)`, and `getFightMembers()`.

---

## 💻 Available Scripts

### Running the Application

```bash
npm start
```

### Type Checking

Runs the TypeScript compiler in check-only mode (no output files), including test files:

```bash
npm run typecheck
```

### Running Tests

Tests live next to the code they test (e.g. `src/character/character.test.ts`, `src/encounters/fight/fightEncounterHandler.test.ts`), using [Vitest](https://vitest.dev).

- **Interactive watch mode (recommended during development):**
  ```bash
  npm test
  ```
- **Single run (e.g. for CI or a quick check):**
  ```bash
  npm run test:run
  ```
- **Run a specific test file or name pattern:**
  ```bash
  npm run test:run -- src/character/character.test.ts
  ```

Randomness (dice rolls) is made deterministic in tests via `vi.spyOn(Math, "random")`, so outcomes like exact HP values or hit/miss results can be asserted reliably.

### Code Linting

Analyze the source code in `src/` for errors, syntax issues, and anti-patterns:

```bash
npm run lint
```

Automatically fix fixable linting issues:

```bash
npm run lint:fix
```

### Formatting

Check if files comply with Prettier styling rules:

```bash
npm run format:check
```

Automatically reformat all source files:

```bash
npm run format
```

### Building

Compiles `src/` to plain JavaScript in `dist/`:

```bash
npm run build
```

`dist/` is git-ignored — it's a build artifact, regenerated on demand.

---

## 📁 Project Structure

```text
├── src/
│   ├── app.ts                         # Demo CLI entry point: sets up and runs a fight
│   ├── index.ts                       # Public module exports
│   ├── character/
│   │   ├── Character.ts               # Abstract base class: HP, attack, defend, guard, heal
│   │   ├── Player.ts                  # Player character (4d6 starting HP)
│   │   ├── Enemy.ts                   # Enemy character (4d4 starting HP)
│   │   ├── character.test.ts          # Tests for HP, damage, death, guard and heal
│   │   └── behaviorCalculators/
│   │       ├── offensive.ts           # Hit and damage calculations
│   │       └── defensive.ts           # Damage mitigation
│   ├── dice/
│   │   └── Dice.ts                    # Dice rolling and attack-hit checks
│   └── encounters/
│       └── fight/
│           ├── fightAction.ts             # PlayerFightActions type + ChoosePlayerAction callback type
│           ├── FightEncounterHandler.ts   # Turn order, targeting, and the fight loop
│           └── fightEncounterHandler.test.ts
├── diagrams/                          # PlantUML class/sequence/system diagrams
├── dist/                              # Compiled JavaScript output (git-ignored)
├── tsconfig.json                      # Base TypeScript config (strict mode)
├── tsconfig.build.json                # Build-only config: extends the base, emits to dist/
├── package.json                       # Project configuration, scripts, and dependencies
└── LICENSE                            # Unlicense (Public Domain dedication)
```

---

## ⚖️ License

This project is released into the public domain under the **Unlicense**. You are free to copy, modify, publish, and distribute this code in any way you see fit without any restrictions.

