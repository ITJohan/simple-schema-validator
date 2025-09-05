import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { number } from "./number.js";

describe(number.name, () => {
  it("should validate a number", () => {
    const num = number(123);
    const num1 = number(Infinity);
    const num2 = number(0);

    assertEquals(num.fold((err) => Number(err), (val) => val), 123);
    assertEquals(num1.fold((err) => Number(err), (val) => val), Infinity);
    assertEquals(num2.fold((err) => Number(err), (val) => val), 0);
  });

  it("should invalidate a non-number", () => {
    const text = number("");
    const text1 = number(NaN);
    const text2 = number(true);
    const text3 = number({});
    const text4 = number(() => {});

    assertEquals(
      text.fold((err) => err, (val) => String(val)),
      " is not a number.",
    );
    assertEquals(
      text1.fold((err) => err, (val) => String(val)),
      "NaN is not a number.",
    );
    assertEquals(
      text2.fold((err) => err, (val) => String(val)),
      "true is not a number.",
    );
    assertEquals(
      text3.fold((err) => err, (val) => String(val)),
      "[object Object] is not a number.",
    );
    assertEquals(
      text4.fold((err) => err, (val) => String(val)),
      "() => {} is not a number.",
    );
  });
});
