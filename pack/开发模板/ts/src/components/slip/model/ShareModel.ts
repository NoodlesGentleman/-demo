/**
 * Created by slipkinem on 4/4/2018 at 5:38 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuLimitType } from './InsuLimitType'
import { ShareDutyModel } from './ShareDutyModel'

export class ShareModel {
  insuLimitTypeList: InsuLimitType[] = []
  insuShareDutyList: ShareDutyModel[] = []

  shareId: number
  shareCode: string
  insuAmount: string
  shareName: string
  planId: number
  slipId: number | string
}

