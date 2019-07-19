import { Area } from '../model'
import { Vue } from '../../../ext-nb'
import SysCity from '../../../view/corp/manage/model/SysCity'
import SysArea from '../../../view/corp/manage/model/SysArea'
import SysProvince from '../../../view/corp/manage/model/SysProvince'

/**
 * Created by slipkinem on 4/10/2018 at 9:49 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export const getCity = (provinceId: number) => Vue.http.requestCache<Area[]>('/System/getCityByProvinceId/' + provinceId)
export const getCityById = (cityId: number) => Vue.http.requestCache<SysCity>('/System/getCityByCityId/' + cityId)
export const getAreaByAreaId = (areaId: number) => Vue.http.requestCache<SysArea>('/System/getAreaByAreaId/' + areaId)
export const getProvince = () => Vue.http.requestCache<Area[]>('/System/getProvince')
export const getProvinceById = (provinceId: number) => Vue.http.requestCache<SysProvince>('/System/getProvinceByProvinceId/' + provinceId)
export const getArea = (cityId: number) => Vue.http.requestCache<Area[]>('/System/getAreaListByCityId/' + cityId)
