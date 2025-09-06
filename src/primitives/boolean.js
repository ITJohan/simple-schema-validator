import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * @param {any} x
 * @returns {Either<ValidationError, boolean>}
 */
const boolean = (x) =>
  typeof x !== "boolean"
    ? Either.left(new ValidationError("Not a boolean.", { value: x }))
    : Either.right(x);

export { boolean };
