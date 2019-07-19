import * as _ from 'lodash'
import { ObjectKing } from './model/ObjectKing'

/**
 * Created by slipkinem on 5/9/2018 at 4:27 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export const assignPure = (dest: ObjectKing, source: ObjectKing) => {
  console.log(dest, source)
  _.forEach(dest, (value: any, key: string) => {
    dest[key] = source[key]
  })
  return dest
}
