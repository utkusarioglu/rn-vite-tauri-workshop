import { LOGS } from "../../messages.mts";
import { mergeParams } from "../utils.mts";

const STRING_PARAMS = [
  "",
  "8tn1draDmGF0CUmMG",
  "v2f",
  "5fNmALw_oDS",
  "F5dbdMrEi099",
  "qFh6X9jOMzk",
  "4sQ57QZN",
  "2tpXMuTkxVzWlFlVT",
  "pPmon",
  "HWHGh",
  "S5",
  "M",
  "VtOSURRpWoJwgEPHqh",
  "ZwZ_OMy7JDqRN0",
  "hvbLVgwsMHEFX",
  "O6ynck",
  "3IunT9K40 Pgpheliwc",
  "2VEDGKZnFVBD",
  "r7Il_V-BsV",
];

const NUMBER_PARAMS = [
  0,
  1,
  -0,
  -1,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  -1 * Number.MAX_SAFE_INTEGER,
  -1 * Number.MIN_SAFE_INTEGER,
];
const BOOLEAN_PARAMS = [true, false];

describe("searchParams", () => {
  it("Empty Object", () => {
    const response = mergeParams({}, {}, undefined, "ignore");
    expect(response).toEqual({});
  });

  describe("Single Member Objects", () => {
    function searchParamsTester(searchParams: Record<string, any>) {
      const description = `Works with "${JSON.stringify(searchParams)}"`;

      it(description, () => {
        const response = mergeParams(searchParams, {}, undefined, "ignore");
        expect(response).toEqual(searchParams);
      });
    }

    describe("Strings", () => {
      STRING_PARAMS.map((param) => ({ string: param })).forEach(
        searchParamsTester,
      );
    });

    describe("Numbers", () => {
      NUMBER_PARAMS.map((param) => ({ number: param })).forEach(
        searchParamsTester,
      );
    });

    describe("Booleans", () => {
      BOOLEAN_PARAMS.map((param) => ({ boolean: param })).forEach(
        searchParamsTester,
      );
    });
  });
});

describe("additionalParams", () => {
  it("Empty Object", () => {
    const response = mergeParams({}, {}, undefined, "ignore");
    expect(response).toEqual({});
  });

  describe("Single Member Objects", () => {
    function additionalParamsTester(additionalParams: Record<string, any>) {
      const description = `Works with "${JSON.stringify(additionalParams)}"`;

      it(description, () => {
        const response = mergeParams({}, additionalParams, undefined, "ignore");
        expect(response).toEqual(additionalParams);
      });
    }

    describe("Strings", () => {
      STRING_PARAMS.map((param) => ({ string: param })).forEach(
        additionalParamsTester,
      );
    });

    describe("Numbers", () => {
      NUMBER_PARAMS.map((param) => ({ number: param })).forEach(
        additionalParamsTester,
      );
    });

    describe("Booleans", () => {
      BOOLEAN_PARAMS.map((param) => ({ boolean: param })).forEach(
        additionalParamsTester,
      );
    });
  });
});

describe("hash", () => {
  function hashTester(param: any) {
    it(`${param}`, () => {
      const response = mergeParams({}, {}, param, "ignore");
      const expected = { hash: param };
      expect(response).toEqual(expected);
    });
  }

  [
    // Undefined
    undefined,
    // String
    "OhSkjcg9WL749Ey_",
    "koHH93LaO",
    "4q-qCDVmae_b-V8Sa6",
    "ipZ",
    "_5sBMFb",
    "oNs-KrTIh",
    "2c6yOTIORwmuTKa7",
    "8pnPCNnV_vlVHG",
    "YbRdQJ0h7EA-Sjp05kf",
    "d",
    "8apKed0b3aGCTm h",
    "xk",
    "SJdxa41zzo2DC32 B",
    "E4uwCDdhFQB5A",
    "eK7JuwZs2Q-",
    "lPJ0XpRxRIz98i",
    "dnhNTeLkKlXMdFK58XF",
    "ylZIKrd2BqJn24Suy",
    "6GfgJnFmATh",
    "zlNz7L86L",
  ].forEach(hashTester);
});

