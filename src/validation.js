/**
 * @typedef {object} ValidationError
 * @prop {string} message
 * @prop {string} [property]
 * @prop {any} value
 */

/**
 * @template {ValidationError} E
 * @template A
 * @typedef {object} Success
 * @prop {"success"} tag
 * @prop {A} value
 * @prop {<B>(fn: (x: A) => B) => Validation<E, B>} map
 * @prop {<B>(other: Validation<E, (x: A) => B>) => Validation<E, B>} ap
 * @prop {<B>(fn: (x: A) => Validation<E, B>) => Validation<E, B>} chain
 * @prop {<B>(onFailure: (errors: E[]) => B, onSuccess: (value: A) => B) => B} fold
 */

/**
 * @template {ValidationError} E
 * @template A
 * @typedef {object} Failure
 * @prop {"failure"} tag
 * @prop {E[]} errors
 * @prop {<B>(fn: (x: A) => B) => Validation<E, B>} map
 * @prop {<B>(other: Validation<E, (x: A) => B>) => Validation<E, B>} ap
 * @prop {<B>(fn: (x: A) => Validation<E, B>) => Validation<E, B>} chain
 * @prop {<B>(onFailure: (errors: E[]) => B, onSuccess: (value: A) => B) => B} fold
 */

/**
 * @template {ValidationError} E
 * @template A
 * @typedef {Success<E, A> | Failure<E, A>} Validation
 */

/**
 * @template {ValidationError} E
 * @template A
 * @param {A} x
 * @returns {Validation<E, A>}
 */
const success = (x) => ({
  tag: "success",
  value: x,
  map: (fn) => success(fn(x)),
  chain: (fn) => fn(x),
  ap: (other) => {
    if (other.tag === "failure") {
      return failure(other.errors);
    }
    return success(other.value(x));
  },
  fold: (_onFailure, onSuccess) => onSuccess(x),
});

/**
 * @template {ValidationError} E
 * @template A
 * @param {E[]} x
 * @returns {Validation<E, A>}
 */
const failure = (x) => {
  /** @type {Validation<E, any>} */
  const instance = {
    tag: "failure",
    errors: x,
    map: () => instance,
    ap: (other) => {
      if (other.tag === "failure") {
        return failure([...x, ...other.errors]);
      }
      return instance;
    },
    chain: () => instance,
    fold: (onFailure, _onSuccess) => onFailure(x),
  };
  return instance;
};

/**
 * @template {ValidationError} E
 * @template A
 * @param {A} x
 * @returns {Validation<E, A>}
 */
const of = (x) => success(x);

const validation = { success, failure, of };

export { validation };
