import { ERRORS, LOGS } from "../../errors.mts";
import { handleConflict } from "../utils.mts";

describe("errorMessage", () => {
  describe("Illegal", () => {
    [undefined, null, ""].forEach((param) => {
      const description =
        typeof param === "string" ? "Empty String" : typeof param;
      it(description, () => {
        expect(() => handleConflict(param as string, "ignore")).toThrow(
          ERRORS.NO_OR_WRONG_VALUE,
        );
      });
    });
  });

  describe("Legal", () => {
    describe("Edge Cases", () => {
      [
        // String of spaces of arbitrary length:
        " ",
        "".padEnd(5, " "),
        "".padEnd(10, " "),
        "".padEnd(20, " "),
      ].forEach((errorMessage) => {
        it(`"${errorMessage}" against "throw"`, () => {
          expect(() => handleConflict(errorMessage, "throw")).toThrow(
            errorMessage,
          );
        });

        it(`"${errorMessage}" against "warn"`, () => {
          const warnMock = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});
          handleConflict(errorMessage, "warn");

          expect(console.warn).toHaveBeenCalledTimes(1);
          expect(console.warn).toHaveBeenCalledWith(errorMessage);

          warnMock.mockRestore();
        });

        it(`"${errorMessage}" against "ignore"`, () => {
          const ignoreMock = jest
            .spyOn(console, "log")
            .mockImplementation(() => {});
          handleConflict(errorMessage, "ignore");

          expect(console.log).toHaveBeenCalledTimes(1);
          expect(console.log).toHaveBeenCalledWith(LOGS.IGNORING_CONFLICT);

          ignoreMock.mockRestore();
        });

        it(`"${errorMessage}" against unrecognized enum`, () => {
          expect(() =>
            handleConflict(errorMessage, "random" as "ignore"),
          ).toThrow(ERRORS.UNRECOGNIZED_ENUM);
        });
      });
    });
  });
});
