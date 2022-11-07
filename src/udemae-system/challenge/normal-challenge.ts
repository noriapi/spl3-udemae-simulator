import * as C from "../commendation";
import { Result } from "../player";
import { UdemaePoint } from "../udemae-point";
import * as N from "../udemae-name";
import * as RE from "./results";

// 通常のチャレンジ
export interface NormalChallenge {
  tag: "Normal";
  results: RE.Results;
}

export const INITIAL: NormalChallenge = {
  tag: "Normal",
  results: RE.INITIAL,
};

export const isFinish = (nc: NormalChallenge): boolean => {
  const { wins, loses } = RE.winLose(nc.results);
  return wins >= 5 || loses >= 3;
};

export const reward = (
  nc: NormalChallenge,
  name: N.UdemaeName
): UdemaePoint | undefined => {
  if (!isFinish(nc)) {
    return;
  }

  const base = N.REWARD_POINT[name.str][RE.winLose(nc.results).wins];
  const comm = C.points(RE.commendations(nc.results));
  return base + comm;
};

// チャレンジがすでに終了していた場合 undefined を返す
export const step = (
  nc: NormalChallenge,
  result: Result
): NormalChallenge | undefined => {
  if (isFinish(nc)) {
    return undefined;
  }

  return {
    tag: "Normal",
    results: RE.step(nc.results, result),
  };
};
