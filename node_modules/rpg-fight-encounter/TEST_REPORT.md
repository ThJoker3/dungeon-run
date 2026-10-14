# Test Report

## Summary

The module is tested with automated Vitest tests. To repeat the test run, use `npm ci` followed by `npm run test:run` from the repository root. The latest run passed all 18 tests in 2 files. Dice rolls are mocked where predictable results are needed.

## Test Results

> [!NOTE]
> **Character tests — 11 passed**  
> Source: [`character.test.ts`](src/character/character.test.ts)
>
> | What was tested | How it was tested | Result |
> | --------------- | ----------------- | :----: |
> | Initial HP, minimum roll | Mock `Math.random()` to `0`; expect 4 HP. | ✅ |
> | Initial HP, high roll | Mock `Math.random()` to `0.9`; expect 24 HP. | ✅ |
> | Current HP on creation | Compare current HP with maximum HP. | ✅ |
> | Non-lethal damage | Mock the starting roll, apply 4 damage, and check HP and alive status. | ✅ |
> | Lethal damage | Mock the starting roll, apply 5 damage, and check 0 HP and dead status. | ✅ |
> | Guarding | Compare armor class before and after guarding. | ✅ |
> | Healing after damage | Mock the starting roll, damage the player, heal, and check HP. | ✅ |
> | Healing at maximum HP | Heal a character at full HP and check that HP stays at the maximum. | ✅ |
> | Healing a dead ally | Defeat the ally, attempt to heal, and check that HP remains 0. | ✅ |
> | Healing a living ally | Mock `Math.random()` to `0.5`, damage the ally, heal, and check HP. | ✅ |
> | Missed attack | Mock `Math.random()` to `0`, attack, and check that target HP is unchanged. | ✅ |

> [!NOTE]
> **Fight tests — 7 passed**  
> Source: [`fightEncounterHandler.test.ts`](src/encounters/fight/fightEncounterHandler.test.ts)
>
> | What was tested | How it was tested | Result |
> | --------------- | ----------------- | :----: |
> | Fight participant list | Create a fight with two players and two enemies; compare the returned list with all four participants. | ✅ |
> | Living allies at fight setup | Compare the player's living allies with both players. | ✅ |
> | Living opponents at fight setup | Compare the player's living opponents with both enemies. | ✅ |
> | Enemy team defeated | Mock `Math.random()` to `0.9`, run a fight where the player attacks, and check both alive states. | ✅ |
> | Player team defeated | Mock `Math.random()` to `0.9`, run a fight where the player skips turns, and check both alive states. | ✅ |
> | Player starts fight | Mock participant speeds, call `setupFight()`, and check that the player is first. | ✅ |
> | Enemy starts fight | Mock participant speeds, call `setupFight()`, and check that the enemy is first. | ✅ |
