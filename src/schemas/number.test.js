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

  describe("positive", () => {
    it("should validate a positive number", () => {
      assertEquals(new NumberSchema().positive().parse(0.01), 0.01);
      assertEquals(new NumberSchema().positive().parse(1), 1);
      assertEquals(new NumberSchema().positive().parse(Infinity), Infinity);
    });

    it("should invalidate a negative number", () => {
      assertThrows(() => new NumberSchema().positive().parse(0));
      assertThrows(() => new NumberSchema().positive().parse(-0.01));
      assertThrows(() => new NumberSchema().positive().parse(-1));
      assertThrows(() => new NumberSchema().positive().parse(-Infinity));
    });
  });
});
