import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { string } from "./string.js";

describe(string.name, () => {
	it("should validate a string", () => {
		deepStrictEqual(string().parse("abc").data, "abc");
		deepStrictEqual(string().parse("abc").errors, undefined);
		deepStrictEqual(string().parse("").data, "");
		deepStrictEqual(string().parse("").errors, undefined);
	});

	it("should invalidate a non-string", () => {
		deepStrictEqual(string().parse(1).data, "");
		deepStrictEqual(string({ message: "Not a string" }).parse(1).errors, [
			"Not a string",
		]);
		deepStrictEqual(string().parse(true).data, "");
		deepStrictEqual(string({ message: "Not a string" }).parse(true).errors, [
			"Not a string",
		]);
		deepStrictEqual(string().parse({}).data, "");
		deepStrictEqual(string({ message: "Not a string" }).parse({}).errors, [
			"Not a string",
		]);
		deepStrictEqual(
			string({ message: "Not a string" }).parse(() => {}).errors,
			["Not a string"],
		);
	});

	describe("min", () => {
		it("should validate a longer string", () => {
			deepStrictEqual(string().min(5).parse("123456").data, "123456");
			deepStrictEqual(string().min(5).parse("123456").errors, undefined);
		});

		it("should validate a equal length string", () => {
			deepStrictEqual(string().min(5).parse("12345").data, "12345");
			deepStrictEqual(string().min(5).parse("12345").errors, undefined);
		});

		it("should invalidate a shorter string", () => {
			deepStrictEqual(string().min(5).parse("1234").data, "1234");
			deepStrictEqual(
				string().min(5, { message: "Too short" }).parse("1234").errors,
				["Too short"],
			);
		});
	});

	describe("email", () => {
		it("should validate a valid email", () => {
			deepStrictEqual(
				string().email().parse("john@doe.com").data,
				"john@doe.com",
			);
			deepStrictEqual(string().email().parse("john@doe.com").errors, undefined);
		});

		it("should invalidate an unvalid email", () => {
			deepStrictEqual(string().email().parse("john@doe.").data, "john@doe.");
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john@doe.").errors,
				["Not an email"],
			);
			deepStrictEqual(string().email().parse("john@doe").data, "john@doe");
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john@doe").errors,
				["Not an email"],
			);
			deepStrictEqual(
				string().email().parse("johndoe.com").data,
				"johndoe.com",
			);
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("johndoe.com").errors,
				["Not an email"],
			);
			deepStrictEqual(string().email().parse("@doe.com").data, "@doe.com");
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("@doe.com").errors,
				["Not an email"],
			);
			deepStrictEqual(string().email().parse("john").data, "john");
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john").errors,
				["Not an email"],
			);
			deepStrictEqual(string().email().parse("").data, "");
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("").errors,
				["Not an email"],
			);
		});
	});
});
