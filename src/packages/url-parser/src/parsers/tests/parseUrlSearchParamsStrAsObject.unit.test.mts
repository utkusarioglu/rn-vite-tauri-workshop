import { parseUrlSearchParamStrAsObject } from "../parsers.mts";

describe("searchParamsStr", () => {
  function tester({ description, params, expected }: any) {
    const searchParams = new URLSearchParams(params);
    it(description, () => {
      const response = parseUrlSearchParamStrAsObject(searchParams.toString());
      expect(response).toEqual(expected);
    });
  }

  describe("Legal", () => {
    tester({
      description: "Empty string",
      params: "",
      expected: {},
    });
  });

  describe("Single param", () => {
    describe("Stringified numbers", () => {
      [0, 1, -1, 10, 100, 1e20].forEach((expected) => {
        const value = expected.toString();
        tester({
          description: `Works with ${expected}`,
          params: { param: value },
          expected: { param: expected },
        });
      });
    });

    describe("Strings", () => {
      [
        "",
        "2yNb-1piqpAys",
        "n9lQld-H",
        "XDMBZpDst",
        "NKHcel",
        "Q7ie",
        "eRiy9QwGXAEK",
        "R_h0gsC5E7ze",
        "AvncH",
        "DIb",
        "PG",
        "4UCOV2-xBQkfGqzusc",
        "cv",
        "hoMiWtuM",
        "7WWL5z1rgmouYP3_FT",
        "aCbkNNoIm",
        "vbdmBG6Rnx1u_0d1N",
        "jK7Ra5N0k",
        "0OBrt",
      ].forEach((param) => {
        tester({
          description: `Works with "${param}"`,
          params: { param },
          expected: { param },
        });
      });
    });

    describe("Stringified boolean", () => {
      [
        { param: "TRUE", expected: true },
        { param: "tRUE", expected: true },
        { param: "TrUE", expected: true },
        { param: "trUE", expected: true },
        { param: "TRuE", expected: true },
        { param: "tRuE", expected: true },
        { param: "TruE", expected: true },
        { param: "truE", expected: true },
        { param: "TRUe", expected: true },
        { param: "tRUe", expected: true },
        { param: "TrUe", expected: true },
        { param: "trUe", expected: true },
        { param: "TRue", expected: true },
        { param: "tRue", expected: true },
        { param: "True", expected: true },
        { param: "true", expected: true },
        { param: "FALSE", expected: false },
        { param: "fALSE", expected: false },
        { param: "FaLSE", expected: false },
        { param: "faLSE", expected: false },
        { param: "FAlSE", expected: false },
        { param: "fAlSE", expected: false },
        { param: "FalSE", expected: false },
        { param: "falSE", expected: false },
        { param: "FALsE", expected: false },
        { param: "fALsE", expected: false },
        { param: "FaLsE", expected: false },
        { param: "faLsE", expected: false },
        { param: "FAlsE", expected: false },
        { param: "fAlsE", expected: false },
        { param: "FalsE", expected: false },
        { param: "falsE", expected: false },
        { param: "FALSe", expected: false },
        { param: "fALSe", expected: false },
        { param: "FaLSe", expected: false },
        { param: "faLSe", expected: false },
        { param: "FAlSe", expected: false },
        { param: "fAlSe", expected: false },
        { param: "FalSe", expected: false },
        { param: "falSe", expected: false },
        { param: "FALse", expected: false },
        { param: "fALse", expected: false },
        { param: "FaLse", expected: false },
        { param: "faLse", expected: false },
        { param: "FAlse", expected: false },
        { param: "fAlse", expected: false },
        { param: "False", expected: false },
        { param: "false", expected: false },
      ].forEach(({ param, expected }) => {
        tester({
          description: `${param} => ${expected ? "true" : "false"}`,
          params: { param },
          expected: { param: expected },
        });
      });
    });
  });

  describe("Multiple params", () => {
    [
      {
        description: "2 Stringified numbers",
        params: {
          param1: "1",
          param2: "2",
        },
        expected: {
          param1: 1,
          param2: 2,
        },
      },
      {
        description: "Stringified number & boolean",
        params: {
          param1: "one",
          param2: "true",
        },
        expected: {
          param1: "one",
          param2: true,
        },
      },
      {
        description: "String and Stringified boolean",
        params: {
          param1: "trua",
          param2: "true",
        },
        expected: {
          param1: "trua",
          param2: true,
        },
      },
    ].forEach(tester);
  });
});
