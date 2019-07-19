/**
 * Created by slipkinem on 3/19/2018 at 11:48 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export default class ExpandData {
  id: number
  level?: number
  parentId?: number
  subList?: ExpandData[]
}
