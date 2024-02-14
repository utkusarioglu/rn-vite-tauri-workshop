import { isNumeric } from "../utils.mts";

describe("Non numeric types", () => {
  function testForFalse(param: any) {
    it(`${param} => false`, () => {
      expect(isNumeric(param)).toBe(false);
    });
  }

  describe("Primitives excluding `number`", () => {
    [
      // Strings
      "",
      " ",
      "a",
      "xmk",
      "cvh1l8",
      " SbX",
      "e4fpK49EZ",
      "_MY",
      "0Ma",
      "7o",
      // booleans
      false,
      true,
      // Absent
      null,
      undefined,
    ].forEach(testForFalse);
  });

  describe("Complex types", () => {
    [
      // Arrays
      [],
      ["something"],
      [0],
      [1],
      // Objects,
      {},
      new Set(),
      new Map(),
      // Date
      new Date(0),
    ].forEach(testForFalse);
  });
});

describe("Numeric Types", () => {
  function testForTrue(param: number | BigInt) {
    it(`${param} => true`, () => {
      expect(isNumeric(param)).toBe(true);
    });
  }

  describe("Floats", () => {
    [
      // Positive
      0.1,
      1.124,
      100.21,
      Number.MIN_VALUE -
        // Negative
        0.00001,
      -0.3,
      -1,
      -10,
      -100,
      Number.MIN_VALUE * -1,
    ].forEach(testForTrue);
  });

  describe("Integers", () => {
    [
      // Positive
      0,
      1,
      10,
      100,
      Number.MAX_SAFE_INTEGER,
      // Negative
      -0,
      -1,
      -10,
      -1000,
      Number.MIN_SAFE_INTEGER,
    ].forEach(testForTrue);
  });

  describe("BigInt", () => {
    [
      // Positive
      0, 1, 1e18, 1e100,
      // Negative
      -0, -1, -1e18, -1e100,
    ].forEach(testForTrue);
  });
});
