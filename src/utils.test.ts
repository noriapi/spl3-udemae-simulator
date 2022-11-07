import { divideToArray } from "./utils";

test("simple", () => {
  expect(divideToArray(10, 5)).toEqual([2, 2, 2, 2, 2]);
});

test("some rest min", () => {
  expect(divideToArray(11, 5)).toEqual([3, 2, 2, 2, 2]);
});

test("some rest max", () => {
  expect(divideToArray(14, 5)).toEqual([3, 3, 3, 3, 2]);
});

test("some rest overflow", () => {
  expect(divideToArray(15, 5)).toEqual([3, 3, 3, 3, 3]);
});

test("containing zero", () => {
  expect(divideToArray(3, 5)).toEqual([1, 1, 1, 0, 0]);
});
