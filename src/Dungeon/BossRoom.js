import { Combat } from "../Combat/Combat.js";

export class BossRoom {
  enter(adventurer, ui) {
    ui.showMessage(`A fearsome Dragon awakens! ${adventurer.getName()} must fight!`);
    new Combat(ui).fight(adventurer, 'Dragon', 10)
  }
}