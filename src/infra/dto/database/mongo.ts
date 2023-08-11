import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const mongoIdToString = (id: unknown) =>
  id instanceof ObjectId ? id.toString() : id

export const idSchema = z.preprocess(mongoIdToString, z.string())

export function arrayDefault<T>(schema: z.ZodType<T>) {
  return z.preprocess((value) => value ?? [], z.array(schema))
}

export function preprocessNull<T>(schema: z.ZodType<T>) {
  return z.preprocess(nullToUndefined, schema)
}

export const nullToUndefined = (value: unknown) =>
  value === null ? undefined : value
