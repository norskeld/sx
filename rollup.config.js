import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

import { main, dependencies, peerDependencies } from './package.json'
import { keys } from './src/utils'

export default {
  input: './src/index.js',
  external: [
    'path',
    'ansi-colors',
    'child_process',
    'enquirer/lib/utils',
    'enquirer/lib/prompts/select',
    ...keys(peerDependencies || {}),
    ...keys(dependencies || {})
  ],
  output: {
    file: main,
    exports: 'named',
    format: 'cjs'
  },
  plugins: [
    json(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 10
            }
          }
        ]
      ]
    })
  ]
}
