/** @import { Validator } from "../types.js" */

import { left, right } from "simple-functions";

/**
 * Creates a validator for an object shape
 * @template {Object<string, Validator<any, any>>} T The shape of the validator schema
 * @param {T} shape The validator schema
 * @returns {Validator<
 * { [K in keyof T]: T[K] extends Validator<infer Err, any> ? Err : never }[keyof T],
 * { [K in keyof T]: T[K] extends Validator<any, infer Val> ? Val : never }
 * >}
 */
const object = (shape) => (x) => {
  if (typeof x !== "object" || x === null) {
    return left(`${x} is not an object.`);
  }

  const result = {};

  for (const key in shape) {
    if (!(key in x)) {
      return left(`Missing required key "${key}".`);
    }

    const propValue = x[key];
    const validator = shape[key];
    const validationResult = validator(propValue);
    const maybeError = validationResult.fold(
      (error) => left(`Validation failed at key "${key}": ${error}`),
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
  return /** @type {any} */ (right(result));
};

export { object };
