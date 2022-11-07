import { UdemaePoint } from "./udemae-point";

export type UdemaeNameStr =
  | "C-"
  | "C"
  | "C+"
  | "B-"
  | "B"
  | "B+"
  | "A-"
  | "A"
  | "A+"
  | "S"
  | "S+";

export const ALL_UDEMAE_NAME_STR: UdemaeNameStr[] = [
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S",
  "S+",
];

export const CHALLENGE_FEE: Record<UdemaeNameStr, UdemaePoint> = {
  "C-": 0,
  C: 20,
  "C+": 40,
  "B-": 55,
  B: 70,
  "B+": 85,
  "A-": 100,
  A: 110,
  "A+": 120,
  S: 150,
  "S+": 160,
};

export const REWARD_POINT: Record<
  UdemaeNameStr,
  [UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint, UdemaePoint]
> = {
  "C-": [0, 20, 45, 75, 110, 150],
  C: [0, 20, 45, 75, 110, 150],
  "C+": [0, 20, 45, 75, 110, 150],

  "B-": [0, 30, 65, 105, 150, 200],
  B: [0, 30, 65, 105, 150, 200],
  "B+": [0, 30, 65, 105, 150, 200],

  "A-": [0, 40, 85, 135, 190, 250],
  A: [0, 40, 85, 135, 190, 250],
  "A+": [0, 40, 85, 135, 190, 250],

  S: [0, 50, 105, 165, 230, 300],

  "S+": [0, 50, 105, 165, 230, 300],
};

type SPlusNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50;

export const ALL_SPLUS_NUMBER = Array.from(
  { length: 51 },
  (_, i) => i
) as ReadonlyArray<SPlusNumber>;

export const isSPlusNumber = (num: number): num is SPlusNumber =>
  0 <= num && num <= 50;

export type UdemaeName =
  | { str: Exclude<UdemaeNameStr, "S+"> }
  | { str: "S+"; num: SPlusNumber };

export const ALL_UDEMAE_NAME = ALL_UDEMAE_NAME_STR.flatMap(
  (str): UdemaeName[] => {
    if (str !== "S+") {
      return [{ str }];
    } else {
      return ALL_SPLUS_NUMBER.map((num) => ({ str: "S+", num }));
    }
  }
);

export const toString = (un: UdemaeName) =>
  `${un.str}${un.str === "S+" ? un.num : ""}`;

export const INITIAL_POINT = {
  "C-": 10,
  C: 200,
  "C+": 400,
  "B-": 100,
  B: 350,
  "B+": 600,
  "A-": 200,
  A: 500,
  "A+": 800,
  S: 300,
  "S+": [
    // 0 ~ 9
    300, 650, 1000, 1350, 1700, 2050, 2400, 2750, 3100, 3450,

    // 10 ~ 19
    300, 650, 1000, 1350, 1700, 2050, 2400, 2750, 3100, 3450,

    // 20 ~ 29
    300, 650, 1000, 1350, 1700, 2050, 2400, 2750, 3100, 3450,

    // 30 ~ 39
    300, 650, 1000, 1350, 1700, 2050, 2400, 2750, 3100, 3450,

    // 40 ~ 49
    300, 650, 1000, 1350, 1700, 2050, 2400, 2750, 3100, 3450,

    // 50
    300,
  ],
} as const;

export const initialPoint = (u: UdemaeName): UdemaePoint => {
  if (u.str !== "S+") {
    return INITIAL_POINT[u.str];
  } else {
    return INITIAL_POINT[u.str][u.num];
  }
};

export const PROMOTE_CHALLENGABLE_POINT = {
  "C+": 600,
  "B+": 850,
  "A+": 1100,
  S: 1000,
  "S+": 3800,
} as const;

export const toUInt = (u: UdemaeName) => {
  switch (u.str) {
    case "C-":
      return 0;
    case "C":
      return 1;
    case "C+":
      return 2;
    case "B-":
      return 3;
    case "B":
      return 4;
    case "B+":
      return 5;
    case "A-":
      return 6;
    case "A":
      return 7;
    case "A+":
      return 8;
    case "S":
      return 9;
    case "S+":
      return 10 + u.num;
  }
};

export const compare = (lhs: UdemaeName, rhs: UdemaeName) => {
  return Math.sign(toUInt(lhs) - toUInt(rhs));
};

// 1つ上のウデマエを返す
// S+50 のときのみ、undefined を返す
export const next = (u: UdemaeName): UdemaeName | undefined => {
  switch (u.str) {
    case "C-":
      return { str: "C" };
    case "C":
      return { str: "C+" };
    case "C+":
      return { str: "B-" };

    case "B-":
      return { str: "B" };
    case "B":
      return { str: "B+" };
    case "B+":
      return { str: "A-" };

    case "A-":
      return { str: "A" };
    case "A":
      return { str: "A+" };
    case "A+":
      return { str: "S" };

    case "S":
      return { str: "S+", num: 0 };

    case "S+": {
      if (u.num < 50) {
        return { str: "S+", num: (u.num + 1) as SPlusNumber };
      } else {
        return;
      }
    }
  }
};

export const nextWithoutPromotion = (u: UdemaeName): UdemaeName | undefined => {
  switch (u.str) {
    case "C-":
      return { str: "C" };
    case "C":
      return { str: "C+" };
    case "C+":
      return;

    case "B-":
      return { str: "B" };
    case "B":
      return { str: "B+" };
    case "B+":
      return;

    case "A-":
      return { str: "A" };
    case "A":
      return { str: "A+" };
    case "A+":
      return;

    case "S":
      return;

    case "S+": {
      if (u.num < 50) {
        if (u.num % 10 === 9) {
          return;
        } else {
          // 0 <= (u.num % 10) < 9
          return { str: "S+", num: (u.num + 1) as SPlusNumber };
        }
      } else {
        return;
      }
    }
  }
};
