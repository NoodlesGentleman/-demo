/**
 * Created by luco on 4/10/2018 at 10:19 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export default class StockBatch {
  stockId: string
  stockName: string
  stockType: number
  stockStatus: number
  cardBinId: string = ''
  stockCount: number
  stockSurpluscount: number
  stockOutcount: number
  createTime: string
  cardBinName: string
  updateTime: string
  stockProvince: string
  stockCity: string
  createUser: number
  updateUser: number
  place: number
  download: number
}

