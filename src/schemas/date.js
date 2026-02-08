/**
 * @param {object} [options]
 * @param {Date} [options.fallback]
 * @param {string} [options.message]
 */
export const date = ({ 
  fallback = new Date(), 
  message = "Invalid date" 
} = {}) => {
  /** @type {((x: Date) => string | undefined)[]} */
  const checks = [];

  const schema = {
    /**
     * @param {Date} min
     * @param {object} [options]
     * @param {string} options.message
     */
    min: (min, { message } = { message: `Date must be after ${min.toISOString()}` }) => {
      checks.push((x) => (x < min ? message : undefined));
      return schema;
    },
    /**
     * @param {Date} max
     * @param {object} [options]
     * @param {string} options.message
     */
    max: (max, { message } = { message: `Date must be before ${max.toISOString()}` }) => {
      checks.push((x) => (x > max ? message : undefined));
      return schema;
    },
    /**
     * @param {unknown} x
     * @returns {{ data: Date; errors?: string[] }}
     */
    parse: (x) => {
      /** @type {string[]} */
      const errors = [];
      let data;

			const isParsable = typeof x === "string" || typeof x === "number" || x instanceof Date;
			const parsed = isParsable ? new Date(x) : new Date(NaN);
			const isValid = !Number.isNaN(parsed.getTime());

      if (!isValid) {
        data = fallback;
        errors.push(message);
      } else {
        data = parsed;
      }

      for (const check of checks) {
        const error = check(data);
        if (error) errors.push(error);
      }

      return errors.length > 0 ? { data, errors } : { data, errors: undefined };
    },
  };

  return schema;
};