import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * @param {number} x
 * @returns {Either<ValidationError, number>}
 */
const positive = (x) =>
  x <= 0
    ? Either.left(new ValidationError("Number is not positive.", { value: x }))
    : Either.right(x);

export { positive };
