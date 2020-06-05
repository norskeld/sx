const either = (nix: string, win: string): string => (process.platform === 'win32' ? win : nix)

export const symbols = {
  question: either('?', '?'),
  arrowUp: either('↑', '↑'),
  arrowDown: either('↓', '↓'),
  arrowLeft: either('←', '←'),
  arrowRight: either('→', '→'),
  radioOn: either('◉', '(*)'),
  radioOff: either('◯', '( )'),
  check: either('✔', '√'),
  cross: either('×', '×'),
  middot: either('·', '-'),
  ellipsis: either('…', '...'),
  pointerSmall: either('›', '»'),
  dash: either('─', '─'),
  angle: either('❯', '>')
}
