/**
 * @param {object} [options]
 * @param {number} [options.fallback]
 * @param {string} [options.message]
 */
export const number = ({ fallback = 0, message = "Not a number" } = {}) => {
	/** @type {((x: number) => string | undefined)[]} */
	const checks = [];

	const schema = {
		/**
		 * @param {number} min
		 * @param {object} [options]
		 * @param {string} options.message
		 */
		min: (
			min,
			{ message } = { message: `Number can not be less than ${min}` },
		) => {
			checks.push((x) => (x < min ? message : undefined));
			return schema;
		},
		/**
		 * @param {number} max
		 * @param {object} [options]
		 * @param {string} options.message
		 */
		max: (
			max,
			{ message } = { message: `Number can not be more than ${max}` },
		) => {
			checks.push((x) => (x > max ? message : undefined));
			return schema;
		},
		/**
		 *
		 * @param {object} [options]
		 * @param {string} options.message
		 */
		positive: ({ message } = { message: "Not a positive number" }) => {
			checks.push((x) => x < 0 ? message : undefined);
			return schema;
		},
		/**
		 * @param {unknown} x
		 * @returns {{
		 * 	data: number;
		 * 	errors?: string[];
		 * }}
		 */
		parse: (x) => {
			/** @type {string[]} */
			const errors = [];
			let data;

			if (Number.isNaN(x) || typeof x !== "number") {
				data = fallback;
				errors.push(message);
			} else {
				data = x;
			}

			for (const check of checks) {
				const error = check(data);
				if (error) errors.push(error);
			}

			if (errors.length > 0) return { data, errors };
			
			return { data, errors: undefined };
		},
	};

	return schema;
};
