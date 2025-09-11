/** @import { Schema } from "./schemas/schema.js" */

/**
 * @template {Schema<any>} S
 * @typedef {S extends Schema<infer T> ? T : never} Extract
 */
