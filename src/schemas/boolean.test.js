import { deepEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { BooleanSchema } from "./boolean.js";

describe(BooleanSchema.name, () => {
	it("should validate a boolean", () => {
		deepEqual(new BooleanSchema().parse(true), true);
		deepEqual(new BooleanSchema().parse(false), false);
	});

	it("should invalidate a non-boolean", () => {
		throws(() => new BooleanSchema().parse(""));
		throws(() => new BooleanSchema().parse(NaN));
		throws(() => new BooleanSchema().parse(0));
		throws(() => new BooleanSchema().parse({}));
		throws(() => new BooleanSchema().parse(() => {}));
	});
});
