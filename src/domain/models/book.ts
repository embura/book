export namespace Book {
  export interface Common {
    title: string
    author: string
    gender: string
    hasAudio: boolean
    createdAt: Date
    updatedAt: Date
  }

  export interface WithId extends Common {
    id: string
  }

  export interface Description extends WithId {
    description: string
    isRented: boolean
  }
}
