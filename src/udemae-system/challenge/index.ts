import { Result } from "../player";
import * as N from "./normal-challenge";
import * as P from "./promotion-challenge";

export type Challenge = N.NormalChallenge | P.PromotionChallenge;

// チャレンジがすでに終了していた場合、それ以上試合を行うことはできないため undefined を返す
export const step = (c: Challenge, result: Result): Challenge | undefined => {
  switch (c.tag) {
    case "Normal": {
      return N.step(c, result);
    }
    case "Promotion": {
      return P.step(c, result);
    }
    default: {
      const _exhaustiveCheck: never = c;
      return _exhaustiveCheck;
    }
  }
};
