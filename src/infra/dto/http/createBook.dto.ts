import { z } from 'zod'

export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  gender: z.string(),
  hasAudio: z.boolean(),
  description: z.string(),
  isRented: z.boolean(),
})

export type CreateBook = z.infer<typeof createBookSchema>
