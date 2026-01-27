/** @import { ValidationError } from "./validation-error.js" */

class AggregateValidationError extends Error {
	/** @param {ValidationError[]} errors */
	constructor(errors) {
		super(`${errors.length} validation error(s) occurred.`);
		this.name = "AggregateValidationError";
		this.errors = errors;
	}
}

export { AggregateValidationError };
