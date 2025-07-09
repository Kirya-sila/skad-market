export const scrollToMainPageTop = () => {
  // TODO избавиться от role=main-page
  const mainPage = document.querySelector('*[role=main-page]')

  if (mainPage) {
    mainPage.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
