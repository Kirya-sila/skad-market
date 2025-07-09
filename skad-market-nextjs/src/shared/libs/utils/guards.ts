type PartialWithNull<T> = {
  [P in keyof T]?: T[P] | null
}

export const safeJSONParse = (jsonString: string, fallbackValue?: any) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return fallbackValue || jsonString
  }
}

export const getNullOrUndefinedFields = <Params extends object>(params: Params, excludedFields: (keyof Params)[]) => {
  const fields: (keyof Params)[] = []

  for (const key in params) {
    if (!params.hasOwnProperty(key)) continue

    const value = params[key]
    const hasExcludedFields = excludedFields.length > 0 && excludedFields.includes(key)

    if ((value === null || value === undefined || value === '') && !hasExcludedFields) {
      fields.push(key)
    }
  }

  if (fields.length > 0) return fields.join(', ')

  return
}

export const undefinedParamsGuard = <Response, Params extends object, K extends keyof Params>(
  func: (params: Params) => Promise<Response>,
) => {
  return (params: PartialWithNull<Params>, excludedFields: K[] = []) => {
    const fields = getNullOrUndefinedFields(params, excludedFields)

    if (fields) {
      throw Error(`Parameters: '${fields}' are null or undefined`)
    }

    return func(params as Params)
  }
}
