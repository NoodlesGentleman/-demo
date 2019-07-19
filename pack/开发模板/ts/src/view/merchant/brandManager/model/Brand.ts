/**
 * Created by luco on 3/16/2018 at 14:31 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export default class Brand {
  id: number
  name: string
  shortName: string
  mainId: number
  mainName: string
  state: number
  stateDisplay?: string
  systemType: number = 1
  systemTypeDisplay?: string
  signedStatus: number = 1
  signedStatusDisplay?: string
  logo: string | undefined
  description: string
  createUser: number
  createTime: string
  updateTime: string
  updateUser: string
  profile: string
  evaluate: string
  mainProduct: string
  mainSpecific: string
}

