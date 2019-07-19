/**
 * Created by slipkinem on 5/18/2018 at 2:20 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class QuotaChange {
  name: string // 人员名称
  changeType: number // 变动类型(1加额，2减额)
  beforChangeAmt: number // 变动前额度
  changeAmt: number // 变动额度
  changeAfterAmt: number // 变动后额度
}
