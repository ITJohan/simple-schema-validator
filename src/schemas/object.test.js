import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { object } from "./object.js";
import { string } from "./string.js";
import { number } from "./number.js";
import { positive } from "./positive.js";

describe(object.name, () => {
  it("should return a success given a valid schema", () => {
    const user = object({
      id: number,
      name: string,
    });
    const validUser = { id: 1, name: "John" };

    const result = user.validate(validUser);

    assertEquals(result.tag === "success" && result.value, validUser);
  });

  it("should return a failure given a invalid schema", () => {
    const user = object({
      id: number,
      name: string,
    });
    const invalidUser = { id: "John", name: 1 };

    const result = user.validate(invalidUser);

    assertEquals(result.tag === "failure" && result.errors, [
      {
        tag: "validation-error",
        message: "Not a string.",
        property: "name",
        value: 1,
      },
      {
        tag: "validation-error",
        message: "Not a number.",
        property: "id",
        value: "John",
      },
    ]);
  });

  it("should return a failure given a invalid schema with chained validators", () => {
    const user = object({
      id: (x) => number(x).chain(positive),
      name: (x) => string(x),
    });
    const invalidUser = { id: -1, name: "John" };

    const result = user.validate(invalidUser);

    assertEquals(result.tag === "failure" && result.errors, [
      {
        tag: "validation-error",
        message: "Number is not positive.",
        property: "id",
        value: -1,
      },
    ]);
  });
});
