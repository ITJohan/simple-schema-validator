import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { StringSchema } from "./string.js";

describe(StringSchema.name, () => {
  it("should validate a string", () => {
    assertEquals(new StringSchema().parse("abc"), "abc");
    assertEquals(new StringSchema().parse(""), "");
  });

  it("should invalidate a non-new StringSchema", () => {
    assertThrows(() => new StringSchema().parse(1));
    assertThrows(() => new StringSchema().parse(true));
    assertThrows(() => new StringSchema().parse({}));
    assertThrows(() => new StringSchema().parse(() => {}));
  });
});
