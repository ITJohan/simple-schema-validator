/** @import {Either} from "simple-functions" */
/** @import {Schema} from "./types.js" */

import { assertEquals, assertStringIncludes } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { left, right } from "simple-functions";
import { number } from "./number.js";
import { string } from "./string.js";
import { object } from "./object.js";

describe(object.name, () => {
  /**
   * @param {number} min
   * @returns {(x: number) => Either<string, number>}
   */
  const min = (min) => (x) =>
    x < min ? left(`${x} is less than ${min}`) : right(x);

  it("should return a validator that validates a given object", () => {
    const User = object({
      id: number,
      name: string,
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    validatedUser.map((x) => ({ test: x })).map((d) => d);

    assertEquals(validatedUser.inspect(), user);
  });

  it("should return a validator that invalidates a given object", () => {
    const User = object({
      id: (x) => number(x).chain(min(4)),
      name: string,
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    assertStringIncludes(
      String(validatedUser.inspect()),
      'Validation failed at key "id": 1 is less than 4',
    );
  });
});
