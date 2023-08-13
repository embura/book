import { z } from 'zod'
import { idSchema } from './mongo'

export const rentBookSchema = z.object({
  id: idSchema,
  bookId: idSchema,
  userId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  isRented: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type DBRentBook = z.infer<typeof rentBookSchema>
