export const filterTrueKeys = <T>(obj: T): (keyof T)[] => {
  return (Object.keys((obj as {}) || {}) as (keyof T)[]).filter((key) => obj[key] === true)
}
