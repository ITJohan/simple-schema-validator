/** @import { Validation } from "./validation.js" */

/**
 * Extracts the success type `A` from a `Validation<E, A>`.
 * @template A
 * @typedef {A extends Validation<any, infer A> ? A : never} Schema
 */

/**
 * @typedef {object} ValidationError
 * @prop {"validation-error"} tag
 * @prop {string} message
 * @prop {string} [property]
 * @prop {any} value
 */
