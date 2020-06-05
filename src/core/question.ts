import { bold } from 'ansi-colors'

import { JSON, PromptOptions, Choice, PackageManager } from '../types'
import { keys, entries, def } from '../utils/fns'

/**
 * Builds the question object with choices and message for the prompt.
 *
 * @param pkg - Current `package.json`
 * @param pm - Current package manager
 */
export async function makeQuestion(pkg: JSON, pm: PackageManager): Promise<PromptOptions> {
  if (!hasValidScriptsField(pkg)) {
    throw `Detected ${bold(`package.json`)} doesn't seem to have any scripts.`
  }

  try {
    const choices: Array<Choice> = entries<string>(pkg.scripts).map(
      ([script, command]: [string, string]) => ({
        script,
        command
      })
    )

    return {
      message: 'Pick a script to execute',
      messageCancelled: 'Cancelled',
      messageDone: 'Executing',
      choices,
      pm
    }
  } catch (err) {
    throw `Something went wrong while parsing JSON. Details: ${err}`
  }
}

/**
 * Checks if provided `pkg` has valid `scripts` property:
 * - is present
 * - has values
 *
 * @param pkg
 */
function hasValidScriptsField(pkg: JSON): boolean {
  const scripts = pkg?.scripts

  return def(scripts) && keys(scripts).length > 0
}
