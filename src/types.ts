export type PackageManager = 'npm' | 'yarn'

export interface JSON {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any
}

/// Prompt types

export interface Answer {
  script: string
  command: string
}

export interface Choice extends Answer {
  selected?: boolean
}

export interface PromptOptions {
  choices: Array<Choice>
  message: string
  messageDone?: string
  messageCancelled?: string
  initial?: number
  limit?: number
  pm?: PackageManager
}

export interface PromptPaginator {
  startIndex: number
  endIndex: number
}

export enum PromptEvent {
  State = 'state',
  Abort = 'abort',
  Submit = 'submit'
}

/// Execute types

export interface ExecuteOptions {
  pm: PackageManager
  meta: Answer
}
