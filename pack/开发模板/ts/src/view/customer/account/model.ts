/**
 * Created by slipkinem on 4/25/2018 at 10:56 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class Account {
  customerAccountId: number
  name: string// 账户
  certificateType: number // 证件类型
  certificateCode: string // 证件号
  insuCompanyId: number // 保险公司id
  coverCompanyId: number // 投保公司id
  activationState: number // 激活状态
  frozenState: number // 冻结状态
}

export class AccountSlipInfo {
  countAmount: number
  beginDate: string
  endDate: string
  frozenState: number
  remainder: number
  slipCode: number
}
