import { EMPTY } from '../utils/constants'

export const ESC = '\x1B'
export const CSI = `${ESC}[`
export const beep = '\u0007'

/// Cursor movement

/**
 * Moves the cursor to the left side.
 */
export const cursorLeft = `${CSI}G`

/**
 * Hides the cursor.
 */
export const cursorHide = `${CSI}?25l`

/**
 * Shows the cursor.
 */
export const cursorShow = `${CSI}?25h`

/**
 * Moves the cursor down a specific amount of rows. Default is `1`.
 *
 * @param n - Lines down
 */
export const cursorDown = (n = 1): string => `${CSI}${n}B`

/**
 * Moves the cursor up a specific amount of rows. Default is `1`.
 *
 * @param n - Amount of rows
 */
export const cursorUp = (n = 1): string => `${CSI}${n}A`

/**
 * Sets the absolute position of the cursor. `x`:`y` is the top left corner of
 * the screen.
 *
 * @param x - X coord
 * @param y - Y coord
 */
export const cursorTo = (x: number, y?: number): string => {
  return !y ? `${CSI}${x + 1}G` : `${CSI}${y + 1};${x + 1}H`
}

/**
 * Sets the position of the cursor relative to its current position.
 *
 * @param x - X coord
 * @param y - Y coord
 */
export const cursorMove = (x: number, y: number): string => {
  let xSequence = EMPTY
  let ySequence = EMPTY

  if (x < 0) xSequence += `${CSI}${-x}D`
  if (x > 0) xSequence += `${CSI}${x}C`

  if (y < 0) ySequence += `${CSI}${-y}A`
  if (y > 0) ySequence += `${CSI}${y}B`

  return xSequence + ySequence
}

/// Erasers

/**
 * Erases the entire current line.
 */
export const eraseLine = `${CSI}2K`

/**
 * Erases from the current cursor position up the specified amount of rows.
 *
 * @param n - How much lines to erase
 */
export const eraseLines = (n: number): string => {
  const cursor = (next: number): string => (next < n - 1 ? cursorUp() : EMPTY)
  const reducer = (acc: string, next: number) => acc + eraseLine + cursor(next)
  const eraser = [...Array(n).keys()].reduce(reducer, EMPTY)

  return n ? eraser + cursorLeft : eraser
}
