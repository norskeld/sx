## [2.0.2](https://github.com/arcdelta/sx/compare/v2.0.1...v2.0.2) (2020-06-06)


### Bug Fixes

* **node:** fix node imports & set min node requirements ([8fa55bd](https://github.com/arcdelta/sx/commit/8fa55bd3eece903ba65a28ec40717593b28c0351))

## [2.0.1](https://github.com/arcdelta/sx/compare/v2.0.0...v2.0.1) (2020-06-06)


### Bug Fixes

* **prompt:** fix spacing on prompt options ([4b98043](https://github.com/arcdelta/sx/commit/4b9804363954b714c0759a7cff124d46b4ed1375))

# [2.0.0](https://github.com/arcdelta/sx/compare/v1.2.3...v2.0.0) (2020-06-06)


### Bug Fixes

* **ci:** use node v14 & remove ts-node config ([c1dee87](https://github.com/arcdelta/sx/commit/c1dee87afb8ea82e717c99e7a18a72dce9b8e8eb))


### Code Refactoring

* **loader:** use built-in async readFile & access ([747e25f](https://github.com/arcdelta/sx/commit/747e25f83b16429cf177d2f7d53ca5ac8a94a973))
* **update:** use built-in async readFile, writeFile & access ([86cbab4](https://github.com/arcdelta/sx/commit/86cbab483d6c67a63300431e36273edcf750ac7f))


### BREAKING CHANGES

* **loader:** this bumps the required node version to >=10.x
* **update:** this bumps the required node version to >=10.x

## [1.2.3](https://github.com/arcdelta/sx/compare/v1.2.2...v1.2.3) (2020-06-06)


### Bug Fixes

* **command:** fix trimming options in help message ([91b4a29](https://github.com/arcdelta/sx/commit/91b4a29a849ee59a8401f0ab00066faac401bc18))
* **semantic-release:** remove prepublishOnly hook ([f1f5616](https://github.com/arcdelta/sx/commit/f1f5616368c8f6d59241d8e4d0b4bf1983fe2f95))

## [1.2.2](https://github.com/arcdelta/sx/compare/v1.2.1...v1.2.2) (2020-06-06)


### Bug Fixes

* **command:** fix the issue with empty dist ([e505cd9](https://github.com/arcdelta/sx/commit/e505cd9fbfda5d5ba437f21d5e5ce764b3b2e591))

## [1.2.1](https://github.com/arcdelta/sx/compare/v1.2.0...v1.2.1) (2020-06-05)


### Bug Fixes

* **command:** fix options description ([06f4929](https://github.com/arcdelta/sx/commit/06f4929a7b9ccdd524db452d74571f5896223776))

# [1.2.0](https://github.com/arcdelta/sx/compare/v1.1.0...v1.2.0) (2020-05-14)


### Features

* **commands:** allow to override default package manager through SX_PM env variable ([70be034](https://github.com/arcdelta/sx/commit/70be0343c1f965c0c52ff0a1829ca024f819b3f4))



# [1.1.0](https://github.com/arcdelta/sx/compare/v1.0.0...v1.1.0) (2020-05-13)


### Features

* **prompt:** display current package manager ([5412a6e](https://github.com/arcdelta/sx/commit/5412a6e19870e2fbe91f17227b229dafa88605d2))



# [1.0.0](https://github.com/arcdelta/sx/compare/c0b1e65c4c02ea5d6acd0d1dd2da0b8d8c77ddb3...v1.0.0) (2020-05-13)


### Code Refactoring

* **package:** switch to scoped package & rename to `sx` ([1a187ac](https://github.com/arcdelta/sx/commit/1a187ac5ec167f294a51eb040e7f31e8392a2ce9))


### Features

* initial implementation w/ dumb d.ts ([c0b1e65](https://github.com/arcdelta/sx/commit/c0b1e65c4c02ea5d6acd0d1dd2da0b8d8c77ddb3))


### BREAKING CHANGES

* **package:** Global binary was changed from `x-s` to `sx`
