export class NotFound extends Error {
  constructor(msg: string, public reason?: Record<string, unknown>) {
    super(msg)
  }
}
