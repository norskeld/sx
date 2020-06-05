import { PromptOptions, PromptEvent, Answer } from '../types'
import { Prompt } from './prompt'

/**
 * Interactive prompt.
 *
 * @param options - Prompt options
 */
export async function prompt(options: PromptOptions): Promise<Answer> {
  return new Promise((resolve) => {
    new Prompt(options).on(PromptEvent.Submit, (x: Answer) => resolve(x))
  })
}
