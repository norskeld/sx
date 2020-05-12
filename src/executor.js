import { spawn } from 'child_process'

/**
 * Executes a script `spawn`ing a subprocess. Using this instead of `exec`,
 * because `spawn` allows to specify `stdio`, `stdout` and `stderr`.
 *
 * @param {ExecuteOpts} payload
 * @returns {Promise<import('child_process').ChildProcess>} Subprocess
 */
export async function execute ({ meta, pm }) {
  const args = pm === 'npm'
    ? ['run', meta.script]
    : [meta.script]

  return spawn(pm, args, {
    stdio: 'inherit',
    shell: process.env.SHELL
  })
}

/**
 * Checks if a stream is connected to a TTY context, which is required for
 * interactive prompts.
 */
export function checkTTY () {
  if (!process.stdin.isTTY) {
    throw `You're trying to run the script in a non-TTY context. Exiting.`
  }
}
