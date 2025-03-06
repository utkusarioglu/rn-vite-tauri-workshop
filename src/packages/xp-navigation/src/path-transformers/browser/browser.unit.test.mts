import { browserPathTransformer } from "./browser.mts";

describe("args/rawPath", () => {
  describe("Illegal", () => {
    describe("Types other than strings", () => {
      [
        undefined,
        null,
        0,
        1,
        true,
        false,
        {},
        new Set(),
        new Map(),
        new Date(),
      ].forEach((rawPath) => {
        it(typeof rawPath, () => {
          expect(() =>
            browserPathTransformer(rawPath as unknown as string, {}),
          ).toThrow("something");
        });
      });
    });
  });
});
