import { Result } from "../player";
import * as WLH from "../win-lose-history";
import * as C from "../commendation";

export type Results = Result[];

export const INITIAL: Results = [];

export const step = (results: Results, result: Result): Results =>
  results.concat([result]);

export const winLoseHistory = (results: Results): WLH.WinLoseHistory =>
  results.map((r) => r.win);

export const winLose = (results: Results) => WLH.fold(winLoseHistory(results));

export const commendations = (results: Results) =>
  results.map((r) => r.comms).reduce((prev, c) => C.add(prev, c), C.INITIAL);
