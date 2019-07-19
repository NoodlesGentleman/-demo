/**
 * Created by slipkinem on 4/8/2018 at 3:15 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class InsuDuty {
  dutyName: string // 责任名称
  dutyCode: string // 责任代码
  dutyType: number // 责任类型(5 TPA责任，2津贴责任，3直付责任)
  planId: number // 计划id
  dutyId: number // 责任id
  planName: string

  availableProportion: number
}
