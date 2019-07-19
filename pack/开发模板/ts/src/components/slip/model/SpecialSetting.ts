/**
 * Created by slipkinem on 3/30/2018 at 9:47 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class SpecialSetting {
  specialSetId: number
  dutyId: number
  dutyType: number
  limitType: number = 1
  limitRatio: string
  isLimitAmt: number
  limitAmtType: number
  limitAmt: string
  isLimitNum: number
  limitNumType: number
  limitNum: string
  isDeductible: number
  deductibleType: number
  deductible: string
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  mark: string
  limitTypeDisplay?: string
}
