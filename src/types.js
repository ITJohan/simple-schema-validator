/** @import { Either } from "simple-functions" */
/** @import { ValidationError } from "./validation-error.js" */

/**
 * A function that validates a value, returning an Either.
 * @template T The success type on validation.
 * @typedef {(value: any) => Either<ValidationError, T>} Validator
 */

/**
 * Extracts the successful validation type from a validator function
 * that returns an Either.
 * @template {Validator<any>} V
 * @typedef {ReturnType<V> extends Either<any, infer A> ? A : never} Schema
 */
