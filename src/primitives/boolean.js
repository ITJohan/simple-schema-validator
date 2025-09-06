/** @import { EitherValue } from "simple-functions" */

import { Either } from "simple-functions";

/**
 * @param {any} x
 * @returns {EitherValue<string, boolean>}
 */
const boolean = (x) =>
  typeof x !== "boolean"
    ? Either.left(`${x} is not a boolean.`)
    : Either.right(x);

export { boolean };
