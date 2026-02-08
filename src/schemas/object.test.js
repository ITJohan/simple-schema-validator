import { deepStrictEqual, ok } from "node:assert";
import { describe, it } from "node:test";
import { object } from "./object.js";
import { string } from "./string.js";
import { number } from "./number.js";
import { boolean } from "./boolean.js";
import { date } from "./date.js";

describe(object.name, () => {
	it("should return a valid data object given a valid schema", () => {
		const userSchema = object({
			name: string(),
		});
		const validUser = { name: "John" };
		const expected = {
			data: {name: 'John'},
			errors: {name: undefined}
		};
		const result = userSchema.parse(validUser);
		deepStrictEqual(result, expected);
	});

	it("should return a object with partial data and errors given invalid input of the same type", () => {
		const userSchema = object({
			name: string().min(3, {message: "Too short"}),
		});
		const validUser = { name: "Jo" };
		const expected = {
			data: {name: 'Jo'},
			errors: {name: ["Too short"]}
		};
		const result = userSchema.parse(validUser);
		deepStrictEqual(result, expected);
	});

	it("should return a object with fallback data and errors given input of a different type", () => {
		const userSchema = object({
			name: string({fallback: "Wrong!", message: "Not a string"}),
		});
		const user = { name: 1 };
		const expected = {
			data: {name: "Wrong!"},
			errors: {name: ["Not a string"]}
		};
		const result = userSchema.parse(user);
		deepStrictEqual(result, expected);
	});

	it("should return a object with data given input with multiple properties", () => {
		const userSchema = object({
			name: string(),
			hobby: string()
		});
		const user = { name: "John Doe", hobby: "Biking" };
		const expected = {
			data: {name: "John Doe", hobby: "Biking"},
			errors: {name: undefined, hobby: undefined}
		};
		const result = userSchema.parse(user);
		deepStrictEqual(result, expected);
	});

	it("should return a object with partial data and errors given input with multiple properties", () => {
		const userSchema = object({
			name: string().min(3, {message: "Too short"}),
			hobby: string()
		});
		const user = { name: "Jo", hobby: "Biking" };
		const expected = {
			data: {name: "Jo", hobby: "Biking"},
			errors: {name: ["Too short"], hobby: undefined}
		};
		const result = userSchema.parse(user);
		deepStrictEqual(result, expected);
	});

	it("should validate a complex object with multiple types", () => {
    const registrationDate = new Date("2024-01-01");
    const schema = object({
      username: string().min(3),
      age: number().min(18),
      isActive: boolean(),
      joinedAt: date()
    });

    const input = {
      username: "alex",
      age: 25,
      isActive: true,
      joinedAt: registrationDate
    };

    const result = schema.parse(input);

    deepStrictEqual(result.data, input);
    deepStrictEqual(result.errors, {
      username: undefined,
      age: undefined,
      isActive: undefined,
      joinedAt: undefined
    });
  });

  it("should accumulate errors across different types simultaneously", () => {
    const schema = object({
      count: number().positive(),
      isAdmin: boolean().true(),
      birthday: date().min(new Date("2000-01-01"))
    });

    const input = {
      count: -5,
      isAdmin: false,
      birthday: new Date("1990-01-01")
    };

    const result = schema.parse(input);

    deepStrictEqual(result.errors.count, ["Not a positive number"]);
    deepStrictEqual(result.errors.isAdmin, ["Must be true"]);
    ok(result.errors.birthday?.[0].includes("Date must be after"));
  });

  it("should handle missing keys by using the sub-schemas' fallback logic", () => {
    const schema = object({
      score: number({ fallback: 0 }),
      verified: boolean({ fallback: false })
    });

    const result = schema.parse({});

    deepStrictEqual(result.data, { score: 0, verified: false });
    deepStrictEqual(result.errors.score, ["Not a number"]);
    deepStrictEqual(result.errors.verified, ["Not a boolean"]);
  });

  it("should gracefully handle non-object inputs", () => {
    const schema = object({
      name: string({ fallback: "Guest" })
    });

    const result = schema.parse("I am not an object");

    deepStrictEqual(result.data, { name: "Guest" });
    deepStrictEqual(result.errors.name, ["Not a string"]);
  });
});
