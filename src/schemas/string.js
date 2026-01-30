/**
 * @param {object} [options]
 * @param {string} options.message
 */
export const string = ({ message } = { message: "Not a string" }) => {
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
		 */
		parse: (x) => {
			if (typeof x !== "string") return { data: x, errors: [message] };

			/** @type {string[]} */
			const errors = [];

			for (const check of checks) {
				const error = check(x);
				if (error) errors.push(error);
			}

			if (errors.length > 0) return { data: x, errors };
			return { data: x, errors: undefined };
		},
	};

	return schema;
};
