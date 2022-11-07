import * as RE from "./results";
import { Result } from "../player";

// 昇格戦
export interface PromotionChallenge {
  tag: "Promotion";
  results: RE.Results;
}

export const INITIAL: PromotionChallenge = {
  tag: "Promotion",
  results: RE.INITIAL,
};

// 昇格に成功している場合は true、失敗している場合は false
// まだ終了してない場合は undefined を返す
export const result = (pc: PromotionChallenge): boolean | undefined => {
  const { wins, loses } = RE.winLose(pc.results);
  if (wins >= 3) {
    return true;
  } else if (loses >= 3) {
    return false;
  } else {
    return undefined;
  }
};

export const isFinish = (pc: PromotionChallenge): boolean =>
  typeof result(pc) !== "undefined";

// 昇格戦がすでに終了していた場合 undefined を返す
export const step = (
  pc: PromotionChallenge,
  result: Result
): PromotionChallenge | undefined => {
  if (isFinish(pc)) {
    return undefined;
  }

  return {
    tag: "Promotion",
    results: RE.step(pc.results, result),
  };
};