describe("onConflict", () => {
  describe("ignore", () => {
    // TODO cast proper type
    let mockConsoleLog: any;

    beforeEach(() => {
      mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
      mockConsoleLog.mockRestore();
    });

    describe("searchParams & additionalParams", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              one: "searchParams",
            },
            additionalParams: {
              one: "additionalParams",
            },
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              one: 0,
            },
            additionalParams: {
              one: 1,
            },
          },
        },
        {
          description: "Boolean",
          params: {
            searchParams: {
              one: true,
            },
            additionalParams: {
              one: false,
            },
          },
        },
      ].forEach(({ description, params: { searchParams, additionalParams } }) =>
        it(description, () => {
          const response = mergeParams(
            searchParams,
            additionalParams,
            undefined,
            "ignore",
          );
          expect(response).toEqual(additionalParams);
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(LOGS.IGNORING_CONFLICT);
        }),
      );
    });

    describe("searchParams & hash", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              hash: "searchParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { searchParams, hash } }) =>
        it(description, () => {
          const response = mergeParams(searchParams, {}, hash, "ignore");
          const expected = { ...searchParams, hash };
          expect(response).toEqual(expected);
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(LOGS.IGNORING_CONFLICT);
        }),
      );
    });

    describe("additionalParams & hash", () => {
      [
        {
          description: "String",
          params: {
            additionalParams: {
              hash: "additionalParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            additionalParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { additionalParams, hash } }) =>
        it(description, () => {
          const response = mergeParams({}, additionalParams, hash, "ignore");
          const expected = { ...additionalParams, hash };
          expect(response).toEqual(expected);
          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(LOGS.IGNORING_CONFLICT);
        }),
      );
    });
  });

  describe("warn", () => {
    // TODO cast proper type
    let mockConsoleWarn: any;

    beforeEach(() => {
      mockConsoleWarn = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      mockConsoleWarn.mockRestore();
    });

    describe("searchParams & additionalParams", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              one: "searchParams",
            },
            additionalParams: {
              one: "additionalParams",
            },
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              one: 0,
            },
            additionalParams: {
              one: 1,
            },
          },
        },
        {
          description: "Boolean",
          params: {
            searchParams: {
              one: true,
            },
            additionalParams: {
              one: false,
            },
          },
        },
      ].forEach(({ description, params: { searchParams, additionalParams } }) =>
        it(description, () => {
          const response = mergeParams(
            searchParams,
            additionalParams,
            undefined,
            "warn",
          );
          expect(response).toEqual(additionalParams);
          expect(console.warn).toHaveBeenCalledTimes(1);
          expect(console.warn).toHaveBeenCalledWith(
            LOGS.keyDefinedTwice("one"),
          );
        }),
      );
    });

    describe("searchParams & hash", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              hash: "searchParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { searchParams, hash } }) =>
        it(description, () => {
          const response = mergeParams(searchParams, {}, hash, "warn");
          const expected = { ...searchParams, hash };
          expect(response).toEqual(expected);
          expect(console.warn).toHaveBeenCalledTimes(1);
          expect(console.warn).toHaveBeenCalledWith(LOGS.HASH_DEFINED_TWICE);
        }),
      );
    });

    describe("additionalParams & hash", () => {
      [
        {
          description: "String",
          params: {
            additionalParams: {
              hash: "additionalParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            additionalParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { additionalParams, hash } }) =>
        it(description, () => {
          const response = mergeParams({}, additionalParams, hash, "warn");
          const expected = { ...additionalParams, hash };
          expect(response).toEqual(expected);
          expect(console.warn).toHaveBeenCalledTimes(1);
          expect(console.warn).toHaveBeenCalledWith(LOGS.HASH_DEFINED_TWICE);
        }),
      );
    });
  });

  describe("error", () => {
    describe("searchParams & additionalParams", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              one: "searchParams",
            },
            additionalParams: {
              one: "additionalParams",
            },
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              one: 0,
            },
            additionalParams: {
              one: 1,
            },
          },
        },
        {
          description: "Boolean",
          params: {
            searchParams: {
              one: true,
            },
            additionalParams: {
              one: false,
            },
          },
        },
      ].forEach(({ description, params: { searchParams, additionalParams } }) =>
        it(description, () => {
          expect(() =>
            mergeParams(searchParams, additionalParams, undefined, "throw"),
          ).toThrow(LOGS.keyDefinedTwice("one"));
        }),
      );
    });

    describe("searchParams & hash", () => {
      [
        {
          description: "String",
          params: {
            searchParams: {
              hash: "searchParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            searchParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { searchParams, hash } }) =>
        it(description, () => {
          expect(() => mergeParams(searchParams, {}, hash, "throw")).toThrow(
            LOGS.HASH_DEFINED_TWICE,
          );
        }),
      );
    });

    describe("additionalParams & hash", () => {
      [
        {
          description: "String",
          params: {
            additionalParams: {
              hash: "additionalParams",
            },
            hash: "hash",
          },
        },
        {
          description: "Number",
          params: {
            additionalParams: {
              hash: 1,
            },
            hash: "hash",
          },
        },
      ].forEach(({ description, params: { additionalParams, hash } }) =>
        it(description, () => {
          expect(() =>
            mergeParams({}, additionalParams, hash, "throw"),
          ).toThrow(LOGS.HASH_DEFINED_TWICE);
        }),
      );
    });
  });
});
