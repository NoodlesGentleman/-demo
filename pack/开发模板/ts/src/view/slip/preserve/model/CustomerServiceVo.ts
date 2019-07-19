/**
 * Created by slipkinem on 4/8/2018 at 4:58 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class CustomerServiceVo {
  slipFullCode: string // 保全号
  slipFullType: number // 保全类型(0额度变更，1人员变更)
  insuCompanyId: number // 保险公司
  coverCustomerId: number // 投保客户
  slipCode: string // 保单号
  slipFullState: number // 保全状态（0待校验，1校验中，2校验失败，3待审核，4已生效，5已作废）
  hideState: number // 操作状态（0未隐藏，1已隐藏）
  coverCompanyName: string
  insuCompanyName: string
}
