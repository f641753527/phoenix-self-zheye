const cacheSessionStorage = {
  set<T> (key: string, value: T) {
    sessionStorage.setItem(`${key}`, JSON.stringify(value))
  },
  get<T> (key: string, defaultValue: T): T {
    const item = sessionStorage.getItem(`${key}`)
    return item !== null ? JSON.parse(item) : defaultValue
  },
  remove (key: string) {
    sessionStorage.removeItem(`${key}`)
  }
}

export default cacheSessionStorage
