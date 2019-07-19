import { RuleEnum } from '../../../enum/Rule'

/**
 * Created by slipkinem on 3/30/2018 at 9:44 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class DutyModel {
  dutyName: string = '' // 责任名称
  dutyCode: string = '' // 责任代码
  dutyType: RuleEnum = RuleEnum.DirectPay // 责任类型
  dutyId: number
  TPAType?: number // TPA类型
  planId: number // 计划id
}
