export const stripNulls = <T extends object>(input: T): { [K in keyof T]: Exclude<T[K], null> } => {
  const result = {} as { [K in keyof T]: Exclude<T[K], null> }
  for (const key of Object.keys(input) as Array<keyof T>) {
    const value = input[key]
    if (value !== null)
      result[key] = value as Exclude<T[typeof key], null>
  }
  return result
}
