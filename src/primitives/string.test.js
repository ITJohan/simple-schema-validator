import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { string } from "./string.js";

describe(string.name, () => {
  it("should validate a string", () => {
    const text = string("abc");
    const text1 = string("");

    assertEquals(text.fold((err) => err, (val) => val), "abc");
    assertEquals(text1.fold((err) => err, (val) => val), "");
  });

  it("should invalidate a non-string", () => {
    const text = string(1);
    const text1 = string(true);
    const text2 = string({});
    const text3 = string(() => {});

    assertEquals(text.fold((err) => err, (val) => val), "1 is not a string.");
    assertEquals(
      text1.fold((err) => err, (val) => val),
      "true is not a string.",
    );
    assertEquals(
      text2.fold((err) => err, (val) => val),
      "[object Object] is not a string.",
    );
    assertEquals(
      text3.fold((err) => err, (val) => val),
      "() => {} is not a string.",
    );
  });
});
