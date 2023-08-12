export class InvalidBookId extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'InvalidBookId'
  }
}
