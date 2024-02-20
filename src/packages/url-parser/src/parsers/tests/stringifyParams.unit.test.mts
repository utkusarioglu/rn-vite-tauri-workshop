import { ERRORS } from "../../messages.mts";
import { stringifyParams } from "../parsers.mts";

describe("Illegal", () => {
  [
    null,
    undefined,
    true,
    false,
    0,
    1,
    -1,
    // BigInt(0),
    // BigInt(1),
    // BigInt(-1),
    [],
    ["hello"],
    "hello",
    new Set(),
    new Map(),
    Symbol("hello"),
  ].forEach((param) => {
    it(JSON.stringify(param), () => {
      expect(() => stringifyParams(param as any)).toThrow(
        ERRORS.UNSUPPORTED_TYPE,
      );
    });
  });
});

describe("Legal", () => {
  function tester({ args, expected }: any) {
    it(`${JSON.stringify(args)} => ${expected}`, () => {
      const response = stringifyParams(args as any);
      expect(response).toBe(expected);
    });
  }

  it("Empty object", () => {
    const response = stringifyParams({});
    const expected = "";
    expect(response).toBe(expected);
  });

  describe("Without Hash", () => {
    describe("Object with single property", () => {
      [
        {
          args: {
            param: "str",
          },
          expected: "?param=str",
        },
        {
          args: {
            empty: "",
          },
          expected: "?empty=",
        },
        {
          args: {
            num: 0,
          },
          expected: "?num=0",
        },
        {
          args: {
            num: 110,
          },
          expected: "?num=110",
        },
        {
          args: {
            bool: true,
          },
          expected: "?bool=true",
        },
        {
          args: {
            bool: false,
          },
          expected: "?bool=false",
        },
      ].forEach(tester);
    });

    describe("Objects with multiple properties", () => {
      [
        {
          args: {
            param1: "str1",
            param2: "str2",
          },
          expected: "?param1=str1&param2=str2",
        },
        {
          args: {
            empty1: "",
            empty2: "",
          },
          expected: "?empty1=&empty2=",
        },
        {
          args: {
            num: 0,
            num2: 1,
          },
          expected: "?num=0&num2=1",
        },
        {
          args: {
            num: 110,
            num2: 113,
          },
          expected: "?num=110&num2=113",
        },
        {
          args: {
            bool: true,
            bool2: false,
          },
          expected: "?bool=true&bool2=false",
        },
        {
          args: {
            bool: false,
            bool2: true,
          },
          expected: "?bool=false&bool2=true",
        },
      ].forEach(tester);
    });
  });

  describe("With Hash", () => {
    describe("Object with only hash key:", () => {
      [
        {
          args: {
            hash: "",
          },
          expected: "",
        },
        {
          args: {
            hash: "-",
          },
          expected: "#-",
        },
        {
          args: {
            hash: undefined,
          },
          expected: "",
        },
        {
          args: {
            hash: null,
          },
          expected: "",
        },
        {
          args: {
            hash: "hello",
          },
          expected: "#hello",
        },
        {
          args: {
            hash: 0,
          },
          expected: "#0",
        },
        {
          args: {
            hash: 1,
          },
          expected: "#1",
        },
        {
          args: {
            hash: -1,
          },
          expected: "#-1",
        },
      ].forEach(tester);
    });

    describe("Objects with hash and one other key", () => {
      [
        {
          args: {
            param: "str",
            hash: "hello1",
          },
          expected: "?param=str#hello1",
        },
        {
          args: {
            empty: "",
            hash: "-",
          },
          expected: "?empty=#-",
        },
        {
          args: {
            num: 0,
            hash: 22,
          },
          expected: "?num=0#22",
        },
        {
          args: {
            num: 110,
            hash: 111,
          },
          expected: "?num=110#111",
        },
        {
          args: {
            bool: true,
            hash: false,
          },
          expected: "?bool=true#false",
        },
        {
          args: {
            bool: false,
            hash: true,
          },
          expected: "?bool=false#true",
        },
      ].forEach(tester);
    });

    describe("Objects with hash and multiple other keys", () => {
      [
        {
          args: {
            param1: "str1",
            param2: "str2",
            hash: "hello1",
          },
          expected: "?param1=str1&param2=str2#hello1",
        },
        {
          args: {
            empty1: "",
            empty2: "",
            hash: "-",
          },
          expected: "?empty1=&empty2=#-",
        },
        {
          args: {
            num: 0,
            num2: 1,
            hash: 22,
          },
          expected: "?num=0&num2=1#22",
        },
        {
          args: {
            num: 110,
            num2: 113,
            hash: 111,
          },
          expected: "?num=110&num2=113#111",
        },
        {
          args: {
            bool: true,
            bool2: false,
            hash: false,
          },
          expected: "?bool=true&bool2=false#false",
        },
        {
          args: {
            bool: false,
            bool2: true,
            hash: true,
          },
          expected: "?bool=false&bool2=true#true",
        },
      ].forEach(tester);
    });
  });
});
