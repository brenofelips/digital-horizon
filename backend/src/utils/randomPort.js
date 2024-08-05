export const randomPort = () => {
  if (process.env.NODE_ENV === "test") {
    return Math.floor(Math.random() * 60000) + 5000
  }

  return 3333;
}
