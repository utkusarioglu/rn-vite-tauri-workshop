#!/usr/local/bin/node

/**
 * Produces all possible cases of "true" and "false"
 *
 * @example
 * true, TRUE, True, TrUe, ...
 *
 * @category Test Helpers
 */
function createBooleanStringPermutations() {
  const cases = ["true", "false"].reduce((acc, word) => {
    const permutations = createPermutations(word.length);

    const variants = permutations.map((combination) => {
      return combination.reduce((acc, curr, i) => {
        acc += curr ? word[i].toUpperCase() : word[i].toLowerCase();
        return acc;
      }, "");
    });
    variants.forEach((variant) => {
      acc.push({
        param: variant,
        expected: word === "true",
      });
    });
    return acc;
  }, []);
  return cases;
}

/**
 * Creates an array of strings composed of legal characters.
 *
 * @param arraySize length of the array to be returned.
 *
 * @returns array of strings composed of legal characters.
 *
 * @internal
 *
 * @category Test Helpers
 */
function createArbitraryStringsArray(rawArraySize) {
  const legalChars = createLegalChars();
  const arraySize = parseInt(rawArraySize);
  console.log({ legalChars });
  return Array(arraySize)
    .fill(null)
    .map(() => {
      const phraseLength = Math.floor(Math.random() * arraySize);
      let word = "";
      for (let i = 0; i < phraseLength; i++) {
        const charIndex = Math.floor(Math.random() * legalChars.length);
        word += legalChars[charIndex];
      }
      return word;
    });
}

/**
 * Creates [true, false] combinations of a given length
 *
 * @param count Element count for permutation.
 *
 * @returns 2D array of all unique true, false sequences.
 *
 * @internal
 *
 * @category Test Helpers
 *
 * @dev
 * This is a recursive function that adds true and false to the return of the
 * function `count - 1`.
 */
function createPermutations(count) {
  if (count < 1) {
    return;
  }
  if (count === 1) {
    return [[true], [false]];
  }
  const childCombinations = createPermutations(count - 1);
  return childCombinations.reduce((acc, curr) => {
    acc.push([true, ...curr]);
    acc.push([false, ...curr]);
    return acc;
  }, []);
}

/**
 * Creates a string of characters between the start and end char
 * codes.
 *
 * @example
 * 97, 122 => a-z
 * 65, 90 => A-Z
 * 48, 57 => 0-9
 *
 * @category Test Helpers
 */
function createCharRange(start, end) {
  return Array(end - start + 1)
    .fill(null)
    .map((_, i) => String.fromCharCode(i + start))
    .join("");
}

/**
 * Standard legal chars
 *
 * @category Test Helpers
 *
 * @codeComments
 * 1. Lowercase
 * 2. Uppercase
 * 3. Numbers
 */
function createLegalChars() {
  return [
    " -_",
    createCharRange(97, 122), // #1
    createCharRange(65, 90), // #2
    createCharRange(48, 57), // #3
  ].join("");
}

function parseParams() {
  const [feature, ...params] = process.argv.slice(2);
  if (!feature) {
    console.error("Error: This script requires at least one param");
    console.log("Available features:");
    Object.keys(features).forEach((key) => {
      console.log(key);
    });
    process.exit(1);
  }
  return { feature, params };
}

const features = {
  createLegalChars,
  createCharRange,
  createPermutations,
  createArbitraryStringsArray,
  createBooleanStringPermutations,
};

function main() {
  const { feature, params } = parseParams();
  if (!features[feature]) {
    console.error(`Error: Feature ${feature} does not exist`);
    process.exit(1);
  }
  switch (feature) {
    case "featureList":
      return Object.keys(features);
    default:
      const response = features[feature](...params);
      console.log(response);
  }
}

main();
