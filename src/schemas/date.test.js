import { deepEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { DateSchema } from "./date.js";

describe(DateSchema.name, () => {
	it("should validate a valid datetime string", () => {
		deepEqual(new DateSchema().parse("2025-09-12"), 1757635200000);
		deepEqual(new DateSchema().parse("2025-09-12T05:53"), 1757649180000);
		deepEqual(new DateSchema().parse("2025-09-12T05:53:39"), 1757649219000);
		deepEqual(
			new DateSchema().parse("2025-09-12T05:53:39.1"),
			1757649219100,
		);
		deepEqual(
			new DateSchema().parse("2025-09-12T05:53:39.12"),
			1757649219120,
		);
		deepEqual(
			new DateSchema().parse("2025-09-12T05:53:39.123"),
			1757649219123,
		);
		deepEqual(
			new DateSchema().parse("2025-09-12T05:53:39.123Z"),
			1757656419123,
		);
	});

	it("should invalidate an invalid datetime string", () => {
		throws(() => new DateSchema().parse(""));
		throws(() => new DateSchema().parse("2025-0"));
		throws(() => new DateSchema().parse("2025-09-12T"));
		throws(() => new DateSchema().parse("2025-99-12"));
		throws(() => new DateSchema().parse("2025-09-12T0"));
		throws(() => new DateSchema().parse("2025-09-12T05"));
		throws(() => new DateSchema().parse("2025-09-12T05:"));
		throws(() => new DateSchema().parse("2025-09-12T05:5"));
		throws(() => new DateSchema().parse("2025-09-12T05:53:"));
		throws(() => new DateSchema().parse("2025-09-12T05:53:3"));
		throws(() => new DateSchema().parse("2025-09-12T05:53:39."));
	});

	it("should support validating a timestamp", () => {
		deepEqual(new DateSchema().parse(1757635200000), 1757635200000);
	});

	it("should invalidate an invalid timestamp", () => {
		throws(() => new DateSchema().parse(-1));
	});
});
