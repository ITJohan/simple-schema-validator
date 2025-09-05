/** @import { Either } from "simple-functions" */

import { left, right } from "simple-functions";

/**
 * @param {string} x
 * @returns {Either<string, string>}
 */
const email = (x) =>
  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(x)
    ? left(`${x} is not a valid email.`)
    : right(x);

export { email };
