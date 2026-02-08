import { deepStrictEqual, ok } from "node:assert";
import { describe, it } from "node:test";
import { date } from "./date.js";

describe("date", () => {
  it("should validate a Date object", () => {
    const now = new Date();
    const result = date().parse(now);
    deepStrictEqual(result.data.getTime(), now.getTime());
    deepStrictEqual(result.errors, undefined);
  });

  it("should parse a valid date string", () => {
    const iso = "2024-01-01T00:00:00.000Z";
    const result = date().parse(iso);
    ok(result.data instanceof Date);
    deepStrictEqual(result.data.toISOString(), iso);
  });

  it("should invalidate non-date values and use fallback", () => {
    const fallback = new Date("1990-01-01");
    const schema = date({ fallback, message: "Not a date" });
    
    deepStrictEqual(schema.parse("not-a-date"), { data: fallback, errors: ["Not a date"] });
    deepStrictEqual(schema.parse(null), { data: fallback, errors: ["Not a date"] });
    deepStrictEqual(schema.parse(undefined), { data: fallback, errors: ["Not a date"] });
  });

  describe("min and max constraints", () => {
    const jan1 = new Date("2024-01-01");
    const jan10 = new Date("2024-01-10");
    const jan20 = new Date("2024-01-20");

    it("should fail if date is before min", () => {
      const schema = date().min(jan10);
      const result = schema.parse(jan1);
      deepStrictEqual(result.errors?.[0], `Date must be after ${jan10.toISOString()}`);
    });

    it("should fail if date is after max", () => {
      const schema = date().max(jan10);
      const result = schema.parse(jan20);
      deepStrictEqual(result.errors?.[0], `Date must be before ${jan10.toISOString()}`);
    });

    it("should pass when within range", () => {
      const schema = date().min(jan1).max(jan20);
      deepStrictEqual(schema.parse(jan10).errors, undefined);
    });
  });
});