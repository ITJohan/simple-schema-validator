/** @import { ValidationError } from "../types.js" */
/** @import { Validation } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {any} x
 * @returns {Validation<ValidationError, number>}
 */
const number = (x) =>
  typeof x !== "number" || isNaN(x)
    ? validation.failure([{
      tag: "validation-error",
      message: "Not a number.",
      value: x,
    }])
    : validation.success(x);

export { number };
