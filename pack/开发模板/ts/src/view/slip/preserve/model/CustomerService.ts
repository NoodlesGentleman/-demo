import { QuotaChange } from './QuotaChange'
import { PersonChange } from './PersonChange'

/**
 * Created by slipkinem on 4/9/2018 at 10:39 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class CustomerService {
  slipFullId: number
  slipFullCode: string
  slipId: number | string = ''
  slipCode: string
  insuCompanyId?: number = undefined
  coverCompanyId?: number = undefined
  coverCustomerId: string
  otherCompanyId: number
  coverCompanyName: string
  insuCompanyName: string
  coverDate: string
  beginDate: string
  endDate: string
  slipFullState: number
  slipFullType: number
  hideState: number
  quotaAscription: number
  isOpen: number
  fieldShow: number
  isDeleted: number
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  memo: string
  quotaChangeList: QuotaChange[]
  personChangeList: PersonChange[]
}
