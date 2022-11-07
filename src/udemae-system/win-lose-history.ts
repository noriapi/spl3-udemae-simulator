import * as WL from "./win-lose";
import produce from "immer";

export type WinLoseHistory = boolean[];

export const INITIAL = [];

export const fold = (history: WinLoseHistory): WL.WinLose =>
  history.reduce(
    (prev, isWin) =>
      produce(prev, (draft) => {
        if (isWin) {
          draft.wins++;
        } else {
          draft.loses++;
        }
      }),
    WL.INITIAL
  );

export const step = (
  winLose: WinLoseHistory,
  isWin: boolean
): WinLoseHistory => {
  return winLose.concat([isWin]);
};
