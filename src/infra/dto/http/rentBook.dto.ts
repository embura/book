import { z } from 'zod'

export const rentBookSchema = z.object({
  userId: z.string(),
})

export type RentBook = z.infer<typeof rentBookSchema>
