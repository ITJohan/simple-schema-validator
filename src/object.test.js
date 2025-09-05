/** @import {Either} from "simple-functions" */
/** @import {Schema} from "./types.js" */

import { chain, left, pipe, right } from "simple-functions";
import { describe, it } from "@std/testing/bdd";
import { object } from "./object.js";
import { assertEquals, assertStringIncludes } from "@std/assert";

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
  /**
   * @param {number} min
   * @returns {(x: number) => Either<string, number>}
   */
  const min = (min) => (x) => {
    if (x < min) {
      return left(`Number ${x} is less than ${min}`);
    }
    return right(x);
  };

  it("should return a validator that validates a given object", () => {
    const User = object({
      id: pipe(number),
      name: pipe(string),
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    /** @type {Schema<User>} */
    const test = {
      id: 0,
      name: "",
    };

    assertEquals(validatedUser.inspect(), user);
  });

  it("should return a validator that invalidates a given object", () => {
    const User = object({
      id: pipe(number, chain(min(4))),
      name: pipe(string),
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    assertStringIncludes(
      validatedUser.inspect().toString(),
      "Number 1 is less than 4",
    );
  });
});
