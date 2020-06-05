import { createInterface, emitKeypressEvents, Interface, Key } from 'readline'
import { cyan, white, red, blue, green, bold } from 'ansi-colors'
import { ReadStream, WriteStream } from 'tty'
import { EventEmitter } from 'events'

import { PromptOptions, Choice, PackageManager, PromptEvent } from '../types'
import { beep, cursorHide, cursorShow, eraseLine, cursorTo, eraseLines } from './ansi'
import { EOL, EMPTY, SPACE, DOUBLE } from '../utils/constants'
import { symbols } from './symbols'
import { join } from '../utils/fns'

enum StreamEvent {
  KeyPress = 'keypress'
}

enum PromptState {
  Pending = 'pending',
  Cancelled = 'cancelled',
  Done = 'done'
}

export class Prompt extends EventEmitter {
  /// Render/flow
  private firstRender: boolean
  private closed: boolean
  private cancelled: boolean
  private done: boolean

  /// Streams
  private stdin: ReadStream
  private stdout: WriteStream
  private rl: Interface

  /// State (options)
  private message: string
  private messageDone: string
  private messageCancelled: string
  private choices: Array<Choice>
  private pm: PackageManager

  /// State (internals)
  private value: Choice
  private output: string
  private cursor: number

  constructor(options: PromptOptions) {
    super()

    this.message = options.message
    this.messageDone = options.messageDone || this.message
    this.messageCancelled = options.messageCancelled || this.message
    this.choices = this.normalizeChoices(options.choices)
    this.pm = options.pm || 'npm'
    this.cursor = options.initial || 0
    this.value = this.choices[this.cursor]
    this.output = EMPTY

    this.firstRender = true
    this.closed = false
    this.cancelled = false
    this.done = false

    this.stdin = process.stdin
    this.stdout = process.stdout
    this.rl = createInterface(this.stdin)

    emitKeypressEvents(this.stdin, this.rl)

    if (this.stdin.isTTY) {
      this.stdin.setRawMode(true)
    }

    this.stdin.on(StreamEvent.KeyPress, this.action.bind(this))
    this.render()
  }

  /// Getters

  public get selection(): Choice {
    return this.choices[this.cursor]
  }

  public get state(): PromptState {
    if (this.cancelled) return PromptState.Cancelled
    if (this.done) return PromptState.Done

    return PromptState.Pending
  }

  private get atFirst(): boolean {
    return this.cursor === 0
  }

  private get atLast(): boolean {
    return this.cursor === this.choices.length - 1
  }

  private get formattedOutput(): string {
    const { message, messageDone, messageCancelled, pm, selection } = this
    const { question, middot, check, cross } = symbols

    const cpm = pm === 'npm' ? red(pm) : blue(pm)

    switch (this.state) {
      case PromptState.Pending:
        return join([cyan.bold(question), white.bold(message), white.dim(middot), bold(cpm)], SPACE)

      case PromptState.Done:
        return join(
          [
            green.bold(check),
            white.bold(messageDone),
            white.dim(middot),
            bold(cpm),
            white.dim(middot),
            cyan.bold(selection.script)
          ],
          SPACE
        )

      case PromptState.Cancelled:
        return join(
          [red.bold(cross), white.bold(messageCancelled), white.dim(middot), bold(cpm)],
          SPACE
        )
    }
  }

  /// Internals

  private normalizeChoices(xs: Array<Choice>): Array<Choice> {
    return xs.map((x) => ({
      ...x,
      selected: false
    }))
  }

  private action(_: string, { name, ctrl, meta }: Key): void {
    if (meta) {
      return this.beep()
    }

    // Ctrlable sequences
    if (ctrl) {
      switch (name) {
        case 'c':
        case 'd':
          return this.cancel()

        // By convention Ctrl+A moves to the first element
        case 'a':
          return this.first()

        // By convention Ctrl+D moves to the last element
        case 'e':
          return this.last()

        // Same as Ctrl+A
        case 'g':
          return this.reset()
      }
    }

    // Non-ctrlable sequences
    switch (name) {
      case 'k':
      case 'up':
        return this.up()

      case 'j':
      case 'down':
        return this.down()

      case 'tab':
        return this.next()

      case 'return':
      case 'enter':
        return this.submit()

      case 'abort':
      case 'escape':
        return this.cancel()
    }

    // If nothing matches - beep
    this.beep()
  }

  private close(): void {
    this.stdout.write(cursorShow)
    this.stdin.removeListener(StreamEvent.KeyPress, this.action)

    if (this.stdin.isTTY) {
      this.stdin.setRawMode(false)
    }

    this.rl.close()
    this.emit(this.cancelled ? PromptEvent.Abort : PromptEvent.Submit, this.value)

    this.closed = true
  }

  private moveCursor(to: number): void {
    this.cursor = to
    this.value = this.selection
  }

  private reset(): void {
    this.moveCursor(0)
    this.render()
  }

  private next(): void {
    const moveTo = (this.cursor + 1) % this.choices.length

    this.moveCursor(moveTo)
    this.render()
  }

  private strip(s: string): string {
    const pattern = join(
      [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
      ],
      '|'
    )

    const rx = new RegExp(pattern, 'g')
    const result = s.replace(rx, EMPTY)

    return result
  }

  private cleanup(s: string, cols = process.stdout.columns): string {
    if (!cols) {
      return eraseLine + cursorTo(0)
    }

    const width = (s: string): number => [...this.strip(s)].length
    const reducer = (acc: number, next: string): number =>
      acc + 1 + Math.floor(Math.max(width(next) - 1, 0) / cols)

    const rows = s.split(/\r?\n/).reduce(reducer, 0)

    return eraseLines(rows)
  }

  /// Actions

  private beep(): void {
    this.stdout.write(beep)
  }

  private cancel(): void {
    this.done = true
    this.cancelled = true

    this.render()
    this.stdout.write(EOL)
    this.close()
  }

  private submit(): void {
    this.done = true
    this.cancelled = false

    this.render()
    this.stdout.write(EOL)
    this.close()
  }

  private first(): void {
    this.moveCursor(0)
    this.render()
  }

  private last(): void {
    this.moveCursor(this.choices.length - 1)
    this.render()
  }

  private up(): void {
    if (this.atFirst) {
      return this.last()
    }

    this.moveCursor(this.cursor - 1)
    this.render()
  }

  private down(): void {
    if (this.atLast) {
      return this.first()
    }

    this.moveCursor(this.cursor + 1)
    this.render()
  }

  /// Render & run

  private render(): void {
    if (this.closed) {
      return
    }

    if (this.firstRender) {
      this.stdout.write(cursorHide)
    } else {
      this.stdout.write(this.cleanup(this.output))
    }

    if (this.firstRender) {
      this.firstRender = false
    }

    const { middot, angle } = symbols

    this.output = this.formattedOutput

    if (!this.done) {
      this.output += EOL

      for (let index = 0; index < this.choices.length; index++) {
        const choice = this.choices[index]
        let title = EMPTY
        let prefix = EMPTY
        let desc = EMPTY

        title = this.cursor === index ? cyan(choice.script) : white(choice.script)
        prefix = (this.cursor === index ? cyan(angle) + SPACE : DOUBLE) + prefix
        desc =
          this.cursor === index
            ? cyan.dim(middot + SPACE + choice.command)
            : white.dim(middot + SPACE + choice.command)

        this.output += `${prefix} ${title} ${desc}${EOL}`
      }
    }

    this.stdout.write(this.output)
  }
}
