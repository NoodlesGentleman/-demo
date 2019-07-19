import { DirectPayBaseModel } from './DirectPayBaseModel'
import { SpecialDutyModel } from './SpecialDutyModel'
import { SpecialSetting } from './SpecialSetting'

/**
 * Created by slipkinem on 3/30/2018 at 9:45 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class DirectPayModel {
  base: DirectPayBaseModel = new DirectPayBaseModel()
  special: SpecialDutyModel = new SpecialDutyModel()
  specialRuleList: SpecialSetting[] = []
}
