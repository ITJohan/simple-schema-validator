import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { boolean } from "./boolean.js";

describe(boolean.name, () => {
  it("should validate a boolean", () => {
    const bool = boolean(true);
    const bool1 = boolean(false);

    assertEquals(bool.fold((err) => Boolean(err), (val) => val), true);
    assertEquals(bool1.fold((err) => Boolean(err), (val) => val), false);
  });

  it("should invalidate a non-boolean", () => {
    const bool = boolean("");
    const bool1 = boolean(NaN);
    const bool2 = boolean(0);
    const bool3 = boolean({});
    const bool4 = boolean(() => {});

    assertEquals(
      bool.fold((err) => err, (val) => String(val)),
      " is not a boolean.",
    );
    assertEquals(
      bool1.fold((err) => err, (val) => String(val)),
      "NaN is not a boolean.",
    );
    assertEquals(
      bool2.fold((err) => err, (val) => String(val)),
      "0 is not a boolean.",
    );
    assertEquals(
      bool3.fold((err) => err, (val) => String(val)),
      "[object Object] is not a boolean.",
    );
    assertEquals(
      bool4.fold((err) => err, (val) => String(val)),
      "() => {} is not a boolean.",
    );
  });
});
