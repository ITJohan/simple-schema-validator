import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { string } from "./string.js";

describe(string.name, () => {
	it("should validate a string", () => {
		deepStrictEqual(string().parse("abc").data, "abc");
		deepStrictEqual(string().parse("").data, "");
	});

	it("should invalidate a non-string", () => {
		deepStrictEqual(string({message: "Not a string"}).parse(1).errors, ['Not a string']);
		deepStrictEqual(string({message: "Not a string"}).parse(true).errors, ['Not a string']);
		deepStrictEqual(string({message: "Not a string"}).parse({}).errors, ['Not a string']);
		deepStrictEqual(string({message: "Not a string"}).parse(() => {}).errors, ['Not a string']);
	});

	// describe("email", () => {
	// 	it("should validate a valid email", () => {
	// 		deepStrictEqual(
	// 			new string().email().parse("john@doe.com"),
	// 			"john@doe.com",
	// 		);
	// 	});

	// 	it("should invalidate an unvalid email", () => {
	// 		throws(() => new string().email().parse("john@doe."));
	// 		throws(() => new string().email().parse("john@doe"));
	// 		throws(() => new string().email().parse("johndoe.com"));
	// 		throws(() => new string().email().parse("@doe.com"));
	// 		throws(() => new string().email().parse("john"));
	// 		throws(() => new string().email().parse(""));
	// 	});
	// });
});
