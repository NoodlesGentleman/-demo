/**
 * Created by slipkinem on 3/26/2018 at 3:08 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { SlipRuleModel } from '../../../../components/slip/model/SlipRuleModel'
import { BaseInsuSlip } from '../../../../components/slip/model/BaseInsuSlip'

export class Slip {
  baseInfo: BaseInsuSlip = new BaseInsuSlip()
  slipRule: SlipRuleModel = new SlipRuleModel()
}
