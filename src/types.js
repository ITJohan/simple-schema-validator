/** @import { Either } from "simple-functions" */

/**
 * @template T
 * @typedef {(value: any) => T} Validator
 */

/**
 * Extracts the successful validation type from a validator function
 * that returns an Either.
 * @template {Validator<any>} V
 * @typedef {ReturnType<V> extends Either<any, infer A> ? A : never} Schema
 */
