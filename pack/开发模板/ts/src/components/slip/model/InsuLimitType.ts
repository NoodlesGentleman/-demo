import { DateType } from '../../../enum/DateType'
import { LimitType } from '../../../enum/LimitType'

/**
 * Created by slipkinem on 3/30/2018 at 9:45 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class InsuLimitType {
  $$index?: number
  limitTypeId?: number
  type: LimitType
  limitType?: DateType
  limitNumber?: number
  limitNumberBegin?: number
  limitNumberEnd?: number
  tableType?: number
  tableId?: number
}
