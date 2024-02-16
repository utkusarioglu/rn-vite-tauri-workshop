import { parseUrlSearchParamStrAsObject } from "../parsers.mts";
import * as Utils from "../../utils/utils.mts";
import { ERRORS } from "../../errors.mts";

describe("Illegal", () => {
  describe("Spaces", () => {
    [
      "he= ds",
      "param=hello ",
      "value=ca tas",
      "etc=a sda te",
      "num=1 22",
      "other= 11",
    ].forEach((searchParamsStr) => {
      it(searchParamsStr, () => {
        expect(() => parseUrlSearchParamStrAsObject(searchParamsStr)).toThrow(
          ERRORS.NO_SPACE_ALLOWED,
        );
      });
    });
  });

  describe("`&` at wrong places", () => {
    ["&&param=wrong", "entry=one&&", "triple=3&&&"].forEach(
      (searchParamsStr) => {
        it(searchParamsStr, () => {
          expect(() => parseUrlSearchParamStrAsObject(searchParamsStr)).toThrow(
            ERRORS.ZERO_LENGTH_ENTRY,
          );
        });
      },
    );
  });

  describe("`=` at wrong places", () => {
    [
      // Consecutive occurrences of "="
      "consecutive==3",
      "consecutive===5",
      // Multiple occurrences of `=` between `&`
      "param=a=b",
      "value=a&things=a=a",
      "triple=b&one=two&yes=1=2=3",
    ].forEach((searchParamsStr) => {
      it(searchParamsStr, () => {
        expect(() => parseUrlSearchParamStrAsObject(searchParamsStr)).toThrow(
          ERRORS.MULTIPLE_ASSIGNMENTS,
        );
      });
    });
  });
});

describe("Legal", () => {
  let mockConvertValueType: jest.SpyInstance;

  beforeEach(() => {
    mockConvertValueType = jest.spyOn(Utils, "convertValueType");
  });

  afterEach(() => {
    mockConvertValueType.mockClear();
  });

  it("Empty String", () => {
    const expected = {};
    const searchParams = new URLSearchParams("").toString();
    const response = parseUrlSearchParamStrAsObject(searchParams);
    expect(response).toEqual(expected);
  });

  describe("Single Param", () => {
    describe("Stringified numbers", () => {
      [0, 1, -1, 10, 100, 1e20].forEach((value) => {
        it(value.toString(), () => {
          const valueStr = value.toString();
          const searchParamsStr = new URLSearchParams({
            param: valueStr,
          }).toString();
          const expected = { param: value };
          const response = parseUrlSearchParamStrAsObject(searchParamsStr);

          expect(response).toEqual(expected);
          expect(mockConvertValueType).toHaveBeenCalledTimes(1);
          expect(mockConvertValueType).toHaveBeenLastCalledWith(valueStr);
          expect(mockConvertValueType).toHaveReturnedWith(value);
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
      ].forEach((value) => {
        it(value, () => {
          const searchParamsStr = new URLSearchParams({
            param: value,
          }).toString();
          const expected = { param: value };
          const response = parseUrlSearchParamStrAsObject(searchParamsStr);

          expect(response).toEqual(expected);
          expect(mockConvertValueType).toHaveBeenCalledTimes(1);
          expect(mockConvertValueType).toHaveBeenCalledWith(value);
          expect(mockConvertValueType).toHaveReturnedWith(value);
        });
      });
    });

    describe("Stringified booleans", () => {
      [
        {
          value: "true",
          converted: true,
        },
        {
          value: "True",
          converted: true,
        },
        {
          value: "FALSE",
          converted: false,
        },
      ].forEach(({ value, converted }) => {
        it(`${value} => ${converted ? "true" : "false"}`, () => {
          const searchParamsStr = new URLSearchParams({
            param: value,
          }).toString();
          const expected = { param: converted };
          const response = parseUrlSearchParamStrAsObject(searchParamsStr);

          expect(response).toEqual(expected);
          expect(mockConvertValueType).toHaveBeenCalledTimes(1);
          expect(mockConvertValueType).toHaveBeenCalledWith(value);
          expect(mockConvertValueType).toHaveReturnedWith(converted);
        });
      });
    });
  });

  describe("Multiple params", () => {
    describe("Two params", () => {
      [
        {
          description: "Two strings",
          value: {
            param1: "param1",
            param2: "param2",
          },
          expected: {
            param1: "param1",
            param2: "param2",
          },
        },
        {
          description: "2 Stringified numbers",
          value: {
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
          value: {
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
          value: {
            param1: "trua",
            param2: "true",
          },
          expected: {
            param1: "trua",
            param2: true,
          },
        },
      ].forEach(({ description, value, expected }) => {
        it(description, () => {
          const searchParamsStr = new URLSearchParams(value).toString();
          const response = parseUrlSearchParamStrAsObject(searchParamsStr);

          expect(response).toEqual(expected);
          expect(mockConvertValueType).toHaveBeenCalledTimes(
            Object.keys(value).length,
          );
          Object.values(value).forEach((value) => {
            expect(mockConvertValueType).toHaveBeenCalledWith(value);
          });
          Object.values(expected).forEach((e) => {
            expect(mockConvertValueType).toHaveReturnedWith(e);
          });
        });
      });
    });
  });
});
