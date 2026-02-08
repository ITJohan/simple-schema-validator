/** @import { string } from './string.js' */

/**
 * @template {Record<string, ReturnType<typeof string>>} S
 * @param {S} shape
 * @param {object} [options]
 * @param {string} [options.message]
 */
export const object = (shape) => {
  const keys = /** @type {(keyof S)[]} */ (Object.keys(shape))

	const schema = {
		/**
		 * @param {unknown} x
		 */
		parse: (x) => {
      const isObject = x !== null && typeof x === 'object' && !Array.isArray(x);
      const input = /** @type {Record<keyof S, unknown>} */ (isObject ? x : {});

      return keys.reduce((acc, key) => {
        const parsedProperty = shape[key].parse(input[key]);

        acc.data[key] = parsedProperty.data;
        acc.errors[key] = parsedProperty.errors;

        return acc;
      }, { 
        data: /** @type {{ [K in keyof S]: ReturnType<S[K]["parse"]>["data"] }} */ ({}), 
        errors: /** @type {{ [K in keyof S]: string[] | undefined }} */ ({}) 
      })
		},
	};

	return schema;
};
