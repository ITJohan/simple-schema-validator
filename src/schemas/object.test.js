import { deepEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { AggregateValidationError } from "../errors/aggregate-validaton-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { DateSchema } from "./date.js";
import { NumberSchema } from "./number.js";
import { ObjectSchema } from "./object.js";
import { StringSchema } from "./string.js";

describe(ObjectSchema.name, () => {
	it("should return a valid object given a valid schema", () => {
		const user = new ObjectSchema({
			id: new NumberSchema(),
			name: new StringSchema(),
		});
		const validUser = { id: 1, name: "John" };
		const result = user.parse(validUser);
		deepEqual(result, validUser);
	});

	it("should throw given a invalid schema", () => {
		const user = new ObjectSchema({
			id: new NumberSchema(),
			name: new StringSchema(),
		});
		const invalidUser = { id: "John", name: 1 };
		throws(() => user.parse(invalidUser));
	});

	it("should throw given a invalid schema with chained validators", () => {
		const user = new ObjectSchema({
			id: new NumberSchema().min(0),
			name: new StringSchema(),
		});
		const invalidUser = { id: -1, name: "John" };
		throws(() => user.parse(invalidUser));
	});

	it("should throw aggregate validation error given multiple invalidations", () => {
		const user = new ObjectSchema({
			id: new NumberSchema().min(0),
			name: new StringSchema().minLength(5),
		});
		const invalidUser = { id: -1, name: "John" };
		try {
			user.parse(invalidUser);
		} catch (error) {
			if (error instanceof AggregateValidationError) {
				deepEqual(error.errors.length, 2);
			}
		}
	});

	it("should have a refine method that gets the parsed object and defines object-level validations", () => {
		const booking = new ObjectSchema({
			from: new DateSchema(),
			to: new DateSchema(),
		}).refine((booking) => {
			if (booking.to < booking.from) {
				throw new ValidationError({
					message: "To can not be less than from",
					value: booking,
				});
			}
		});

		throws(() => booking.parse({ from: 2, to: 1 }));
	});
});
