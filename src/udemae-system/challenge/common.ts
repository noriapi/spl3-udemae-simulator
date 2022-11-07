import * as WLH from "../win-lose-history";
import * as C from "../commendation";

export interface CommonChallenge {
  winLose: WLH.WinLoseHistory;
  commendations: C.Commendations;
}

export const INITIAL: CommonChallenge = {
  winLose: WLH.INITIAL,
  commendations: C.INITIAL,
};

export const step = (
  cc: CommonChallenge,
  isWin: boolean,
  comms: C.Commendations
): CommonChallenge => ({
  winLose: WLH.step(cc.winLose, isWin),
  commendations: C.add(cc.commendations, comms),
});
