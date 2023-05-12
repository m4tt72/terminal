export class NotFound extends Error {
  constructor(path: string) {
    super(`No this file or directory: '${path}'. We're trying to fix it.`)
    this.name = 'NotFound'
  }
}
