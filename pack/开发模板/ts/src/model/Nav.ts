/**
 * Created by slipkinem on 3/2/2018 at 1:54 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { RouteConfig } from 'vue-router'

export interface SubMenu extends RouteConfig {
}

export default interface Nav {
  name: string
  icon: string
  subMenus: SubMenu[]
}
