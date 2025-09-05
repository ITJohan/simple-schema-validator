import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { email } from "./email.js";

describe(email.name, () => {
  it("should validate a valid email", () => {
    const result = email("john@doe.com");

    assertEquals(result.fold((err) => err, (val) => val), "john@doe.com");
  });

  it("should invalidate an unvalid email", () => {
    const result = email("john@doe.");
    const result1 = email("john@doe");
    const result2 = email("johndoe.com");
    const result3 = email("@doe.com");
    const result4 = email("john");
    const result5 = email("");

    assertEquals(
      result.fold((err) => err, (val) => val),
      "john@doe. is not a valid email.",
    );
    assertEquals(
      result1.fold((err) => err, (val) => val),
      "john@doe is not a valid email.",
    );
    assertEquals(
      result2.fold((err) => err, (val) => val),
      "johndoe.com is not a valid email.",
    );
    assertEquals(
      result3.fold((err) => err, (val) => val),
      "@doe.com is not a valid email.",
    );
    assertEquals(
      result4.fold((err) => err, (val) => val),
      "john is not a valid email.",
    );
    assertEquals(
      result5.fold((err) => err, (val) => val),
      " is not a valid email.",
    );
  });
});
