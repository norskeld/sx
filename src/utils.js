/**
 * Wraps `Object.keys(...)`.
 *
 * @param {Object} x
 * @returns {Array<string>} Object keys
 */
export const keys = x => Object.keys(x)

/**
 * Wraps `Object.entries(...)`.
 *
 * @param {Object} x
 * @returns {Array<[string, Object]>} An array of tuples
 */
export const entries = x => Object.entries(x)

/**
 * Checks if supplied argument is defined.
 *
 * @param {unknown} x
 * @returns {boolean}
 */
export const def = x => typeof x !== 'undefined'

/**
 * Checks if supplied argument is not defined.
 *
 * @param {unknown} x
 * @returns {boolean}
 */
export const undef = x => !def(x)

/**
 * Self-explanatory.
 *
 * @param  {...Function} fns
 */
export const compose = (...fns) =>
  fns.reduceRight((prev, next) =>
    (...args) => next(prev(...args)),
    value => value
  )
