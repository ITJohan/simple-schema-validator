/** @import { ValidationError } from "../types.js" */
/** @import { Validation } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {number} x
 * @returns {Validation<ValidationError, number>}
 */
const positive = (x) =>
  x <= 0
    ? validation.failure([{
      tag: "validation-error",
      message: "Number is not positive.",
      value: x,
    }])
    : validation.success(x);

export { positive };
