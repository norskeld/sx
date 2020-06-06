// This (and the `scripts/update.ts` script) is a hack to solve the issue with tsc breaking the
// folders structure if you require top level `.json` files. These placeholders get replaced right
// before packing and publishing to npm.
export default {
  name: '__NAME__',
  description: '__DESCRIPTION__',
  version: '__VERSION__'
}
