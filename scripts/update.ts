import { promises, constants } from 'fs'
import { bold } from 'ansi-colors'
import { resolve } from 'path'

import { name, description, version } from '../package.json'
import { error, log } from '../src/utils/logger'
import tsconfig from '../tsconfig.json'

// Prior to 14.x node doesn't have `fs/promises` alias
const { access, writeFile, readFile } = promises

async function update(): Promise<void> {
  // Get the path to the package.js which contains actual name, description and version info
  const pkgDir = resolve(process.cwd(), tsconfig.compilerOptions.outDir)
  const pkgPath = resolve(pkgDir, 'package.js')

  // Check if the package.js is present and accessible
  try {
    await access(pkgPath, constants.F_OK | constants.R_OK | constants.W_OK)
  } catch {
    error(`Couldn't locate ${bold(`package.js`)} at ${bold(pkgDir)} or it's not readable/writable.`)
    process.exit(1)
  }

  // Since this is a scoped package, we want to use the part after slash
  const [, actualName] = name.split('/')

  try {
    // Read the file content as a string
    const content = await readFile(pkgPath, { encoding: 'utf8' })

    // Do replacements
    const replaced = content
      .replace(/__NAME__/g, actualName)
      .replace(/__DESCRIPTION__/g, description)
      .replace(/__VERSION__/g, version)

    // Write content back
    await writeFile(pkgPath, replaced, 'utf8')

    log(`Successfully updated name, description and version of the package.`)
  } catch (message) {
    error(`Couldn't update name, description and version. Details: ${message}`)
    process.exit(1)
  }
}

update()
