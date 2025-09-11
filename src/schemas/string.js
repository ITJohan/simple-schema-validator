import { Schema } from "./schema.js";

/** @extends {Schema<string>} */
class StringSchema extends Schema {
  /**
   * @param {((x: any) => void)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    super(
      rules.length > 0 ? rules : [
        (x) => {
          if (typeof x !== "string") throw new Error("Not a string");
        },
      ],
      isOptional,
    );
  }

  optional() {
    return new StringSchema(this.rules, true);
  }

  /** @param {number} min */
  minLength(min) {
    return new StringSchema([...this.rules, (x) => {
      if (x.length < min) throw new Error("Too short");
    }], this.isOptional);
  }

  /** @param {number} max */
  maxLength(max) {
    return new StringSchema([...this.rules, (x) => {
      if (x.length > max) throw new Error("Too long");
    }], this.isOptional);
  }
}

export { StringSchema };
