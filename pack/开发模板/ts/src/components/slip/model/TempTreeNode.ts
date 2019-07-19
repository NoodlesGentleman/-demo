import { RuleEnum } from '../../../enum/Rule'
import { TreeNode } from 'element-ui/types/tree'
import { DutyModel } from './DutyModel'
import { PlanOrCommonAmt } from './PlanOrCommonAmt'
import { TPAReplenishModel } from './TPAReplenishModel'
import { AllowanceModel } from './AllowanceModel'
import { DirectPayModel } from './DirectPayModel'
import { TPADuty } from './TPADuty'

/**
 * Created by slipkinem on 3/30/2018 at 9:48 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export interface TempTreeNode extends TreeNode {
  // treeNodeType: RuleEnum
  // planOrCommonAmt?: PlanOrCommonAmt
  // allowance?: AllowanceModel
  // duty?: DutyModel
  // tpa?: TPADuty
  // directPay?: DirectPayModel
  // tpaReplenish?: TPAReplenishModel
  // children?: TempTreeNode[]
}
