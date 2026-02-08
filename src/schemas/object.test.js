import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { object } from "./object.js";
import { string } from "./string.js";

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
});
