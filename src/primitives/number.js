import { Either } from "simple-functions";

/**
 * @param {any} x
 * @returns {Either<string, number>}
 */
const number = (x) =>
  typeof x !== "number" || isNaN(x)
    ? Either.left(`${x} is not a number.`)
    : Either.right(x);

export { number };
