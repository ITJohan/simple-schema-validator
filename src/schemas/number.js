import { ValidationError } from "../errors/validation-error.js";
import { Schema } from "./schema.js";

/** @extends {Schema<number>} */
class NumberSchema extends Schema {
  /**
   * @param {((x: any) => number)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    super(
      rules.length > 0 ? rules : [
        (x) => {
          if (typeof x !== "number" || isNaN(x)) {
            throw new ValidationError({ message: "Not a number", value: x });
          }
          return x;
        },
      ],
      isOptional,
    );
  }

  /** @param {number} min */
  min(min) {
    return /** @type {this} */ (new NumberSchema([...this.rules, (x) => {
      if (x < min) throw new ValidationError({ message: "Too low", value: x });
      return x;
    }], this.isOptional));
  }

  /** @param {number} max */
  max(max) {
    return /** @type {this} */ (new NumberSchema([...this.rules, (x) => {
      if (x > max) throw new ValidationError({ message: "Too high", value: x });
      return x;
    }], this.isOptional));
  }

  positive() {
    return /** @type {this} */ (new NumberSchema([...this.rules, (x) => {
      if (x <= 0) {
        throw new ValidationError({ message: "Must be positive", value: x });
      }
      return x;
    }], this.isOptional));
  }
}

export { NumberSchema };
