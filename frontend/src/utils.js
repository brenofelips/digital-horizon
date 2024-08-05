export const expiredToken = (enqueueSnackbar, error) => {
  if (error.response.data.error === "Token is not valid -> TokenExpiredError: jwt expired") {
    enqueueSnackbar(error.response.data.error, { variant: "error" })
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("USER_DATA")
  }
}