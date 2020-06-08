import { EOL, EMPTY, DOUBLE_SPACE, SPACE } from '../utils/constants'
import { PackageManager } from '../types'
import { head, join } from '../utils/fns'
import { error } from '../utils/logger'
import pkg from '../package'

interface PackageManagerOption {
  pm: true
  name: PackageManager
  alias: string
  description: string
}

interface OtherOption {
  pm: false
  name: string
  alias: string
  description: string
}

interface HelpOption {
  name: string
  description: string
}

type Option = PackageManagerOption | OtherOption

function makeOptions(): Array<Option> {
  return [
    {
      pm: true,
      name: 'npm',
      alias: 'n',
      description: 'Use npm to run a script.'
    },
    {
      pm: true,
      name: 'pnpm',
      alias: 'p',
      description: 'Use pnpm to run a script.'
    },
    {
      pm: true,
      name: 'yarn',
      alias: 'y',
      description: 'Use yarn to run a script.'
    },
    {
      pm: false,
      name: 'version',
      alias: 'v',
      description: 'Output the current version.'
    },
    {
      pm: false,
      name: 'help',
      alias: 'h',
      description: 'Output this help message.'
    }
  ]
}

function outputVersion(): void {
  console.log(pkg.version)
}

function outputHelp(): void {
  // Pre-form options for help message
  const options = makeOptions().reduce<Array<HelpOption>>(
    (acc, { name, alias, description }) =>
      acc.concat({
        name: `  -${alias}, --${name}`,
        description
      }),
    []
  )

  // Get the max length we should pad options's `name` to
  const maxLength = Math.max(...options.map((opt) => opt.name.length))

  // Pad options
  const paddedOpts = options.map<HelpOption>(({ name, description }) => ({
    name: name.padEnd(maxLength, SPACE),
    description
  }))

  // Form a string from options
  const outputOpts = paddedOpts
    .reduce((acc, { name, description }) => acc + name + DOUBLE_SPACE + description + EOL, EMPTY)
    .trimRight()

  console.log(`Usage: ${pkg.name} [options]${EOL}`)
  console.log(`${pkg.description}${EOL}`)
  console.log(`Options:`)
  console.log(outputOpts)
}

function validateProcessedOptions(options: Array<Option>): void {
  if (options.length > 1) {
    throw `You can't pass more than one option.`
  }

  if (options.filter((x) => x.pm).length > 1) {
    throw `You can't specify more than one package manager to use.`
  }
}

function resolveFromEnv(): PackageManager | void {
  const fromEnv = process.env.SX_PM as PackageManager
  const allowedPackageManagers = makeOptions()
    .filter((x) => x.pm)
    .map((x) => x.name)

  if (fromEnv) {
    if (allowedPackageManagers.includes(fromEnv)) {
      return fromEnv
    } else {
      throw `'SX_PM must be one of: ${join(allowedPackageManagers, ', ')}, but got ${fromEnv}.`
    }
  }
}

function processOptions(options: Array<Option>, args: Array<string>): Array<Option> {
  return options.reduce<Array<Option>>((acc, next) => {
    return args.includes(`--${next.name}`) || args.includes(`-${next.alias}`)
      ? acc.concat(next)
      : acc
  }, [])
}

function processOption(option?: Option): PackageManager | void {
  if (!option) {
    return resolveFromEnv()
  }

  switch (option.name) {
    case 'npm':
      return 'npm'

    case 'pnpm':
      return 'pnpm'

    case 'yarn':
      return 'yarn'

    case 'version':
      return outputVersion()

    case 'help':
      return outputHelp()
  }
}

/**
 * Processes CLI options like `--npm`, `--yarn`, `--help`, etc and returns a selected package
 * manager, that is then used for spawning subprocesses.
 */
export async function processCmd(): Promise<PackageManager> {
  const raw = process.argv.slice(2)
  const rawOptions = makeOptions()
  const processedOptions = processOptions(rawOptions, raw)

  try {
    validateProcessedOptions(processedOptions)
  } catch (message) {
    error(message)
    process.exit(1)
  }

  const action = processOption(head(processedOptions))

  if (action === undefined) {
    process.exit(0)
  }

  return action
}
