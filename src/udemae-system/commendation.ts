import { addSafe, UdemaePoint } from "./udemae-point";

export type Commendation = "gold" | "silver";

export const POINT: Record<Commendation, UdemaePoint> = {
  gold: 5,
  silver: 1,
};

export interface Commendations {
  gold: number;
  silver: number;
}

export const INITIAL: Commendations = {
  gold: 0,
  silver: 0,
};

export const points = (comms: Commendations): UdemaePoint =>
  comms.gold * POINT["gold"] + comms.silver * POINT["silver"];

export const add = (lhs: Commendations, rhs: Commendations): Commendations => ({
  gold: addSafe(lhs.gold, rhs.gold),
  silver: addSafe(lhs.silver, rhs.silver),
});

export const commToComms = (comm?: Commendation): Commendations => {
  switch (comm) {
    case "gold":
      return {
        gold: 1,
        silver: 0,
      };
    case "silver":
      return {
        gold: 0,
        silver: 1,
      };
    default:
      return INITIAL;
  }
};

export const fold = (arr: (Commendation | undefined)[]): Commendations =>
  arr.reduce((prev, comm) => add(prev, commToComms(comm)), INITIAL);

export const flat = (comms: Commendations): Commendation[] =>
  Array.from({ length: comms.gold }, (): Commendation => "gold").concat(
    Array.from({ length: comms.silver }, (): Commendation => "silver")
  );
