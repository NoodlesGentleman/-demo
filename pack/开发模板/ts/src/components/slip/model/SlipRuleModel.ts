/**
 * Created by slipkinem on 3/30/2018 at 9:46 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { AllowanceModel } from './AllowanceModel'
import { DirectPayModel } from './DirectPayModel'
import { SlipPolicy } from './SlipPolicy'
import { PublicCoverageAmt } from './PublicCoverageAmt'
import { TPADuty } from './TPADuty'
import { TPAReplenishModel } from './TPAReplenishModel'
import { InsuPlan } from './InsuPlan'
import { ShareModel } from './ShareModel'
import { InsuDuty } from './InsuDuty'

export class SlipRuleModel {
  publicCoverageAmt: PublicCoverageAmt = new PublicCoverageAmt()
  slipPolicy: SlipPolicy = new SlipPolicy()
  directPay: DirectPayModel = new DirectPayModel()
  allowance: AllowanceModel = new AllowanceModel()
  tpa: TPADuty = new TPADuty()
  tpaReplenish: TPAReplenishModel = new TPAReplenishModel()
  plan: InsuPlan = new InsuPlan()
  share: ShareModel = new ShareModel()
  allDuty: InsuDuty[] = []
}
