/** @template A */
class Schema {
  /** @type {((x: any) => void)[]} */
  rules;
  /** @type {boolean} */
  isOptional;

  /**
   * @param {((x: any) => void)[]} rules
   * @param {boolean} isOptional
   */
  constructor(rules = [], isOptional = false) {
    this.rules = rules;
    this.isOptional = isOptional;
  }

  /**
   * @param {any} x
   * @returns {A}
   */
  parse(x) {
    if (this.isOptional && (x === null || x === undefined)) {
      return x;
    }

    for (const rule of this.rules) {
      rule(x);
    }

    return x;
  }
}

export { Schema };
