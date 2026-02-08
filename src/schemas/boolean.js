/**
 * @param {object} [options]
 * @param {boolean} [options.fallback]
 * @param {string} [options.message]
 */
export const boolean = ({ fallback = false, message = "Not a boolean" } = {}) => {
  /** @type {((x: boolean) => string | undefined)[]} */
  const checks = [];

  const schema = {
    /**
     * @param {object} [options]
     * @param {string} options.message
     */
    true: ({ message} = { message: "Must be true" }) => {
      checks.push((x) => (x !== true ? message : undefined));
      return schema;
    },
    /**
     * @param {object} [options]
     * @param {string} options.message
     */
    false: ({message} = { message: "Must be false" }) => {
      checks.push((x) => (x !== false ? message : undefined));
      return schema;
    },
    /**
     * @param {unknown} x
     * @returns {{
     * data: boolean;
     * errors?: string[];
     * }}
     */
    parse: (x) => {
      /** @type {string[]} */
      const errors = [];
      let data;

      if (typeof x !== "boolean") {
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