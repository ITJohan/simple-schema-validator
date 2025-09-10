/** @import { Validation, ValidationError } from "../validation.js" */

import { validation } from "../validation.js";

/**
 * @template {Record<string, (x: any) => Validation<ValidationError, any>>} S
 * @param {S} schema
 * @returns {{validate: (x: any) => Validation<ValidationError, { [K in keyof S]: S[K] extends (x: any) => Validation<any, infer A> ? A : never }>}}
 */
const object = (schema) => {
  /** @type {Array<keyof S>} */
  const schemaKeys = Object.keys(schema);

  return {
    validate: (x) =>
      schemaKeys
        .map((key) =>
          schema[key](x[key]).fold(
            (err) =>
              validation.failure(
                /** @type {ValidationError[]} */ ([{
                  ...err[0],
                  property: key,
                }]),
              ),
            (val) => validation.success(val),
          )
        ).reduce((acc, current) =>
          current.ap(
            acc.map(
              (/** @type {any[]} */ array) => (/** @type {any} */ value) => [
                ...array,
                value,
              ],
            ),
          ), validation.of([]))
        .map((values) => {
          return schemaKeys.reduce(
            (obj, key, index) => {
              obj[key] = values[index];
              return obj;
            },
            /** @type {any} */ ({}),
          );
        }),
  };
};

export { object };
