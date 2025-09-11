import { Schema } from "./schema.js";

/** @extends {Schema<number>} */
class NumberSchema extends Schema {
  /**
   * @param {((x: any) => void)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    super(
      rules.length > 0 ? rules : [
        (x) => {
          if (typeof x !== "number" || isNaN(x)) {
            throw new Error("Not a number");
          }
        },
      ],
      isOptional,
    );
  }

  optional() {
    return new NumberSchema(this.rules, true);
  }

  /** @param {number} min */
  min(min) {
    return new NumberSchema([...this.rules, (x) => {
      if (x < min) throw new Error("Too low");
    }], this.isOptional);
  }

  /** @param {number} max */
  max(max) {
    return new NumberSchema([...this.rules, (x) => {
      if (x > max) throw new Error("Too high");
    }], this.isOptional);
  }
}

export { NumberSchema };
