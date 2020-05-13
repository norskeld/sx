import { execute, checkTTY } from './executor'
import { processOptions } from './commands'
import { makeQuestion } from './question'
import { processPrompt } from './prompt'
import { loadPackage } from './loader'
import { error } from './logger'

/**
 * Spin it up.
 */
export async function sx () {
  try {
    checkTTY()

    const pm = processOptions()
    const pkg = await loadPackage()
    const question = await makeQuestion(pkg)
    const meta = await processPrompt({ question, pm })

    await execute({ meta, pm })
  } catch (message) {
    error(message)
    process.exit(1)
  }
}
