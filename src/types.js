/** @import { Either } from "simple-functions" */

/**
 * A function that validates a value, returning an Either.
 * @template E The error type on failure.
 * @template T The success type on validation.
 * @typedef {(value: any) => Either<E, T>} Validator
 */

/**
 * Extracts the successful validation type from a validator function
 * that returns an Either.
 * @template {Validator<any, any>} V
 * @typedef {ReturnType<V> extends Either<any, infer A> ? A : never} Schema
 */
