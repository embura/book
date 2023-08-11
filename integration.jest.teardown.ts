export default async () => {
  try {
    const promises = [
      // @ts-ignore
      global.mongoContainer.stop()
    ]

    await Promise.all(promises)

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
