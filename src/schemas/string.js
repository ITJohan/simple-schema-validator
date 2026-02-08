/**
 * @param {object} [options]
 * @param {string} [options.fallback]
 * @param {string} [options.message]
 */
export const string = ({ fallback = "", message = "Not a string" } = {}) => {
	/** @type {((x: string) => string | undefined)[]} */
	const checks = [];

	const schema = {
		/**
		 * @param {number} min
		 * @param {object} [options]
		 * @param {string} options.message
		 */
		min: (
			min,
			{ message } = { message: `Minimum string length is ${min}` },
		) => {
			checks.push((x) => (x.length < min ? message : undefined));
			return schema;
		},
		/**
		 *
		 * @param {object} [options]
		 * @param {string} options.message
		 */
		email: ({ message } = { message: "Not an email" }) => {
			checks.push((x) =>
				!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(x)
					? message
					: undefined,
			);
			return schema;
		},
		/**
		 * @param {unknown} x
		 * @returns {{
		 * 	data: string;
		 * 	errors?: string[];
		 * }}
		 */
		parse: (x) => {
			/** @type {string[]} */
			const errors = [];
			let data;

			if (typeof x !== "string") {
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
			return { data };
		},
	};

	return schema;
};
