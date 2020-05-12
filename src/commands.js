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
const add = _ => /** @returns {Function} */ () => true

/**
 * Removes `version` prop from `opts`.
 *
 * @param {Object} options
 * @returns {Object} Without `version` prop
 */
const withoutVersion = options =>
  // eslint-disable-next-line no-unused-vars
  (({ version, ...rest }) => ({ ...rest }))(options)

/**
 * Removes props with `undefined` values from `opts`.
 *
 * @param {Object} options
 * @returns {Object} Without props with `undefined` values
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
 * Validates options.
 *
 * @param {Object} options
 * @returns {Object} Options
 */
const validateOpts = options => {
  // If no options provided - use npm
  if (undef(options.npm) && undef(options.yarn)) {
    options.npm = true
  }

  // Don't allow using npm and yarn together
  if (options.npm && options.yarn) {
    throw `You can't use both ${bold.underline('--npm')} and ` +
          `${bold.underline('--yarn')} options.`
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
  validateOpts,
  withoutUndefs,
  withoutVersion
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
    .option('-n, --npm', 'Use npm for running scripts.', add('npm'))
    .option('-y, --yarn', 'Use yarn for running scripts.', add('yarn'))
    .helpOption('-h, --help', 'Show this information.')
    .version(version, '-v, --version', 'Show the current version.')
    .parse(process.argv)

  return processArgs(program.opts())
}
