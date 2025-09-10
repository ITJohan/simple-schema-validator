/** @import { Validation } from "./validation.js" */

/**
 * Extracts the success type `A` from a `Validation<E, A>`.
 * @template A
 * @typedef {A extends Validation<any, infer A> ? A : never} Schema
 */
