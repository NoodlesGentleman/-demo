/**
 * Created by slipkinem on 4/2/2018 at 4:33 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuLimitType } from './InsuLimitType'

export class TPAReplenishModel {
  smallItemId: number
  tpadutyId: number
  smallItemCode: string
  smallItemName: string
  quota: string
  systemDuty: number
  lastDeductiblesNext: number
  lastDeductiblesEduction: string
  compensateRatioRule: number = 1
  compensateRatioNumber: number
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
  insuLimitTypeList: InsuLimitType[] = []
}
