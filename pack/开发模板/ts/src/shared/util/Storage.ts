/**
 * Created by slipkinem on 9/15/2017 at 2:57 PM.
 */
type StorageType = 'localStorage' | 'sessionStorage'

class Storage {
  private storageType: StorageType

  constructor (storageType: StorageType) {
    this.storageType = storageType
  }

  /**
   * 本地存储数据
   * @param {string} key
   * @param {T} value 值
   * @param {number} expire 过期时间，单位（s）
   */
  set<T> (key: string, value: T, expire = 30 * 24 * 60 * 60) {
    window[this.storageType].setItem(key, JSON.stringify({
      value,
      expire: new Date().getTime() + expire * 1000
    }))
  }

  get<T = any> (key: string): T | null {
    let cacheValue = window[this.storageType].getItem(key)
    if (cacheValue) {
      let o = JSON.parse(cacheValue)

      let now = new Date().getTime()

      if (now > o.expire) {
        this.removeItem(key)
        return null
      }

      return o.value
    }

    return null
  }

  removeItem (key: string) {
    return window[this.storageType].removeItem(key)
  }

  clear () {
    window[this.storageType].clear()
  }
}

export const locals = new Storage('localStorage')
export const session = new Storage('sessionStorage')
