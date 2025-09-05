/** @import { Either } from "simple-functions" */

import { left, right } from "simple-functions";

/**
 * @param {any} x
 * @returns {Either<string, number>}
 */
const number = (x) =>
  typeof x !== "number" || isNaN(x) ? left(`${x} is not a number.`) : right(x);

export { number };
