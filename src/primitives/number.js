import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * @param {any} x
 * @returns {Either<ValidationError, number>}
 */
const number = (x) =>
  typeof x !== "number" || isNaN(x)
    ? Either.left(new ValidationError("Not a number.", { value: x }))
    : Either.right(x);

export { number };
