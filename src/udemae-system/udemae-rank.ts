import { UdemaePoint } from "./udemae-point";

export type UdemaeRank =
  | "C"
  | "B"
  | "A"
  | "S"
  | "S+0"
  | "S+10"
  | "S+20"
  | "S+30"
  | "S+40"
  | "S+50";

export const toInt = (rank: UdemaeRank) => {
  switch (rank) {
    case "C":
      return 0;
    case "B":
      return 1;
    case "A":
      return 2;
    case "S":
      return 3;
    case "S+0":
      return 4;
    case "S+10":
      return 5;
    case "S+20":
      return 6;
    case "S+30":
      return 7;
    case "S+40":
      return 8;
    case "S+50":
      return 9;
  }
};

// 昇格させる
// S+50 の場合、昇格できないので undefined を返す
export const promote = (rank: UdemaeRank): UdemaeRank | undefined => {
  switch (rank) {
    case "C":
      return "B";
    case "B":
      return "A";
    case "A":
      return "S";
    case "S":
      return "S+0";
    case "S+0":
      return "S+10";
    case "S+10":
      return "S+20";
    case "S+20":
      return "S+30";
    case "S+30":
      return "S+40";
    case "S+40":
      return "S+50";
    case "S+50":
      return undefined;
    default: {
      const _exhaustiveCheck: never = rank;
      return _exhaustiveCheck;
    }
  }
};

export const INITIAL_POINT: Record<UdemaeRank, UdemaePoint> = {
  C: 10,
  B: 100,
  A: 200,
  S: 300,
  "S+0": 300,
  "S+10": 300,
  "S+20": 300,
  "S+30": 300,
  "S+40": 300,
  "S+50": 300,
};

export const PROMOTE_CHALLENGABLE_POINT: Record<UdemaeRank, UdemaePoint> = {
  C: 600,
  B: 850,
  A: 1100,
  S: 1000,
  "S+0": 3800,
  "S+10": 3800,
  "S+20": 3800,
  "S+30": 3800,
  "S+40": 3800,
  "S+50": 3800,
};

export const REWARD_POINT: Record<
  UdemaeRank,
  [UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint]
> = {
  C: [0, 20, 45, 75, 110, 150],
  B: [0, 30, 65, 105, 150, 200],
  A: [0, 40, 85, 135, 190, 250],
  S: [0, 50, 105, 165, 230, 300],
  "S+0": [0, 50, 105, 165, 230, 300],
  "S+10": [0, 50, 105, 165, 230, 300],
  "S+20": [0, 50, 105, 165, 230, 300],
  "S+30": [0, 50, 105, 165, 230, 300],
  "S+40": [0, 50, 105, 165, 230, 300],
  "S+50": [0, 50, 105, 165, 230, 300],
};
