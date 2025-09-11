import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { NumberSchema } from "./number.js";

describe(NumberSchema.name, () => {
  it("should validate a number", () => {
    assertEquals(new NumberSchema().parse(123), 123);
    assertEquals(new NumberSchema().parse(Infinity), Infinity);
    assertEquals(new NumberSchema().parse(0), 0);
  });

  it("should invalidate a non-number", () => {
    assertThrows(() => new NumberSchema().parse(""));
    assertThrows(() => new NumberSchema().parse(NaN));
    assertThrows(() => new NumberSchema().parse(true));
    assertThrows(() => new NumberSchema().parse({}));
    assertThrows(() => new NumberSchema().parse(() => {}));
  });
});
