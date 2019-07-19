export default class CorpModel {
  id: number
  name: string
  shortName: string
  status: number
  provinceId: any = null
  cityId: any = null
  areaId: any = null
  address: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  mainCorpId: any
  corpName: any = ''
  tableType: number
  areaList: number[] = []
}
