# :zap: sx

[![CircleCI](https://flat.badgen.net/circleci/github/arcdelta/sx/master?scale=1.2)](https://circleci.com/gh/arcdelta/sx/tree/master)
[![npm (scoped)](https://flat.badgen.net/npm/v/@arcdelta/sx?color=red&scale=1.2)](https://www.npmjs.com/package/@arcdelta/sx)
[![semantic-release](https://flat.badgen.net/badge/semantic/release/e10079?scale=1.2)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://flat.badgen.net/badge/commitizen/friendly/green?scale=1.2)](http://commitizen.github.io/cz-cli/)
![Dependabot](https://flat.badgen.net/dependabot/arcdelta/sx?icon=dependabot?scale=1.2)

> Micro CLI for interactive running npm & yarn scripts.

## Gosh, why?

**First**, I wanted to practise creating public CLI packages/libraries.

**Secondly**, I'm lazy. Like, *really lazy*. I don't even like to type much. And sometimes I'm perplexed
by amount of steps required to run an npm or yarn script. Especially if you can't remember what
scripts a project even has without diving into an IDE or `cat`ing (`less`ing, `bat`ing) a
`package.json`.

**Thirdly**, if you seek for autocompletion, I would suggest you to use [this zsh enhancement](https://github.com/lukechilds/zsh-better-npm-completion).
If you are like me—read on.

## Features

You can:

- Interactively select and run scripts from `package.json`
- Use different package managers: **npm**, **pnpm** or **yarn**
- Override default package manager (**npm**) via env variable

I have plans on adding support for lerna and running multiple scripts. You can [check the milestones](https://github.com/arcdelta/sx/milestones?direction=asc&sort=title&state=open).

## Installation

> Node v12.18.0 or higher is required

```bash
$ npm i -g @arcdelta/sx
```

## Usage

### Basic

Just type at the root of your project:

```bash
$ sx
```

This will run an interactive prompt with scripts from `package.json` as selectable options. You pick
one, hit <kbd>Enter</kbd> and that's it.

### Options

| Option            | Description                          |
| ----------------- | ------------------------------------ |
| `-n`, `--npm`     | Use **npm** to run a script.         |
| `-p`, `--pnpm`    | Use **pnpm** to run a script.        |
| `-y`, `--yarn`    | Use **yarn** to run a script.        |
| `-v`, `--version` | Output the current version.          |
| `-h`, `--help`    | Output help message.                 |

### Package manager

If you use **yarn** or **pnpm** instead of **npm**, you can instruct `sx` to use it as a default
package manager by exposing a `SX_PM=yarn` environment variable in your shell's rc file (`.zshrc`,
`.bash_profile`, etc).

## Deps

This project relies only on [ansi-colors](https://github.com/doowb/ansi-colors).

## License

[MIT](https://github.com/arcdelta/sx/blob/master/LICENSE).
