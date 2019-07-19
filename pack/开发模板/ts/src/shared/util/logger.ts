/**
 * Created by slipkinem on 12/19/2017 at 5:18 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Message } from 'element-ui'

export const error = (msg?: string) => {
  console.error(`[pk-front error] `, msg)
}

export const assert = (condition: boolean, message: string) => {
  if (!condition) {
    Message.error(message)
    throw new Error(`[pk-front error] ${message}`)
  }
}
