import { isGenericObject } from "../utils.mts";

function tester(arg: any, expected: boolean) {
  const description =
    typeof arg === "bigint" ? arg.toString() : JSON.stringify(arg);

  it(description, () => {
    expect(isGenericObject(arg)).toBe(expected);
  });
}

describe("Primitive types", () => {
  describe("Null & Undefined", () => {
    [null, undefined].forEach((arg) => tester(arg, false));
  });

  describe("String:", () => {
    [
      "",
      "D kFdHL",
      "ag2ueEBp1",
      "JEGzlgk6I",
      "rdiAje3dZ",
      "GR8JKR",
      "uT4z Z0wI",
      "sOcUHa",
      "zP9Z5kEWk",
      "q",
    ].forEach((arg) => tester(arg, false));
  });

  describe("Numbers", () => {
    [
      0,
      1,
      -1 - 50,
      2.1296572009026136,
      -35.423,
      192,
      42.6440668,
      388.5391522562947,
      44,
      -32,
      550.5577975639568,
      5.803335763808626,
    ].forEach((arg) => tester(arg, false));
  });

  describe("Booleans", () => {
    [true, false].forEach((arg) => tester(arg, false));
  });

  describe("Symbols", () => {
    [
      "",
      "D kFdHL",
      "ag2ueEBp1",
      42.6440668,
      388.5391522562947,
      44,
      -32,
      undefined,
    ]
      .map((v) => Symbol(v))
      .forEach((arg) => tester(arg, false));
  });

  describe("BigInts", () => {
    [0, 1, -0, 42, 83, 44, 136, 48, 168, -251, 387, -342]
      .map(BigInt)
      .forEach((arg) => tester(arg, false));
  });
});

describe("Complex types", () => {
  describe("Sets", () => {
    [
      new Set(),
      new Set([1]),
      new Set([1, 2, 3]),
      new Set(["hello"]),
      new Set([true, false]),
    ].forEach((arg) => tester(arg, false));
  });

  describe("Maps", () => {
    [new Map()].forEach((arg) => tester(arg, false));
  });

  describe("Dates", () => {
    [Date.now(), new Date("01-01-1970"), new Date("Invalid date")].forEach(
      (arg) => tester(arg, false),
    );
  });

  describe("Generic Objects", () => {
    [{}, { oneParam: "one" }, { param1: 1, param2: false }].forEach((arg) =>
      tester(arg, true),
    );
  });
});
