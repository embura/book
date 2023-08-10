import { z } from 'zod'
import { date } from '../common/types'

export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  gender: z.string(),
  hasAudio: z.boolean(),
  createdAt: date,
  updatedAt: date,
  description: z.string(),
  isRented: z.boolean(),
})

export type CreateBook = z.infer<typeof createBookSchema>
