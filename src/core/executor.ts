import { spawn, ChildProcess } from 'child_process'

import { ExecuteOptions } from '../types'

/**
 * Executes a script by `spawn`ing a subprocess.
 *
 * @param options - Execute options
 */
export async function execute(options: ExecuteOptions): Promise<ChildProcess> {
  const { pm, meta } = options
  const args = pm === 'npm' ? ['run', meta.script] : [meta.script]

  return spawn(pm, args, {
    stdio: 'inherit',
    shell: process.env.SHELL
  })
}

/**
 * Checks if a stream is connected to a TTY context, which is required for
 * interactive prompts.
 */
export function checkTTY(): void {
  if (!process.stdin.isTTY) {
    throw `You're trying to run the script in a non-TTY context. Exiting.`
  }
}
