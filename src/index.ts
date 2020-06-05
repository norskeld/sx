import { execute, checkTTY } from './core/executor'
import { makeQuestion } from './core/question'
import { loadPackage } from './core/loader'
import { processCmd } from './core/command'
import { error } from './utils/logger'
import { prompt } from './prompt'

export async function sx(): Promise<void> {
  try {
    checkTTY()

    const pm = await processCmd()
    const pkg = await loadPackage()
    const question = await makeQuestion(pkg, pm)
    const meta = await prompt(question)

    await execute({ pm, meta })
  } catch (message) {
    error(message)
    process.exit(1)
  }
}

sx()
