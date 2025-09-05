/** @import { Either } from "simple-functions" */

import { left, right } from "simple-functions";

/**
 * @param {any} x
 * @returns {Either<string, boolean>}
 */
const boolean = (x) =>
  typeof x !== "boolean" ? left(`${x} is not a boolean.`) : right(x);

export { boolean };
