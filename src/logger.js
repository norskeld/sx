import { red, cyan } from 'ansi-colors'

/**
 * Logs error message.
 *
 * @param {string} message
 */
export const error = (message) => (console.error(red(message)))

/**
 * Logs normal message.
 *
 * @param {string} message
 */
export const log = (message) => (console.log(cyan(message)))

/**
 * Clear the console/stdout.
 */
export const clear = () => (console.clear())
