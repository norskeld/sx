import { bold } from 'ansi-colors'

import { keys, entries, def } from './utils'

/**
 * Returns a question options and choices for the `enquirer`.
 *
 * @param {xs.JSON} pkg The current `package.json`
 * @returns {Promise<xs.Question>} Formed question object for `enquirer`
 */
export async function makeQuestion (pkg) {
  if (!hasValidScriptsField(pkg)) {
    throw `Detected ${bold(`package.json`)} doesn't seem to have any scripts.`
  }

  try {
    /**
     * @type {Array<xs.Choice>}
     */
    const choices =
      entries(pkg.scripts)
        .map(([script, command]) => ({
          name: script,
          message: script,
          value: command
        }))

    return {
      type: 'ext-select',
      message: 'Pick a script to execute',
      name: 'script',
      choices
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
 * @param {xs.JSON} pkg
 * @returns {boolean}
 */
function hasValidScriptsField (pkg) {
  const scripts = pkg?.scripts

  return (
    def(scripts) &&
    keys(scripts).length > 0
  )
}
