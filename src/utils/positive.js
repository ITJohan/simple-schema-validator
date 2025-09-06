/** @import { EitherValue } from "simple-functions" */

import { Either } from "simple-functions";

/**
 * @param {number} x
 * @returns {EitherValue<string, number>}
 */
const positive = (x) =>
  x <= 0 ? Either.left(`${x} is less than 0.`) : Either.right(x);

export { positive };
