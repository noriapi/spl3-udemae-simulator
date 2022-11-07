export const divideToArray = (num: number, div: number) => {
  const min = Math.floor(num / div);
  const mins = Array.from({ length: div }, () => min);

  const left = num % div;
  for (let i = 0; i < left; i++) {
    mins[i]++;
  }

  return mins;
};

export const eq =
  <T>(compareFn: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    compareFn(a, b) === 0;

export const gt =
  <T>(compareFn: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    compareFn(a, b) > 0;

export const lt =
  <T>(compareFn: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    compareFn(a, b) < 0;

export const ge =
  <T>(compareFn: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    eq(compareFn)(a, b) || gt(compareFn)(a, b);

export const le =
  <T>(compareFn: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    eq(compareFn)(a, b) || lt(compareFn)(a, b);
