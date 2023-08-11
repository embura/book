export const makePagination = (pageNumber = 0, itemsPerPage = 10) => {
  const limit = itemsPerPage || 10
  const page = pageNumber && pageNumber > 0 ? pageNumber - 1 : 0
  const skip = limit * page
  return { limit, skip }
}
