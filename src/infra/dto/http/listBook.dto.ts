import { z } from 'zod'

export const number = z.string().regex(/^\d+$/).transform(Number)

export const listBookSchema = z.object({
  search: z.string().optional(),
  itemPerPage: number.default('10'),
  pageNumber: number.default('1')
})

export type ListBook = z.infer<typeof listBookSchema>
