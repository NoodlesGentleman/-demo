/**
 * Created by luco on 3/22/2018 at 14:31 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export default class Merchant {
  id: number
  code: string
  name: string
  shortName: string
  areaList: string
  brandId: number
  warehouseId: number
  parentId: number
  state: number = 1
  createUser: number
  createTime: string
  updateTime: string
  updateUser: string
  shopCount: number
  bankName: string
  bankCode: string
  completeShopCount: number
  areaListForDisplay: string
  warehouseName: string
  brandName: string
  contactsName: string
  reconciliationType: number
  reconciliationPercentage: number
  reconciliationIsAdd: number
  reconciliationAddPercentage: number
  reconciliationAddValue: number
}

