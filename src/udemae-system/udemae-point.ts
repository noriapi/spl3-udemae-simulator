export type UdemaePoint = number;

export const UDEMAE_POINT_MAX: UdemaePoint = 9999;
export const UDEMAE_POINT_MIN: UdemaePoint = -9999;

export const addSafe = (lhs: UdemaePoint, rhs: UdemaePoint) =>
  Math.min(Math.max(lhs + rhs, UDEMAE_POINT_MIN), UDEMAE_POINT_MAX);
