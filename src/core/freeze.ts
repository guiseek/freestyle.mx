export function freeze<T>(value: T): Readonly<T> {
  return Object.freeze(value)
}
