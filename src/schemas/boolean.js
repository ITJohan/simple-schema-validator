import { ValidationError } from "../errors/validation-error.js";
import { Schema } from "./schema.js";

/** @extends {Schema<boolean>} */
class BooleanSchema extends Schema {
	/**
	 * @param {((x: any) => boolean)[]} rules
	 * @param {boolean} isOptional
	 */
	constructor(rules = [], isOptional = false) {
		super(
			rules.length > 0
				? rules
				: [
						(x) => {
							if (typeof x !== "boolean") {
								throw new ValidationError({
									message: "Not a boolean",
									value: x,
								});
							}
							return x;
						},
					],
			isOptional,
		);
	}
}

export { BooleanSchema };
