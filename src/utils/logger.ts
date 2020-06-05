import { red, cyan } from 'ansi-colors'

/**
 * Logs error message.
 *
 * @param {string} message
 */
export const error = (message: string): void => console.error(red(message))

/**
 * Logs normal message.
 *
 * @param {string} message
 */
export const log = (message: string): void => console.log(cyan(message))

/**
 * Clear the console/stdout.
 */
export const clear = (): void => console.clear()
