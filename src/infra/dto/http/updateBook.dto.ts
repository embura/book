import { z } from 'zod'
import { idSchema } from '../database/mongo'

export const updateBookSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  gender: z.string().optional(),
  hasAudio: z.boolean().optional(),
  description: z.string().optional()
})

export const updateBookWhithIdSchema = z
  .object({
    id: idSchema
  })
  .merge(updateBookSchema)

export type UpdateBook = z.infer<typeof updateBookSchema>
