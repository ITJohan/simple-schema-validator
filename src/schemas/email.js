/** @import { Validation, ValidationError } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {string} x
 * @returns {Validation<ValidationError, string>}
 */
const email = (x) =>
  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(x)
    ? validation.failure([{
      tag: "validation-error",
      message: "Not a valid email.",
      value: x,
    }])
    : validation.success(x);

export { email };
