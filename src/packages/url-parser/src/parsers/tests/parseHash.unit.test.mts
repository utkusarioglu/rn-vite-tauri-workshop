import { ERRORS } from "../../messages.mts";
import { parseHash } from "../parsers.mts";

describe("Illegal", () => {
  describe("Types other than strings", () => {
    [
      // Numbers
      0,
      1,
      -1,
      BigInt(0),
      BigInt(100),
      // Booleans
      true,
      false,
      // Object types
      {},
      [],
      new Set(),
      new Map(),
    ].forEach((param) => {
      it(param.toString(), () => {
        expect(() => parseHash(param as string)).toThrow(
          ERRORS.UNSUPPORTED_TYPE,
        );
      });
    });
  });

  describe("Strings with multiple pounds", () => {
    ["##", "##hello", "#hello#", "hello##"].forEach((param) => {
      it(param, () => {
        expect(() => parseHash(param)).toThrow(ERRORS.MALFORMED_INPUT);
      });
    });
  });
});

describe("Legal", () => {
  describe("Empty Params", () => {
    describe("Undefined & Null & Empty String", () => {
      [undefined, null, ""].forEach((param) => {
        it(JSON.stringify(param), () => {
          const response = parseHash(param);
          expect(response).toEqual(undefined);
        });
      });
    });

    describe("String-Like", () => {
      ["#"].forEach((param) => {
        it(JSON.stringify(param), () => {
          const response = parseHash(param);
          expect(response).toEqual("");
        });
      });
    });
  });

  describe("Strings", () => {
    const RANDOM_STRINGS = [
      "d2t8hy2GajwrnNP",
      "IH0ci",
      "af",
      "de8vbt3",
      "zeNzTp-l",
      "2ya3t1HQM9",
      "tT8BV-AMpyTSl",
      "d0tJgiapDCoP",
      "TcOPVZBYwcn2TSWAzKj",
      "_v4p",
      "o0J9gG7-svU",
      "4",
      "kH4uy5Qwy7AeFazjP",
      "X-8SjA_",
      "e61Bg3wI6i",
      "kJiaT5HMS",
      "b",
      "o3x_NnPJ",
      "ox8T",
    ];

    describe("With Pound", () => {
      RANDOM_STRINGS.forEach((expected) => {
        it(expected, () => {
          const arg = `#${expected}`;
          const response = parseHash(arg);
          expect(response).toEqual(expected);
        });
      });
    });

    describe("Without Pound", () => {
      RANDOM_STRINGS.forEach((expected) => {
        it(expected, () => {
          const response = parseHash(expected);
          expect(response).toEqual(expected);
        });
      });
    });
  });
});
