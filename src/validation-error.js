class ValidationError extends Error {
  /**
   * @param {string} message
   * @param {{ property: string } & ErrorOptions} options
   */
  constructor(message, options) {
    super(message, { cause: options.cause });
    this.name = "ValidationError";
    this.property = options.property;
  }
}

export { ValidationError };
