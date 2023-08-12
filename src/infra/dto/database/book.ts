import { z } from 'zod'
import { date } from '../common/types'
import { idSchema } from './mongo'

export const createBookSchema = z.object({
  _id: idSchema,
  title: z.string(),
  author: z.string(),
  gender: z.string(),
  hasAudio: z.boolean(),
  description: z.string(),
  isRented: z.boolean(),
  createtAt: date,
  updatetAt: date
})

export type DBBook = z.infer<typeof createBookSchema>
