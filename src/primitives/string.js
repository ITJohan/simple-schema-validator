import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * @param {any} x
 * @returns {Either<ValidationError, string>}
 */
const string = (x) =>
  typeof x !== "string"
    ? Either.left(new ValidationError("Not a string.", { value: x }))
    : Either.right(x);

export { string };
