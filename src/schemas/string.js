/** @import { ValidationError } from "../types.js" */
/** @import { Validation } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {any} x
 * @returns {Validation<ValidationError, string>}
 */
const string = (x) =>
  typeof x !== "string"
    ? validation.failure([{
      tag: "validation-error",
      message: "Not a string.",
      value: x,
    }])
    : validation.success(x);

export { string };
