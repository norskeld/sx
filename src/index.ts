import { execute, checkTTY } from './core/executor'
import { makeQuestion } from './core/question'
import { loadPackage } from './core/loader'
import { error } from './utils/logger'
import { prompt } from './prompt'

export async function sx(): Promise<void> {
  try {
    checkTTY()

    const pkg = await loadPackage()
    const question = await makeQuestion(pkg, 'npm')
    const { script, command } = await prompt(question)

    execute({
      pm: 'npm',
      meta: {
        script,
        command
      }
    })
  } catch (message) {
    error(message)
    process.exit(1)
  }
}

sx()
