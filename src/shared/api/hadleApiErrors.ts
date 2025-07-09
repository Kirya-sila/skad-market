
interface IErrorData {
  errors: { field: string; message: string }[] | []
  message: string
}

export const handleApiErrors = (errorData: IErrorData): string => {
  let errorMessage = ''
  if (Array.isArray(errorData)) {
    errorMessage = errorData.join(', ')
  }
  if (errorData.errors) {
    if (Array.isArray(errorData.errors) && errorData.errors.length) {
      errorMessage = errorData.errors.map((error: { field: string; message: string }) => error.message).join(', ')
    }
    if (!Array.isArray(errorData.errors) && typeof errorData.errors === 'object') {
      errorMessage = Object.values(errorData.errors).join(', ')
    }
  }

  if (!errorMessage) {
    errorMessage = errorData.message ?? 'Something went wrong'
  }

  return errorMessage
}
