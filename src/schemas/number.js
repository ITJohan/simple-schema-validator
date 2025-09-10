/** @import { Validation, ValidationError } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {any} x
 * @returns {Validation<ValidationError, number>}
 */
const number = (x) =>
  typeof x !== "number" || isNaN(x)
    ? validation.failure([{ message: "Not a number.", value: x }])
    : validation.success(x);

export { number };
