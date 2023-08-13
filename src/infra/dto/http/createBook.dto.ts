import { z } from 'zod'

export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  gender: z.string(),
  hasAudio: z.boolean(),
  description: z.string()
})

export type CreateBook = z.infer<typeof createBookSchema>
