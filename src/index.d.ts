export = sx
export as namespace sx

declare namespace sx {
  type PackageManager = 'npm' | 'yarn'

  interface ExecuteOpts {
    pm: PackageManager
    meta: Meta
  }

  interface PromptOpts {
    pm: PackageManager
    question: Question
  }

  interface Meta {
    script: string
    command: string
  }

  interface Question {
    type: 'ext-select'
    message: string
    name: string
    choices: Array<Choice>
  }

  interface Choice {
    name: string
    message: string
    value?: string
  }

  interface JSON {
    [prop: string]: any
  }
}
