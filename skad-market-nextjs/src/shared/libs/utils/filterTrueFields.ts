type ObjType = { [key: string]: boolean }

export const filterTrueFields = (obj: ObjType): ObjType => {
  const result: ObjType = {}
  for (const key in obj) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }
  return result
}
