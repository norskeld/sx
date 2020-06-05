import { EMPTY } from './constants'

type Indexable<T> = { [s: string]: T }
type EntriesResult<T> = Array<[string, T]>
type EntriesSource<T> = Indexable<T> | ArrayLike<T>

/**
 * Wraps `String.join(...)`.
 *
 * @param xs - Array of strings to join
 * @param sep - Separator to join with
 */
export const join = (xs: Array<string>, sep = EMPTY): string => xs.join(sep)

/**
 * Wraps `Object.keys(...)`.
 *
 * @param x
 */
export const keys = (x: Record<string, unknown>): Array<string> => Object.keys(x)

/**
 * Wraps `Object.entries(...)`.
 *
 * @param x
 */
export const entries = <T = unknown>(x: EntriesSource<T>): EntriesResult<T> => Object.entries<T>(x)

/**
 * Checks if supplied argument is defined.
 *
 * @param x
 */
export const def = (x: unknown): boolean => typeof x !== 'undefined'

/**
 * Checks if supplied argument is not defined.
 *
 * @param x
 */
export const undef = (x: unknown): boolean => !def(x)

/**
 * Gets the first element of the given array.
 *
 * @param xs
 */
export const head = <T = unknown>([x]: Array<T>): T | undefined => x
