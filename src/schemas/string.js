import { ValidationError } from "../errors/validation-error.js";
import { Schema } from "./schema.js";

/** @extends {Schema<string>} */
class StringSchema extends Schema {
  /**
   * @param {((x: any) => string)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    super(
      rules.length > 0 ? rules : [
        (x) => {
          if (typeof x !== "string") {
            throw new ValidationError({ message: "Not a string", value: x });
          }
          return x;
        },
      ],
      isOptional,
    );
  }

  /** @param {number} min */
  minLength(min) {
    return /** @type {this} */ (new StringSchema([...this.rules, (x) => {
      if (x.length < min) {
        throw new ValidationError({ message: "Too short", value: x });
      }
      return x;
    }], this.isOptional));
  }

  /** @param {number} max */
  maxLength(max) {
    return /** @type {this} */ (new StringSchema([...this.rules, (x) => {
      if (x.length > max) {
        throw new ValidationError({ message: "Too long", value: x });
      }
      return x;
    }], this.isOptional));
  }

  email() {
    return /** @type {this} */ (new StringSchema([...this.rules, (x) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(x)) {
        throw new ValidationError({ message: "Not a valid email", value: x });
      }
      return x;
    }], this.isOptional));
  }
}

export { StringSchema };
