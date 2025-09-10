/** @import { Validation, ValidationError } from "./validation.js" */

import { describe, it } from "@std/testing/bdd";
import { validation } from "./validation.js";
import { assertEquals } from "@std/assert";

/**
 * @param {any} num
 * @returns {Validation<ValidationError, number>}
 */
const validateNum = (num) =>
  num >= 18
    ? validation.success(num)
    : validation.failure([{
      tag: "validation-error",
      message: "Too low",
      value: num,
    }]);

describe("validation", () => {
  describe(validation.success.name, () => {
    it("should return a Validation<E, A> that has a tag = success property", () => {
      assertEquals(validation.success(123).tag, "success");
    });

    it("should return a Validation<E, A> that has a value = A property", () => {
      const result = validation.success(123);
      assertEquals(result.tag === "success" && result.value, 123);
    });

    it("should return a Validation<E, A> that can map to Validation<E, B>", () => {
      assertEquals(
        validation.success(123).map((num) => String(num)).fold(
          (err) => String(err),
          (val) => val,
        ),
        "123",
      );
    });

    it("should return a Validation<E, A> that can apply to Validation<E, B>", () => {
      assertEquals(
        validation.success(123).ap(validation.of(validateNum)).fold(
          (err) => Number(err),
          (val) => val.tag === "success" && val.value,
        ),
        123,
      );
    });

    it("should return a Validation<E, A> that can fold to B", () => {
      assertEquals(
        validation.success(123).fold(
          (err) => Number(err),
          (val) => val,
        ),
        123,
      );
    });

    it("should return a Validation<E, A> that can chain to Validation<E, B>", () => {
      assertEquals(
        validation.success(123).chain((x) => validation.success(String(x)))
          .fold(
            (err) => String(err),
            (val) => String(val),
          ),
        "123",
      );
    });
  });

  describe(validation.failure.name, () => {
    it("should return a Validation<E, A> that has a tag = failure property", () => {
      assertEquals(
        validation.failure([{
          tag: "validation-error",
          message: "Error",
          value: 123,
        }]).tag,
        "failure",
      );
    });

    it("should return a Validation<E, A> that has a errors = E property", () => {
      const result = validation.failure([{
        tag: "validation-error",
        message: "Error",
        value: 123,
      }]);
      assertEquals(result.tag === "failure" && result.errors, [{
        tag: "validation-error",
        message: "Error",
        value: 123,
      }]);
    });

    it("should return a Validation<E, A> that maps to Validation<E, A>", () => {
      assertEquals(
        validation.failure([{
          tag: "validation-error",
          message: "Error",
          value: 123,
        }]).map((num) => String(num)).fold(
          (err) => err[0].message,
          (val) => val,
        ),
        "Error",
      );
    });

    it("should return a Validation<E, A> that apply to Validation<E, A>", () => {
      assertEquals(
        validation.failure([{
          tag: "validation-error",
          message: "Error",
          value: 123,
        }]).ap(
          validation.of(validateNum),
        ).fold(
          (err) => err[0].message,
          (val) => val.tag,
        ),
        "Error",
      );
    });

    it("should return a Validation<E, A> that can fold to B", () => {
      assertEquals(
        validation.failure([{
          tag: "validation-error",
          message: "Error",
          value: 123,
        }]).fold(
          (err) => err[0].message,
          (val) => val,
        ),
        "Error",
      );
    });

    it("should return a Validation<E, A> that can chain to E", () => {
      assertEquals(
        validation.failure([{
          tag: "validation-error",
          message: "Error",
          value: "123",
        }]).chain((x) => validation.success(String(x)))
          .fold(
            (err) => err[0].message,
            (val) => String(val),
          ),
        "Error",
      );
    });
  });

  describe(validation.of.name, () => {
    it("returns a Success", () => {
      assertEquals(validation.of(123).tag, "success");
    });
  });
});
