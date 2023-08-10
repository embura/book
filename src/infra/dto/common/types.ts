import { z } from 'zod'

export const date = z.preprocess(
  (date) => (typeof date === 'string' ? new Date(date) : date),
  z.date()
)
