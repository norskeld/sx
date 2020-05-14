import { bold } from 'ansi-colors'
import cmd from 'commander'

import { name, version, description } from '../package.json'
import { keys, undef, def, compose } from './utils'

/**
 * Helper that indicates one or another option's presence.
 *
 * @param {string} [_]
 * @returns {Function}
 */
const add = _ => () => true

/**
 * Removes `version` prop from `opts`.
 *
 * @param {Object} options
 * @returns {Object} Options without `version` prop
 */
const withoutVersion = options =>
  // eslint-disable-next-line no-unused-vars
  (({ version, ...rest }) => ({ ...rest }))(options)

/**
 * Removes props with `undefined` values from `opts`.
 *
 * @param {Object} options
 * @returns {Object} Options without undefined props
 */
const withoutUndefs = options =>
  keys(options)
    .reduce((acc, key) => {
      if (def(options[key])) {
        acc[key] = options[key]
      }

      return acc
    }, {})

/**
 * Sets default options.
 *
 * @param {Object} options
 * @returns {Object} Options
 */
const useDefaultPM = options => {
  // If no options provided - use npm
  if (undef(options.npm) && undef(options.yarn)) {
    options.npm = true
  }

  // Override if env provided
  const envPM = process.env.SX_PM

  if (envPM) {
    if (['yarn', 'npm'].includes(envPM)) {
      options[envPM] = true
    } else {
      throw `${bold.underline('SX_PM')}: must be either ${bold('npm')} or ` +
            `${bold('yarn')}, but got ${bold(envPM)}.`
    }
  }

  return options
}

/**
 * It takes an object with set package manager and converts it to string.
 *
 * @param {Object} options
 * @returns {string} Package manager
 */
const toString = options =>
  (([x]) => x)(keys(options))

/**
 * Process arguments. Composing just for the science.
 *
 * @returns {Function} Composed function
 */
const processArgs = compose(
  toString,
  withoutUndefs,
  withoutVersion,
  useDefaultPM
)

/**
 * Processes CLI options like `--npm`, `-n` OR `--yarn`, `-y` and returns a
 * string denoting selected package manager, that is then used for spawning
 * subprocesses.
 *
 * @returns {string} Package manager
 */
export function processOptions () {
  const program = cmd
    .name(name)
    .description(description)
    .usage('[options]')
    .option('-y, --yarn', 'Use yarn for running scripts.', add('yarn'))
    .helpOption('-h, --help', 'Show this information.')
    .version(version, '-v, --version', 'Show the current version.')
    .parse(process.argv)

  return processArgs(program.opts())
}
