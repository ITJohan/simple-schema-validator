/** @import { EitherValue } from "simple-functions" */

import { Either } from "simple-functions";

/**
 * @param {any} x
 * @returns {EitherValue<string, string>}
 */
const string = (x) =>
  typeof x !== "string"
    ? Either.left(`${x} is not a string.`)
    : Either.right(x);

export { string };
