/**
 * Created by slipkinem on 4/8/2018 at 3:58 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Vue } from '../../../../ext-nb'
import { BaseInsuSlip } from '../../../../components/slip/model/BaseInsuSlip'
import { RuleOperationType } from '../../../../enum/RuleOperationType'

export const operationSlip = ({ slipId, slipState }: BaseInsuSlip, operationState: RuleOperationType) => {
  return Vue.http.post('/insurance/operationSlip', { slipId, slipState, operationState }, {
    notifyMessage: {
      [RuleOperationType.Unfreeze]: '恭喜您，解冻成功！',
      [RuleOperationType.Check]: '恭喜您，审核成功！',
      [RuleOperationType.Freeze]: '恭喜您，冻结成功！',
      [RuleOperationType.Cancellation]: '恭喜您，作废成功！',
      [RuleOperationType.TakeEffect]: '恭喜您，操作成功！',
      [RuleOperationType.CheckPending]: '恭喜您，操作成功！'
    }[operationState]
  })
}
