import { promises, constants } from 'fs'
import { bold } from 'ansi-colors'
import { resolve } from 'path'

import { JSON } from '../types'

// Prior to 14.x node doesn't have `fs/promises` alias
const { access, readFile } = promises

/**
 * Loads `package.json` in the current working directory, i.e. directory where
 * `x-s` was executed.
 */
export async function loadPackage(): Promise<JSON> {
  const pkgDir = process.cwd()
  const pkgPath = resolve(pkgDir, 'package.json')

  try {
    await access(pkgPath, constants.F_OK | constants.R_OK)
  } catch {
    throw `Couldn't locate ${bold(`package.json`)} at ${bold(pkgDir)} or it's not readable.`
  }

  try {
    return JSON.parse(await readFile(pkgPath, { encoding: 'utf8' }))
  } catch (err) {
    throw `Couldn't read ${bold(`package.json`)}. Details: ${err}`
  }
}
