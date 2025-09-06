class ValidationError extends Error {
  /**
   * @param {string} message
   * @param {{
   *  property?: string;
   *  value: any;
   * } & ErrorOptions} options
   */
  constructor(message, options) {
    super(message, { cause: options.cause });
    this.name = "ValidationError";
    this.property = options.property;
    this.value = options.value;
  }
}

export { ValidationError };
