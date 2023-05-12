export enum MissingType {
  Arguments = 'arguments',
  Options = 'options',
}

export class Missing extends Error {
  constructor(missing: MissingType, missedThing?: string) {
    super(`Missing ${missing}${missedThing ? `: [${missedThing}]` : ''}. Try to use 'help [command name]' to see usage.`)
    this.name = 'MissingArgs'
  }
}
