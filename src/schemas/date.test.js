import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { DateSchema } from "./date.js";

describe(DateSchema.name, () => {
  it("should validate a valid ISO string", () => {
    assertEquals(new DateSchema().parse("2025-09-12"), 1757635200000);
    assertEquals(new DateSchema().parse("2025-09-12T05:53"), 1757649180000);
    assertEquals(new DateSchema().parse("2025-09-12T05:53:39"), 1757649219000);
    assertEquals(
      new DateSchema().parse("2025-09-12T05:53:39.1"),
      1757649219100,
    );
    assertEquals(
      new DateSchema().parse("2025-09-12T05:53:39.12"),
      1757649219120,
    );
    assertEquals(
      new DateSchema().parse("2025-09-12T05:53:39.123"),
      1757649219123,
    );
    assertEquals(
      new DateSchema().parse("2025-09-12T05:53:39.123Z"),
      1757656419123,
    );
  });

  it("should invalidate an invalid ISO string", () => {
    assertThrows(() => new DateSchema().parse(""));
    assertThrows(() => new DateSchema().parse("2025-"));
    assertThrows(() => new DateSchema().parse("2025-0"));
    assertThrows(() => new DateSchema().parse("2025-09-"));
    assertThrows(() => new DateSchema().parse("2025-09-12T"));
    assertThrows(() => new DateSchema().parse("2025-99-12"));
    assertThrows(() => new DateSchema().parse("2025-09-12T0"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05:"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05:5"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05:53:"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05:53:3"));
    assertThrows(() => new DateSchema().parse("2025-09-12T05:53:39."));
  });
});
