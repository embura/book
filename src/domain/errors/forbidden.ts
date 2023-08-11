export class Forbidden extends Error {
  constructor(msg: string, public reason?: Record<string, unknown>) {
    super(msg)
    this.name = 'Forbidden'
  }
}
