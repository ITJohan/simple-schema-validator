/** @import {Either} from "simple-functions" */

import { pipe } from "simple-functions";
import { describe, it } from "@std/testing/bdd";
import { object } from "./object.js";
import { assertEquals } from "@std/assert";

describe(object.name, () => {
  /** @param {any} x */
  const string = (x) => {
    if (typeof x !== "string") {
      throw new Error();
    }
    return x;
  };
  /** @param {any} x */
  const number = (x) => {
    if (typeof x !== "number") {
      throw new Error();
    }
    return x;
  };

  it("should return a schema with a parse function that validates a given object", () => {
    const User = object({
      id: pipe(number),
      name: pipe(string),
    });
    const user = { id: 1, name: "john" };
    const validatedUser = User(user);

    assertEquals(validatedUser.fold((e) => e, (user) => user), user);
  });
});
