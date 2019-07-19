/**
 * Created by slipkinem on 3/19/2018 at 5:56 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { locals as session } from './Storage'

export class Cache<T> {
  set (key: string, o: T, expire = 30 * 24 * 60 * 60) {
    session.set(key, o, expire)
  }

  get (key: string) {
    return session.get<T>(key)
  }

  clear () {
    session.clear()
  }

  removeItem (key: string) {
    session.removeItem(key)
  }
}
