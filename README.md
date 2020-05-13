# :zap: sx

![CircleCI](https://img.shields.io/circleci/build/github/arcdelta/sx/master)
[![npm (scoped)](https://img.shields.io/npm/v/@arcdelta/sx?label=npm)](https://www.npmjs.com/package/@arcdelta/sx)
[![semantic-release](https://img.shields.io/badge/semantic-release-e10079)](https://github.com/semantic-release/semantic-release)

> Micro CLI for interactive running npm & yarn scripts.

## Motivation

I'm lazy. Like, *really lazy*. And sometimes I'm perplexed by amount of steps
required to run a goddamn npm script. Especially if you can't remember what
scripts that new project even has in its `package.json`, without diving into an
IDE or `cat`ing (`less`ing, `bat`ing, etc) the `package.json`.

## Installation

```bash
$ npm i -g @arcdelta/sx
```

## Usage

### Basic

```bash
$ sx
```

This will run an interactive prompt with scripts as options. You pick one, hit
<kbd>Enter</kbd> and that's it.

### Options

| Option            | Description                          |
| ----------------- | ------------------------------------ |
| `-y`, `--yarn`    | Use `yarn` instead of `npm`.         |
| `-h`, `--help`    | Shows help information for this CLI. |
| `-v`, `--version` | Outputs the current version.         |

## Deps

This project relies on the following packages:

- [enquirer](https://github.com/enquirer/enquirer) for prompting
- [fs-extra](https://github.com/jprichardson/node-fs-extra) for fs goodies
- [commander](https://github.com/tj/commander.js#readme) for parsing args
- [ansi-colors](https://github.com/doowb/ansi-colors) for... well, colors

Also [rollup](https://rollupjs.org/) and [babel](https://babeljs.io/).

## Why not TypeScript?

That's the question I asked myself, and the answer is simple: because of poor
typings on some deps like [enquirer](https://github.com/enquirer/enquirer).

## License

[MIT](https://github.com/arcdelta/sx/blob/master/LICENSE).
