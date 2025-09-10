/** @import { ValidationError } from "../types.js" */
/** @import { Validation } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {any} x
 * @returns {Validation<ValidationError, boolean>}
 */
const boolean = (x) =>
  typeof x !== "boolean"
    ? validation.failure([{
      tag: "validation-error",
      message: "Not a boolean.",
      value: x,
    }])
    : validation.success(x);

export { boolean };
