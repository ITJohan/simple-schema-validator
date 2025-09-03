import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { define } from "./define.js";

describe(define.name, () => {
  it("should return an object with a piped parse function given a function", () => {
    /** @param {number} x */
    const id = (x) => x;

    const schema = define(id);

    assertEquals(schema.parse(1), 1);
  });

  it("should return an object with a piped parse function given multiple functions", () => {
    /** @param {any} value */
    const toNumber = (value) => Number(value);
    /** @param {number} num */
    const addTwo = (num) => num + 2;
    /** @param {any} num */
    const toString = (num) => String(num);

    const schema = define(toNumber, addTwo, toString);

    assertEquals(schema.parse("1"), "3");
  });
});
