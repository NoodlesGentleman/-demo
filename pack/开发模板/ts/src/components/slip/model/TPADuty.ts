/**
 * Created by slipkinem on 4/2/2018 at 11:52 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { TPADutyBase } from './TPADutyBase'
import { SpecialDutyModel } from './SpecialDutyModel'
import { SpecialSetting } from './SpecialSetting'

export class TPADuty {
  base: TPADutyBase = new TPADutyBase()
  specail: SpecialDutyModel = new SpecialDutyModel()
  specialRuleList: SpecialSetting[] = []
}
