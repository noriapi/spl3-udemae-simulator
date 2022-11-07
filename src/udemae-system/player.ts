import * as C from "./commendation";
import sample from "@stdlib/random/sample";

// バトルの結果を返す。
// 勝率は 0-1 で渡す
export const battle = (winRatio: number): boolean =>
  sample([true, false], {
    probs: [winRatio, 1 - winRatio],
    size: 1,
  })[0];

// 3以下の表彰を返す
export const comms = (
  goldRatio: number,
  silverRatio: number
): C.Commendations => {
  const commArr = sample(["gold", "silver", undefined], {
    probs: [goldRatio, silverRatio, 1 - goldRatio - silverRatio],
    size: 3,
  });
  return C.fold(commArr);
};

export interface Player {
  winRatio: number;
  commsRatio: [goldRatio: number, silverRatio: number];
}

export const DEFAULT_PLAYER: Player = {
  winRatio: 0.5,
  commsRatio: [0.3, 0.3],
};

export interface Result {
  win: boolean;
  comms: C.Commendations;
}

export const run = (player: Player): Result => ({
  win: battle(player.winRatio),
  comms: comms(player.commsRatio[0], player.commsRatio[1]),
});
