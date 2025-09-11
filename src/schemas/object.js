import { AggregateValidationError } from "../errors/aggregate-validaton-error.js";
import { ValidationError } from "../errors/validation-error.js";
import { Schema } from "./schema.js";

/**
 * @template {Record<string, Schema<any>>} S
 * @extends {Schema<{ [K in keyof S]: any }>}
 */
class ObjectSchema extends Schema {
  /** @param {S} schema */
  #schema;
  /** @type {Array<keyof S>} */
  #keys;

  /**
   * @param {S} schema
   * @param {boolean} isOptional
   */
  constructor(schema, isOptional = false) {
    super([(x) => {
      if (typeof x !== "object" || x === null || Array.isArray(x)) {
        throw new ValidationError({ message: "Not an object", value: x });
      }
    }], isOptional);
    this.#schema = schema;
    this.#keys = Object.keys(schema);
  }

  optional() {
    return new ObjectSchema(this.#schema, true);
  }

  /**
   * @override
   * @param {any} x
   * @returns {{ [K in keyof S]: S[K] extends Schema<infer T> ? T : never }}
   * @throws {AggregateValidationError}
   */
  parse(x) {
    super.parse(x);

    /** @type {any} */
    const result = {};
    /** @type {ValidationError[]} */
    const errors = [];

    for (const key of this.#keys) {
      const validator = this.#schema[key];
      const value = x[key];

      try {
        const parsedValue = validator.parse(value);
        result[key] = parsedValue;
      } catch (error) {
        if (error instanceof ValidationError) {
          errors.push(
            new ValidationError({
              ...error,
              key: String(key),
              options: { cause: error },
            }),
          );
        } else {
          throw error;
        }
      }
    }

    if (errors.length > 0) {
      throw new AggregateValidationError(errors);
    }

    return result;
  }
}

export { ObjectSchema };
