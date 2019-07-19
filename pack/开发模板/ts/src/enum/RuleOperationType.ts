/**
 * Created by slipkinem on 4/4/2018 at 6:09 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export enum RuleOperationType {
  // 1审核，2冻结，3解冻，4作废，5生效
  Check = 1,
  Freeze = 2,
  Unfreeze = 3,
  Cancellation = 4,
  TakeEffect = 5,
  CheckPending = 6
}
