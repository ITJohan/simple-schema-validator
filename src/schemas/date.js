import { ValidationError } from "../errors/validation-error.js";
import { Schema } from "./schema.js";

/** @extends {Schema<number>} */
class DateSchema extends Schema {
  /**
   * @param {((x: any) => number)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    super(
      rules.length > 0 ? rules : [
        (x) => {
          const timestamp = new Date(x).getTime();
          if (isNaN(timestamp) || timestamp < 0) {
            throw new ValidationError({
              message: "Not a valid datetime string",
              value: x,
            });
          }
          return timestamp;
        },
      ],
      isOptional,
    );
  }
}

export { DateSchema };
