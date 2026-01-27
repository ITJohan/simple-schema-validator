// TODO: need a default method

/** @template A */
class Schema {
	/** @type {((x: any) => A)[]} */
	rules;
	/** @type {boolean} */
	isOptional;

	/**
	 * @param {((x: any) => A)[]} rules
	 * @param {boolean} isOptional
	 */
	constructor(rules = [], isOptional = false) {
		this.rules = rules;
		this.isOptional = isOptional;
	}

	/**
	 * @param {(x: any) => A} fn
	 * @returns {this}
	 */
	transform(fn) {
		const subclass = /** @type {typeof Schema} */ (this.constructor);
		return /** @type {this} */ (
			new subclass([fn, ...this.rules], this.isOptional)
		);
	}

	/** @returns {this & { isOptional: true }} */
	optional() {
		const subclass = /** @type {typeof Schema} */ (this.constructor);
		return /** @type {this & { isOptional: true }} */ (
			new subclass(this.rules, true)
		);
	}

	/**
	 * @param {any} x
	 * @returns {this extends { isOptional: true } ? A | undefined | null : A}
	 */
	parse(x) {
		if (this.isOptional && (x === null || x === undefined)) {
			return x;
		}

		let value = x;
		for (const rule of this.rules) {
			value = rule(value);
		}

		return value;
	}
}

export { Schema };
