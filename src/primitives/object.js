/** @import { Validator } from "../types.js" */

import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * Creates a validator for an object shape
 * @template {Object<string, Validator<any>>} T The shape of the validator schema
 * @param {T} shape The validator schema
 * @returns {Validator<
 *  { [K in keyof T]: T[K] extends Validator<infer Val> ? Val : never }
 * >}
 */
const object = (shape) => (x) => {
  if (typeof x !== "object" || x === null) {
    return Either.left(
      new ValidationError("Value is not an object", { value: x }),
    );
  }

  const result = {};

  for (const key in shape) {
    if (!(key in x)) {
      return Either.left(
        new ValidationError("Missing required key.", {
          property: key,
          value: x,
        }),
      );
    }

    const propValue = x[key];
    const validator = shape[key];
    const validationResult = validator(propValue);
    const maybeError = validationResult.fold(
      (error) =>
        Either.left(
          new ValidationError("Validation failed: " + error.message, {
            property: key,
            value: propValue,
          }),
        ),
      (validatedProp) => {
        // @ts-ignore: valid cast
        result[key] = validatedProp;
        return null; // Signal success for this property
      },
    );

    // If fold returned a Left, short-circuit and exit immediately
    if (maybeError) {
      return maybeError;
    }
  }

  // All validations were successful
  return /** @type {any} */ (Either.right(result));
};

export { object };
