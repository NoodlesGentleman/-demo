/**
 * Created by slipkinem on 3/30/2018 at 9:44 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuLimitType } from './InsuLimitType'


export class DirectPayBaseModel {
  directPayDutyId: number
  planId: number
  directPayDutyCode: string = ''
  directPayDutyName: string = ''
  quota: number
  compensateRatioNumber: number = 0
  limitBegindate: string
  limitEnddate: string
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  basicMark: string
  insuLimitTypeList: InsuLimitType[] = []
}
