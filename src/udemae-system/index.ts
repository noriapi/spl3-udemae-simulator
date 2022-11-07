import * as C from "./challenge";
import * as NC from "./challenge/normal-challenge";
import * as PC from "./challenge/promotion-challenge";
import * as U from "./udemae";
import produce from "immer";
import { Result } from "./player";
import { lt } from "../utils";

export interface UdemaeSystem {
  udemae: U.Udemae;
  maxUdemae: U.Udemae;
  battles: number;
  challenge?: C.Challenge;
}

export const INITIAL: UdemaeSystem = {
  udemae: U.INITIAL_UDEMAE,
  maxUdemae: U.INITIAL_UDEMAE,
  battles: 0,
};

export const createUdemaeSystem = (
  udemae: U.Udemae,
  challenge?: C.Challenge,
  maxUdemae?: U.Udemae
): UdemaeSystem => ({
  udemae,
  challenge,
  maxUdemae: maxUdemae ?? udemae,
  battles: 0,
});

const incrementBattles = (sys: UdemaeSystem): UdemaeSystem =>
  produce(sys, (draft) => {
    draft.battles++;
  });

// ウデマエを更新する
const updateUdemae = (
  sys: UdemaeSystem,
  updator: U.Udemae | ((prev: U.Udemae) => U.Udemae)
): UdemaeSystem => {
  const newUdemae =
    typeof updator === "function" ? updator(sys.udemae) : updator;

  return produce(sys, (draft) => {
    if (lt(U.compare)(newUdemae, draft.udemae)) {
      draft.maxUdemae = newUdemae;
    }
    draft.udemae = newUdemae;
  });
};

// チャレンジを更新する
const updateChallenge = (
  sys: UdemaeSystem,
  newChallenge: C.Challenge
): Required<UdemaeSystem> =>
  produce(sys, (draft) => {
    draft.challenge = newChallenge;
  }) as Required<UdemaeSystem>;

const finishChallenge = (sys: UdemaeSystem): UdemaeSystem =>
  produce(sys, (draft) => {
    delete draft.challenge;
  });

// 挑戦中でなければ挑戦を開始する
export const startChallengeIfCan = (
  sys: UdemaeSystem
): Required<UdemaeSystem> => {
  // 挑戦中であれば何もしない
  if (sys.challenge != null) {
    return sys as Required<UdemaeSystem>;
  }

  // 昇格戦に挑戦可能であれば昇格戦に挑戦する
  if (U.canPromoteChallenge(sys.udemae)) {
    // 昇格戦に挑戦開始
    return updateChallenge(
      updateUdemae(sys, (u) => U.payChallengeFee(u)),
      PC.INITIAL
    );
  } else {
    // 通常のチャレンジを開始
    return updateChallenge(
      updateUdemae(sys, (u) => U.payChallengeFee(u)),
      NC.INITIAL
    );
  }
};

// チャレンジが終了している場合、チャレンジの種類に合わせてウデマエを更新し、
// チャレンジを終了させる
const settleChallengeIfCan = (sys: UdemaeSystem): UdemaeSystem => {
  if (!sys.challenge) {
    return sys;
  }

  switch (sys.challenge.tag) {
    case "Normal": {
      const reward = NC.reward(sys.challenge, sys.udemae.name);
      if (typeof reward === "number") {
        // チャレンジ終了
        return updateUdemae(finishChallenge(sys), (u) =>
          U.addPoints(u, reward)
        );
      } else {
        // チャレンジ継続
        return sys;
      }
    }
    case "Promotion": {
      const result = PC.result(sys.challenge);
      if (typeof result === "boolean") {
        // 昇格戦終了
        if (result) {
          // 昇格成功
          return updateUdemae(finishChallenge(sys), (u) => U.promote(u) ?? u);
        } else {
          // 昇格失敗
          return finishChallenge(sys);
        }
      } else {
        // 昇格戦継続
        return sys;
      }
    }
  }
};

// すでに規定の試合数を行っていた場合 undefined を返す
export const stepWithoutSettle = (
  sys: UdemaeSystem,
  result: Result
): UdemaeSystem => {
  const settled = settleChallengeIfCan(sys);
  const started = startChallengeIfCan(settled);

  // settle で精算済みのため、undefined にはなりえない。
  const newChallenge = C.step(started.challenge, result)!;

  const battled = incrementBattles(updateChallenge(started, newChallenge));
  return battled;
};

// すでに規定の試合数を行っていた場合 undefined を返す
export const step = (sys: UdemaeSystem, result: Result): UdemaeSystem => {
  const battled = stepWithoutSettle(sys, result);
  const settled = settleChallengeIfCan(battled);

  return settled;
};
