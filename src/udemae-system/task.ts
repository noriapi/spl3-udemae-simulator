import * as US from ".";
import { ge } from "../utils";
import * as P from "./player";
import * as U from "./udemae";

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type Norma = RequireAtLeastOne<{
  // 指定された試合数を行うまで
  battles?: number;
  // 指定されたウデマエに達するまで
  udemae?: U.Udemae;
}>;

export const DEFAULT_NORMA: Norma = {
  battles: 1000,
};

const isOk = (norma: Norma, battles: number, udemae: U.Udemae): boolean => {
  const okBattles =
    typeof norma.battles === "undefined" || battles >= norma.battles;
  const okUdemae =
    typeof norma.udemae === "undefined" || ge(U.compare)(udemae, norma.udemae);
  return okBattles && okUdemae;
};

export interface Task {
  norma: Norma;
  player: P.Player;
  udemae: US.UdemaeSystem;
}

export const run = (task: Task): US.UdemaeSystem => {
  let udemae = task.udemae;
  let battles = 0;

  while (!isOk(task.norma, battles, udemae.udemae)) {
    const result = P.run(task.player);
    udemae = US.step(udemae, result);
    battles += 1;
  }
  return udemae;
};
