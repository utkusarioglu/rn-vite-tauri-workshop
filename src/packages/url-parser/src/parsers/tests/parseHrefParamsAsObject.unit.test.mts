import { parseHrefParamsAsObject } from "../parsers.mts";

const PARSE_HREF_PARAMS_AS_OBJECT_WITH_CONFLICT_IGNORE_CASES = [
  {
    describeTitle: "Empty",
    tests: [
      {
        testTitle: "Empty search params",
        input: {
          href: "http://www.example.com",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {},
      },
      {
        testTitle: "Empty search params",
        input: {
          href: "https://www.example.com",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {},
      },
    ],
  },

  {
    describeTitle: "One Param in href",
    tests: [
      {
        testTitle: "One string param in href",
        input: {
          href: "http://www.example.com?param1=one",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "one",
        },
      },
      {
        testTitle: "One number 1 param in href",
        input: {
          href: "http://www.example.com?param1=1",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
        },
      },
      {
        testTitle: "One number 0 param in href",
        input: {
          href: "http://www.example.com?param1=0",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 0,
        },
      },
      {
        testTitle: "One boolean true param in href",
        input: {
          href: "http://www.example.com?param1=true",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: true,
        },
      },
      {
        testTitle: "One boolean false param in href",
        input: {
          href: "http://www.example.com?param1=false",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: false,
        },
      },
      {
        testTitle: "One boolean-like string param in href",
        input: {
          href: "http://www.example.com?param1=trua",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "trua",
        },
      },
    ],
  },

  {
    describeTitle: "One param in additionalParams",
    tests: [
      {
        testTitle: "One string param",
        input: {
          href: "http://www.example.com",
          additionalParams: {
            param1: "one",
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "one",
        },
      },
      {
        testTitle: "One number 1 param",
        input: {
          href: "http://www.example.com",
          additionalParams: {
            param1: 1,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
        },
      },
      {
        testTitle: "One number 0 param",
        input: {
          href: "http://www.example.com",
          additionalParams: {
            param1: 0,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 0,
        },
      },
      {
        testTitle: "One boolean true param",
        input: {
          href: "http://www.example.com",
          additionalParams: {
            param1: true,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: true,
        },
      },
      {
        testTitle: "One boolean false param",
        input: {
          href: "http://www.example.com",
          additionalParams: {
            param1: false,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: false,
        },
      },
    ],
  },

  {
    describeTitle: "Multiple params in href",
    tests: [
      {
        testTitle: "String & Number 1",
        input: {
          href: "http://www.example.com?param1=hello&param2=1",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "hello",
          param2: 1,
        },
      },
      {
        testTitle: "String & Number 0",
        input: {
          href: "http://www.example.com?param1=hello&param2=0",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "hello",
          param2: 0,
        },
      },
      {
        testTitle: "String & Boolean true",
        input: {
          href: "http://www.example.com?param1=hello&param2=true",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "hello",
          param2: true,
        },
      },
      {
        testTitle: "String & Boolean false",
        input: {
          href: "http://www.example.com?param1=hello&param2=false",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "hello",
          param2: false,
        },
      },
      {
        testTitle: "Number 1 & Boolean",
        input: {
          href: "http://www.example.com?param1=1&param2=true",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
          param2: true,
        },
      },
      {
        testTitle: "Number 1 & Boolean & String",
        input: {
          href: "http://www.example.com?param1=1&param2=true&param3=aabb",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
          param2: true,
          param3: "aabb",
        },
      },
    ],
  },

  {
    describeTitle: "Malformed",
    tests: [
      {
        testTitle: "Multiple &",
        input: {
          href: "http://www.example.com?param1=aa?param2=bb",
          additionalParams: {},
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "aa?param2=bb",
        },
      },
    ],
  },

  {
    describeTitle: "Href and Additional Params both",
    tests: [
      {
        testTitle: "Strings",
        input: {
          href: "http://www.example.com?param1=aa",
          additionalParams: {
            param2: "bb",
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: "aa",
          param2: "bb",
        },
      },
      {
        testTitle: "Number 1 & String",
        input: {
          href: "http://www.example.com?param1=1",
          additionalParams: {
            param2: "bb",
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
          param2: "bb",
        },
      },
      {
        testTitle: "Number 0 & String",
        input: {
          href: "http://www.example.com?param1=0",
          additionalParams: {
            param2: "bb",
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 0,
          param2: "bb",
        },
      },
      {
        testTitle: "Number 1 & Boolean true",
        input: {
          href: "http://www.example.com?param1=1",
          additionalParams: {
            param2: true,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
          param2: true,
        },
      },
      {
        testTitle: "Number 1 & Boolean false",
        input: {
          href: "http://www.example.com?param1=1",
          additionalParams: {
            param2: false,
          },
          onConflict: "ignore" as "ignore",
        },
        expected: {
          param1: 1,
          param2: false,
        },
      },
    ],
  },
];

const PARSE_HREF_PARAMS_AS_OBJECT_WITH_WARN_CONFLICT_CASES = [
  {
    describeTitle: "Same Type",
    tests: [
      {
        testTitle: "String",
        input: {
          href: "http://www.example.com?param=hello1",
          additionalParams: {
            param: "hello2",
          },
        },
        expected: {
          response: {
            param: "hello2",
          },
          errorMessage: "Key 'param' defined twice",
        },
      },
    ],
  },
];

describe(parseHrefParamsAsObject.name, () => {
  Object.values(PARSE_HREF_PARAMS_AS_OBJECT_WITH_CONFLICT_IGNORE_CASES).forEach(
    ({ describeTitle, tests }) => {
      describe(describeTitle, () => {
        tests.forEach(({ input, expected, testTitle }) => {
          it(testTitle, () => {
            const response = parseHrefParamsAsObject(
              input.href,
              input.additionalParams,
              "ignore",
            );
            expect(response).toEqual(expected);
          });
        });
      });
    },
  );

  Object.values(PARSE_HREF_PARAMS_AS_OBJECT_WITH_WARN_CONFLICT_CASES).forEach(
    ({ describeTitle, tests }) => {
      describe.only(describeTitle, () => {
        tests.forEach(({ input, expected, testTitle }) => {
          let warnMock: ReturnType<typeof jest.spyOn>;

          beforeEach(() => {
            warnMock = jest.spyOn(console, "warn").mockImplementation(() => {});
          });

          afterEach(() => {
            warnMock.mockRestore();
          });

          it(testTitle, () => {
            const response = parseHrefParamsAsObject(
              input.href,
              input.additionalParams,
              "warn",
            );
            expect(response).toEqual(expected.response);
            expect(console.warn).toHaveBeenCalledWith(expected.errorMessage);
          });
        });
      });
    },
  );
});
