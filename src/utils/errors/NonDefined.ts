export class NonDefined extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NonDefined'
  }
}
