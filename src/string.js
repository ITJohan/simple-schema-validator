/** @import { Either } from "simple-functions" */

import { left, right } from "simple-functions";

/**
 * @param {any} x
 * @returns {Either<string, string>}
 */
const string = (x) =>
  typeof x !== "string" ? left(`${x} is not a string.`) : right(x);

export { string };
