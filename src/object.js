/** @import { Either } from "simple-functions" */
/** @import { Validator } from "./types.js" */

import { left, right } from "simple-functions";

/**
 * @template E
 * @template {Object<string, Validator<any>>} T
 * @param {T} shape
 * @returns {(
 * (value: any) =>
 *  Either<E, { [K in keyof T]: T[K] extends Validator<infer O> ? O : never }>
 * )}
 */
const object = (shape) => (value) => {
  if (typeof value !== "object" || value === null) {
    return left("Validation failed: Expected an object.");
  }

  /** @type {Partial<T>} */
  const result = {};
  for (const key in shape) {
    if (!(key in value)) {
      return left(`Validation failed: Missing required key "${key}".`);
    }
    try {
      result[key] = shape[key](value[key]);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return left(`Validation failed at key "${key}": ${message}`);
    }
  }

  return /** @type {any} */ (right(result));
};

export { object };
