/** @import { boolean } from './boolean.js' */
/** @import { date } from './date.js' */
/** @import { number } from './number.js' */
/** @import { string } from './string.js' */

/**
 * @template {Record<string, ReturnType<typeof boolean | typeof date | typeof number | typeof string>>} S
 * @param {S} shape
 * @param {object} [options]
 * @param {string} [options.message]
 */
export const object = (shape) => {
	const keys = /** @type {(keyof S)[]} */ (Object.keys(shape));

	const schema = {
		/**
		 * @param {unknown} x
		 * @returns {{
		 * success: boolean;
		 * data: { [K in keyof S]: ReturnType<S[K]["parse"]>["data"] };
		 * errors: { [K in keyof S]: string[] | undefined };
		 * }}
		 */
		parse: (x) => {
			const isObject = x !== null && typeof x === "object" && !Array.isArray(x);
			const input = /** @type {Record<keyof S, unknown>} */ (isObject ? x : {});

			return keys.reduce(
				(acc, key) => {
					const parsedProperty = shape[key].parse(input[key]);

					if (!parsedProperty.success) {
						acc.success = false;
					}

					acc.data[key] = parsedProperty.data;
					acc.errors[key] = parsedProperty.errors;

					return acc;
				},
				/**
				 * @type {{
				 * 	success: boolean;
				 * 	data: { [K in keyof S]: ReturnType<S[K]["parse"]>["data"] };
				 * 	errors: { [K in keyof S]: string[] | undefined };
				 * }}
				 */
				({ success: true, data: {}, errors: {} }),
			);
		},
	};

	return schema;
};
