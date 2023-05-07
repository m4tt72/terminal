import * as bin from './bin'

export function commandExists(command: string) {
  const commands = ['clear', ...Object.keys(bin)]

  return commands.includes(command.split(' ')[0])
}
