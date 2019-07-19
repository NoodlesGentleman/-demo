/**
 * Created by slipkinem on 4/3/2018 at 5:15 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

// 全树唯一的ID
export const nextUid = (function () {
  let uid = 0

  return function () {
    return uid++
  }
}())
