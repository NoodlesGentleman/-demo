/**
 * Created by slipkinem on 4/20/2018 at 3:36 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class SlipRuleInfo {
  dateDeductible: number // 日免赔
  yearDeductible: number // 年免赔
  dateLimitAmt: number // 日限额
  numberLimitAmt: number // 次限额
  slipCode: string // 保单号
  coverCompany: number // 投保公司
  coverDate: string // 投保期间
  applyRangeList: number[] = [] // 适用范围
  mark: string // 备注
}
