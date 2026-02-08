/**
 * Utility to extract the output type of a schema.
 * @template T
 * @typedef {T extends { parse: (x: unknown) => { data: infer D } } ? D : never} Infer
 */

export {};
