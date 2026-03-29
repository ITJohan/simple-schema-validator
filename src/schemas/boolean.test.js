import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { boolean } from "./boolean.js";

describe("boolean", () => {
	it("should validate a boolean", () => {
		deepStrictEqual(boolean().parse(true), {
			success: true,
			data: true,
			errors: undefined,
		});
		deepStrictEqual(boolean().parse(false), {
			success: true,
			data: false,
			errors: undefined,
		});
	});

	it("should invalidate non-boolean values and use fallback", () => {
		const schema = boolean({ fallback: true, message: "Invalid" });

		deepStrictEqual(schema.parse(null), {
			success: false,
			data: true,
			errors: ["Invalid"],
		});
		deepStrictEqual(schema.parse(0), {
			success: false,
			data: true,
			errors: ["Invalid"],
		});
		deepStrictEqual(schema.parse("true"), {
			success: false,
			data: true,
			errors: ["Invalid"],
		});
	});

	describe("true", () => {
		it("should pass when value is true", () => {
			deepStrictEqual(boolean().true().parse(true), {
				success: true,
				data: true,
				errors: undefined,
			});
		});

		it("should fail when value is false", () => {
			deepStrictEqual(
				boolean().true({ message: "Must accept terms" }).parse(false),
				{
					success: false,
					data: false,
					errors: ["Must accept terms"],
				},
			);
		});
	});

	describe("false", () => {
		it("should pass when value is false", () => {
			deepStrictEqual(boolean().false().parse(false), {
				success: true,
				data: false,
				errors: undefined,
			});
		});

		it("should fail when value is true", () => {
			deepStrictEqual(boolean().false().parse(true), {
				success: false,
				data: true,
				errors: ["Must be false"],
			});
		});
	});

	it("should handle the 'invalid type + constraint' chain correctly", () => {
		const schema = boolean({ fallback: false }).true();
		const result = schema.parse("not a bool");

		deepStrictEqual(result, {
			success: false,
			data: false,
			errors: ["Not a boolean", "Must be true"],
		});
	});
});
