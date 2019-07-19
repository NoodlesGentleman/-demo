/**
 * Created by luco on 4/10/2018 at 10:19 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export default class CardBin {
  id: number
  cardBin: string
  insuranceId: number
  insuranceName: string = ''
  status: number
  templateUrl: string | undefined = ''
  createTime: string
  updateTime: string
  createUser: number
  updateUser: number
  cardBinName: string
}

