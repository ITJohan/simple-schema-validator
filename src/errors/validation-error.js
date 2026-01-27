class ValidationError extends Error {
	/**
	 * @param {{
	 *  message?: string;
	 *  key?: string;
	 *  value: any;
	 *  options?: ErrorOptions;
	 * }} params
	 */
	constructor({ message, key, value, options }) {
		super(message, options);
		this.name = "ValidationError";
		this.key = key;
		this.value = value;
	}
}

export { ValidationError };
