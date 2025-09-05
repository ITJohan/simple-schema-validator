/** @import { Either } from "simple-functions" */

import { left, right } from "simple-functions";

/**
 * @param {number} x
 * @returns {Either<string, number>}
 */
const positive = (x) => x <= 0 ? left(`${x} is less than 0.`) : right(x);

export { positive };
