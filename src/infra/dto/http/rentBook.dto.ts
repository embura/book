import { z } from 'zod'
import { idSchema } from '../database/mongo'

export const rentBookSchema = z.object({
  userId: z.string()
})

export const rentBookWithIdSchema = z
  .object({
    bookId: idSchema
  })
  .merge(rentBookSchema)

export type RentBook = z.infer<typeof rentBookSchema>
