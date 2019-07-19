/**
 * Created by slipkinem on 3/30/2018 at 9:45 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuLimitType } from './InsuLimitType'


export class PublicCoverageAmt {
  commonAmtId: number
  commonCode: string = ''
  slipId: number | string
  commonName: string = ''
  commonquota: number
  lastDeductiblesNext: number
  lastDeductiblesEductionamt: number
  compensateRatioRule: number = 1
  compensateRatio: number
  isWaitDate: number
  waitDate: number
  isBearMyselfRatio: number
  bearMyselfRatio: number
  bearMyselfInsuAmt: number
  isBearClassbRatio: number
  bearClassbRatio: number
  bearClassbInsuAmt: number
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  mark: string
  insuLimitTypeList: InsuLimitType[] = []
}
