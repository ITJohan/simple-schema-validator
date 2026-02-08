import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { number } from "./number.js";

describe(number.name, () => {
	it("should validate a number", () => {
		deepStrictEqual(number().parse(123), {data: 123, errors: undefined});
		deepStrictEqual(number().parse(Infinity), {data: Infinity, errors: undefined});
		deepStrictEqual(number().parse(0), {data: 0, errors: undefined});
	});

	it("should invalidate a non-number and return a fallback value and errors", () => {
		deepStrictEqual(number({fallback: 1, message: "Not a number"}).parse(""), {data: 1, errors: ["Not a number"]});
		deepStrictEqual(number({fallback: 1, message: "Not a number"}).parse(NaN), {data: 1, errors: ["Not a number"]});
		deepStrictEqual(number({fallback: 1, message: "Not a number"}).parse(true), {data: 1, errors: ["Not a number"]});
		deepStrictEqual(number({message: "Not a number"}).parse({}), {data: 0, errors: ["Not a number"]});
		deepStrictEqual(number({fallback: 1, message: "Not a number"}).parse(() => {}), {data: 1, errors: ["Not a number"]});
	});

	describe("min", () => {
    it("should allow numbers greater than or equal to min", () => {
      const schema = number().min(10);
      deepStrictEqual(schema.parse(10), { data: 10, errors: undefined });
      deepStrictEqual(schema.parse(11), { data: 11, errors: undefined });
    });

    it("should fail for numbers less than min", () => {
      const schema = number().min(10);
      deepStrictEqual(schema.parse(9), { 
        data: 9, 
        errors: ["Number can not be less than 10"] 
      });
    });

    it("should support custom error messages", () => {
      const schema = number().min(10, { message: "Too small!" });
      deepStrictEqual(schema.parse(5).errors, ["Too small!"]);
    });
  });

  describe("max", () => {
    it("should allow numbers less than or equal to max", () => {
      const schema = number().max(100);
      deepStrictEqual(schema.parse(100), { data: 100, errors: undefined });
      deepStrictEqual(schema.parse(50), { data: 50, errors: undefined });
    });

    it("should fail for numbers greater than max", () => {
      const schema = number().max(100);
      deepStrictEqual(schema.parse(101), { 
        data: 101, 
        errors: ["Number can not be more than 100"] 
      });
    });

    it("should support custom error messages", () => {
      const schema = number().max(100, { message: "Too big!" });
      deepStrictEqual(schema.parse(150).errors, ["Too big!"]);
    });
  });

  describe("positive", () => {
    it("should allow positive numbers and zero", () => {
      const schema = number().positive();
      deepStrictEqual(schema.parse(0), { data: 0, errors: undefined });
      deepStrictEqual(schema.parse(5), { data: 5, errors: undefined });
    });

    it("should fail for negative numbers", () => {
      const schema = number().positive();
      deepStrictEqual(schema.parse(-1), { 
        data: -1, 
        errors: ["Not a positive number"] 
      });
    });
  });

  describe("chaining and multiple errors", () => {
    it("should allow chaining multiple constraints", () => {
      const schema = number().min(5).max(10);
      deepStrictEqual(schema.parse(7), { data: 7, errors: undefined });
    });

    it("should collect multiple errors if multiple constraints fail", () => {
      const schema = number().positive().min(10);
      const result = schema.parse(-5);
      
      deepStrictEqual(result.errors, [
        "Not a positive number",
        "Number can not be less than 10"
      ]);
    });

    it("should validate the fallback value against checks if the input is invalid", () => {
      const schema = number({ fallback: 0 }).min(5);
      deepStrictEqual(schema.parse("abc"), {
        data: 0,
        errors: ["Not a number", "Number can not be less than 5"]
      });
    });
  });
});
