import { deepEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { NumberSchema } from "./number.js";

describe(NumberSchema.name, () => {
	it("should validate a number", () => {
		deepEqual(new NumberSchema().parse(123), 123);
		deepEqual(new NumberSchema().parse(Infinity), Infinity);
		deepEqual(new NumberSchema().parse(0), 0);
	});

	it("should invalidate a non-number", () => {
		throws(() => new NumberSchema().parse(""));
		throws(() => new NumberSchema().parse(NaN));
		throws(() => new NumberSchema().parse(true));
		throws(() => new NumberSchema().parse({}));
		throws(() => new NumberSchema().parse(() => {}));
	});

	describe("positive", () => {
		it("should validate a positive number", () => {
			deepEqual(new NumberSchema().positive().parse(0.01), 0.01);
			deepEqual(new NumberSchema().positive().parse(1), 1);
			deepEqual(new NumberSchema().positive().parse(Infinity), Infinity);
		});

		it("should invalidate a negative number", () => {
			throws(() => new NumberSchema().positive().parse(0));
			throws(() => new NumberSchema().positive().parse(-0.01));
			throws(() => new NumberSchema().positive().parse(-1));
			throws(() => new NumberSchema().positive().parse(-Infinity));
		});
	});
});
