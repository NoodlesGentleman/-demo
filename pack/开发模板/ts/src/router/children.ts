/**
 * Created by slipkinem on 3/2/2018 at 1:41 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { RouteConfig } from 'vue-router'
import { navList } from '../nav-list'

let children: RouteConfig[] = []

navList.forEach((nav) => {
  if (nav.subMenus.length > 0) {
    nav.subMenus.forEach((subMenu) => {
      if (!subMenu.meta.permission) {
        children.push(Object.assign({}, subMenu))
      }
    })
  }
})

export {
  children
}

