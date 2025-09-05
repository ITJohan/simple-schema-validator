import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { positive } from "./positive.js";

describe(positive.name, () => {
  it("should validate a positive number", () => {
    const result = positive(0.01);
    const result1 = positive(1);
    const result2 = positive(Infinity);

    assertEquals(result.fold((err) => Number(err), (val) => val), 0.01);
    assertEquals(result1.fold((err) => Number(err), (val) => val), 1);
    assertEquals(result2.fold((err) => Number(err), (val) => val), Infinity);
  });

  it("should invalidate a negative number", () => {
    const result = positive(0);
    const result1 = positive(-1);
    const result2 = positive(-Infinity);

    assertEquals(
      result.fold((err) => err, (val) => String(val)),
      "0 is less than 0.",
    );
    assertEquals(
      result1.fold((err) => err, (val) => String(val)),
      "-1 is less than 0.",
    );
    assertEquals(
      result2.fold((err) => err, (val) => String(val)),
      "-Infinity is less than 0.",
    );
  });
});
