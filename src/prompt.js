import { dim, bold, gray, cyan, symbols, red } from 'ansi-colors'
import SelectPrompt from 'enquirer/lib/prompts/select'
import utils from 'enquirer/lib/utils'
import Enquirer from 'enquirer'

const EMPTY = ''
const SPACE = ' '

/**
 * Runs an interactive prompt with scripts as options.
 *
 * @param {xs.PromptOpts} opts
 * @returns {Promise<xs.Meta>} Meta
 */
export async function processPrompt ({ question, pm }) {
  const answer = await (new Enquirer())
    .register('ext-select', CustomSelectPrompt)
    .prompt({ ...question, pm })

  const { name, value } = question.choices
    .find(choice => choice.name === answer[question.name])

  return {
    script: name,
    command: value
  }
}

export class CustomSelectPrompt extends SelectPrompt {
  constructor (options = {}) {
    super(options)
  }

  async separator () {
    const { ellipsis, middot } = symbols
    const { status } = this.state

    if (this.options.separator) {
      return super.separator()
    }

    switch (status) {
      // If still selecting
      case 'pending':
        return `${dim(middot)} ${dim(ellipsis)}`

      // If selected
      case 'submitted':
        return dim(middot)

      // If cancelled (via Ctrl+C or similar)
      case 'cancelled':
        return `${dim(middot)} ${dim('Nothing was selected')}`
    }
  }

  async prefix () {
    const state = this.state
    const timer = this.timers && this.timers.prefix
    let element = await this.element('prefix') || this.symbols

    state.timer = timer

    if (utils.isObject(element)) {
      element = element[state.status] || element.pending
    }

    if (!utils.hasColor(element)) {
      if (state.status === 'cancelled') {
        return red(symbols.multiplication)
      } else {
        let style = this.styles[state.status] || this.styles.pending
        return style(element)
      }
    }

    return element
  }

  choiceMessage (choice, index) {
    let message = this.resolve(choice.message, this.state, choice, index)
    const middot = dim(symbols.middot)
    const description = dim(choice.value || choice.description || EMPTY)

    message = `${message} ${middot} ${description || EMPTY}`

    if (choice.role === 'heading' && !utils.hasColor(message)) {
      message = bold(message)
    }

    return this.resolve(message, this.state, choice, index)
  }

  async renderChoice(choice, index) {
    await this.onChoice(choice, index)

    const focused = this.index === index
    const pointer = await this.pointer(choice, index)
    const check = await this.indicator(choice, index) + (choice.pad || EMPTY)
    let hint = await this.resolve(choice.hint, this.state, choice, index)

    if (hint && !utils.hasColor(hint)) {
      hint = dim(hint)
    }

    const indent = this.indent(choice)
    let message = await this.choiceMessage(choice, index)

    // Final message parts
    const startMargin = this.margin[3]
    const endMargin = this.margin[1]
    const prefix = indent + pointer + check

    const line = () =>
      [startMargin, prefix, message, endMargin, hint]
        .filter(Boolean)
        .join(SPACE)

    if (choice.role === 'heading') {
      return line()
    }

    if (choice.disabled) {
      if (!utils.hasColor(message)) {
        message = gray(message)
      }

      return line()
    }

    if (focused) {
      message = cyan(message)
    }

    return line()
  }
}
