/**
 * Created by slipkinem on 4/2/2018 at 11:52 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuLimitType } from './InsuLimitType'

export class TPADutyBase {
  insuLimitTypeList: InsuLimitType[] = []
  tpaDutyId: number
  planId: number
  tpaCode: string = ''
  tpaName: string = ''
  tpaType: number
  dutyType: number
  tpaQuota: string
  systemDuty: number
  lastDeductiblesNext: number
  lastDeductiblesFee: string
  compensateRatioRule: number = 1
  compensateRatioNumber: number
  isWaitDate: number | boolean = 0
  waitDate: number
  isMyselfRatio: number | boolean = 0
  bearMyselfRatio: number
  bearMyselfInsuAmt: string
  isClassbRatio: number | boolean = 0
  bearClassbRatio: number
  bearClassbInsuAmt: string
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  basicMark: string
}
