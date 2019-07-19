/**
 * Created by slipkinem on 3/30/2018 at 9:43 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuOtherAmt } from './InsuOtherAmt'

/**
 * 因为typescript编译期间会将所有未赋值的属性删掉，所以必须要的字段需要显式的进行初始化
 * @see https://github.com/Microsoft/TypeScript/issues/16737
 */
export class BaseInsuSlip {
  slipId: number | string = ''
  slipCode: string = ''
  insuCompanyId?: number = undefined
  otherCompanyId?: number = undefined
  coverCompanyId?: number = undefined
  coverDate: string = ''
  beginDate: string = ''
  endDate: string = ''
  slipState: number = 0
  createTime: string = ''
  slipType: number = 0
  handleType?: number = undefined
  auditStatus: number
  intoAccountInsuFee?: number = undefined
  originTotalAmt: number
  createUser?: number = undefined
  updateUser?: number = undefined
  updateTime: string = ''
  isOpen: number
  fieldShow: number
  isDeleted: number
  memo: string = ''
  insuOtherAmtList: InsuOtherAmt[] = [new InsuOtherAmt()]
}
