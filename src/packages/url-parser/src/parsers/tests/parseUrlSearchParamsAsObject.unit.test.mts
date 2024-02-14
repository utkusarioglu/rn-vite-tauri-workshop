import { parseUrlSearchParamsAsObject } from "../parsers.mts";

const PARSE_URL_SEARCH_PARAMS_AS_OBJECT_CASES = [
  {
    describeTitle: "Empty",
    tests: [
      {
        testTitle: "Empty",
        input: {},
        expected: {},
      },
    ],
  },
  {
    describeTitle: "Single Param",
    tests: [
      {
        testTitle: "String",
        input: {
          param1: "one",
        },
        expected: {
          param1: "one",
        },
      },
      {
        testTitle: "Number",
        input: {
          param1: 1,
        },
        expected: {
          param1: 1,
        },
      },
      {
        testTitle: "Boolean",
        input: {
          param1: true,
        },
        expected: {
          param1: true,
        },
      },
    ],
  },
  {
    describeTitle: "Multiple Param",
    tests: [
      {
        testTitle: "String & Number",
        input: {
          param1: "one",
          param2: 2,
        },
        expected: {
          param1: "one",
          param2: 2,
        },
      },
      {
        testTitle: "Number & Boolean",
        input: {
          param1: 1,
          param2: false,
        },
        expected: {
          param1: 1,
          param2: false,
        },
      },
      {
        testTitle: "Boolean & String",
        input: {
          param1: true,
          param2: "hello",
        },
        expected: {
          param1: true,
          param2: "hello",
        },
      },
    ],
  },
];

describe(parseUrlSearchParamsAsObject.name, () => {
  Object.values(PARSE_URL_SEARCH_PARAMS_AS_OBJECT_CASES).forEach(
    ({ describeTitle, tests }) => {
      describe(describeTitle, () => {
        tests.forEach(({ input, expected, testTitle }) => {
          const searchParams = new URLSearchParams(input);
          it(testTitle, () => {
            const response = parseUrlSearchParamsAsObject(searchParams);
            expect(response).toEqual(expected);
          });
        });
      });
    },
  );
});
