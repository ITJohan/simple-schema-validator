/** @import { Validation, ValidationError } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @param {any} x
 * @returns {Validation<ValidationError, string>}
 */
const string = (x) =>
  typeof x !== "string"
    ? validation.failure([{ message: "Not a string.", value: x }])
    : validation.success(x);

export { string };
