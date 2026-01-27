import { deepEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { StringSchema } from "./string.js";

describe(StringSchema.name, () => {
	it("should validate a string", () => {
		deepEqual(new StringSchema().parse("abc"), "abc");
		deepEqual(new StringSchema().parse(""), "");
	});

	it("should invalidate a non-new StringSchema", () => {
		throws(() => new StringSchema().parse(1));
		throws(() => new StringSchema().parse(true));
		throws(() => new StringSchema().parse({}));
		throws(() => new StringSchema().parse(() => {}));
	});

	describe("email", () => {
		it("should validate a valid email", () => {
			deepEqual(
				new StringSchema().email().parse("john@doe.com"),
				"john@doe.com",
			);
		});

		it("should invalidate an unvalid email", () => {
			throws(() => new StringSchema().email().parse("john@doe."));
			throws(() => new StringSchema().email().parse("john@doe"));
			throws(() => new StringSchema().email().parse("johndoe.com"));
			throws(() => new StringSchema().email().parse("@doe.com"));
			throws(() => new StringSchema().email().parse("john"));
			throws(() => new StringSchema().email().parse(""));
		});
	});
});
