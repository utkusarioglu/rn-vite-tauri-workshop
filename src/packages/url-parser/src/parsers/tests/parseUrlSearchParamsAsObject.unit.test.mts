import { parseUrlSearchParamsAsObject } from "../parsers.mts";
import * as Utils from "../../utils/utils.mts";

describe("Legal", () => {
  let mockConvertValueType: jest.SpyInstance;

  beforeEach(() => {
    mockConvertValueType = jest.spyOn(Utils, "convertValueType");
  });

  afterEach(() => {
    mockConvertValueType.mockClear();
  });

  it("Empty Object", () => {
    const urlSearchParams = new URLSearchParams({});
    const response = parseUrlSearchParamsAsObject(urlSearchParams);
    expect(response).toEqual({});
  });

  describe("Single Param", () => {
    [
      {
        params: {
          param: "hello",
        },
        expected: {
          param: "hello",
        },
      },
      {
        params: {
          param: "100",
        },
        expected: {
          param: 100,
        },
      },
      {
        params: {
          param: "true",
        },
        expected: {
          param: true,
        },
      },
    ].forEach(({ params, expected }) => {
      it(JSON.stringify(expected), () => {
        const args = new URLSearchParams(params);
        const response = parseUrlSearchParamsAsObject(args);

        expect(response).toEqual(expected);
        expect(mockConvertValueType).toHaveBeenCalledTimes(1);
        expect(mockConvertValueType).toHaveBeenCalledWith(params.param);
        expect(mockConvertValueType).toHaveReturnedWith(expected.param);
      });
    });
  });

  describe("Multiple Params", () => {
    [
      {
        params: {
          param1: "string",
          param2: "100",
        },
        expected: {
          param1: "string",
          param2: 100,
        },
      },
      {
        params: {
          param1: "string",
          param3: "false",
        },
        expected: {
          param1: "string",
          param3: false,
        },
      },
      {
        params: {
          one: "1",
          two: "2",
          three: "5",
        },
        expected: {
          one: 1,
          two: 2,
          three: 5,
        },
      },
      {
        params: {
          cats: "dogs",
          livingTogether: "mass hysteria",
          "10": "11",
          hello: "world",
          truthsAre: "false",
        },
        expected: {
          cats: "dogs",
          livingTogether: "mass hysteria",
          "10": 11,
          hello: "world",
          truthsAre: false,
        },
      },
    ].forEach(({ params, expected }) => {
      const description = Object.keys(params).length + " keys";
      it(description, () => {
        const args = new URLSearchParams(params as any);
        const response = parseUrlSearchParamsAsObject(args);

        expect(response).toEqual(expected);
        expect(mockConvertValueType).toHaveBeenCalledTimes(
          Object.keys(expected).length,
        );

        Object.values(params).forEach((value) => {
          expect(mockConvertValueType).toHaveBeenCalledWith(value);
        });

        Object.values(expected).forEach((returned) => {
          expect(mockConvertValueType).toHaveReturnedWith(returned);
        });
      });
    });
  });
});
