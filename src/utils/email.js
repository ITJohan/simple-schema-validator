import { Either } from "simple-functions";
import { ValidationError } from "../validation-error.js";

/**
 * @param {string} x
 * @returns {Either<ValidationError, string>}
 */
const email = (x) =>
  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(x)
    ? Either.left(new ValidationError("Not a valid email.", { value: x }))
    : Either.right(x);

export { email };
