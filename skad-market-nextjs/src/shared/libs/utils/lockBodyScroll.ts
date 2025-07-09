type OriginalStyles = {
  overflow: string | null
  paddingRight: string | null
}

let originalStyles: OriginalStyles = {
  overflow: null,
  paddingRight: null,
}

const saveOriginalStyles = () => {
  const bodyStyle = document.body.style
  originalStyles.overflow = bodyStyle.overflow || null
  originalStyles.paddingRight = bodyStyle.paddingRight || null
}

const applyLockStyles = () => {
  document.body.style.overflow = 'hidden'
  // document.body.style.paddingRight = '10px'
}

const restoreOriginalStyles = () => {
  const bodyStyle = document.body.style
  bodyStyle.overflow = originalStyles.overflow ?? ''
  bodyStyle.paddingRight = originalStyles.paddingRight ?? ''
  originalStyles = { overflow: null, paddingRight: null }
}

export const lockBodyScroll = (lock: boolean) => {
  if (lock) {
    saveOriginalStyles()
    applyLockStyles()
  } else {
    restoreOriginalStyles()
  }
}
