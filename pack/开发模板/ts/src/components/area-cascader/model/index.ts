/**
 * Created by slipkinem on 3/29/2018 at 2:56 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class Area {
  id: number
  name: string
  shortName?: string
  children: Area[]
}

export class AreaItem {
  [key: number]: Area[]
}

export interface AreaMapping {
  province: number
  city: number
  distinct: number
}
