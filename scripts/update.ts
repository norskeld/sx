import { promisify } from 'util'
import { resolve } from 'path'
import fs from 'fs'

import { name, description, version } from '../package.json'
import { error, log } from '../src/utils/logger'
import tsconfig from '../tsconfig.json'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const exists = promisify(fs.exists)

async function update(): Promise<void> {
  // Get the path to the package.js which contains actual name, description and version info
  const pkgPath = resolve(process.cwd(), tsconfig.compilerOptions.outDir, 'package.js')

  // Since this is a scoped package, we want to use the part after slash
  const [, actualName] = name.split('/')

  try {
    if (await exists(pkgPath)) {
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
    } else {
      error(`Couldn't locate the package.js at ${pkgPath}`)
    }
  } catch (message) {
    error(`Couldn't update name, description and version. Details: ${message}`)
    process.exit(1)
  }
}

update()
