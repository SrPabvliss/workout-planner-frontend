/* eslint-disable @typescript-eslint/no-explicit-any */
type CaseConverter = {
  toCamelCase: (str: string) => string
  toSnakeCase: (str: string) => string
}

const caseConverter: CaseConverter = {
  toCamelCase: (str: string) =>
    str.replace(/_([a-z])/g, g => g[1].toUpperCase()),

  toSnakeCase: (str: string) =>
    str.replace(/([A-Z])/g, g => `_${g.toLowerCase()}`),
}

export function convertKeys(
  obj: Record<string, any>,
  converter: keyof CaseConverter,
): Record<string, any> {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeys(v, converter))
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        const value = obj[key]
        const newKey = caseConverter[converter](key)
        result[newKey] =
          value !== null && typeof value === 'object'
            ? convertKeys(value, converter)
            : value
        return result
      },
      {} as Record<string, any>,
    )
  }

  return obj
}

export function toSnakeCase<T>(obj: T): Record<string, any> {
  return convertKeys(obj as Record<string, any>, 'toSnakeCase')
}

export function toCamelCase<T>(obj: T): Record<string, any> {
  return convertKeys(obj as Record<string, any>, 'toCamelCase')
}
