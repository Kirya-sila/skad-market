export function formatPhoneNumber(phoneNumber: string) {
  const match = phoneNumber.match(/^(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    return `${match[1]} (${match[2]}) ${match[3]} ${match[4]}  ${match[5]}`
  } else {
    return phoneNumber
  }
}
