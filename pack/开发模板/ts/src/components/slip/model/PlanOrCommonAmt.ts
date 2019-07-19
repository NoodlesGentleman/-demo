import { RuleEnum } from '../../../enum/Rule'

/**
 * Created by slipkinem on 3/30/2018 at 9:44 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class PlanOrCommonAmt {
  slipId: number | string // 保单id
  type: number = RuleEnum.Plan // 类型
  name: string // 计划名称或公共保额名称
  Code: string // 计划编码或公共保额名编码
  planOrAmtId: number
  createTime?: string
  createUser?: number
  updateTime?: string
  updateUser?: number
}
