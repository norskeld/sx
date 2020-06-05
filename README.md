# :zap: sx

[![CircleCI](https://img.shields.io/circleci/build/github/arcdelta/sx/master)](https://circleci.com/gh/arcdelta/sx/tree/master)
[![npm (scoped)](https://img.shields.io/npm/v/@arcdelta/sx?label=npm)](https://www.npmjs.com/package/@arcdelta/sx)
[![semantic-release](https://img.shields.io/badge/semantic-release-e10079)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Micro CLI for interactive running npm & yarn scripts.

## Gosh, why?

I'm lazy. Like, *really lazy*. I don't even like to type much. And sometimes I'm
perplexed by amount of steps required to run a goddamn npm or yarn script.
Especially if you can't remember what scripts a project even has without diving
into an IDE or `cat`ing (`less`ing, `bat`ing) a `package.json`.

If you seek for autocompletion, I would suggest you to use [this zsh enhancement](https://github.com/lukechilds/zsh-better-npm-completion).
If you are like me—read on.

## Installation

```bash
$ npm i -g @arcdelta/sx
```

## Usage

### Basic

Just type at the root of your project:

```bash
$ sx
```

This will run an interactive prompt with scripts from `package.json` as options.
You pick one, hit <kbd>Enter</kbd> and that's it.

### Options

| Option            | Description                          |
| ----------------- | ------------------------------------ |
| `-n`, `--npm`     | Use **npm** to run a script.         |
| `-y`, `--yarn`    | Use **yarn** to run a script.        |
| `-v`, `--version` | Output the current version.          |
| `-h`, `--help`    | Output help information.             |

### Package manager

If you use **yarn** instead of **npm**, you can instruct `sx` to use it as a
default package manager by exposing a `SX_PM=yarn` environment variable in your
shell's rc file (`.zshrc`, `.bash_profile`, etc).

## Deps

This project relies on the following packages:

- [fs-extra](https://github.com/jprichardson/node-fs-extra) for fs goodies
- [ansi-colors](https://github.com/doowb/ansi-colors) for... well, colors

## License

[MIT](https://github.com/arcdelta/sx/blob/master/LICENSE).
