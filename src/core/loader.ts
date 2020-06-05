import { readJson, pathExists } from 'fs-extra'
import { bold } from 'ansi-colors'
import { resolve } from 'path'

import { JSON } from '../types'

/**
 * Loads `package.json` in the current working directory, i.e. directory where
 * `x-s` was executed.
 */
export async function loadPackage(): Promise<JSON> {
  const pkgDir = process.cwd()

  // TODO: `resolve` is probably redundant here
  const pkgPath = resolve(pkgDir, './package.json')

  if (!(await pathExists(pkgPath))) {
    throw `Couldn't locate ${bold(`package.json`)} at ${bold(pkgDir)}.`
  }

  try {
    return await readJson(pkgPath, {
      encoding: 'utf8'
    })
  } catch (err) {
    throw `Couldn't read ${bold(`package.json`)}. Details: ${err}`
  }
}
