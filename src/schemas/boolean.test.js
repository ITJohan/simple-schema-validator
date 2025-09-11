import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { BooleanSchema } from "./boolean.js";

describe(BooleanSchema.name, () => {
  it("should validate a boolean", () => {
    assertEquals(new BooleanSchema().parse(true), true);
    assertEquals(new BooleanSchema().parse(false), false);
  });

  it("should invalidate a non-boolean", () => {
    assertThrows(() => new BooleanSchema().parse(""));
    assertThrows(() => new BooleanSchema().parse(NaN));
    assertThrows(() => new BooleanSchema().parse(0));
    assertThrows(() => new BooleanSchema().parse({}));
    assertThrows(() => new BooleanSchema().parse(() => {}));
  });
});
