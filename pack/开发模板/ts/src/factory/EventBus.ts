import _ from 'lodash'

/**
 * Created by slipkinem on 5/2/2018 at 1:59 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
class EventBus {
  private events = new Map<String | Symbol, Function[]>()

  subscribe (eventName: string, payload: Function) {
    let funcs = this.events.get(eventName)
    if (_.isArray(funcs)) {
      return funcs.push(payload)
    }
    this.events.set(eventName, [payload])
  }

  publish (eventName: string) {
    let funcs = this.events.get(eventName)
    _.isArray(funcs) && funcs.forEach(func => func(...arguments))
  }

  remove (eventName: string) {
    let funcs = this.events.get(eventName)
    funcs && this.events.delete(eventName)
  }
}

// 希望全局使用一个bus
export const eventBus = new EventBus()
