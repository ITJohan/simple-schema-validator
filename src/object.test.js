/** @import {Either} from "simple-functions" */

import { left, pipe, right } from "simple-functions";
import { describe, it } from "@std/testing/bdd";
import { object } from "./object.js";
import { assertEquals } from "@std/assert";

describe(object.name, () => {
  /**
   * @param {any} x
   * @returns {Either<string, string>}
   */
  const string = (x) => {
    if (typeof x !== "string") {
      return left("Not a string");
    }
    return right(x);
  };
  /**
   * @param {any} x
   * @returns {Either<string, number>}
   */
  const number = (x) => {
    if (typeof x !== "number") {
      return left("Not a number");
    }
    return right(x);
  };

  it("should return a schema with a parse function that validates a given object", () => {
    const User = object({
      id: pipe(number),
      name: pipe(string),
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    assertEquals(validatedUser.inspect(), user);
  });
});
