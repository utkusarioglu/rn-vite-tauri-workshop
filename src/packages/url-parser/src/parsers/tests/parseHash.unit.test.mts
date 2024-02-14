import { parseHash } from "../parsers.mts";

const PARSE_HASH_CASES = [
  {
    describeTitle: "Empty",
    tests: [
      {
        testTitle: "Undefined",
        input: undefined,
        expected: undefined,
      },
      {
        testTitle: "Null",
        input: null,
        expected: undefined,
      },
      {
        testTitle: "Empty string",
        input: "",
        expected: undefined,
      },
    ],
  },
  {
    describeTitle: "Simple string",
    tests: [
      {
        testTitle: "String with no #",
        input: "hello",
        expected: "hello",
      },
      {
        testTitle: "String with special chars but no #",
        input: "aa-53&2'",
        expected: "aa-53&2'",
      },
    ],
  },
  {
    describeTitle: "String with #",
    tests: [
      {
        testTitle: "String with # at start",
        input: "#hello",
        expected: "hello",
      },
      {
        testTitle: "String with special chars and # at start",
        input: "#aa-53&2'",
        expected: "aa-53&2'",
      },
    ],
  },
];

describe(parseHash.name, () => {
  Object.values(PARSE_HASH_CASES).forEach(({ describeTitle, tests }) => {
    describe(describeTitle, () => {
      tests.forEach(({ input, expected, testTitle }) => {
        it(testTitle, () => {
          const response = parseHash(input);
          expect(response).toEqual(expected);
        });
      });
    });
  });
});
