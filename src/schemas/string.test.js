import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { string } from "./string.js";

describe(string.name, () => {
	it("should validate a string", () => {
		deepStrictEqual(string().parse("abc"), {
			success: true,
			data: "abc",
			errors: undefined,
		});
		deepStrictEqual(string().parse(""), {
			success: true,
			data: "",
			errors: undefined,
		});
	});

	it("should invalidate a non-string", () => {
		deepStrictEqual(string({ message: "Not a string" }).parse(1), {
			success: false,
			data: "",
			errors: ["Not a string"],
		});
		deepStrictEqual(string({ message: "Not a string" }).parse(true), {
			success: false,
			data: "",
			errors: ["Not a string"],
		});
		deepStrictEqual(string({ message: "Not a string" }).parse({}), {
			success: false,
			data: "",
			errors: ["Not a string"],
		});
		deepStrictEqual(
			string({ message: "Not a string" }).parse(() => {}),
			{
				success: false,
				data: "",
				errors: ["Not a string"],
			},
		);
	});

	describe("min", () => {
		it("should validate a longer string", () => {
			deepStrictEqual(string().min(5).parse("123456"), {
				success: true,
				data: "123456",
				errors: undefined,
			});
		});

		it("should validate a equal length string", () => {
			deepStrictEqual(string().min(5).parse("12345"), {
				success: true,
				data: "12345",
				errors: undefined,
			});
		});

		it("should invalidate a shorter string", () => {
			deepStrictEqual(string().min(5, { message: "Too short" }).parse("1234"), {
				success: false,
				data: "1234",
				errors: ["Too short"],
			});
		});
	});

	describe("max", () => {
		it("should allow strings shorter than or equal to max length", () => {
			const schema = string().max(5);
			deepStrictEqual(schema.parse("abc"), {
				success: true,
				data: "abc",
				errors: undefined,
			});
			deepStrictEqual(schema.parse("abcde"), {
				success: true,
				data: "abcde",
				errors: undefined,
			});
		});

		it("should fail for strings longer than max length", () => {
			const schema = string().max(3);
			deepStrictEqual(schema.parse("abcd"), {
				success: false,
				data: "abcd",
				errors: ["Maximum string length is 3"],
			});
		});

		it("should support custom max error messages", () => {
			const schema = string().max(2, { message: "Too many characters!" });
			deepStrictEqual(schema.parse("abc"), {
				success: false,
				data: "abc",
				errors: ["Too many characters!"],
			});
		});
	});

	describe("email", () => {
		it("should validate a valid email", () => {
			deepStrictEqual(string().email().parse("john@doe.com"), {
				success: true,
				data: "john@doe.com",
				errors: undefined,
			});
		});

		it("should invalidate an unvalid email", () => {
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john@doe."),
				{
					success: false,
					data: "john@doe.",
					errors: ["Not an email"],
				},
			);
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john@doe"),
				{
					success: false,
					data: "john@doe",
					errors: ["Not an email"],
				},
			);
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("johndoe.com"),
				{
					success: false,
					data: "johndoe.com",
					errors: ["Not an email"],
				},
			);
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("@doe.com"),
				{
					success: false,
					data: "@doe.com",
					errors: ["Not an email"],
				},
			);
			deepStrictEqual(
				string().email({ message: "Not an email" }).parse("john"),
				{
					success: false,
					data: "john",
					errors: ["Not an email"],
				},
			);
			deepStrictEqual(string().email({ message: "Not an email" }).parse(""), {
				success: false,
				data: "",
				errors: ["Not an email"],
			});
		});
	});
});
