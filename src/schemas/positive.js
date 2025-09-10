/** @import { Validation, ValidationError } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {number} x
 * @returns {Validation<ValidationError, number>}
 */
const positive = (x) =>
  x <= 0
    ? validation.failure([{ message: "Number is not positive.", value: x }])
    : validation.success(x);

export { positive };
